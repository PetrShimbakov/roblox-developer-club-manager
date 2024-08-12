import Discord from "discord.js";
import errorMessages from "../../views/messages/error-messages.js";

const data = new Discord.SlashCommandBuilder()
	.setName("help")
	.setDescription("Покажет список всех доступных команд.");

const execute = async interaction => {
	await interaction.reply(errorMessages.inDev);
};

export { data, execute };
