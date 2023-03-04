module.exports.dataUser = (user) => {
  return {
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id
  }
}

module.exports.message404 = (req, res)=>{
  res.status(404).send({message: "Ошибка 404"})
}
