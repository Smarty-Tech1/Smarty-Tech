import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.messages = True

bot = commands.Bot(command_prefix=".", intents=intents)

@bot.event
async def on_ready():
    print("Smarty est en ligne en mode .menu!")

@bot.command(name="menu")
async def menu(ctx, sub_command: str = None):
    if sub_command == "help":
        await send_help(ctx)
    elif sub_command == "diamonds":
        await send_diamonds_menu(ctx)
    else:
        await ctx.send("Commande inconnue. Tapez `.menu help` pour voir la liste des commandes.")

async def send_help(ctx):
    embed = discord.Embed(
        title="Aide de Smarty",
        description="Commandes de Smarty en mode .menu :\n- .menu help : Affiche les commandes disponibles\n- .menu diamonds : Recevez des diamants",
        color=0x00ff00
    )
    await ctx.send(embed=embed)

async def send_diamonds_menu(ctx):
    embed = discord.Embed(
        title="Welcome to diamonds Hack Free Fire!",
        description="Click this button 👇",
        color=0x0000ff
    )

    button = discord.ui.Button(label="Receive diamonds", style=discord.ButtonStyle.primary, custom_id="receive_diamonds")

    view = discord.ui.View()
    view.add_item(button)

    await ctx.send(embed=embed, view=view)

@bot.event
async def on_interaction(interaction):
    if interaction.type == discord.InteractionType.component and interaction.data["custom_id"] == "receive_diamonds":
        await interaction.response.send_message("Suivre les étapes suivant >!")

bot.run("TON_JETON_Ici")
