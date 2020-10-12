require("dotenv").config();

const { Client, WebhookClient } = require("discord.js");
const client = new Client({
    partials: ['Message','REACTION']
});

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
);

const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", async (message) => {
  //Ignore messages from bot
  if (message.author.bot) return;

  //message author and content
  console.log(`[${message.author.tag}]: ${message.content}`);

  //Reply from bot
  if (message.content === "Hello") {
    message.channel.send("Hello");
  }

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      //Check for the username
      if (args.length === 0)
        return message.reply("Please provide the username.");

      //Check for if user has permission to kick members
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You don't have the permission to kick members");

      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) =>
            message.channel.send("I don't have permission to kick that user :(")
          );
      } else {
        message.reply("User was not found");
      }
    } else if (CMD_NAME === "ban") {
      //Check for the username
      if (args.length === 0)
        return message.reply("Please provide the username.");

      //Check for if user has permission to kick members
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You don't have the permission to kick members");

      try {
        const user = await message.guild.members.ban(args[0]);
        console.log(user);
        message.channel.send("User was banned successfully");
      } catch (err) {
        console.log(err);
        message.channel.send("An error occured. Either you do not have permission or Member was not found");
      }
    } else if(CMD_NAME === 'announcement'){
        const msg = args.join(' ');
        webhookClient.send(msg);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
