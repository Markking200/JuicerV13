module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
    console.log(interaction.client.commands);
    console.log(interaction.commandName);
    const command = interaction.client.commands.get(interaction.commandName);
    try {
      command.execute(interaction);
    } catch (e) {
      console.error(e);
    }
  },
};
