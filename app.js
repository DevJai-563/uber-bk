const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userRoutes = require('./routes/userRoute');
const captainRoutes = require('./routes/captainRoute');
const mapRoutes = require('./routes/mapRoute');
const rideRoutes = require('./routes/rideRoute');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoutes);


module.exports = app;