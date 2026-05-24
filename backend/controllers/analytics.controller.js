const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('../utils/response');
const appService = require('../services/app.service');
const analyticsService = require('../services/analytics.service');

const getDistribution = catchAsync(async (req, res) => {
  const { name } = req.params;
  const application = await appService.getApplicationByName(name, req.developer._id);
  const distribution = await analyticsService.getLevelDistribution(application._id);
  sendSuccess(res, 200, { distribution });
});

const getTimeSeries = catchAsync(async (req, res) => {
  const { name } = req.params;
  const days = Math.min(90, Math.max(1, parseInt(req.query.days, 10) || 14));
  const application = await appService.getApplicationByName(name, req.developer._id);
  const timeSeries = await analyticsService.getLogsOverTime(application._id, days);
  sendSuccess(res, 200, { timeSeries });
});

module.exports = { getDistribution, getTimeSeries };
