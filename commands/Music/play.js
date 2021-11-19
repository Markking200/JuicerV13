const { SlashCommandBuilder } = require("@discordjs/builders");
const ytdl = require("ytdl-core");
const {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
	AudioPlayer,
} = require("@discordjs/voice");
const {guildId}= require('../../config.json');
const validUrl = require('valid-url');
const yts = require('yt-search')

module.exports = {

  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays song after entering the songname!")
    .addStringOption(option=>option.setName('input').setDescription('Enter a String!').setRequired(true)),

  async execute(interaction) {

	const {musicQueue} = interaction.client;
	console.log('The newly gettered Queue!'+musicQueue[0]?.songs);
	const songData =interaction.options.getString('input');

	if(musicQueue[0]?.songs.length){
		const song=await getSong(songData);
		musicQueue[0].songs.push(song);
		interaction.reply('Added song'+song);
		console.log(musicQueue[0].songs)
		return;
	}

	if(!interaction.member.voice)return;
	const voiceChannel= interaction.member.voice.channelId;

    const connection = joinVoiceChannel({
		channelId:voiceChannel,
		guildId:guildId,
		adapterCreator:interaction.guild.voiceAdapterCreator,
	});

	if(!musicQueue.length){
		const queueConstruct= {
			songs:[],
			connection:connection,
			player:null,
			playing:true,
			loop:false,
		}

		musicQueue.push(queueConstruct);
	}

	const song=await getSong(songData);
	musicQueue[0].songs.push(song);
	console.log(musicQueue[0].songs);


	const player = createAudioPlayer();
	musicQueue[0].player=player;
	await play(player,musicQueue,interaction);
	connection.subscribe(player);

	player.on('error', error => {
		  console.error(`Error: ${error.message} with resource ${error.resource.metadata}`)
	});

	player.on(AudioPlayerStatus.Idle,()=> {
		console.log(musicQueue[0].songs)
		if(musicQueue[0].songs.length===1){
			connection.destroy();
			player.stop();
			musicQueue[0].length=0;
			console.log(musicQueue);
		}else{
			console.log('I was here');
			musicQueue[0].songs.shift();
			play(player,musicQueue,interaction);
		}
	});

	connection.on('disconnected',()=>{
		console.log('disconnected')
		player.stop();
		musicQueue[0].length=0;
		console.log(musicQueue+"DISCONNECTED");
	});

	connection.on('stateChange',(oldState,newState)=>{
		console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`)
	});

	player.on('stateChange', ((oldState, newState) => {
		console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`)
	}));
  },
};

async function play(player,musicQueue,interaction){
	const stream = ytdl(musicQueue[0].songs[0].url,{filter:'audioonly'});
	const resource = createAudioResource(stream, {inputType:StreamType.Arbitrary});
	await player.play(resource);
	interaction.channel.send(`Started playing ${musicQueue[0].songs[0].title}`);
}

async function getSong(songData){
	if(validUrl.isUri(songData)) {
		const ID= songData.split('=');
		const song= await yts(ID[1]);
		return output={
			title:song.all[0].title,
			url:song.all[0].url,
			description:song.all[0].description,
			views:song.all[0].views
		};
	}
	const song= await yts(songData);
	console.log(song.all[0]);
	return output={
		title:song.all[0].title,
		url:song.all[0].url,
		description:song.all[0].description,
		views:song.all[0].views
	};

}