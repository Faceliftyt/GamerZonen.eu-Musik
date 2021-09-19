// DisTube example bot, definitions, properties and events details in the Documentation page.
const Discord = require('discord.js'),
    DisTube = require('distube'),
    client = new Discord.Client(),
    config = {
        prefix: ".",
        token: process.env.TOKEN || "ODQ0Njk2Mzg5NzgyNDcwNjU2.YKWK0Q.v8LuNMcpPTZm5TZV0-rxazEbYlQ"
    };

// Create a new DisTube
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

console.log('Prozess startet Bot!...');
client.on('ready', () => {
    console.log(`Einloggen mit ${client.user.tag}!`);
    console.log('Bot is now ready for use!');
    console.log('Bot' + ' befindet sich auf ' + client.guilds.cache.size + ' Servern!')
    console.log('Prozess zum Starten des Bots abgeschlossen! ...')
    
    


})

client.on("message", async (message) => {
    if (message.author.cleint) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Aktuelle Warteschlange:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Aktueller Warteschlangenfilter: " + (filter || "Off"));
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Spielt \`${song.name}\` - \`${song.formattedDuration}\`\nAngefordert von: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Hinzugefügt ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Spielt \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nngefordert von: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Hinzugefügt \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Wähle  eine Option von unten**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });






client.on("message" , function(message){
if(message.content === "g.invite"){

    let embed = new Discord.MessageEmbed()
    .setTitle('Bot Invite')
        .setDescription("Kein Invite vorhanden")
                
        message.channel.send(embed);
}
})

client.on("message" , function(message){
    if(message.content === "g.support"){
    
        let embed = new Discord.MessageEmbed()
        .setTitle('Support Server')
            .setURL('https://discord.gg/ythebupurC')
                    
            message.channel.send(embed);
    }
    })
  


    
           
//join message 
client.on('guildCreate', (guild) => {
    let channeltoSend
    guild.channels.cache.forEach((channel) => {
       if (
           channel.type === "text" &&
        !channeltoSend &&
        channel.permissionsFor(guild.me).has("SEND_MESSAGES")

       )channeltoSend = channel;
       
    

});
   if(!channeltoSend) return;

let channelEmbed = new Discord.MessageEmbed()
.setColor("#009eff")
.setAuthor(`Danke, dass du mich hinzugefügt hast ${guild.name}!`)
.setDescription("Prefix von mir ist `.`")
.addField("Wenn Sie mir helfen oder Probleme mit mir haben, verwenden Sie den Befehl","g.support")
.addField("Wenn Sie die Befehle sehen möchten, verwenden Sie","g.cmds")

channeltoSend.send(channelEmbed).catch(e => {
 if (e) {
     return;
 }

})




})


//commands
client.on("message" , function(message){
    if(message.content === ".cmds"){
    
        let embed = new Discord.MessageEmbed()

            .setTitle(`Musikbot Commands`)
            .setColor(`RANDOM`)
            .addField(".play","spielt dir ein Lied ab was du gerne hören möchtest")
            .addField(".skip","überspringe das lied was du nicht hören möchtest")
            .addField(".stop","stoppt die Musik ")
            .addField(".remsume","bot spielt weiter die musik ab")
            .addField(".leave","der bot leavt denn Channel")
            .addField(".loop","wiederhole das lied was du gerne in Dauerschleife hören möchtest")
            .addField(".queue","zeige dir die aktuelle Warteschlange an")
            .addField(".playsong","spielt dir einen Song ab denn du gerne hören möchtest")
            .addField(".addsong","füge einen Song denn du gerne hören möchtest")
            .addField(".addlist","füge eine playlist hinzu")
            .addField(".searchcancel","breche die Suche ab")
            .addField(".filter","zeigt dir die Musikfilter an")
            .addField(".settings","zeigt dir die Bot developer command an")


         message.channel.send(embed)

    }
})    


//bot developer command

client.on("message" , function(message){
    if(message.content === ".settings"){
        if (message.author.id !== '640256514267021314') {
            return message.reply(`Sie sind nicht berechtigt, die Serverliste anzusehen!`).then(msg=>msg.delete({timeout:"5000"}))
        }

        let embed = new Discord.MessageEmbed()

        .setTitle("Bot-Entwicklerbefehle")
        .setDescription(`Bot-Dev befehle`)
        .addField("g.bye","Befehl zum Herunterfahren des Bots")
        .setTimestamp()
        .setFooter("GamerZonen.eu")

        message.channel.send(embed)
    }
}) 
//musik filter
client.on("message" , function(message){
    if(message.content === ".filter"){
    
        let embed = new Discord.MessageEmbed()
            .setTitle(`Musikbot Commands`)
            .setColor(`RANDOM`)
            .addField(".3d")
            .addField(".bassboost")
            .addField(".echo")
            .addField(".karaoke")
            .addField(".nightcore")
            .addField(".vaporwave")
            

         message.channel.send(embed)

 
        }
    })     

    

       

//bot kick 

client.on("message" , function(message){
    if(message.content === ".kick"){
        if (message.author.id !== '640256514267021314') {
            return message.reply(`You do not have the authority to view the server list!`).then(msg=>msg.delete({timeout:"5000"}))
        }
            var guildid = message.content.split(" ")
            if(!(guildid)) return message.channel.send("You forgot to enter a server ID!").then(msg=>msg.delete({timeout:"5000"}))
              
       client.guilds.cache.get(guildid[1]).leave()
       .then(()=> message.channel.send("Bot has been removed from the server"))
       console.log("Bot has been removed from the server!")
       
           }
       }
    )
    client.login(config.token);
