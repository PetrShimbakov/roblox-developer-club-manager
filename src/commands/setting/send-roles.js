import { ChannelType, SlashCommandBuilder } from "discord.js";
import messages from "../../views/messages/messages.js";
import errorMessages from "../../views/messages/error-messages.js";
import config from "../../config/config.js";
import buttons from "../../views/buttons/roles.js";
import embed from "../../views/embeds/roles.js";

const data = new SlashCommandBuilder()
	.setName("send-roles")
	.setDescription("Отошлет меню для авторизации и описание ролей в указанный канал.")
	.addChannelOption(option =>
		option
			.setName("channel")
			.setDescription("Канал, в который будет отправлено меню авторизации.")
			.setRequired(true)
	);

const execute = async interaction => {
	try {
		await interaction.deferReply({ ephemeral: true });

		const channel = await interaction.options.getChannel("channel");
		const member = await interaction.guild.members.fetch(interaction.user.id);
		const allowedChannelTypes = [ChannelType.GuildAnnouncement, ChannelType.GuildText];
		const isNotTextChannel = !channel || !allowedChannelTypes.includes(channel.type);

		if (member.roles.cache.has(config.roleIds.administrator)) {
			if (isNotTextChannel) return interaction.editReply(errorMessages.notTextChannel);
			await channel.send({ embeds: [embed], components: [buttons] });
			await interaction.editReply(messages.rolesSent(channel));
		} else {
			await interaction.editReply(errorMessages.noRights);
			return;
		}
	} catch (error) {
		console.error("[commands]", error);
		if (!interaction.replied) interaction.editReply(errorMessages.unknown);
	}
};

export { data, execute };
