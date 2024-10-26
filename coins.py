import os
import discord
import random
from discord.ext import commands

intents = discord.Intents.default()
client = commands.Bot(command_prefix='!', intents=intents)

TOKEN = os.getenv('DISCORD_TOKEN')

@client.command()
async def coins(ctx):
    await ctx.send("Bienvenue dans le menu des coins ! Accédez à vos réclamations ici : [Menu Coins](coins.html)")

client.run(TOKEN)
