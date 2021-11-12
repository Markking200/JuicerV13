const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder().setName("setstatus").setDescription("Set the bots Status"),
	async execute(interaction) {
		await interaction.reply(`Pong!`);
	},
};