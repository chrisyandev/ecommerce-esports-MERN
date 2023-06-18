const mongoose = require("mongoose");

const connectToDB = (clusterUrl, dbName) => {
  return mongoose.connect(`${clusterUrl}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDB;
