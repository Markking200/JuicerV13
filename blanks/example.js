const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("Name-goes-here")
    .setDescription("Description-goes-here"),
  async execute(interaction) {
    await interaction.reply(`Reply of Interaction goes here`);
  },
};
