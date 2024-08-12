import { getAllData } from "../models/roles-data.js";
import errorMessages from "../views/messages/error-messages.js";
import messages from "../views/messages/messages.js";
import { Events } from "discord.js";
import userInfoEmbed from "../views/embeds/user-info.js";

export default client => {
	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isUserContextMenuCommand()) return;
		if (interaction.commandName === "Информация пользователя.") {
			interaction
				.deferReply({ ephemeral: true })
				.then(() => getAllData(interaction.targetMember.user.id))
				.then(data => {
					interaction.editReply({
						embeds: [userInfoEmbed(data, interaction.targetMember.user)],
						ephemeral: true
					});
					console.log(data);
				})
				.catch(error => {
					console.error("[roles controller (change role function)]", error);
					if (error.message === "User not found." && !interaction.replied) {
						interaction.followUp(errorMessages.userNotRegistered);
					} else if (interaction.replied) interaction.followUp(errorMessages.unknown);
					else interaction.editReply(errorMessages.unknown);
				});
		}
	});
};
