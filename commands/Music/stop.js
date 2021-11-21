const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("The bot stops playing Music!"),
  async execute(interaction) {
    const client = interaction.client;
    const musicqueue = interaction.client.musicQueue;

    if (musicqueue[0].playing === false) {
      return await interaction.reply("The bot isnt playing MUSIC");
    }
    musicqueue[0].player.stop();
    musicqueue[0].connection.destroy();
    musicqueue.length = 0;
    console.log(
      `The Bot stopped playing! Stop Command! Here is the musicqueue: ${musicqueue[0]}`
    );
    await interaction.reply(`The Bot stopped playing!`);
  },
};
