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
