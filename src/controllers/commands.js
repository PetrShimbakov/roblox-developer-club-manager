import { Collection, Events } from "discord.js";
import fs from "fs";
import path from "path";
import errorMessages from "../views/messages/error-messages.js";
import { Console } from "console";

export default async client => {
	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error("[commands controller]", error);
			await interaction.reply(errorMessages.unknown);
		}
	});

	try {
		client.commands = new Collection();
		const commandFoldersPath = "src/commands";
		const commandFolders = fs.readdirSync(commandFoldersPath);

		for (const folder of commandFolders) {
			const commandFilesPath = path.join(commandFoldersPath, folder);
			if (fs.lstatSync(commandFilesPath).isDirectory()) {
				const commandFiles = fs.readdirSync(commandFilesPath);
				for (const file of commandFiles) {
					const filePath = path.join(commandFilesPath, file);
					const modulePath = `file://${path.resolve(filePath)}`;
					const command = await import(modulePath);
					if (command.data && command.execute) {
						client.commands.set(command.data.name, command);
					} else {
						console.warn(
							`[commands controller] в командном модуле ${filePath} не удалось получить все нужные свойства "data" и "execute".`
						);
					}
				}
			}
		}
	} catch (err) {
		console.error("[commands controller]", err);
	}
};
