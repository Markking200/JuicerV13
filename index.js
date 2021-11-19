const fs = require("fs");
const path = require("path");
const { Client, Collection, Intents } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

client.commands = new Collection();
client.musicQueue= [];

const commandFolders = fs.readdirSync("./commands/");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}/`)
    .filter((file) => file.endsWith(".js"));

  for (let i = 0; i < commandFiles.length; i++) {
    try {
      // Set a new item in the Collection
      // With the key as the command name and the value as the exported module
      const command = require(`./commands/${folder}/${commandFiles[i]}`);
      client.commands.set(command.data.name, command);
    } catch (e) {
      console.error(e);
    }
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
