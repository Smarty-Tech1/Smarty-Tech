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

user_coins = {}

def add_coins(user_id, amount):
    if user_id in user_coins:
        user_coins[user_id] += amount
    else:
        user_coins[user_id] = amount
    return user_coins[user_id]

def get_coins(user_id):
    return user_coins.get(user_id, 0)
