import { Events } from "discord.js";
import errorMessages from "../views/messages/error-messages.js";
import messages from "../views/messages/messages.js";
import config from "../config/config.js";
import modals from "../views/modals/roles.js";
import { addData, removeData } from "../models/roles-data.js";

const changeRole = async (interaction, roleId, roleModalCustomId, modal) => {
	try {
		const member = await interaction.guild.members.fetch(interaction.user.id);
		const role = await interaction.guild.roles.cache.get(roleId);

		if (member.roles.cache.has(roleId)) {
			await interaction.deferReply({ ephemeral: true });

			removeData(interaction.user.id, roleId)
				.then(() => member.roles.remove(role))
				.then(() => interaction.editReply(messages.roleRemoved(role.name)))
				.catch(() => {
					console.error("[roles-data model - remove data method]", error);
					if (interaction.replied) interaction.editReply(errorMessages.saveError);
					else interaction.followUp(errorMessages.saveError);
				});
		} else {
			await interaction.showModal(modal);

			const modalInteraction = await interaction.awaitModalSubmit({
				filter: interaction => roleModalCustomId === interaction.customId,
				time: 90000
			});

			await modalInteraction.deferReply({ ephemeral: true });

			const userName = modalInteraction.fields.getTextInputValue("name");
			const experienceYears = modalInteraction.fields.getTextInputValue("experience-years");
			const experienceMonths = modalInteraction.fields.getTextInputValue("experience-months");

			if (userName.includes(" ") || userName.length < 2 || userName.length > 50) {
				return modalInteraction.editReply(errorMessages.badName);
			}

			if (!experienceYears && !experienceMonths) {
				return modalInteraction.editReply(errorMessages.experienceNotSpecified);
			}

			let yearsExperienceQty = parseInt(experienceYears);
			let monthsExperienceQty = parseInt(experienceMonths);

			if (isNaN(yearsExperienceQty)) yearsExperienceQty = 0;
			if (isNaN(monthsExperienceQty)) monthsExperienceQty = 0;

			yearsExperienceQty = Math.round(yearsExperienceQty);
			monthsExperienceQty = Math.round(monthsExperienceQty);

			if (yearsExperienceQty < 0 || monthsExperienceQty < 0) {
				return modalInteraction.editReply(errorMessages.experienceIsNegative);
			}

			yearsExperienceQty += Math.floor(monthsExperienceQty / 12);
			monthsExperienceQty = monthsExperienceQty % 12;

			if (!yearsExperienceQty && !monthsExperienceQty) {
				return modalInteraction.editReply(errorMessages.experienceIsNan);
			}

			if (yearsExperienceQty > 20) {
				return modalInteraction.editReply(errorMessages.tooMuchExperience(yearsExperienceQty));
			}

			addData(interaction.user.id, { userName, roleId, yearsExperienceQty, monthsExperienceQty })
				.then(() => modalInteraction.guild.roles.cache.get(roleId))
				.then(role => member.roles.add(role).then(() => role))
				.then(role => modalInteraction.editReply(messages.roleAdded(role.name)))
				.catch(error => {
					console.error("[roles-data model - add data method]", error);
					if (error.message === "Storage is full")
						modalInteraction.editReply(errorMessages.dataBaseFull);
					else if (modalInteraction.replied) modalInteraction.followUp(errorMessages.saveError);
					else modalInteraction.editReply(errorMessages.saveError);
				});
		}
	} catch (error) {
		console.error("[roles controller (change role function)]", error);
		if (error.name === "Error [InteractionCollectorError]") {
			await interaction.followUp(errorMessages.timeLimit);
		} else {
			await interaction.followUp(errorMessages.unknown);
		}
	}
};

export default client => {
	client.on(Events.InteractionCreate, async interaction => {
		try {
			if (!interaction.isButton()) return;

			const member = await interaction.guild.members.fetch(interaction.user.id);
			const role = await interaction.guild.roles.cache.get(config.roleIds.client);

			switch (interaction.customId) {
				case "client-role":
					await interaction.deferReply({ ephemeral: true });

					if (member.roles.cache.has(config.roleIds.client)) {
						await member.roles.remove(role);
						await interaction.editReply(messages.roleRemoved(role.name));
					} else {
						await member.roles.add(role);
						await interaction.editReply(messages.roleAdded(role.name));
					}
					break;
				case "builder-role":
					changeRole(
						interaction,
						config.roleIds.builder,
						"builder-modal-" + interaction.user.id,
						modals.builderRole(interaction.user.id)
					);
					break;
				case "modeler-role":
					changeRole(
						interaction,
						config.roleIds.modeler,
						"modeler-modal-" + interaction.user.id,
						modals.modelerRole(interaction.user.id)
					);
					break;
				case "scripter-role":
					changeRole(
						interaction,
						config.roleIds.scripter,
						"scripter-modal-" + interaction.user.id,
						modals.scripterRole(interaction.user.id)
					);
					break;
				case "audio-specialist-role":
					changeRole(
						interaction,
						config.roleIds.audioSpecialist,
						"audio-specialist-modal-" + interaction.user.id,
						modals.audioSpecialistRole(interaction.user.id)
					);
					break;
			}
		} catch (error) {
			console.error("[roles controller]", error);
		}
	});
};
