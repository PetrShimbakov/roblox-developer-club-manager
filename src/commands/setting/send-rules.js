import { ChannelType, SlashCommandBuilder } from "discord.js";
import rulesEmbed from "../../views/embeds/rules.js";
import config from "../../config/config.js";
import errorMessages from "../../views/messages/error-messages.js";
import messages from "../../views/messages/messages.js";

const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID;

const data = new SlashCommandBuilder()
	.setName("send-rules")
	.setDescription("Отошлет правила сервера в указанный канал.")
	.addChannelOption(option =>
		option
			.setName("channel")
			.setDescription("Канал, в который будут отправлены правила.")
			.setRequired(true)
	);

const execute = async interaction => {
	try {
		const channel = await interaction.options.getChannel("channel");
		const member = await interaction.guild.members.fetch(interaction.user.id);
		const allowedChannelTypes = [ChannelType.GuildAnnouncement, ChannelType.GuildText];
		const isNotTextChannel = !channel || !allowedChannelTypes.includes(channel.type);

		if (member.roles.cache.has(config.roleIds.administrator)) {
			if (isNotTextChannel) return interaction.reply(errorMessages.notTextChannel);

			await channel.send({ embeds: [rulesEmbed] });
			interaction.reply(messages.rulesSent(channel));
		} else {
			await interaction.reply(errorMessages.noRights);
			return;
		}
	} catch (error) {
		interaction.reply(errorMessages.unknown);
		console.error("[commands]", error);
	}
};

export { data, execute };
