import "dotenv/config";

const config = {
	bot: {
		token: process.env.TOKEN,
		id: process.env.CLIENT_ID
	},
	imageUrls: {
		logo: process.env.LOGO,
		banner: process.env.BANNER
	},
	roleIds: {
		administrator: process.env.ADMINISTRATOR_ROLE_ID,
		client: process.env.CLIENT_ROLE_ID,
		builder: process.env.BUILDER_ROLE_ID,
		modeler: process.env.MODELER_ROLE_ID,
		scripter: process.env.SCRIPTER_ROLE_ID,
		audioSpecialist: process.env.AUDIO_SPECIALIST_ROLE_ID
	},
	guildId: process.env.GUILD_ID
};

export default config;
