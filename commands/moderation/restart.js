const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("restart")
		.setDescription("Restarts the BOT!"),
	async execute(interaction) {
		if(interaction.member.id!=='396660447513673728'){
			return await interaction.reply('PLEASE DONT USE THIS COMMAND!');
		}
		await interaction.reply('Successfully restarted the BOT!');
		process.exit();
	},
};