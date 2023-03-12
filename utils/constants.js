module.exports.dataUser = (user) => {
  const obj = {};
  obj.name = user.name;
  obj.about = user.about;
  obj.avatar = user.avatar;
  return obj;
};

module.exports.message404 = (req, res) => {
  res.status(404).send({ message: "Ошибка 404" });
};
module.exports.DEFAULT_ERROR = 500;
module.exports.SEARCH_ERROR = 404;
module.exports.DATA_ERROR = 400;
