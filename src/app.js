import { Client, Events, GatewayIntentBits } from "discord.js";
import config from "./config/config.js";
import fs from "fs";
import path from "path";
import commandsController from "./controllers/commands.js";
import rolesController from "./controllers/roles.js";
import { removeAllData } from "./models/roles-data.js";
import contextMenuController from "./controllers/context-menu.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once(Events.ClientReady, () => {
	console.log(`Бот ${client.user.tag} успешно авторизовался!`);
	commandsController(client);
	rolesController(client);
	contextMenuController(client);
});

client.on(Events.GuildMemberRemove, member => {
	console.log(`${member.user.tag} нас кинул.`);
	removeAllData(member.user.id);
});

client.login(config.bot.token);
