const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is missing from .env');
    throw new Error('JWT_SECRET is missing');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: true, // Always true for cross-domain cookies
    sameSite: 'none', // Required for cross-domain cookies
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token, // Send token in body as backup for cross-site cookies
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = { generateToken, sendTokenResponse };
