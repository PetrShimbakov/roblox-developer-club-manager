import { EmbedBuilder } from "discord.js";
import config from "../../config/config.js";

const userInfo = (data, user) => {
	const embed = new EmbedBuilder();

	embed.setTitle(`Информация пользователя: ${user.username}`);
	embed.setColor("#816CE0");
	embed.setFooter({
		text: "Roblox Developer Club",
		iconURL: config.imageUrls.logo
	});
	embed.setThumbnail(user.displayAvatarURL({ format: "png", size: 128 }));

	embed.addFields({
		name: "Имя:",
		value: data.name
	});

	if (!data.builder && !data.modeler && !data.scripter && !data.audioSpecialist) {
		embed.addFields({
			name: "\u200B",
			value: "Уже не разработчик roblox игр."
		});
	} else {
		if (data.builder) {
			embed.addFields({
				name: "Builder:",
				value: `Стаж работы ${data.builder.yearsExpQty} лет и ${data.builder.monthsExpQty} месяцев`
			});
		}
		if (data.modeler) {
			embed.addFields({
				name: "Modeler:",
				value: `Стаж работы ${data.modeler.yearsExpQty} лет и ${data.modeler.monthsExpQty} месяцев`
			});
		}
		if (data.scripter) {
			embed.addFields({
				name: "Scripter:",
				value: `Стаж работы ${data.scripter.yearsExpQty} лет и ${data.scripter.monthsExpQty} месяцев`
			});
		}
		if (data.audioSpecialist) {
			embed.addFields({
				name: "Audio Specialist:",
				value: `Стаж работы ${data.audioSpecialist.yearsExpQty} лет и ${data.audioSpecialist.monthsExpQty} месяцев`
			});
		}
	}
	return embed;
};

export default userInfo;
