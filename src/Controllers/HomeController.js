const home = (req, res) => {
  res.send(
    "<p>Welcome to E-Cell website Backend API. Developed by E-Cell Tech Team.</p>"
  );
};

module.exports = {
  home,
};
