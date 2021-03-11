## Add the bongo cat to your stream
A nice little bongo cat themed drum machine.  
Be warned: This is a work in progress. It does work great but the setup process is still a bit hard for unexperienced users and there is no input sanitation whatsoever. We are just getting started.
### What does it do?
Bongo Cat for Twitch lets the popular meme cat appear on your screen whenever someone in your Twitch chat issues a command.
### How do i install it?
Easy.
1. Add your Twitch Username and OAuth Token to `index.html` on the very bottom. You can get a Token here: https://twitchapps.com/tmi
2. Point your OBS browser source to the index.html file. Set the size of the browser to 1920x1080 pixels.

**Warning**: NEVER show your OAuth token on stream or give it to anyone. Don't trust anyone.
### How do i use it?
There are two commands:  
 * `!bpm`
Lets you choose the speed of the song.
 * `!bongo [notes]`
Plays back the sounds in chunks.
Notes are divided into chunks by spaces. `12 34` would result in two chunks.
The first one containing notes `1` and `2`, the second one containing `3` and `4`. 
### What instruments are available?
As of now, there are the same instruments as on https://bongo.cat.
### Can i modify this?
Yes. And please show us the results.
### Who did this?
The code was written by [CodeHustle](https://twitch.tv/codehustle) and [JvPeek](https://twitch.tv/jvpeek)  
The initial compilation of sounds and images was done by [Externalizable](https://github.com/Externalizable)  
Bongo cat was drawn by [StrayRogue](https://twitter.com/StrayRogue)
