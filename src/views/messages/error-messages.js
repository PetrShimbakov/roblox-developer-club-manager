const errorMessages = {};

errorMessages.unknown = {
	content: "К сожалению, где-то произошла ошибка. Пожалуйста, сообщите об этом моему создателю. 😔",
	ephemeral: true
};

errorMessages.notTextChannel = {
	content: "Пожалуйста, выберите текстовый канал.",
	ephemeral: true
};

errorMessages.inDev = {
	content: "Прости, данная функция сейчас разрабатывается. 🛠",
	ephemeral: true
};

errorMessages.noRights = {
	content: "Прости, мой друг, но у тебя нет доступа к таким функциям.",
	ephemeral: true
};

errorMessages.timeLimit = {
	content:
		"Время на заполнение анкеты истекло. Пожалуйста, постарайтесь завершить её быстрее в следующий раз.",
	ephemeral: true
};

errorMessages.badName = {
	content: "Имя указанное в анкете я не знаю.",
	ephemeral: true
};

errorMessages.experienceNotSpecified = {
	content: "Вы не указали ваш опыт.",
	ephemeral: true
};

errorMessages.experienceIsNan = {
	content: "Ваш опыт надо указывать в цифрах",
	ephemeral: true
};

errorMessages.experienceIsNegative = {
	content: "Ваш опыт не может быть отрицательным.",
	ephemeral: true
};

errorMessages.tooMuchExperience = yearsQty => {
	return {
		content: `${yearsQty} лет опыта? НЕТ, слишком уж ты подозрительный. 🤨`,
		ephemeral: true
	};
};

errorMessages.saveError = {
	content: "Простите, нам не удалось сохранить изменения. 😔",
	ephemeral: true
};

errorMessages.dataBaseFull = {
	content: "Простите, наша база данных переполнена. Обязательно сообщите о данной проблеме.",
	ephemeral: true
};

errorMessages.userNotRegistered = {
	content: "Данный пользователь не зарегистрирован как разработчик",
	ephemeral: true
};

export default errorMessages;
