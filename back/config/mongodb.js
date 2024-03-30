const mongoose = require("mongoose");

const mongodb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = mongodb;
