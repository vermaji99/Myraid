const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// CORS - Simple and permissive for production debugging
app.use(cors({
  origin: function(origin, callback) {
    // Allow all origins to resolve the blocking issue immediately
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Cookie'],
  optionsSuccessStatus: 200
}));

// Explicit OPTIONS handler for all routes
app.options('*', cors());

// Body parser
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security Headers - Configure cross-origin policies
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  })
);

// NoSQL Injection prevention
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Catch-all for non-matching routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`
  });
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;
