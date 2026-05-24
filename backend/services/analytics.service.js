const Log = require('../models/Log');
const { LOG_LEVELS } = require('../config/constants');

const getLevelDistribution = async (applicationId) => {
  const results = await Log.aggregate([
    { $match: { application: applicationId } },
    { $group: { _id: '$level', count: { $sum: '$count' } } },
  ]);

  const byLevel = Object.fromEntries(results.map((r) => [r._id, r.count]));
  const total = LOG_LEVELS.reduce((sum, level) => sum + (byLevel[level] ?? 0), 0) || 1;

  return LOG_LEVELS.map((level) => ({
    level,
    count: byLevel[level] ?? 0,
    percentage: Math.round(((byLevel[level] ?? 0) / total) * 100),
  }));
};

const getLogsOverTime = async (applicationId, days = 14) => {
  const now = new Date();
  const startUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - (days - 1)
  );

  const results = await Log.aggregate([
    { $match: { application: applicationId, updatedAt: { $gte: new Date(startUtc) } } },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt', timezone: 'UTC' },
          },
          level: '$level',
        },
        count: { $sum: '$count' },
      },
    },
  ]);

  const points = [];
  for (let i = 0; i < days; i++) {
    const dayMs = startUtc + i * 86400000;
    const dayStr = new Date(dayMs).toISOString().slice(0, 10);
    const label = new Date(dayMs).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
    const point = { date: label, INFO: 0, WARN: 0, ERROR: 0 };

    for (const row of results) {
      if (row._id.date === dayStr && row._id.level in point) {
        point[row._id.level] += row.count;
      }
    }

    points.push(point);
  }

  return points;
};

module.exports = { getLevelDistribution, getLogsOverTime };
