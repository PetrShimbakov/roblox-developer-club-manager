import "dotenv/config";
import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const foldersPath = "src/commands";
const commandFolders = fs.readdirSync(foldersPath);

const refreshCommands = async commandFoldersPath => {
	try {
		const commands = [];
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
						commands.push(command.data.toJSON());
					} else {
						console.log(
							`[Предупреждение] в Файле ${filePath} не хватает экспортированного свойства "data" или "execute".`
						);
					}
				}
			}
		}

		console.log(`[Commands] Started refreshing ${commands.length} commands.`);

		const rest = new REST().setToken(TOKEN);

		const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
			body: commands
		});

		console.log(`[Commands] Successfully refreshed ${data.length} commands.`);
	} catch (err) {
		console.error(err);
	}
};

refreshCommands("src/commands");
