require("dotenv").config();
require("axios");
const { Client, IntentsBitField } = require("discord.js");
const { stringify } = require("nodemon/lib/utils");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log("I am online and full of errors, sincerly", `${c.user.username}`);
});

client.on('guildCreate', async (guild) => {
  guild.commands.set(commands).then(() =>
    console.log(`Commands deployed in guild ${guild.name}!`));
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content == "hello") {
    await message.reply(":wave:");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    return await interaction.reply("hey!");
  }

  if (interaction.commandName === "ping") {
    return await interaction.reply("pong!");
  }

  if (interaction.commandName === "help") {
    const CommandList = await getCommands(commands)
    await interaction.reply(CommandList);

    async function getCommands(commands) {
      StringCommands = "/";
      for (let track = 0; track < commands.length; track++) {
        StringCommands += commands[track].name + (track < commands.length - 1 ? " /" : "");
      }
      return StringCommands;
    }
  }

  if (interaction.commandName === "weather") {
    const axios = require("axios");

    async function fetchWeather() {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=59.92&longitude=5.45&hourly=temperature_2m,precipitation_probability,precipitation&current_weather=true&forecast_days=1&timezone=auto"
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
      }
    }

    async function returnWeather() {
      const weatherData = await fetchWeather();
      if (weatherData) {
        const temperature = Math.round(weatherData.current_weather.temperature) + 4.5;
        const windspeed = weatherData.current_weather.windspeed;
        const responseText = `${temperature} °C, ${windspeed} km/h`;
        await interaction.reply(responseText);
      } else {
        // Handle the case where the API request fails
        await interaction.reply("Failed to fetch weather data.");
      }
    }

    returnWeather();
  }

  if (interaction.commandName === "coinflip") {
    function getCoin() {
      return Math.floor(Math.random() * 2) + 1;
    }

    var coin = getCoin();

    if (coin == 1) {
      return await interaction.reply("Head Wins!");
    }
    if (coin == 2) {
      return await interaction.reply("Tails Wins!");
    }
  }
  if (interaction.commandName === "randomnumber") {
    const min = options.getInteger('min');
    const max = options.getInteger('max');
    function getRandomNumber() {
      var randomNumber = Math.floor(Math.random() * max) + 1;
      return randomNumber.toString();
    }
    var randomNumberString = getRandomNumber();
    return await interaction.reply(randomNumberString);
  }
});

client.login(process.env.token);

const commands = [
  {
    name: "hey",
    description: "Replies with hey!",
  },
  {
    name: "ping",
    description: "Pong!",
  },
  {
    name: "weather",
    description: "Current temp and wind for stord",
  },
  {
    name: "coinflip",
    description: "flips a coin",
  },
  {
    name: "randomnumber",
    description: "Generate a random number within a specified range",
    options: [
      {
        name: "min",
        description: "Minimum value",
        type: 4, // Type 4 corresponds to integer input
        required: true,
      },
      {
        name: "max",
        description: "Maximum value",
        type: 4, // Type 4 corresponds to integer input
        required: true,
      },
    ],
  },
];i

/* 
SUB_COMMAND (type: 1):

Represents a sub-command within a command. Sub-commands are like sub-categories of a main command.
SUB_COMMAND_GROUP (type: 2):

Represents a group of sub-commands. Sub-command groups are used to organize related sub-commands.
STRING (type: 3):

Represents a string input. Used for commands that expect text input.
INTEGER (type: 4):

Represents an integer input. Used for commands that expect numeric input.
BOOLEAN (type: 5):

Represents a boolean (true/false) input. Used for commands that expect binary choices.
USER (type: 6):

Represents a Discord user. Used for commands that require a mention or user ID as input.
CHANNEL (type: 7):

Represents a Discord channel. Used for commands that require a mention or channel ID as input.
ROLE (type: 8):

Represents a Discord role. Used for commands that require a mention or role ID as input.
MENTIONABLE (type: 9):

Represents a mentionable item (user, role, or channel). Used for commands that can accept any mentionable input.
*/