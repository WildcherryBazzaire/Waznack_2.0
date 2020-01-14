let messageSplice = message.content.split(" ");
  let command = messageSplice[0];

  //Checks whether message was sent 
  if(message.author.bot)
    return message.channel.setMessage("Stop fuking Dm'ing me u fake HOE!");

  if(message.channel.type === "dm") 
    return;

  //Checks if it calls bot with prefix
  if(!message.content.startsWith(Settings.prefix))
    return;

  if(command === `${Settings.prefix}`) {
    console.log(messageSplice);
    console.log("Sup!");
  }

  if(command === `${Settings.prefix}giveUserInfo`) {
    // let embed = new Discord.RichEmbed()
    //   .setAuthor(message.author.username)
    //   .setDescription("Your on my fuckin hitlist bruv")
    //   .setColor('#FFFFFF')
    //   .addField("Full Username", `${message.author.username}`)
    //   .addField("ID", `${message.author.id}`)
    //   .addField("Created at", `${message.author.createdAt}`);
    // message.channel.sendEmbed(embed);
    message.channel.sendMessage(`<@${message.author.id}> your on my fucking hitlist`);

    return;
  }