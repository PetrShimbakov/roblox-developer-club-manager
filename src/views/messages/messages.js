const messages = {};

messages.roleAdded = role => {
	return {
		content: `Поздравляю, ты получил новую роль "${role}"!`,
		ephemeral: true
	};
};

messages.roleRemoved = role => {
	return {
		content: `Ваша роль "${role}" была удалена`,
		ephemeral: true
	};
};

messages.rulesSent = channel => {
	return {
		content: `Я успешно отправил правила в указанный вами канал ${channel}.`,
		ephemeral: true
	};
};

messages.rolesSent = channel => {
	return {
		content: `Я успешно отправил авторизацию ролей в указанный вами канал ${channel}.`,
		ephemeral: true
	};
};

export default messages;
