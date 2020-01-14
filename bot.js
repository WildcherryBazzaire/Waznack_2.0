const Discord = require("discord.js"); //imports discord
const Settings = require('./Settings.json'); //imports settings
const axios = require('axios');
const Canvas = require('canvas');

//For MongoDB Stuff
const { connect } = require('mongoose');
//const WaznackSchema = require("./models/waznack");
const { TOKEN } = require('./config.json');

//Insults for Waznack to say
const Insults = require('./ApiInsult.js');

var client = new Discord.Client({
  disableEveryone: false
}); //creates new instance of bot client

client.login(Settings.keyToken); //logs the bot into discord

//async is a node 7+ thing that waits for a async function to be complete
client.on("ready", async () => { //adds listener when client ready
  console.log(`Bot is Ready! ${client.user.username}`);

  //I Didnt even know they had this in javascript
  try {
    let link = await client.generateInvite("ADMINISTRATOR");
    console.log(`Waznack is ready to be in a  server: ${link}`);
  }
  catch(e) {
    console.log(e.stack);
  }
});

client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.find(ch => ch.name === 'lobby-69');
  
  const canvas = Canvas.createCanvas(512,512);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('./images/Invitation.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(avatar, 156, 125, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'Invitation.png');
  channel.send(attachment);
})

client.on("guildCreate", async guild => {
  
  guild.channels.find(name => name.name == "waznack").sendMessage(`${GenerateRandom(Insults,5)}`);
  return;
});

client.on("message", async message => {
  let messageSplice = message.content.split(" ");

  let prefix = messageSplice[0];

  // wont do anything if the prefix is missing
  if(prefix !== Settings.prefix)
    return;

  // Give a insult if its not
  switch(messageSplice[1].toLowerCase()) {
    
    case "hello":
    case "hi":
    case "wattup":
    case "hallo":
      console.log(temp);
      message.channel.send(`${MentionUser(true,message)} ${await GetFromApi(Insults,0)}`);
      break;
    
    case "goodbye":
      message.channel.send(`${MentionUser(true,message)} ${GenerateRandom(Insults,1)}`);
      break;
    
    case "you":
    case "your":
    case "ur":
    case "u":
      message.channel.send(`${MentionUser(true,message)} ${await GetFromApi(Insults,2)}`);
      break;
    
    case "insult":
    case "roast":
      let userToInsult = messageSplice[2];
      message.channel.send(`${userToInsult} ${await GetFromApi(Insults,6)}`);
      break;

    case "ghostify":
      message.channel.send("A McJeraldy is a Ghost Jeraldy.");
      message.channel.send("https://media.discordapp.net/attachments/450067961605128202/619293914284818432/Screen_Shot_2019-09-05_at_12.13.12_PM.png");
      break;
    
    case "jeraldy2019":
      message.channel.send("https://media.discordapp.net/attachments/623788191299796992/623790115986341899/th.jpg");
      break;

    case "ungayify":
      message.channel.send("https://cdn.discordapp.com/attachments/622310983741997057/626850869836513300/reset.png");
    
    case "gayify":
      let gayWho = messageSplice[2].replace(/\D/g,'');;
      try {
      const canvas = Canvas.createCanvas(512,512);
      const ctx = canvas.getContext('2d');
    
      let user = await getUser(gayWho);

      const background = await Canvas.loadImage('./images/template.png');
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      const avatar = await Canvas.loadImage(user);
      ctx.drawImage(avatar, 156, 10, 200, 200);

      const attachment = new Discord.Attachment(canvas.toBuffer(), 'Gayify.png');
      message.channel.send(`${messageSplice[2]}`,attachment);
      }
      catch {
        message.channel.send("Check the command u fuckin maroni");
      }
      break;

    default:
      let temp = await GetFromApi(Insults,6);
      message.channel.send(`${MentionUser(true,message)} ${temp}`);
      break;
  }
  return;
});

function GenerateRandom(array,subArray) {
  let randomMessage = Math.floor(Math.random() * array[subArray].length);
  return array[subArray][randomMessage];
}

async function GetFromApi(array,subArray) {
  let generatedMessage = GenerateRandom(array,subArray);
  return new Promise(resolve => {
    axios.get(`https://insult.mattbas.org/api/insult.json?template=${generatedMessage}`)
    .then(e => {
      resolve(e.data.insult);
    })
  })
}

async function getUser(snowflake) {
  return new Promise(resolve => {
    client.fetchUser(snowflake).then(e => {
      resolve(e.displayAvatarURL);
    });
  })
}

function returnNumbers(someString) {
  let temp = someString.split("");
  
  temp.filter(e => parseInt(e) !== NaN);
  
  return temp.join('');
}

function MentionUser(mention,message) {
  if(mention) {
    return `<@${message.author.id}>`
  }
  else {
    return;
  }
}

(async => {
  await connect("mongoDB localost something");
  return client.login(TOKEN);
})