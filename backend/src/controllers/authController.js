const authService = require('../services/authService');
const { sendTokenResponse } = require('../utils/token');
const asyncHandler = require('../middlewares/async');

// @desc    Register user
// @route   POST /auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const user = await authService.register(req.body);
  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  sendTokenResponse(user, 200, res);
});

// @desc    Logout user
// @route   POST /auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = { registerUser, loginUser, logoutUser };
