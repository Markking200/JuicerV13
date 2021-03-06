const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the song which is currently playing!"),
  async execute(interaction) {
    const musicqueue = interaction.client.musicQueue[0] || null;
    console.log(musicqueue);
    if (!interaction.member.voice.channelId) {
      return await interaction.reply("You have to be in a voice channel");
    }
    if (musicqueue === null) {
      return interaction.reply("There is no music to pause!");
    }
    if (musicqueue.playing === false) {
      return await interaction.reply("The bot is already stopped!");
    }
    musicqueue.player.pause();
    musicqueue.playing = false;
    interaction.reply("PAUSED");
  },
};
