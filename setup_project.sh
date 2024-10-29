#!/bin/bash

# Création du dossier principal
mkdir -p Smarty-Tech
cd Smarty-Tech || exit

# Création du fichier package.json
cat <<EOL > package.json
{
  "name": "freefire-bot",
  "version": "1.0.0",
  "description": "Bot diamonds Free Fire.",
  "main": "main.py",
  "author": "Smarty-Tech",
  "license": "MIT",
  "dependencies": {
    "discord.py": "^1.7.3"
  }
}
EOL

# Création du fichier coins.html
cat <<EOL > coins.html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menu des Coins</title>
  <link rel="stylesheet" href="coins.css">
  <script src="coins.js"></script>
</head>
<body>
  <h1>Menu des Coins</h1>
  <p>Réclamez vos coins et suivez vos récompenses</p>
  <div id="coins-container">
    <!-- Les coins seront générés ici -->
  </div>
</body>
</html>
EOL

# Création du fichier coins.css
cat <<EOL > coins.css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  color: #333;
  text-align: center;
  margin: 0;
  padding: 0;
}

h1 {
  color: #4a90e2;
  margin-top: 20px;
}

#coins-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.coin-card {
  background-color: #fff;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  padding: 20px;
  font-weight: bold;
  color: #4a90e2;
  text-align: center;
  cursor: pointer;
}
EOL

# Création du fichier coins.js
cat <<EOL > coins.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("coins-container");
  // Exemple : Générer des coins
  for (let i = 1; i <= 10; i++) {
    const coin = document.createElement("div");
    coin.classList.add("coin-card");
    coin.textContent = \`Coin \${i}\`;
    container.appendChild(coin);
  }
});
EOL

# Création du fichier main.py
cat <<EOL > main.py
import discord
from discord.ext import commands

bot = commands.Bot(command_prefix="!")

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}!')

@bot.command()
async def coin(ctx):
    await ctx.send("Voici un coin pour vous!")

bot.run("YOUR_DISCORD_TOKEN")
EOL

# Création d'un fichier .gitignore
cat <<EOL > .gitignore
# Ignore les fichiers contenant des informations sensibles
config.json
# Ignore les fichiers Python temporaires
__pycache__/
*.py[cod]
# Ignore les dossiers d'environnement virtuel
venv/
EOL

# Initialisation d'un dépôt Git local
git init
git add .
git commit -m "Initialisation du projet Smarty-Tech avec les fichiers de base"

# Configuration du dépôt distant GitHub (remplacez par l'URL de votre dépôt GitHub)
echo "Veuillez entrer l'URL de votre dépôt GitHub (ex: https://github.com/Smarty-Tech1/Smarty-Tech.git): "
read repo_url
git remote add origin "$repo_url"

# Pousser les modifications vers GitHub
git branch -M main
git push -u origin main

echo "Votre projet Smarty-Tech est configuré avec succès et poussé sur GitHub !"
chmod +x setup_project.sh
bash setup_project.sh
https://github.com/Smarty-Tech1/Smarty-Tech.git
