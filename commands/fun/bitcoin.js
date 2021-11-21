const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("bitcoin").setDescription("BITCOIN"),
  async execute(interaction) {
    await interaction.reply(
      "\t\t────██──██─────\n" +
        "\t\t███████████▄───\n" +
        "\t\t──███████████▄─\n" +
        "\t\t──███────▀████─\n" +
        "\t\t──███──────███─\n" +
        "\t\t──███────▄███▀─\n" +
        "\t\t──█████████▀───\n" +
        "\t\t──███████████▄─\n" +
        "\t\t──███─────▀████\n" +
        "\t\t──███───────███\n" +
        "\t\t──███─────▄████\n" +
        "\t\t──████████████─\n" +
        "\t\t████████████▀──\n" +
        "\t\t────██──██─────"
    );
  },
};
