const Schema = require("../model/Schema");

const getAllProducts = async (req, res) => {
  const myData = await Schema.find({});
  res.status(200).send(myData);
};

module.exports = getAllProducts;
