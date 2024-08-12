import { ContextMenuCommandBuilder, ApplicationCommandType, REST, Routes } from "discord.js";
import config from "../config/config.js";

const commandData = [
	new ContextMenuCommandBuilder()
		.setName("Информация пользователя.")
		.setType(ApplicationCommandType.User)
];

const rest = new REST().setToken(config.bot.token);

(async () => {
	try {
		console.log("Refreshing context menu commands.");

		await rest.put(Routes.applicationCommands(config.bot.id, config.guildId), {
			body: commandData
		});

		console.log("Context menu commands was refreshed.");
	} catch (error) {
		console.error("[context menu register]", error);
		if (modalInteraction.replied) modalInteraction.followUp(errorMessages.saveError);
		else modalInteraction.editReply(errorMessages.saveError);
	}
})();
