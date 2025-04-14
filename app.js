const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const express = require('express');
const userRoutes = require('./routes/userRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users',userRoutes);


module.exports = app;