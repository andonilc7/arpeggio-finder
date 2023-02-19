//scales

//sharps
const sharpNotes = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];
const c = ["C", "D", "E", "F", "G", "A", "B"];
const g = ["G", "A", "B", "C", "D", "E", "F#"];
const d = ["D", "E", "F#", "G", "A", "B", "C#"];
const a = ["A", "B", "C#", "D", "E", "F#", "G#"];
const e = ["E", "F#", "G#", "A", "B", "C#", "D#"];
const b = ["B", "C#", "D#", "E", "F#", "G#", "A#"];
const fSharp = ["F#", "G#", "A#", "B", "C#", "D#", "E#"];
const cSharp = ["C#", "D#", "E#", "F#", "G#", "A#", "B#"];

//flats
const flatNotes = [
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
];
const f = ["F", "G", "A", "Bb", "C", "D", "E"];
const bFlat = ["Bb", "C", "D", "Eb", "F", "G", "A"];
const eFlat = ["Eb", "F", "G", "Ab", "Bb", "C", "D"];
const aFlat = ["Ab", "Bb", "C", "Db", "Eb", "F", "G"];
const dFlat = ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"];
const gFlat = ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"];
const cFlat = ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"];

/* ------------------------------------------------------------ */

let form = document.getElementById("chord-name-form");
let input = document.getElementById("chord-name-input");

let chordNoteList = document.getElementById("chord-note-list");
let chordIntervalList = document.getElementById("chord-interval-list");

const maj7 = "maj7";
const dom7 = "7";
const min7 = "min7";
const min7b5 = "min7b5";
const dim7 = "dim7";
const aug7 = "aug7";

let arpeggio;
let intervals;
let rootIndex;

function scaleType(root) {
  if (root == "F" || root.substring(1) == "b") {
    return flatNotes;
  } else {
    return sharpNotes;
  }
}

function triadFind(root, type) {
  arpeggio = new Array();
  intervals = new Array();
  rootIndex = sharpNotes.indexOf(root);

  if (root == "Cb") {
    rootIndex = flatNotes.indexOf("B");
  } else if (root == "F" || root.substring(1) == "b") {
    rootIndex = flatNotes.indexOf(root);
  }

  arpeggio.push(root);
  intervals.push("1");

  //3rd
  if (type == "maj" || type == "aug") {
    intervals.push("3");
    arpeggio.push(scaleType(root)[rootIndex + 4]);
  } else if (type == "min" || type == "dim") {
    intervals.push("b3");
    if (
      scaleType(root)[rootIndex + 3].substring(0, 1) !=
      scaleType(root)[rootIndex + 4].substring(0, 1)
    ) {
      arpeggio.push(scaleType(root)[rootIndex + 4] + "b");
    } else {
      arpeggio.push(scaleType(root)[rootIndex + 3]);
    }
  }

  //5th
  if (type == "maj" || type == "min") {
    arpeggio.push(scaleType(root)[rootIndex + 7]);
    intervals.push("5");
  } else if (type == "dim") {
    intervals.push("b5");
    if (
      scaleType(root)[rootIndex + 6].substring(0, 1) !=
      scaleType(root)[rootIndex + 7].substring(0, 1)
    ) {
      arpeggio.push(scaleType(root)[rootIndex + 7] + "b");
    } else {
      arpeggio.push(scaleType(root)[rootIndex + 6]);
      intervals.push("b5");
    }
  } else if (type == "aug") {
    intervals.push("#5");
    if (
      scaleType(root)[rootIndex + 8].substring(0, 1) !=
      scaleType(root)[rootIndex + 7].substring(0, 1)
    ) {
      arpeggio.push(scaleType(root)[rootIndex + 7] + "#");
    } else {
      arpeggio.push(scaleType(root)[rootIndex + 8]);
    }
  }
  return {
    arpeggio,
    intervals,
  };
}

//seventh chord find

function seventhChordFind(root, type) {
  //first find the triad
  if (type == maj7 || type == dom7) {
    triadFind(root, "maj");
  } else if (type == min7) {
    triadFind(root, "min");
  } else if (type == min7b5 || type == dim7) {
    triadFind(root, "dim");
  } else if (type == aug7) {
    triadFind(root, "aug");
  }

  if (type == maj7) {
    intervals.push("7");
    arpeggio.push(scaleType(root)[rootIndex + 11]);
  } else if ([dom7, min7, min7b5, aug7].indexOf(type) > -1) {
    intervals.push("b7");
    if (
      scaleType(root)[rootIndex + 10].substring(0, 1) !=
      scaleType(root)[rootIndex + 11].substring(0, 1)
    ) {
      arpeggio.push(scaleType(root)[rootIndex + 11] + "b");
    } else {
      arpeggio.push(scaleType(root)[rootIndex + 10]);
    }
  } else if (type == dim7) {
    intervals.push("bb7");
    if (scaleType(root)[rootIndex + 9].substring(1, 2) == "#") {
      arpeggio.push(scaleType(root)[rootIndex + 11].substring(0, 1) + "b");
    } else if (
      scaleType(root)[rootIndex + 9].substring(0, 1) !=
      scaleType(root)[rootIndex + 11].substring(0, 1)
    ) {
      arpeggio.push(scaleType(root)[rootIndex + 11] + "bb");
    } else {
      arpeggio.push(scaleType(root)[rootIndex + 9]);
    }
  }
  return {
    arpeggio,
    intervals,
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let chordName = input.value;
  let chordType = chordName.split(" ")[1];
  let chordRoot = chordName.split(" ")[0];

  if (chordType.length == 3) {
    chordNoteList.textContent = triadFind(chordRoot, chordType).arpeggio;
    chordIntervalList.textContent = triadFind(chordRoot, chordType).intervals;
  } else if ([maj7, dom7, min7, min7b5, dim7, aug7].indexOf(chordType) > -1) {
    chordNoteList.textContent = seventhChordFind(chordRoot, chordType).arpeggio;
    chordIntervalList.textContent = seventhChordFind(
      chordRoot,
      chordType
    ).intervals;
  }
});
