const { SlashCommandBuilder } = require("@discordjs/builders");
const ytdl = require("ytdl-core");
const {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel, AudioPlayer,
} = require("@discordjs/voice");
const {guildId}= require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play Music from Youtube!")
	  .addStringOption(option=>option.setName('input').setDescription('Enter a String!').setRequired(true)),
  async execute(interaction) {
    const connection = joinVoiceChannel({
		channelId:interaction.member.voice.channelId,
		guildId:guildId,
		adapterCreator:interaction.guild.voiceAdapterCreator,
	});
	const stream = ytdl('https://www.youtube.com/watch?v=U2waT9TxPU0&ab_channel=AtlanticRecords',{filter:'audioonly'});
	const resource = createAudioResource(stream, {inputType:StreamType.Arbitrary});
	const player = createAudioPlayer();

	player.play(resource);
	connection.subscribe(player);
	player.on(AudioPlayerStatus.Idle,()=>connection.destroy())
  },
};
