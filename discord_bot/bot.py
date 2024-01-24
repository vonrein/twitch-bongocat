import os
from os.path import isfile
import sys
import json
import re
from typing import Optional
from dataclasses import dataclass

import discord
from discord import CategoryChannel, ForumChannel, Interaction, Member, Message, TextStyle, app_commands, ui
from discord.utils import MISSING
from dotenv import load_dotenv

from github import Github, Auth
from github.Repository import Repository

intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)
github: Github
repo: Repository
allowed_role:str|None

state_file_path = "./state.json"
state = {}


class SaveSongModal(ui.Modal, title="Save Song"):

    song_title = ui.TextInput(label="Song title")
    file_name = ui.TextInput(label="Song name")
    author = ui.TextInput(label="Song author")
    #notation = ui.Select(options=[SelectOption(label="Modern (bongo+)", value="bongo+"), SelectOption(label="legacy", value="bongo+")])
    notation = ui.TextInput(label="Song notation")
    notes = ui.TextInput(label="Song notes", style=TextStyle.paragraph)
    extras = {}

    def __init__(self, *, title: str = MISSING, timeout: Optional[float] = None, custom_id: str = MISSING, default_song_title: str = "", default_file_name: str = "", default_author: str = "", default_notation="bongo+", default_notes: str = "", **kwargs) -> None:
        self.song_title.default = default_song_title
        self.file_name.default = default_file_name
        self.author.default = default_author
        self.notation.default = default_notation
        #for option in self.notation.options:
        #    if option.value == default_notation:
        #        option.default = True
        self.notes.default = default_notes

        for key, value in kwargs.items():
            self.extras[key] = value
        
        super().__init__(title=title, timeout=timeout, custom_id=custom_id)
    


    async def on_submit(self, interaction: Interaction) -> None:
        global state
        #message = interaction.extras["message"]
        print(self.song_title.value)
        print(self.file_name.value)
        print(self.author.value)
        print(self.notation.value)
        print(self.notes.value)
        print(interaction.extras)
        print(self.extras)
        print(interaction.message)
        file_name = self.file_name.value.strip().replace(".json", "").replace(".", "")
        file_name = re.sub(r"\s+", "_", file_name).replace("/", "").replace("\\", "")
        file_name += ".json"
        notation = self.notation.value
        if notation == "modern" or notation == "default" or notation == "bongo":
            notation = "bongo+"
        if notation == "legacy" or notation == "old":
            notation = "bongol"
        if notation == "experimental" or notation == "experimentell":
            notation = "bongox"
        song = {"notes": self.notes.value.strip(), "author": self.author.value.strip(), "title": self.song_title.value.strip(), "notation": notation.strip()}
        await interaction.response.send_message("Saving Song", ephemeral=True)
        content = json.dumps(song, indent=4).strip()
        content += "\n"

        repo.create_file(f"songs/{file_name}", f"Add Song {song['title']}", content)

        message : Message = self.extras["message"]
        await message.add_reaction("💾")
        await interaction.edit_original_response(content="Saved Song")
        state["msgs"].add(message.id)
        write_state()

@dataclass
class Song():
    title: str
    file_name: str
    author: str
    notation: str
    notes: str


def parse_song(message: discord.Message):

    if not "!bongo" in message.content:
        return None

    note_begin = message.content.find("!bongo")
    title = message.content[:note_begin].strip()
    note_begin = message.content.find(" ", note_begin+1)
    notes = message.content[note_begin:].strip()

    notation = "bongo+"
    if "!bongol" in message.content:
        notation = "bongol"
    elif "!bongo+" in message.content:
        notation = "bongo+"
    else:
        #find actual notation
        notation = "bongol"
        if "#" in notes:
            notation = "bongo+"
        if "^" in notes:
            notation = "bongo+"
        if "v" in notes:
            notation = "bongo+"
        
        pass
    return Song(title, title.replace(" ", "_"), message.author.name, notation, notes)
    


parsing_songs = False

#@tree.command(
#    name="get_old_songs",
#    description="Parses the entire channel for old songs",
#)
async def get_old_songs(interaction : Interaction):
    global parsing_songs
    global state
    channel = interaction.channel
    if channel == None:
        await interaction.response.send_message("No channel found for this command!", ephemeral=True)
        return
    if parsing_songs:
        await interaction.response.send_message("Already parsing songs!", ephemeral=True)
        return
        
    if isinstance(channel, ForumChannel) or isinstance(channel,CategoryChannel):
        await interaction.response.send_message("Wrong Channel!", ephemeral=True)
        return
    
    parsing_songs = True
    try:
        await interaction.response.defer(ephemeral=True, thinking=True)
        after = state["last_time"]
        msgs = channel.history(limit=None,after=after, oldest_first=True)
        last_time = None
        msg_count = 0
        songs = []
        state_msgs = state["msgs"]
        async for msg in msgs:
            if msg.id in state_msgs:
                continue
            state_msgs.append(msg.id)
            msg_count += 1
            song = parse_song(msg)
            if song:
                songs.append(song)
            last_time = msg.created_at
            if msg.edited_at:
                last_time = msg.edited_at

        state["last_time"] = last_time
        await interaction.followup.send(f"Parsed {msg_count} messages found {len(songs)} songs!", ephemeral=True)
    finally:
        parsing_songs = False
        write_state()


@tree.context_menu(
    name="save_song"
)
@app_commands.describe(message="The Message with the song to save")
async def save_song(interaction: Interaction, message: Message):
    global state
    if message.id in state["msgs"]:
        await interaction.response.send_message("Already parsed this song!", ephemeral=True)
        return
    if allowed_role:
        role_id = int(allowed_role)
        if not isinstance(interaction.user, Member):
            await interaction.response.send_message("You do not have permission to save songs!", ephemeral=True)
            return
        allowed = False
        for role in interaction.user.roles:
            if role.id == role_id:
                allowed = True
                break
        if not allowed:
            await interaction.response.send_message("You do not have permission to save songs!", ephemeral=True)
            return

    interaction.extras["message"] = message
    song = parse_song(message)
    if not song:
        await interaction.response.send_message("No song detected!", ephemeral=True)
        return
    interaction.extras["song"] = song
    interaction.extras["modal"] = SaveSongModal(default_song_title=song.title, default_file_name=song.file_name, default_author=song.author, default_notation=song.notation, default_notes=song.notes, message=message)
    await interaction.response.send_modal(interaction.extras["modal"])


@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')
    print("Syncing commands")
    await tree.sync()
    print("Commands synced")

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')


def write_state():
    global state
    global state_file_path
    with open(state_file_path, "w") as state_file:
        state_data = {}
        state_data["last_time"] = state["last_time"]
        state_data["msgs"] = list(state["msgs"])
        json.dump(state_data, state_file)

def read_state():
    global state
    global state_file_path
    if not os.path.isfile(state_file_path):
        state = {"last_time": None, "msgs": []}
        return
    with open(state_file_path, "r") as state_file:
        state_data = json.load(state_file)
        state["last_time"] = state_data["last_time"]
        state["msgs"] = set(state_data)

if __name__ == "__main__":
    load_dotenv()
    read_state()
    token = os.environ.get("DISCORD_BOT_TOKEN")
    if not token:
        print("No discord token provided!")
        sys.exit(1)
    allowed_role = os.environ.get("DISCORD_ALLOWED_ROLE")
    
    app_id = os.environ.get("GITHUB_APP_ID")
    private_key_path = os.environ.get("GITHUB_APP_KEY_FILE")
    installation_id = os.environ.get("GITHUB_APP_INSTALLATION_ID")
    if not app_id:
        print("No github app id provided!")
        sys.exit(1)
    if not private_key_path:
        print("No github key provided!")
        sys.exit(1)
    if not os.path.isfile(private_key_path):
        print("No github key provided!")
        sys.exit(1)
    private_key = ""
    with open(private_key_path) as private_key_file:
        private_key = private_key_file.read()
    if not private_key:
        print("No github key provided!")
        sys.exit(1)
    if not installation_id:
        print("No github installation id provided!")
        sys.exit(1)
    
    installation_id = int(installation_id)
    auth = Auth.AppAuth(app_id, private_key).get_installation_auth(installation_id)
    github = Github(auth=auth)
    repo = github.get_repo("awsdcrafting/bongocat-songs")
    
    client.run(token)
