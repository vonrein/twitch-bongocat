Fork from https://github.com/JvPeek/twitch-bongocat

New songs can be posted here: https://discord.com/channels/735635311442526268/755562774343581756

# OG Readme

## Add the bongo cat to your stream
A nice little bongo cat themed drum machine.  
Be warned: This is a work in progress.
### What does it do?
Bongo Cat for Twitch lets the popular meme cat appear on your screen whenever someone in your Twitch chat issues a command.
### How do i add it to my stream? (easy route, START HERE)
 * Add a new browser source and point it to https://jvpeek.de/ext/bc/#yourchannel
 * Set the size of the browser to 1920x1080 pixels.
Done.

### How do i install it locally? (advanced users)
If you want to modify the sounds or the behavior you can also run it locally.

#### With Docker (Docker Desktop works too)
 * Start Http-Daemon with `docker compose up -d`. The Webserver will listen on Port 8080.
 * Point your OBS browser source to the index.html file and add your channel name as a hash. Example:`http://localhost:8080/#jvpeek`
 

 * Set the size of the browser to 1920x1080 pixels.

#### With Webserver (Whitout Docker)
 * Install a Webserver (Xampp, lamp, MAMP, Apache2, Nginx...)
 * Configure Webroot to ./src
 * Point your OBS browser source to the index.html file and add your channel name as a hash. Example:`http://localhost/#jvpeek`


 * Set the size of the browser to 1920x1080 pixels.

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
