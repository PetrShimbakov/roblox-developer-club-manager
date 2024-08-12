import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import errorMessages from "../messages/error-messages.js";

const modals = {};

modals.builderRole = userId => {
	const modal = new ModalBuilder({
		customId: "builder-modal-" + userId,
		title: 'Анкета для получения роли "Builder".'
	});

	const nameInput = new TextInputBuilder({
		customId: "name",
		label: "Как вас зовут?",
		style: TextInputStyle.Short
	});

	const yearsExperienceInput = new TextInputBuilder({
		customId: "experience-years",
		label: "Сколько лет ваш стаж работы в Roblox Studio?",
		style: TextInputStyle.Short,
		required: false
	});

	const monthsExperienceInput = new TextInputBuilder({
		customId: "experience-months",
		label: "Сколько мес. ваш стаж работы в Roblox Studio?",
		style: TextInputStyle.Short,
		required: false
	});

	modal.addComponents(
		new ActionRowBuilder().addComponents(nameInput),
		new ActionRowBuilder().addComponents(yearsExperienceInput),
		new ActionRowBuilder().addComponents(monthsExperienceInput)
	);

	return modal;
};

modals.modelerRole = userId => {
	const modal = new ModalBuilder({
		customId: "modeler-modal-" + userId,
		title: 'Анкета для получения роли "Modeler".'
	});

	const nameInput = new TextInputBuilder({
		customId: "name",
		label: "Как вас зовут?",
		style: TextInputStyle.Short
	});

	const yearsExperienceInput = new TextInputBuilder({
		customId: "experience-years",
		label: "Сколько лет вы занимаетесь моделированием?",
		style: TextInputStyle.Short,
		required: false
	});

	const monthsExperienceInput = new TextInputBuilder({
		customId: "experience-months",
		label: "Сколько мес. вы занимаетесь моделированием?",
		style: TextInputStyle.Short,
		required: false
	});

	modal.addComponents(
		new ActionRowBuilder().addComponents(nameInput),
		new ActionRowBuilder().addComponents(yearsExperienceInput),
		new ActionRowBuilder().addComponents(monthsExperienceInput)
	);

	return modal;
};

modals.scripterRole = userId => {
	const modal = new ModalBuilder({
		customId: "scripter-modal-" + userId,
		title: 'Анкета для получения роли "Scripter".'
	});

	const nameInput = new TextInputBuilder({
		customId: "name",
		label: "Как вас зовут?",
		style: TextInputStyle.Short
	});

	const yearsExperienceInput = new TextInputBuilder({
		customId: "experience-years",
		label: "Сколько лет вы уже пишите скрипты luau?",
		style: TextInputStyle.Short,
		required: false
	});

	const monthsExperienceInput = new TextInputBuilder({
		customId: "experience-months",
		label: "Сколько мес. вы уже пишите скрипты luau?",
		style: TextInputStyle.Short,
		required: false
	});

	modal.addComponents(
		new ActionRowBuilder().addComponents(nameInput),
		new ActionRowBuilder().addComponents(yearsExperienceInput),
		new ActionRowBuilder().addComponents(monthsExperienceInput)
	);

	return modal;
};

modals.audioSpecialistRole = userId => {
	const modal = new ModalBuilder({
		customId: "audio-specialist-modal-" + userId,
		title: 'Анкета для получения роли "Audio Specialist".'
	});

	const nameInput = new TextInputBuilder({
		customId: "name",
		label: "Как вас зовут?",
		style: TextInputStyle.Short
	});

	const yearsExperienceInput = new TextInputBuilder({
		customId: "experience-years",
		label: "Сколько лет вы уже создаете аудио?",
		style: TextInputStyle.Short,
		required: false
	});

	const monthsExperienceInput = new TextInputBuilder({
		customId: "experience-months",
		label: "Сколько мес. вы уже создаете аудио?",
		style: TextInputStyle.Short,
		required: false
	});

	modal.addComponents(
		new ActionRowBuilder().addComponents(nameInput),
		new ActionRowBuilder().addComponents(yearsExperienceInput),
		new ActionRowBuilder().addComponents(monthsExperienceInput)
	);

	return modal;
};

export default modals;
