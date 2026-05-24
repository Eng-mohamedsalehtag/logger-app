const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('../utils/response');
const dashboardService = require('../services/dashboard.service');

const getStats = catchAsync(async (req, res) => {
  const stats = await dashboardService.getDashboardStats(req.developer._id);
  sendSuccess(res, 200, { stats });
});

module.exports = { getStats };
