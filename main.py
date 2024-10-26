import os
import discord
import random
from discord.ext import commands

intents = discord.Intents.default()
client = commands.Bot(command_prefix='!', intents=intents)

TOKEN = os.getenv('DISCORD_TOKEN')

strategies = [
    "Pour rester en vie plus longtemps, évitez les zones à forte densité de joueurs.",
    "Utilisez des véhicules pour échapper aux zones dangereuses, mais attention au bruit !",
    "Restez en bordure de la zone sécurisée pour surprendre les ennemis.",
    "Coordonnez bien les attaques avec vos coéquipiers."
]

equipements = [
    "Pour les combats à courte portée, utilisez le fusil à pompe M1887.",
    "Combinez le MP40 avec une arme de longue portée.",
    "Les grenades fumigènes sont parfaites pour créer une diversion.",
    "L'armure niveau 3 offre la meilleure protection."
]

# Commande pour afficher le menu
@client.command()
async def menu(ctx):
    menu_message = (
        "**Menu des commandes FreeFire Bot** :\n"
        "1. `!menu` : Affiche ce menu d'aide.\n"
        "2. `!strat` : Donne un conseil stratégique.\n"
        "3. `!equipement` : Donne un conseil sur l’équipement."
    )
    await ctx.send(menu_message)

@client.command()
async def strat(ctx):
    response = random.choice(strategies)
    await ctx.send(response)

# Commande pour obtenir un conseil d'équipement
@client.command()
async def equipement(ctx):
    response = random.choice(equipements)
    await ctx.send(response)

# Lancer le bot
client.run(TOKEN)
