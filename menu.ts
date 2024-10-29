import { Client, Intents, Message, MessageEmbed } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', () => {
    console.log('Smarty est en ligne en mode .menu!')
})

const helpMessage = `
**Commandes de Smarty en mode .menu :**
- **.menu help** : Affiche les commandes disponibles
- **.menu info** : Montre les informations sur le serveur
- **.menu user** : Affiche les informations de l'utilisateur
- **.menu settings** : Affiche les options de configuration
- **.menu quit** : Quitte le menu
`

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return
    const content = message.content.toLowerCase()

    if (content.startsWith('.menu')) {
        const args = content.slice('.menu'.length).trim().split(/ +/)
        const command = args.shift()

        switch (command) {
            case 'help':
                await sendHelp(message)
                break
            case 'info':
                await sendInfo(message)
                break
            case 'user':
                await sendUserInfo(message)
                break
            case 'settings':
                await sendSettingsMenu(message)
                break
            case 'quit':
                await quitMenu(message)
                break
            default:
                message.reply('Commande inconnue. Tapez `.menu help` pour voir la liste des commandes.')
        }
    }
})

async function sendHelp(message: Message) {
    const embed = new MessageEmbed()
        .setTitle("Aide de Smarty")
        .setDescription(helpMessage)
        .setColor("#00ff00")
    await message.channel.send({ embeds: [embed] })
}

async function sendInfo(message: Message) {
    const guild = message.guild
    if (!guild) return

    const embed = new MessageEmbed()
        .setTitle(`Informations sur le serveur ${guild.name}`)
        .addField('Nom du serveur', guild.name)
        .addField('Nombre de membres', guild.memberCount.toString())
        .setColor("#0099ff")

    await message.channel.send({ embeds: [embed] })
}

async function sendUserInfo(message: Message) {
    const user = message.author

    const embed = new MessageEmbed()
        .setTitle("Informations sur l'utilisateur")
        .addField('Nom', user.username)
        .addField('ID', user.id)
        .setThumbnail(user.displayAvatarURL())
        .setColor("#ff9900")

    await message.channel.send({ embeds: [embed] })
}

async function sendSettingsMenu(message: Message) {
    const embed = new MessageEmbed()
        .setTitle("Menu des paramètres")
        .setDescription(`
Choisissez une option :
- **.menu settings notifications** : Activer/Désactiver les notifications
- **.menu settings privacy** : Paramètres de confidentialité
- **.menu settings theme** : Modifier le thème
        `)
        .setColor("#ff6600")

    await message.channel.send({ embeds: [embed] })
}

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return

    const content = message.content.toLowerCase()

    if (content.startsWith('.menu settings')) {
        const args = content.slice('.menu settings'.length).trim().split(/ +/)
        const setting = args.shift()

        switch (setting) {
            case 'notifications':
                await toggleNotifications(message)
                break
            case 'privacy':
                await showPrivacySettings(message)
                break
            case 'theme':
                await changeTheme(message)
                break
            default:
                message.reply('Paramètre inconnu. Tapez `.menu settings` pour voir les options disponibles.')
        }
    }
})

async function toggleNotifications(message: Message) {
    message.reply('Notifications activées/désactivées !')
}

async function showPrivacySettings(message: Message) {
    const embed = new MessageEmbed()
        .setTitle("Paramètres de confidentialité")
        .setDescription("Options de confidentialité disponibles.")
        .setColor("#6666ff")

    await message.channel.send({ embeds: [embed] })
}

async function changeTheme(message: Message) {
    const embed = new MessageEmbed()
        .setTitle("Changer le thème")
        .setDescription("Veuillez sélectionner un thème.")
        .setColor("#ff6666")

    await message.channel.send({ embeds: [embed] })
}

async function quitMenu(message: Message) {
    await message.reply("Fermeture du menu.")
    console.log("Le menu a été quitté.")
}

client.login('TON_JETON_Ici')
