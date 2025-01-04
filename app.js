const express = require('express');
const connectDB = require('./config/db.js');
const session = require('express-session');
const passport = require('./config/passport.js');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'); // Ensure this is included

const userRouter = require('./routes/user.js');
const productRouter = require('./routes/product.js');
const reviewRouter = require('./routes/review.js');
const orderRouter = require('./routes/order.js');
const categoryRouter = require('./routes/category.js');
const bookingRouter = require('./routes/booking.js');
const addressRouter = require('./routes/address.js');
const paymentRouter = require('./routes/payment.js');

// const swaggerDocs = require('./swagger/swaggerDocumentation.js'); // Make sure this points to the right file

const YAML = require('yamljs')

const swaggerDocument = YAML.load('swagger.yaml');

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;
const api = process.env.API;
const sess_secret = process.env.SESS_SECRET;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // For parsing application/json
app.use(session({ secret: sess_secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// Set up Swagger before routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Using Routers
app.use(`${api}users`, userRouter);
app.use(`${api}products`, productRouter);
app.use(`${api}reviews`, reviewRouter);
app.use(`${api}orders`, orderRouter);
app.use(`${api}category`, categoryRouter);
app.use(`${api}booking`, bookingRouter);
app.use(`${api}address`, addressRouter);
app.use(`${api}payment`, paymentRouter);

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};

connectDB();

app.listen(port, () => {
  console.log(`App listening on: http://localhost:${port}`);
});

// Using error handler after all routes so the code works
app.use(errorHandler);
