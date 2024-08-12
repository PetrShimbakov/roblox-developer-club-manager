import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const buttons = new ActionRowBuilder().addComponents(
	new ButtonBuilder().setLabel("Client").setStyle(ButtonStyle.Success).setCustomId("client-role"),

	new ButtonBuilder().setLabel("Builder").setStyle(ButtonStyle.Primary).setCustomId("builder-role"),

	new ButtonBuilder().setLabel("Modeler").setStyle(ButtonStyle.Primary).setCustomId("modeler-role"),

	new ButtonBuilder()
		.setLabel("Scripter")
		.setStyle(ButtonStyle.Primary)
		.setCustomId("scripter-role"),

	new ButtonBuilder()
		.setLabel("Audio Specialist")
		.setStyle(ButtonStyle.Primary)
		.setCustomId("audio-specialist-role")
);

export default buttons;
