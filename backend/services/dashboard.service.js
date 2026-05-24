const Application = require('../models/Application');
const Log = require('../models/Log');

const getDashboardStats = async (developerId) => {
  const applications = await Application.find({ owner: developerId }).select('_id');
  const appIds = applications.map((a) => a._id);

  if (appIds.length === 0) {
    return {
      totalApplications: 0,
      totalLogs: 0,
      infoLogs: 0,
      warnLogs: 0,
      errorLogs: 0,
    };
  }

  const levelCounts = await Log.aggregate([
    { $match: { application: { $in: appIds } } },
    { $group: { _id: '$level', total: { $sum: '$count' } } },
  ]);

  const byLevel = Object.fromEntries(levelCounts.map((r) => [r._id, r.total]));

  const infoLogs = byLevel.INFO ?? 0;
  const warnLogs = byLevel.WARN ?? 0;
  const errorLogs = byLevel.ERROR ?? 0;

  return {
    totalApplications: applications.length,
    totalLogs: infoLogs + warnLogs + errorLogs,
    infoLogs,
    warnLogs,
    errorLogs,
  };
};

module.exports = { getDashboardStats };
