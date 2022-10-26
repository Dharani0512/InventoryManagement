const notFoundMiddleware = (req, res) => {
  res.status(404).send("route doesnot exist");
};

export default notFoundMiddleware;
