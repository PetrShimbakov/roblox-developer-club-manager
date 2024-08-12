import Discord, { Colors } from "discord.js";

const LOGO_IMAGE = process.env.LOGO;
const BANNER_IMAGE = process.env.BANNER;

const serverRules = new Discord.EmbedBuilder()
	.setTitle("Приветствуем тебя на нашем сервере!")
	.setDescription(
		"Чтобы быстро войти в наши ряды, выбери один или несколько из следующих пунктов в зависимости от твоих интересов и навыков. Не переживай, изменения можно будет внести в любой момент."
	)
	.setColor("#816CE0")
	.setFooter({
		text: "Roblox Developer Club",
		iconURL: LOGO_IMAGE
	})
	.setImage(BANNER_IMAGE)
	.addFields(
		{
			name: "Client (Заказчик)",
			value:
				"- Есть идея для игры? Закажи её разработку у нас. Заказчик формулирует требования и работает с командой для реализации проекта."
		},
		{
			name: "Builder (Строитель)",
			value:
				"- Создаёт уровни и локации в Roblox Studio, проектируя карты и размещая объекты для увлекательной игры."
		},
		{
			name: "Modeler (Моделлер)",
			value:
				"- Создаёт 3D-объекты и текстуры в Blender или 3ds Max, создает персонажей, предметы и другие игровые элементы."
		},
		{
			name: "Scripter (Скриптер)",
			value:
				"- Программирует функциональность игры в Roblox Studio или VS Code, создавая код для управления действиями и взаимодействиями в игре."
		},
		{
			name: "Audio Specialist (Аудио специалист)",
			value: "- Создаёт музыку и/или разрабатывает звуковые эффекты"
		}
	);

export default serverRules;
