const fs = require("fs");
const path = require("path");
const { Client, Collection, Intents } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES],
});

client.commands = new Collection();



const commandFolders = fs.readdirSync("./commands/");
console.log(commandFolders)
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}/`)
    .filter((file) => file.endsWith(".js"));
console.log(commandFiles)
  for (let i = 0; i < commandFiles.length; i++) {
    try {
      const command = require(`./commands/${folder}/${commandFiles[i]}`);
      client.commands.set(command.data.name, command);
    } catch (e) {
      console.error(e);
    }

    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
  }
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN).catch(console.error);
