const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder().setName("delete").setDescription("Delete"),
	async execute(interaction) {
		await interaction.reply(`Pong!`);
	},
};