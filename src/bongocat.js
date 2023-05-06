
//global state
var bpm = {};
bpm.user = {};
var queue = [];
var bongoEnabled = true;
var playing = false;
setBPM(128);

function setBPM(targetBPM, username) {
  if (targetBPM > 800 || targetBPM < 50) {
    return;
  }
  if (username === undefined) {
    console.log("<Global> current BPM: " + bpm.global + ". Target: " + Math.floor(60000 / targetBPM));
    bpm.global = Math.floor(60000 / targetBPM);
  } else {
    console.log("<User> current BPM for "+username+": " + bpm.user[username] + ". Target: " + Math.floor(60000 / targetBPM));
    bpm.user[username] = Math.floor(60000 / targetBPM);
  }
}

// ====================================================== //
// begin move to own file
// ====================================================== //

function playSound(cmd) {

  const audio = document.querySelector(`audio[data-key="${cmd}"]`);
  setInstrument(audio.dataset.instrument);
  setPaw(audio.dataset.paw);
  if (!audio) return;


  audio.currentTime = 0;
  audio.play();
}
function addToQueue(noteString, username, isLegacyNotation) {
  var newNoteStack = [];
  newNoteStack[0] = noteString;
  newNoteStack[1] = username;
  newNoteStack[2] = isLegacyNotation;
  queue.push(newNoteStack);
}

function getFromQueue() {
  var returnvalue = queue.pop();
  return returnvalue;
}
function startQueue() {
  setInterval(checkQueue, 1000);
}
function checkQueue() {
  if (queue.length > 0 && playing == false) {
    var song = getFromQueue();
    var noteString = song[0]
    var username = song[1];
    var isLegacyNotation = song[2];

    introAnimation(username);
    addNotes(noteString, isLegacyNotation, username);
  }

}
function parseNotes(noteBatch) {
  const fsmError = 0;
  const fsmStart = 1;
  const fsmPitch = 2;
  const fsmNote = 3;
  const fsmSharp = 4;

  var resultNotes = [];
  var thisNote;
  var state = fsmStart;

  for (var i = 0; i < noteBatch.length; i++) {
    var curChar = noteBatch[i];

    switch (state) {
      case fsmError: {
        console.log("fsmError");

        break;
      }

      case fsmStart: {
        console.log("fsmStart");

        thisNote = curChar;

        if (curChar == "^" || curChar == "V")
          state = fsmPitch;
        else
          state = fsmNote;
        break;
      }

      case fsmPitch: {
        console.log("fsmPitch");

        if (curChar == "^" || curChar == "V" || curChar == "#")
          state = fsmError;
        else {
          thisNote += curChar;
          state = fsmNote;
        }

        break;
      }

      case fsmNote: {
        console.log("fsmNote");

        if (curChar == "#") {
          thisNote += curChar;
          state = fsmSharp;
        }
        else {
          resultNotes.push(thisNote);
          state = fsmStart;
          i--;
        }

        break;
      }

      case fsmSharp: {
        console.log("fsmSharp");

        if (curChar == "#")
          state = fsmError;
        else {
          resultNotes.push(thisNote);
          state = fsmStart;
          i--;
        }

        break;
      }
    }
  }

  // epsilon:
  switch (state) {
    case fsmNote:
    case fsmSharp: {
      console.log("epsilon");
      resultNotes.push(thisNote);
      break;
    }
  }

  return resultNotes;
}
function getBpm(username) {
  if (username === undefined || bpm.user[username] === undefined) {
    return bpm.global;
  } else {
    return bpm.user[username];
  }
}

function addNotes(noteString, isLegacyNotation, username) {
  var noteBatches = noteString.split(" ");
  var thisNote;
  var thisTimer = 1000;
  var uBPM;
  uBPM = getBpm(username);

  for (var noteBatch in noteBatches) {
    var notes = parseNotes(noteBatches[noteBatch].substr(0, 5));
    if (notes.length > 0 && notes[0] == ",") {
      let sBpm = "";
      for (var i = 1; i <= notes.length; i++) {
        if (isNaN(notes[i])) {
          break;
        }
        sBpm += notes[i];
      }
      sBpm = sBpm.substring(0, 3);
      setBPM(Number(sBpm), username);
      uBPM = getBpm(username);
      continue
    }

    console.log(`result notes: ${notes}`);

    thisTimer += uBPM;
    for (var noteIdx in notes) {
      thisNote = notes[noteIdx];

      if (isLegacyNotation)
        thisNote += "L";

      setTimeout(playSound, thisTimer, thisNote);
    }
  }
  thisTimer += uBPM;
  setTimeout(outroAnimation, thisTimer);
}
function introAnimation(username) {
  document.getElementById("nametag").innerHTML = username + " entered the stage";
  document.getElementById("bongocat").style.left = "0px";
  playing = true;
}
function outroAnimation() {
  document.getElementById("bongocat").style.left = "-1920px";
  setInstrument("none");
  setTimeout(function () {
    playing = false;
  }, 1000);
}
function setInstrument(instrument) {
  var c = document.getElementById("instruments").children;
  for (var i = 0; i < c.length; i++) {
    c[i].style.visibility = "hidden";
  }
  var newInstrument = document.getElementById(instrument);
  if (!newInstrument) { return; }
  newInstrument.style.visibility = "visible";

}
function setPaw(paw) {
  var currentPaw = document.getElementById(paw);
  currentPaw.style.backgroundPosition = "top right";
  window.setTimeout(releasePaw, bpm / 2, paw);
}
function releasePaw(paw) {

  var currentPaw = document.getElementById(paw);
  currentPaw.style.backgroundPosition = "top left";
}

// ====================================================== //
// end move to own file
// ====================================================== //

const commands = {};
function enableBongo(args) {
  if (isSuperUser(args.tags)) {
    console.log("aktiviere Bongo");
    bongoEnabled = true
  }
}
commands["!enablebongo"] = enableBongo;

function disableBongo(args) {
  if (isSuperUser(args.tags)) {
    console.log("deaktiviere Bongo");
    bongoEnabled = false;
  }
}
commands["!disablebongo"] = disableBongo

function bongoPlus(args) {
  if (!bongoEnabled) {
    return
  }
  //const notes = args.message.substr(8);
  console.log(args)
  const notes = args.arg
  console.log(`${args.tags.username} plays+ ${notes}.`);
  addToQueue(notes.toUpperCase(), args.tags.username, false);
}
commands["!bongo+"] = bongoPlus

function bongo(args) {
  if (!bongoEnabled) {
    return
  }
  //const notes = message.substr(7);
  const notes = args.arg
  console.log(`${args.tags.username} plays ${notes}.`);
  addToQueue(notes.toUpperCase(), args.tags.username, true);
}
commands["!bongo"] = bongo

function changeBpm(args) {
  if (!bongoEnabled) {
    return
  }
  //const targetBPM = Number(message.substr(5));
  const targetBPM = Number(args.arg)
  //if (targetBPM <= 600 && targetBPM > 49)
  //{
  console.log(`${args.tags.username} set BPM to ${targetBPM}.`);
  setBPM(targetBPM, args.tags.username);
  //}
}
commands["!bpm"] = changeBpm

function handleCommand(message, command, arg, tags) {

  let longestCmd = ""
  for (let cmd in commands) {
    if (message.startsWith(cmd)) {
      if (cmd.length > longestCmd.length) {
        longestCmd = cmd
      }
    }
  }
  if (longestCmd) {
    commands[longestCmd]?.({message: message, command: command, arg: arg, tags: tags})
  }
  /*
  let handler = commands[command]
  if(handler) {
    handler(arg, tags)
  }
  */
}


// tmijs
const channel = location.hash || 'jvpeek';
const chatClient = new tmi.Client({
  channels: [channel]
});
chatClient.connect();

chatClient.on('connected', (address, port) =>
{
  console.log(`Connected to ${address}:${port}, channel ${channel}.`);
});
function isSuperUser(tags)
{
  return tags.mod || tags.badges?.broadcaster || tags.username == "jvpeek";
}
chatClient.on('message', (channel, tags, message, self) =>
{

  if (message.startsWith("!"))
  {
    let args = message.split(/\s+/)
    let cmd = args[0]
    args = args.splice(1)
    let arg = args.join(" ")
    console.log(cmd, arg)
    handleCommand(message, cmd, arg, tags)
  }
});

startQueue();