const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

const register = async (userData) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ErrorResponse('User already exists', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new ErrorResponse('Please provide email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  return user;
};

module.exports = { register, login };
