const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Pause the currently playing SONG!"),
	async execute(interaction) {
		await interaction.reply(`Reply of Interaction goes here`);
	},
};