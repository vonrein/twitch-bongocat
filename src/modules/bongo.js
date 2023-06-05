

/**
 * Parses a song and returns an array of commands
 * @date 5/7/2023 - 2:22:07 PM
 *
 * @param {Song} song
 * 
 * @returns {Playback[]}
 */
function parseSong(song) {
  console.log(song)
  return addNotes(song.notes, song.notation == "bongol" || song.notation == "legacy", song.performer)
}

function addNotes(noteString, isLegacyNotation, username) {
  console.log("leagcy:", isLegacyNotation)
  let result = []

  noteString = noteString.toUpperCase().replaceAll("Z", "Y")

  var noteBatches = noteString.split(" ");
  var thisNote;
  var thisTimer = 1000;
  var uBPM;
  uBPM = getBPM(username);

  for (var noteBatch in noteBatches) {
    var notes = parseNotes(noteBatches[noteBatch]).slice(0, maxNotesPerBatch);
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
      uBPM = getBPM(username);
      continue
    }

    console.log(`result notes: ${notes}`);

    thisTimer += uBPM;
    for (var noteIdx in notes) {
      thisNote = notes[noteIdx];

      if (isLegacyNotation)
        thisNote += "L";

      //setTimeout(playSound, thisTimer, thisNote);
      result.push(preparePlaybackObject(playSound, thisTimer, thisNote, uBPM))
    }
  }
  thisTimer += uBPM;
  //setTimeout(outroAnimation, thisTimer);
  result.push(preparePlaybackObject(outroAnimation, thisTimer))
  return result
}


function parseNotes(noteBatch)
{
  const fsmError = 0;
  const fsmStart = 1;
  const fsmPitch = 2;
  const fsmNote = 3;
  const fsmSharp = 4;

  var resultNotes = [];
  var thisNote;
  var state = fsmStart;

  for (var i = 0; i < noteBatch.length; i++)
  {
    var curChar = noteBatch[i];

    switch (state)
    {
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
        else
        {
          thisNote += curChar;
          state = fsmNote;
        }

        break;
      }

      case fsmNote: {
        console.log("fsmNote");

        if (curChar == "#")
        {
          thisNote += curChar;
          state = fsmSharp;
        }
        else
        {
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
        else
        {
          resultNotes.push(thisNote);
          state = fsmStart;
          i--;
        }

        break;
      }
    }
  }

  // epsilon:
  switch (state)
  {
    case fsmNote:
    case fsmSharp: {
      console.log("epsilon");
      resultNotes.push(thisNote);
      break;
    }
  }

  return resultNotes;
}

export {parseSong};