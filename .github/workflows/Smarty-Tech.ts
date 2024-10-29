import { Client, Intents, Message } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', () => {
    console.log('Smarty est en ligne!')
})

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return

    const content = message.content.toLowerCase()

    if (content === '!ping') {
        message.reply('Pong !')
    }

    else if (content === '!help') {
        message.reply('Voici les commandes disponibles :\n!ping - Test de réponse\n!info - Infos du serveur\n!user - Infos sur l\'utilisateur')
    }

    else if (content === '!info') {
        message.reply(`Serveur : ${message.guild?.name}\nMembres : ${message.guild?.memberCount}`)
    }

    else if (content === '!user') {
        message.reply(`Ton nom : ${message.author.username}\nTon ID : ${message.author.id}`)
    }
})

client.login('TON_JETON_Ici')
