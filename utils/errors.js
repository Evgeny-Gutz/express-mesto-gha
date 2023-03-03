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

module.exports.errorStandart = new Error('Произошла ошибка');

module.exports.errorCreateUser = new ValidationError("Переданы некорректные данные при создании пользователя");
module.exports.errorUpdateUser = new ValidationError("Переданы некорректные данные при обновлении профиля.");
module.exports.errorUpdateAvatar = new ValidationError("Переданы некорректные данные при обновлении аватара.");
module.exports.errorUserIsNotFound = new CastError("Пользователь c указанному _id не найден.", 400);

module.exports.errorCreateCard = new ValidationError("Переданы некорректные данные при создании карточки.");
module.exports.errorLikeDislikeCard = new ValidationError("Переданы некорректные данные для постановки/снятии лайка.");
module.exports.errorCardIsNotFound = new ValidationError("Карточка c указанным _id не найдена.");