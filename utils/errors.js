class ValidationError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = statusCode;
  }
}
class CastError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.name = "CastError";
    this.statusCode = statusCode;
  }
}
class TypeError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.name = "TypeError";
    this.statusCode = statusCode;
  }
}

const errorStandart = new Error('Произошла ошибка');

const errorCreateUser = new ValidationError("Переданы некорректные данные при создании пользователя");
const errorUpdateUser = new ValidationError("Переданы некорректные данные при обновлении профиля.");
const errorUpdateAvatar = new ValidationError("Переданы некорректные данные при обновлении аватара.");
const errorFindUserById = new TypeError("Получение пользователя c несуществующим в БД id.");
const errorUserIsNotFound = new CastError("Пользователь c указанному _id не найден.", 400);

const errorCreateCard = new ValidationError("Переданы некорректные данные при создании карточки.");
const errorLikeDislikeCard = new ValidationError("Переданы некорректные данные для постановки/снятии лайка.");
const errorAddLikeIdNotFound = new TypeError("Добавление лайка c несуществующим в БД id карточки.");
const errorRemoveLikeIdNotFound = new TypeError("Удаление лайка у карточки с несуществующим в БД id.");
const errorDeleteCardIdNotFound = new TypeError("Удаление карточки с несуществующим в БД id.");

const errorCardIsNotFound = new ValidationError("Карточка c указанным _id не найдена.");

module.exports.addErrorsCardDelete = (res, err) => {
  if(err.name === 'CastError') {
    res.status(errorCardIsNotFound.statusCode).send({message: errorCardIsNotFound.message});
    return;
  }
  if(err.name === "ReferenceError") {
    res.status(errorDeleteCardIdNotFound.statusCode).send({message: errorDeleteCardIdNotFound.message});
    return;
  }
  res.status(500).send({message: errorStandart.message});
}
module.exports.addErrorsLike = (res, err) => {
  if(err.name === 'ValidationError') {
    res.status(errorLikeDislikeCard.statusCode).send({message: errorLikeDislikeCard.message});
    return;
  }
  if(err.name === 'CastError') {
    res.status(errorCardIsNotFound.statusCode).send({message: errorCardIsNotFound.message});
    return;
  }
  if(err.name === "ReferenceError") {
    res.status(errorAddLikeIdNotFound.statusCode).send({message: errorAddLikeIdNotFound.message});
    return;
  }
  res.status(500).send({message: errorStandart.message});
}
module.exports.addErrorsDislike = (res, err) => {
  if(err.name === 'ValidationError') {
    res.status(errorLikeDislikeCard.statusCode).send({message: errorLikeDislikeCard.message});
    return;
  }
  if(err.name === 'CastError') {
    res.status(errorCardIsNotFound.statusCode).send({message: errorCardIsNotFound.message});
    return;
  }
  if(err.name === "ReferenceError") {
    res.status(errorRemoveLikeIdNotFound.statusCode).send({message: errorRemoveLikeIdNotFound.message});
    return;
  }
  res.status(500).send({message: errorStandart.message});
}
module.exports.addErrorsCreateCard = (res, err) => {
  if(err.name === 'ValidationError') {
    res.status(errorCreateCard.statusCode).send({message: errorCreateCard.message});
    return;
  }
  res.status(500).send({message: errorStandart.message});
}

module.exports.addErrorsGetUsers = (res, err) => {
  res.status(500).send({message: errorStandart.message});
}
module.exports.addErrorsCreateUser = (res, err) => {
  if(err.name === 'ValidationError') {
    res.status(errorCreateUser.statusCode).send({message: errorCreateUser.message});
    return;
  }
  res.status(500).send({message: errorStandart.message});
}
module.exports.addErrorsFindUser = (res, err) => {
  if(err.name === 'CastError') {
    res.status(errorUserIsNotFound.statusCode).send({message: errorUserIsNotFound.message});
    return;
  }
  if(err.name === "TypeError") {
    res.status(errorFindUserById.statusCode).send({message: errorFindUserById.message});
    return;
  }
  res.status(500).send({message: errorStandart.message})
}
module.exports.addErrorsUpdateUser = (res, err) => {
  if(err.name === 'ValidationError') {
    res.status(errorUpdateUser.statusCode).send({message: errorUpdateUser.message});
  }
  if(err.name === 'CastError') {
    res.status(errorUserIsNotFound.statusCode).send({message: errorUserIsNotFound.message});
    return;
  }
  res.status(500).send({message: errorStandart.message})
}
module.exports.addErrorsUpdateAvatar = (res, err) => {
  if(err.name === 'ValidationError') {
    res.status(errorUpdateAvatar.statusCode).send({message: errorUpdateAvatar.message});
  }
  if(err.name === 'CastError') {
    res.status(errorUserIsNotFound.statusCode).send({message: errorUserIsNotFound.message});
    return;
  }
  res.status(500).send({message: errorStandart.message})
}

