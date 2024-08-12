import fs from "fs";
import path from "path";
import config from "../config/config.js";

const dataDirectory = path.join("data");
const filePaths = {
	names: path.join(dataDirectory, "names.json"),
	[config.roleIds.builder]: path.join(dataDirectory, "builders.json"),
	[config.roleIds.modeler]: path.join(dataDirectory, "modelers.json"),
	[config.roleIds.scripter]: path.join(dataDirectory, "scripters.json"),
	[config.roleIds.audioSpecialist]: path.join(dataDirectory, "audio-specialists.json")
};

Object.values(filePaths).forEach(filePath => {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, "{}");
	}
});

let taskQueue = [];
let queueProcessing = false;

const processQueue = async () => {
	if (queueProcessing) return;
	queueProcessing = true;
	while (taskQueue.length > 0) {
		const task = taskQueue.shift();

		if (task.type === "add-data") {
			const roleData = JSON.parse(await fs.promises.readFile(filePaths[task.roleId]));
			const nameData = JSON.parse(await fs.promises.readFile(filePaths.names));

			if (Object.keys(roleData).length > 999) throw new Error("Storage is full");

			nameData[task.userId] = task.userName;

			roleData[task.userId] = { yearsExpQty: task.yearsExpQty, monthsExpQty: task.monthsExpQty };

			await fs.promises.writeFile(filePaths[task.roleId], JSON.stringify(roleData));
			await fs.promises.writeFile(filePaths.names, JSON.stringify(nameData));
			console.log(
				"Новый разработчик с ролью:",
				task.roleId,
				"и опытом работы",
				task.yearsExpQty,
				"лет и",
				task.monthsExpQty,
				"месяцев."
			);
		}
		if (task.type === "remove-data") {
			const roleData = JSON.parse(await fs.promises.readFile(filePaths[task.roleId]));
			delete roleData[task.userId];
			await fs.promises.writeFile(filePaths[task.roleId], JSON.stringify(roleData));
		}
		if (task.type === "remove-all-data") {
			Object.values(filePaths).forEach(filePath => {
				fs.promises
					.readFile(filePath)
					.then(jsonData => JSON.parse(jsonData))
					.then(data => {
						delete data[task.userId];
						fs.promises.writeFile(filePath, JSON.stringify(data));
					});
			});
		}
	}
	queueProcessing = false;
};

const addData = async (userId, data) => {
	return new Promise((resolve, reject) => {
		taskQueue.push({
			type: "add-data",
			userId,
			roleId: data.roleId,
			yearsExpQty: data.yearsExperienceQty,
			monthsExpQty: data.monthsExperienceQty,
			userName: data.userName
		});
		processQueue().then(resolve).catch(reject);
	});
};

const removeData = async (userId, roleId) => {
	return new Promise((resolve, reject) => {
		taskQueue.push({
			type: "remove-data",
			userId,
			roleId
		});
		processQueue().then(resolve).catch(reject);
	});
};

const removeAllData = async userId => {
	return new Promise((resolve, reject) => {
		taskQueue.push({
			type: "remove-all-data",
			userId
		});
		processQueue().then(resolve).catch(reject);
	});
};

const getAllData = async userId => {
	const data = {};

	const nameData = JSON.parse(await fs.promises.readFile(filePaths.names))[userId];
	console.log(userId);
	if (nameData) data.name = nameData;
	else throw new Error("User not found.");

	const builderData = JSON.parse(await fs.promises.readFile(filePaths[config.roleIds.builder]))[
		userId
	];
	if (builderData) data.builder = builderData;
	const modelerData = JSON.parse(await fs.promises.readFile(filePaths[config.roleIds.modeler]))[
		userId
	];
	if (modelerData) data.modeler = modelerData;
	const scripterData = JSON.parse(await fs.promises.readFile(filePaths[config.roleIds.scripter]))[
		userId
	];
	if (scripterData) data.scripter = scripterData;
	const audioSpecialistData = JSON.parse(
		await fs.promises.readFile(filePaths[config.roleIds.audioSpecialist])
	)[userId];
	if (audioSpecialistData) data.audioSpecialist = audioSpecialistData;

	return data;
};

export { addData, removeData, removeAllData, getAllData };
