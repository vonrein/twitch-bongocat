import {parseSong as parseSongBongo} from "./modules/bongo.js";
import {extensionFeatures, experimentalFeatures} from "./experimental/bongox.js";
import exampleSongs from "./exampleSongs.js"



// ====================================================== //
// ==================== global state ==================== //
// ====================================================== //
let audioContext;
const audioBuffers = new Map();
let soundsLoaded = false;
const maxBpm = 800;
const minBpm = 50;

var bpm   = {};
bpm.user  = {};
var parts = {};
var queue = [];
var playing = false;
setBPM(128);
var stackMode = false;
var maxSongLength = 90_000; //90 secs
var defaultNotation = "bongo";
var disableExperiments = false;
var disableExtensions = false;

var currentSong = null;
var volume = 1.0;

window.maxNotesPerBatch = 5;


var mainGainNode;
var oscillatorNode;
var synthStarted = false;
var synthDampening = 0.1;

// Playback control state
let isPaused = false;
let allPlaybacks = [];
let currentNoteIndex = 0;
let noteDisplay;
let navButtonsVisible = false;
let notesContainer;
let userMessageDisplay;
let activeUserMessages = new Map();

// ====================================================== //
// ================== notation handlers ================= //
// ====================================================== //
var notations = {};

notations["bongol"] = parseSongBongo;
notations["legacy"] = parseSongBongo;
notations["bongo"]  = parseSongBongo;
notations["bongo+"] = parseSongBongo;


// ====================================================== //
// =================== helper methods =================== //
// ====================================================== //

/**
 * Loads all audio files referenced by <audio> tags into memory as AudioBuffers.
 * @returns {Promise<void>} A promise that resolves when all sounds are loaded.
 */
async function loadAllSounds() {
    if (!audioContext) {
        throw new Error("AudioContext is not initialized.");
    }

    // Find all the audio elements in the document
    const audioElements = document.querySelectorAll('audio[data-key]');
    const loadPromises = [];

    console.log(`Loading ${audioElements.length} sounds...`);

    for (const el of audioElements) {
        const key = el.dataset.key;
        const src = el.src;
        const paw = el.dataset.paw;
        const instrument = el.dataset.instrument;

        // Fetch the audio file
        const promise = fetch(src)
            .then(response => response.arrayBuffer()) // Get the raw data
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) // Decode it
            .then(decodedBuffer => {
                // Store the buffer and metadata in our map
                audioBuffers.set(key, { 
                    buffer: decodedBuffer, 
                    paw: paw, 
                    instrument: instrument 
                });
            })
            .catch(err => console.error(`Failed to load sound for key ${key}:`, err));
        
        loadPromises.push(promise);
    }

    // Wait for all the individual load promises to finish
    await Promise.all(loadPromises);
    soundsLoaded = true;
    console.log("All sounds loaded successfully!");
}

/**
 * Sets the global volume for all sounds. The value is clamped between 0.0 and 1.0.
 * @param {number | string} volumeParam - The desired volume level (0.0 to 1.0).
 */
function setVolume(volumeParam)
{
  volume = Math.min(1.0, Math.max(0, Number(volumeParam)));
  if (mainGainNode)
  {
    mainGainNode.gain.value = volume * synthDampening;
  }
}

/**
 * Sets the maximum allowed song length from a parameter given in seconds.
 * @param {number | string} maxSongLengthParam - The maximum length in seconds. A value of 0 or less disables the limit.
 */
function setMaxSongLength(maxSongLengthParam)
{
  maxSongLength = Number(maxSongLengthParam);
  if (maxSongLength > 0)
  {
    maxSongLength *= 1000;
  } else
  {
    maxSongLength = -1;
  }
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param {number} value - The number to clamp.
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {number} The clamped value.
 */
function clamp(value, min, max)
{
  if (value > max)
  {
    return max;
  }
  if (value < min)
  {
    return min;
  }
  return value;
}

/**
 * Clamps a BPM value within the globally defined minBpm and maxBpm.
 * @param {number} bpm - The BPM value to clamp.
 * @returns {number} The clamped BPM.
 */
function clampBpm(bpm) {
  return clamp(bpm, minBpm, maxBpm)
}

/**
 * Sets the BPM, converting it to a millisecond interval. Can be set globally or for a specific user.
 * @param {number | string} targetBPM - The target Beats Per Minute.
 * @param {string} [username] - Optional. If provided, sets the BPM for this specific user. Otherwise, sets the global BPM.
 */
function setBPM(targetBPM, username)
{
  targetBPM = Number(targetBPM);
  if (isNaN(targetBPM))
  {
    return;
  }
  targetBPM = clampBpm(targetBPM)
  if (username === undefined)
  {
    console.log("<Global> current BPM: " + bpm.global + ". Target: " + Math.floor(60000 / targetBPM));
    bpm.global = Math.floor(60000 / targetBPM);
  } else
  {
    console.log("<User> current BPM for " + username + ": " + bpm.user[username] + ". Target: " + Math.floor(60000 / targetBPM));
    bpm.user[username] = Math.floor(60000 / targetBPM);
  }
}

/**
 * Retrieves the BPM (as a millisecond interval) for a user, or the global BPM if the user has no specific setting.
 * @param {string} [username] - The username to get the BPM for.
 * @returns {number} The BPM interval in milliseconds.
 */
function getBPM(username)
{
  if (username === undefined || bpm.user[username] === undefined)
  {
    return bpm.global;
  } else
  {
    return bpm.user[username];
  }
}

/**
 * Plays a sound from the pre-loaded AudioBuffer map.
 * @param {string} cmd - The key corresponding to the audio sample (e.g., '1', 'A').
 * @param {number} cBpm - The current BPM, used to time the paw animation.
 */
function playSound(cmd, cBpm) {
    if (!soundsLoaded || !audioContext) return;

    const soundData = audioBuffers.get(cmd);

    if (!soundData) {
        if (cmd !== ".") {
            console.error("No audio buffer for ", cmd);
            addUserMessage(`no-audio-${cmd}`, `No sound found for note '${cmd}'.`);
        }
        return;
    }

    // --- Web Audio API Playback ---
    // 1. Create a source node
    const source = audioContext.createBufferSource();
    source.buffer = soundData.buffer;

    // 2. Connect it to the destination (speakers)
    source.connect(audioContext.destination);

    // 3. Play it now!
    source.start(0);
    // --- End Playback ---

    // Trigger animations using the stored metadata
    setPaw(soundData.paw, cBpm);
    setInstrument(soundData.instrument);
}

/**
 * Initializes or re-initializes the Web Audio API context for synthesized sounds.
 * @param {string} type - The oscillator type (e.g., 'sine', 'square', 'sawtooth', 'triangle').
 * @returns {object} An object containing the new AudioContext, GainNode, and OscillatorNode.
 */
function prepareSynth(type)
{
  if (audioContext) {
      audioContext.close();
  }
  audioContext = new AudioContext();
  window.audioContext = audioContext;
  mainGainNode = audioContext.createGain();
  mainGainNode.connect(audioContext.destination);
  mainGainNode.gain.value = 0;
  oscillatorNode = audioContext.createOscillator();
  oscillatorNode.connect(mainGainNode);
  oscillatorNode.type = type;
  synthStarted = false;
  return {"ctx": audioContext, "gain": mainGainNode, "osc": oscillatorNode};
}


/**
 * Plays a synthesized note at a specific frequency and time.
 * @param {number} frequency - The frequency of the note in Hertz.
 * @param {number} time - The AudioContext time at which to play the note.
 */
function playSynthSound(frequency, time)
{
  if (!audioContext || !mainGainNode || !oscillatorNode || audioContext.state === 'closed')
  {
    return;
  }
  if (!synthStarted)
  {
    oscillatorNode.start();
    synthStarted = true;
  }
  mainGainNode.gain.setValueAtTime(volume * synthDampening, time);
  oscillatorNode.frequency.setValueAtTime(frequency, time);
}

/**
 * Mutes the synthesizer at a specific time.
 * @param {number} time - The AudioContext time at which to mute the synth.
 */
function muteSynth(time)
{
  if (!mainGainNode)
  {
    return;
  }
  mainGainNode.gain.setValueAtTime(0, time);
}

/**
 * Triggers the intro animation and sets the stage for a new song.
 * Moves the bongo cat onto the screen.
 * @param {object} song - The song object containing metadata like performer.
 */
function introAnimation(song)
{
  let username = song.performer;

  document.getElementById("bongocat").style.left = "0px";
  document.getElementById("restart-button").disabled = false;
  playing = true;
}

/**
 * Stops all playback and resets the player state to its initial condition.
 * This is a "hard reset" used when loading a new song.
 */
function stopSong() {
	
	
	const warningsToRemove = [];
    for (const key of activeUserMessages.keys()) {
        if (key.startsWith('no-audio-')) {
            warningsToRemove.push(key);
        }
    }
    if (warningsToRemove.length > 0) {
        warningsToRemove.forEach(key => activeUserMessages.delete(key));
        renderUserMessages();
    }
    
    // Stop all sound and scheduled notes
    if (currentSong && currentSong.timeoutIDs) {
        for (let id of currentSong.timeoutIDs) {
            clearTimeout(id);
        }
    }
    if (mainGainNode) {
        mainGainNode.gain.value = 0;
    }
    if (oscillatorNode && synthStarted) {
        oscillatorNode.stop();
        synthStarted = false;
    }

    // Reset state variables
    playing = false;
    isPaused = false;
    currentSong = null;
    allPlaybacks = [];
    currentNoteIndex = 0;
    setBPM(128); 
    
    // Reset UI
    document.getElementById("restart-button").disabled = true; // Disable Restart button
    toggleNavButtons(false);
    updateNoteDisplay();
    populateNotesContainer(false); //don't clear notes container
    const playPauseBtn = document.getElementById('play-pause-button');
    updatePlayButton('▶', 'Play');
    setInstrument("none");
    playPauseBtn.disabled = false; // Ensure it's enabled after stopping
}

/**
 * Transitions the player to a "finished" state after a song completes.
 * This is a "soft reset" that keeps the song data available for replay.
 */
function endSongPlayback() {
    playing = false;
    isPaused = false;
    currentNoteIndex = 0; // Reset to the beginning for replay

    // Update UI to reflect the "stopped but ready" state
    updatePlayButton('▶', 'Play');
    document.getElementById('play-pause-button').disabled = false; // Re-enable the play button
    toggleNavButtons(true); // Enable seeking/navigating the finished song
    updateNoteDisplay(); // Update to show 0/total
    highlightCurrentNote(0); // Highlight the first note
}

/**
 * Triggers the outro animation when a song finishes.
 * Moves the bongo cat off the screen and cleans up audio resources.
 */
function outroAnimation()
{
  removeUserMessage('runtime-error');
  document.getElementById('play-pause-button').disabled = true;
  document.getElementById("bongocat").style.left = "-800px";
  setInstrument("none");
  if (currentSong && currentSong.timeoutIDs) {
    for (let id of currentSong.timeoutIDs)
    {
      clearTimeout(id);
    }
  }

  if (mainGainNode)
  {
    mainGainNode.gain.value = 0;
  }
  if (oscillatorNode && synthStarted)
  {
    oscillatorNode.stop();
    synthStarted = false;
  }

  setTimeout(function () {
    endSongPlayback();
  }, 1000);
}

/**
 * Displays an error message and triggers an error animation sequence.
 * @param {Error | string} error - The error object or message to display.
 */
function errorAnimation(error)
{
  // Use our new message system to display the error
  addUserMessage('runtime-error', `😿 Error: ${error.message || error}`);

  // The rest of the function stops playback and schedules the outro
  setInstrument("none");
  if(currentSong && currentSong.timeoutIDs){
      for (let id of currentSong.timeoutIDs)
      {
        clearTimeout(id);
      }
  }

  if (mainGainNode)
  {
    mainGainNode.gain.value = 0;
  }
  if (oscillatorNode && synthStarted)
  {
    oscillatorNode.stop();
    synthStarted = false;
  }
  setTimeout(outroAnimation, 5000); // The outro will be called after 5 seconds
}

/**
 * Changes the visible instrument graphic for the bongo cat.
 * @param {string} instrument - The ID of the instrument element to make visible.
 */
function setInstrument(instrument)
{
  var c = document.getElementById("instruments").children;
  for (var i = 0; i < c.length; i++)
  {
    c[i].style.visibility = "hidden";
  }
  var newInstrument = document.getElementById(instrument);
  if (!newInstrument) {return;}
  newInstrument.style.visibility = "visible";

}

/**
 * Triggers the "paw down" animation for a specific paw.
 * @param {string} paw - The ID of the paw element to animate ('paw-left' or 'paw-right').
 * @param {number} cBpm - The current BPM, used to schedule the "paw up" animation.
 */
function setPaw(paw, cBpm)
{
  var currentPaw = document.getElementById(paw);
  currentPaw.style.backgroundPosition = "top right";
  window.setTimeout(releasePaw, 1000 * (60 / cBpm / 2), paw);
}

/**
 * Triggers the "paw up" animation by resetting its background position.
 * @param {string} paw - The ID of the paw element to release ('paw-left' or 'paw-right').
 */
function releasePaw(paw)
{

  var currentPaw = document.getElementById(paw);
  currentPaw.style.backgroundPosition = "top left";
}

/**
 * Wraps a command function in a try-catch block to handle runtime errors gracefully.
 * @param {Function} cmd - The function to wrap.
 * @returns {Function} A new function that executes the original command within a try-catch block.
 */
function saveCmd(cmd)
{
  return (...args) =>
  {
    try
    {
      cmd(...args);
    } catch (error)
    {
      //errorAnimation(error);
      console.error(error);
    }
  };
}

/**
 * Creates a standard playback object for the song queue.
 * @param {Function} cmd - The command function to be executed (e.g., playSound).
 * @param {number} time - The timestamp (in ms from song start) when the command should be executed.
 * @param {...*} args - Additional arguments to be passed to the command function.
 * @returns {object} A playback object with time, cmd, and args properties.
 */
function preparePlaybackObject(cmd, time, ...args)
{
  return {time: time, cmd: saveCmd(cmd), args: args};
}

var helperMethods = {clamp, clampBpm, setBPM, getBPM, playSound, prepareSynth, playSynthSound, muteSynth, introAnimation, outroAnimation, setInstrument, setPaw, releasePaw, preparePlaybackObject};
for (const key in helperMethods)
{
  window[key] = helperMethods[key];
}
window.helperMethods = helperMethods;
console.log(helperMethods);

// ====================================================== //
// ===================== local play ===================== //
// ====================================================== //

/**
 * Renders the list of active messages to the DOM.
 */
function renderUserMessages() {
    if (!userMessageDisplay) return;

    // Clear the container
    userMessageDisplay.innerHTML = '';

    if (activeUserMessages.size === 0) {
        // If no messages, hide the container
        userMessageDisplay.style.display = 'none';
    } else {
        // If there are messages, show the container
        userMessageDisplay.style.display = 'flex';
        // Create and append an element for each message
        activeUserMessages.forEach(messageText => {
            const messageEl = document.createElement('div');
            messageEl.className = 'user-message-item';
            messageEl.textContent = messageText;
            userMessageDisplay.appendChild(messageEl);
        });
    }
}

/**
 * Adds or updates a user message and re-renders the display.
 * @param {string} key - A unique identifier for the message (e.g., 'dirty-input').
 * @param {string} text - The message text to display.
 */
function addUserMessage(key, text) {
    activeUserMessages.set(key, text);
    renderUserMessages();
}

/**
 * Removes a user message by its key and re-renders the display.
 * @param {string} key - The unique identifier of the message to remove.
 */
function removeUserMessage(key) {
    if (activeUserMessages.has(key)) {
        activeUserMessages.delete(key);
        renderUserMessages();
    }
}


function updatePlayButton(icon, text) {
  const button = document.getElementById('play-pause-button');
  if (button) {
    const iconSpan = button.querySelector('.icon');
    const textSpan = button.querySelector('.text');
    if (iconSpan) iconSpan.textContent = icon;
    if (textSpan) textSpan.textContent = text;
  }
}

/**
 * Enables or disables the Prev/Next navigation buttons.
 * @param {boolean} enable - True to enable the buttons, false to disable.
 */
function toggleNavButtons(enable) {
    const prevBtn    = document.getElementById('prev-note-button');
    const nextBtn    = document.getElementById('next-note-button');
    const noteDisp   = document.getElementById('note-display');

    if (enable) {
        prevBtn.disabled    = false;
        nextBtn.disabled    = false;
        noteDisp.classList.remove('disabled');
    } else {
        prevBtn.disabled    = true;
        nextBtn.disabled    = true;
        noteDisp.classList.add('disabled');
    }
    navButtonsVisible = enable;
}

/**
 * Updates the note display element to show the current note index and total notes.
 */
function updateNoteDisplay() {
    if (!noteDisplay) {
        noteDisplay = document.getElementById('note-display');
    }
    const totalNotes        = allPlaybacks.length > 0 ? allPlaybacks.length : 0;
    noteDisplay.textContent = `Note: ${currentNoteIndex}/${totalNotes}`;
}

/**
 * Shows or hides a message in the user message display area.
 * @param {string} message - The message to show. If empty or null, the display is hidden.
 */
function showUserMessage(message) {
    if (!userMessageDisplay) return;
    if (message) {
        userMessageDisplay.textContent = message;
        userMessageDisplay.style.display = 'flex';
    } else {
        userMessageDisplay.textContent = '';
        userMessageDisplay.style.display = 'none';
    }
}

/**
 * Renders the notes of the current song into the notes container element,
 * grouping notes that have the same timestamp.
 */
function populateNotesContainer(doClear = true) {
    if (!notesContainer) {
        notesContainer = document.getElementById('notes-container');
    }
    if(doClear) notesContainer.innerHTML = '';
    if (allPlaybacks.length === 0) return;

    let i = 0;
    while (i < allPlaybacks.length) {
        const firstPlaybackInGroup = allPlaybacks[i];
        const group = [firstPlaybackInGroup];
        let j = i + 1;
        
        // Group all playback objects that have the same timestamp
        while (j < allPlaybacks.length && allPlaybacks[j].time === firstPlaybackInGroup.time) {
            group.push(allPlaybacks[j]);
            j++;
        }

        // Get the source text from each note in the group and join them
        const sources = group.map(p => {
            const source = p.source || p.args[0];
            return typeof source === 'string' ? source : '';
        }).filter(s => s !== '');
        
        const noteText = sources.join('');

        if (noteText) {
            const noteEl             = document.createElement('span');
            noteEl.className         = 'note';
            noteEl.textContent       = noteText;
            noteEl.dataset.noteIndex = i; // The index of the first note in the group
            
            notesContainer.appendChild(noteEl);
            // Add a space to separate it from the next note group
            notesContainer.appendChild(document.createTextNode(' '));
        }
        
        i = j;
    }
}

/**
 * Highlights the currently active note group in the notes container and scrolls it into view.
 * @param {number} index - The index of the note that is currently playing.
 */
function highlightCurrentNote(index) {
    // Ensure the index is valid
    if (index < 0 || index >= allPlaybacks.length) return;

    // Use the timestamp of the current note to identify its group
    const currentTime = allPlaybacks[index].time;
    
    const noteElements = notesContainer.querySelectorAll('.note');

    noteElements.forEach(noteEl => {
        // Get the index of the first note in the group from the data attribute
        const firstNoteInGroupIndex = parseInt(noteEl.dataset.noteIndex);
        
        // Find the timestamp of that group
        const groupTime = allPlaybacks[firstNoteInGroupIndex].time;

        // If the group's time matches the currently playing note's time, highlight it
        if (groupTime === currentTime) {
            noteEl.classList.add('highlight');
            noteEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            noteEl.classList.remove('highlight');
        }
    });
}

/**
 * Parses a raw message string to see if it's a valid song command.
 * @param {string} message - The input string from the user.
 * @returns {object|null} A song object if the message is valid, otherwise null.
 */
function parseMessage(message) {
	message = message.replace(/\s+/g, ' ').trim();

    let song = null;
    if (message.toLowerCase().startsWith('!bongo+')) message = message.replace("+","")
    if (message.toLowerCase().startsWith('!bongo ')) {
        const notes = message.substring(7);
        song = { performer: 'Anon', notes: notes, notation: 'bongo' };
    } else if (message.toLowerCase().startsWith('!bongox rtttl ')) {
        const notes = message.substring(14);
        song = { performer: 'Tester', notes: notes, notation: 'rtttl', "experimental": true };
    } else if (message.toLowerCase().startsWith('!bongox rttl ')) {
        const notes = message.substring(13);
        song = { performer: 'Tester', notes: notes, notation: 'rttl', "experimental": true };
    }
    return song;
}

/**
 * Plays a song object from a specified starting note index. This function handles scheduling
 * all subsequent notes using setTimeout. If it's the first time playing this song, it first
 * parses the notes into a playback queue.
 * @param {object} song - The song object to play, containing notes, performer, etc.
 * @param {number} [startNoteIndex=0] - The index of the note in the playback queue to start from.
 */
function playSongFromNote(song, startNoteIndex = 0) {
    const isRtttl = song.notation === 'rtttl' || song.notation === 'rttl';
    
    // ** THE FIX IS HERE **
    // If starting from the beginning AND (it's the first play OR it's an RTTL song that needs re-initialization)
    if (startNoteIndex === 0 && (allPlaybacks.length === 0 || isRtttl)) {
        let handler = notations[song.notation];
        if (song.extension && !disableExtensions) {
            handler = extensionFeatures[song.notation] || handler;
        }
        if (song.experimental && !disableExperiments) {
            handler = experimentalFeatures[song.notation] || handler;
        }
        if (handler) {
            allPlaybacks = handler(song);
            populateNotesContainer();
        }
    }

    if (!allPlaybacks || allPlaybacks.length === 0 || startNoteIndex >= allPlaybacks.length) return;
    
    currentSong            = song;
    currentSong.timeoutIDs = [];
    introAnimation(song);
    
    const startTime = allPlaybacks[startNoteIndex].time;

    for (let i = startNoteIndex; i < allPlaybacks.length; i++) {
        const playback = allPlaybacks[i];
        const delay = playback.time - startTime;

        const timeoutId = setTimeout(() => {
            playback.cmd(...playback.args);
            currentNoteIndex = i;
            highlightCurrentNote(currentNoteIndex);
            updateNoteDisplay();
            if (i + 1 >= allPlaybacks.length) {
                document.getElementById('play-pause-button').disabled = true;
                outroAnimation();
            }
        }, delay);
        currentSong.timeoutIDs.push(timeoutId);
    }
    updateNoteDisplay();
    highlightCurrentNote(startNoteIndex);
}


document.getElementById('play-pause-button').addEventListener('click', async () => {
    // 1. Initialize AudioContext on first user interaction
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            addUserMessage('error-no-audio-api', 'Error: Web Audio API is not supported in this browser.');
            return;
        }
    }

    // Resume AudioContext if it was suspended
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    // 2. Load sounds if they haven't been loaded yet
    if (!soundsLoaded) {
        updatePlayButton('...', 'Loading');
        document.getElementById('play-pause-button').disabled = true;
        await loadAllSounds();
        document.getElementById('play-pause-button').disabled = false;
        // The rest of the play logic will run after this block
    }

    // 3. The original play/pause logic
    if (!playing) {
        removeUserMessage('parse-error');
        const songToPlay = currentSong || parseMessage(document.getElementById('song-input').value.trim());
        if (songToPlay) {
            if (songToPlay !== currentSong) {
                allPlaybacks = [];
                currentNoteIndex = 0;
            }
            updatePlayButton('⏸', 'Pause');
            toggleNavButtons(false);
            playSongFromNote(songToPlay, currentNoteIndex);
        } else {
            addUserMessage('parse-error', "Invalid song format. Please start with '!bongo' or '!bongox rtttl'.");
        }
    } else if (!isPaused) {
        // --- PAUSE LOGIC ---
        isPaused = true;
        updatePlayButton('▶', 'Resume');
        // Clear all scheduled setTimeout calls
        for (let id of currentSong.timeoutIDs) clearTimeout(id);
        
        // **CRITICAL FIX**: Immediately cancel scheduled audio events and mute the synth
        if (mainGainNode && audioContext) {
            mainGainNode.gain.cancelScheduledValues(audioContext.currentTime);
            mainGainNode.gain.setValueAtTime(0, audioContext.currentTime);
        }
        
        toggleNavButtons(true);
    } else {
        // --- RESUME LOGIC ---
        isPaused = false;
        updatePlayButton('⏸', 'Pause');
        toggleNavButtons(false);
        playSongFromNote(currentSong, currentNoteIndex);
    }
});


/**
 * Seeks to a specific note in the song. This works whether the song is playing or paused.
 * If playing, it jumps to the new note and continues playing.
 * If paused, it jumps to the new note and remains paused, playing all sounds at that timestamp.
 * @param {number} index - The index of the note to seek to.
 */
function seekToNote(index) {
    // Ensure there is a song loaded and the index is valid.
    if (!currentSong || allPlaybacks.length === 0 || index < 0 || index >= allPlaybacks.length) {
        return;
    }

    // Stop any currently scheduled playback.
    for (let id of currentSong.timeoutIDs) {
        clearTimeout(id);
    }
    currentSong.timeoutIDs = [];

    // Mute synth to prevent hanging notes, especially when seeking while playing.
    if (mainGainNode && audioContext) {
        mainGainNode.gain.cancelScheduledValues(audioContext.currentTime);
        mainGainNode.gain.setValueAtTime(0, audioContext.currentTime);
    }

    // Update the current note index.
    currentNoteIndex = index;

    if (playing && !isPaused) {
        // If it was playing, restart the playback loop from the new index.
        playSongFromNote(currentSong, currentNoteIndex);
    } else {
        // If it was paused or finished, update the UI and preview ALL notes in the group.
        updateNoteDisplay();
        highlightCurrentNote(currentNoteIndex);

        const targetTime = allPlaybacks[currentNoteIndex].time;
        const isRtttl = currentSong.notation === 'rtttl' || currentSong.notation === 'rttl';

        // Play all events at the target timestamp
        for (let i = currentNoteIndex; i < allPlaybacks.length; i++) {
            const playback = allPlaybacks[i];
            if (playback.time === targetTime) {
                playback.cmd(...playback.args);

                // If it's an RTTL note, we must also find and schedule its mute command.
                if (isRtttl && playback.isNoteStart) {
                    // Search for the corresponding mute command.
                    for (let j = i + 1; j < allPlaybacks.length; j++) {
                        const futurePlayback = allPlaybacks[j];
                        if (futurePlayback.isMute) {
                            const duration = futurePlayback.time - playback.time;
                            const muteTimeoutId = setTimeout(() => {
                                futurePlayback.cmd(...futurePlayback.args);
                            }, duration);
                            // Store this timeout so it can be cleared if the user seeks again quickly.
                            currentSong.timeoutIDs.push(muteTimeoutId); 
                            break; // Stop searching once we've scheduled the mute.
                        }
                    }
                }
            } else {
                // Since the array is sorted by time, we can stop once the time changes.
                break;
            }
        }
    }
}

/**
 * Event listener for the 'Reset' button. Seeks to the beginning of the song.
 */
document.getElementById('restart-button').addEventListener('click', () => {
    seekToNote(0);
});


/**
 * Event listener for the 'Previous Note' button. Seeks to the beginning of the previous note group.
 */
document.getElementById('prev-note-button').addEventListener('click', () => {
    if (!currentSong || currentNoteIndex <= 0) return;

    // Find the index of the previous playback object that marks the start of a note.
    for (let i = currentNoteIndex - 1; i >= 0; i--) {
        const playback = allPlaybacks[i];
        if (playback.isNoteStart || allPlaybacks[i].time < allPlaybacks[currentNoteIndex].time) {
            seekToNote(i);
            return;
        }
    }
    // If loop finishes, seek to the very first note
    seekToNote(0);
});

/**
 * Event listener for the 'Next Note' button. Seeks to the beginning of the next note group.
 */
document.getElementById('next-note-button').addEventListener('click', () => {
    if (!currentSong || currentNoteIndex >= allPlaybacks.length - 1) return;

    // Find the index of the next playback object that marks the start of a note.
    for (let i = currentNoteIndex + 1; i < allPlaybacks.length; i++) {
        const playback = allPlaybacks[i];
        if (playback.isNoteStart || playback.time > allPlaybacks[currentNoteIndex].time) {
            // Check if it's an outro animation, if so don't seek to it.
            if (playback.cmd.name === 'outroAnimation') continue;
            seekToNote(i);
            return;
        }
    }
});/**
 * Event listener for the 'Update Song' button. Stops any currently playing song,
 * resets the player state, and then attempts to parse and play the new song from the input textarea.
 */
document.getElementById('update-song-button').addEventListener('click', () => {
    // 0. Clear any pending change messages
    showUserMessage('');

    // 1. Stop any current song and reset the state completely.
    stopSong();

    // 2. Try to play the new song from the textarea.
    const message = document.getElementById('song-input').value.trim();
    const song = parseMessage(message);
    if (song) {
        updatePlayButton('⏸', 'Momentn'); 
        playSongFromNote(song, 0);
    } else {
        alert("Invalid format. Please start with '!bongo ', '!bongox rtttl ', or '!bongox rttl '.");
        // The player is already in a clean "stopped" state thanks to stopSong().
    }
});


/**
 * Main DOMContentLoaded listener. Initializes UI components and sets up event handlers.
 */
document.addEventListener('DOMContentLoaded', () => {
    notesContainer = document.getElementById('notes-container');
    userMessageDisplay = document.getElementById('user-message-display');

    notesContainer.addEventListener('click', (event) => {
        if (event.target && event.target.matches('.note')) {
            const index = parseInt(event.target.dataset.noteIndex);
            seekToNote(index);
        }
    });
    toggleNavButtons(false); // Ensure nav buttons are disabled on load
    document.getElementById('restart-button').disabled = true; // Also disable restart on load

    
    const songSelector = document.getElementById('song-selector');
    const songInput = document.getElementById('song-input');
    
    // Add listener to show message on textarea change
    songInput.addEventListener('input', () => {
        showUserMessage("Song input changed — update it to test the new version.");
    });


    // Populate the dropdown with songs from the array
    exampleSongs.forEach(song => {
        const option = document.createElement('option');
        option.value = song.notation;
        option.textContent = song.name;
        songSelector.appendChild(option);
    });

    // Add event listener to handle selection
    songSelector.addEventListener('change', (event) => {
        const selectedNotation = event.target.value;
        if (selectedNotation) {
            songInput.value = selectedNotation;
            notesContainer.innerHTML = '';
            showUserMessage(''); // Clear message on new selection
            stopSong();
        }
    });

    document.getElementById("song-input").addEventListener("paste",(event)=>{
		//notesContainer.innerHTML = '';
        stopSong()
	
	})


    
});




// ====================================================== //
// ======================= config ======================= //
// ====================================================== //
let params = new URLSearchParams(document.location.search);

let maxNotesPerBatch = params.get("maxNotesPerBatch");
if (maxNotesPerBatch && Number(maxNotesPerBatch))
{
  window.maxNotesPerBatch = Number(maxNotesPerBatch);
}
let maxPbmParam = params.get("maxBpm");
if (maxPbmParam && Number(maxPbmParam))
{
  maxBpm = Number(maxPbmParam);
}
let minPbmParam = params.get("minBpm");
if (minPbmParam && Number(minPbmParam))
{
  minBpm = Number(minPbmParam);
}

if (params.get("stackMode"))
{
  stackMode = true;
}

if (params.get("disableExperiments"))
{
  disableExperiments = true;
}

if (params.get("disableExtensions"))
{
  disableExtensions = true;
}

let maxSongLengthParam = params.get("maxSongLength");
if (maxSongLengthParam && !isNaN(Number(maxSongLengthParam)))
{
  setMaxSongLength(maxSongLengthParam);
}

let volumeParam = params.get("volume");
if (volumeParam && !isNaN(Number(volumeParam)))
{
  setVolume(volumeParam);
}
