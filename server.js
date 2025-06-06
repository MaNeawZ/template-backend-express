require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(cors()); // รองรับ cross-origin
app.use(morgan('dev')); // log request
app.use(bodyParser.json()); // รองรับ JSON body
app.use(bodyParser.urlencoded({ extended: true })); // รองรับ form-urlencoded

// Routes
const apiRoutes = require('./src/routes');
app.use('/express/api', apiRoutes);

app.get("/express/api", (req, res) => {
  res.status(200).send({ status: "success", message: `Server is Running Port ${port}` });
});


// Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

