const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the paused song!"),
  async execute(interaction) {
    const musicqueue = interaction.client.musicQueue[0] || null;

    if (!interaction.member.voice.channelId) {
      return await interaction.reply("You have to be in a voice channel");
    }
    if (musicqueue === null) {
      return interaction.reply("There is no music to resume!");
    }
    if (musicqueue.playing === true) {
      return await interaction.reply("The bot is already playing!");
    }
    musicqueue.player.unpause();
    musicqueue.playing = true;
    interaction.reply("Resumed playing");
  },
};
