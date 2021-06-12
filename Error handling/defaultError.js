const defaultError = (error, req, res) => {
  console.log(error);
  res.status(500).json({ message: error });
};
module.exports = defaultError;
