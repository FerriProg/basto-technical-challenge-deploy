require('dotenv').config();

//DB connection

const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((e) => console.log('connection error', e));

module.exports = mongoose;
