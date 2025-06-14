const { EmbedBuilder } = require("discord.js");
const GuildSettings = require("./../../../schemas/GuildSchema.js");

module.exports = {
  config: {
    name: "prefix",
    description: "Set the prefix for the guild.",
    usage: "prefix [new prefix]"
  },
  permissions: ['Administrator'],
  owner: false,
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Missing argument")
            .setDescription("Please provide a new prefix!")
        ]
      });
    }

    if (args[0].length > 5) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Too long!")
            .setDescription("Prefix can't be longer than 5 characters!")
        ]
      });
    }

    // Update in MongoDB
    const updated = await GuildSettings.findOneAndUpdate(
      { guildId: message.guild.id }, // Corrected field name
      { prefix: args[0] },
      { upsert: true, new: true }
    );

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Success!")
          .setDescription(`New prefix for this server: \`${args[0]}\`.`)
          .setColor("Green")
      ]
    });
  }
};
