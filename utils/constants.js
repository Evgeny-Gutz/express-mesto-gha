module.exports.dataUser = (user) => {
  const obj = {};
  obj.name = user.name;
  obj.about = user.about;
  obj.avatar = user.avatar;
  return obj;
};

module.exports.DEFAULT_ERROR = 500;
module.exports.SEARCH_ERROR = 404;
module.exports.DATA_ERROR = 400;
