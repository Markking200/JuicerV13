const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId } = require("./config.json");

const dotenv = require("dotenv");
dotenv.config();

const commands = [];

const commandFolders = fs.readdirSync("./commands");

for (let folder of commandFolders) {
  let commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (let i = 0; i < commandFiles.length; i++) {
    try {
      const command = require(`./commands/${folder}/${commandFiles[i]}`);
      commands.push(command.data.toJSON());
    } catch (e) {
      console.log(e);
    }
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
  }
}

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
