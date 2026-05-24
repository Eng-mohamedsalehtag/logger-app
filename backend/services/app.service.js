const Application = require('../models/Application');
const Log = require('../models/Log');
const AppError = require('../utils/AppError');

// Returns all applications owned by the given developer (with log counts)
const getAllApplications = async (developerId) => {
  const applications = await Application.find({ owner: developerId }).sort('-createdAt');
  if (applications.length === 0) return [];

  const appIds = applications.map((a) => a._id);
  const counts = await Log.aggregate([
    { $match: { application: { $in: appIds } } },
    { $group: { _id: '$application', logCount: { $sum: '$count' } } },
  ]);
  const countMap = Object.fromEntries(counts.map((c) => [c._id.toString(), c.logCount]));

  return applications.map((app) => ({
    ...app.toObject(),
    logCount: countMap[app._id.toString()] ?? 0,
  }));
};

// Returns a single application by name, scoped to the owner (with log stats)
const getApplicationByName = async (name, developerId) => {
  const application = await Application.findOne({ name, owner: developerId });
  if (!application) throw new AppError('Application not found', 404);

  const [countResult, lastLog] = await Promise.all([
    Log.aggregate([
      { $match: { application: application._id } },
      { $group: { _id: null, total: { $sum: '$count' } } },
    ]),
    Log.findOne({ application: application._id }).sort('-updatedAt').select('updatedAt'),
  ]);

  return {
    ...application.toObject(),
    logCount: countResult[0]?.total ?? 0,
    lastActivity: lastLog?.updatedAt ?? null,
  };
};

// Creates a new application; duplicate name → code 11000 → global handler
const createApplication = async (name, developerId) => {
  const application = await Application.create({ name, owner: developerId });
  return application;
};

// Hard-deletes by name + owner; null result means not found or not owned
const deleteApplication = async (name, developerId) => {
  const application = await Application.findOneAndDelete({ name, owner: developerId });
  if (!application) throw new AppError('Application not found or not yours', 404);
  // Cascade delete logs
  await Log.deleteMany({ application: application._id });
  return null;
};

module.exports = { getAllApplications, getApplicationByName, createApplication, deleteApplication };
