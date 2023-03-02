module.exports.dataUser = (user) => {
  return {
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id
  }
}

