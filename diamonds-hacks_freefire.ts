import { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', () => {
    console.log('Smarty est en ligne en mode .menu!')
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    const content = message.content.toLowerCase()

    if (content.startsWith('.menu')) {
        const args = content.slice('.menu'.length).trim().split(/ +/)
        const command = args.shift()

        switch (command) {
            case 'help':
                await sendHelp(message)
                break
            case 'diamonds':
                await sendDiamondsMenu(message)
                break
            default:
                message.reply('Commande inconnue. Tapez `.menu help` pour voir la liste des commandes.')
        }
    }
})

async function sendHelp(message: any) {
    const embed = new MessageEmbed()
        .setTitle("Aide de Smarty")
        .setDescription(`
Commandes de Smarty en mode .menu :
- .menu help : Affiche les commandes disponibles
- .menu diamonds : Recevez des diamants
        `)
        .setColor("#00ff00")
    await message.channel.send({ embeds: [embed] })
}

async function sendDiamondsMenu(message: any) {
    const embed = new MessageEmbed()
        .setTitle("Welcome to diamonds Hack Free Fire!")
        .setDescription("Click this button 👇")
        .setColor("#0000ff")

    const button = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('receive_diamonds')
                .setLabel('Receive diamonds')
                .setStyle('PRIMARY')
        )

    await message.channel.send({ embeds: [embed], components: [button] })
}

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isButton()) return

    if (interaction.customId === 'receive_diamonds') {
        await interaction.reply("Suivre les étapes suivant >!")
    }
})

client.login('TON_JETON_Ici')
