// Utils script for running the main 'script.js' file, includes functions and DOM Event Listeners

const noteNames = [
  'C1', 'Cs1', 'D1', 'Ds1', 'E1', 'F1', 'Fs1', 
  'G1', 'Gs1', 'A1', 'As1', 'B1', 'C2', 'Cs2', 
  'D2', 'Ds2', 'E2', 'F2','Fs2','G2','Gs2','A2', 
  'As2','B2','C3'
]
const noteKeys = [
  65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 
  85, 74, 75, 79, 76, 80, 59, 39, 93, 92
]
const minorScaleIntervals = [2, 3, 5, 7, 8, 10, 12]
const majorScaleIntervals = [2, 4, 5, 7, 9, 11, 12]
const sequenceElements = ['major', 'minor', 'scale', 'chord', 'backwards', 'arpeggio']

// Functions

const toggleSequenceMode = () => {
    if (sequenceMode) {
        hideOption('sequence-mode')
        sequenceMode = false
        sequenceElements.forEach(hideElement)
    } else {
        showOption('sequence-mode')
        sequenceMode = true
        majorMode()
        chordMode()
        document.getElementById('major').innerHTML = 'Major'
        document.getElementById('minor').innerHTML = 'Minor'
        document.getElementById('chord').innerHTML = 'Play Chords'
        document.getElementById('scale').innerHTML = 'Play Scales'
        document.getElementById('backwards').innerHTML = 'Play Chord / Scale Backwards'
        document.getElementById('arpeggio').innerHTML = 'Arpeggiate Notes'
        hideOption('backwards')
        hideOption('arpeggio')
    }
}

const chordMode = () => {
    isScaleMode = false
    showOption('chord')
    hideOption('scale')
    currentMode = 'Chord'
    numOfSteps = 2
}

const scaleMode = () => {
    isScaleMode = true
    showOption('scale')
    hideOption('chord')
    currentMode = 'Scale'
    numOfSteps = 7
}

const toggleBackwardsMode = () => {
    isBackwards = !isBackwards
    isBackwards ? showOption('backwards') : hideOption('backwards')
}

const toggleArpeggioMode = () => {
    isArpeggio = !isArpeggio
    scaleSpeed = isArpeggio ? 500 : 0
    isArpeggio ? showOption('arpeggio') : hideOption('arpeggio')
}

const toggleRecordMode = () => {
    recording = !recording
    recordIncrement = recording ? 0.1 : 0
    recording ? showOption('record') : hideOption('record')
    if (recording) {
        startTime = performance.now()
        clockRun()
    }
}

// Set chord mode to major
const majorMode = () => {
    showOption('major')
    hideOption('minor')
    console.log()
    majorScaleIntervals.forEach((val, index) => scaleNote[index + 1] = val)
    currentScale = 'Major'
}

// Set chord mode to minor
const minorMode = () => {
    showOption('minor')
    hideOption('major')
    minorScaleIntervals.forEach((val, index) => scaleNote[index + 1] = val)
    currentScale = 'Minor'
}

// Create an object for a given note
const assignNote = (num) => {       
    notes[num] = new Audio(`./sounds/${noteNames[num]}.mp3`)
    notes[num].index = num
}

const hideElement = (elementId) => {
    const element = document.getElementById(elementId)
    element.innerHTML = ''
    element.style.border = '0px solid black'
    element.style.backgroundColor = ''
}

const showOption = (elementId) => {
    const element = document.getElementById(elementId)
    element.style.backgroundColor = 'green'
    element.style.border = '3px solid black'
}

const hideOption = (elementId) => {
    const element = document.getElementById(elementId)
    element.style.backgroundColor = 'red'
    element.style.border = '0px solid black'
}


// DOM Event Listeners

// Add listeners to all notes elements
for (let i = 0; i < noteNames.length; i++) {
  document.getElementById(noteNames[i]).addEventListener('mousedown', () => {
    if (!sequencing) notes[i].playNote(true)
  })
  document.getElementById(noteNames[i]).addEventListener('mouseup', () => {
      if (!sequencing) {
          paintBack(i, true)
          notes[i].pauseNote(true)
      }      
  })
  document.getElementById(noteNames[i]).addEventListener('mouseleave', () => {
      if (!sequencing) {
          paintBack(i, true)
          notes[i].pauseNote(true)
      }     
  })
}        

// add listener for chord mode element
document.getElementById('sequence-mode').addEventListener('click', () => {
  if (!sequencing) toggleSequenceMode();
})

// add listener for major element
document.getElementById('major').addEventListener('click', () => {
  if (sequenceMode && !sequencing) majorMode();                
})

// add listener for minor element
document.getElementById('minor').addEventListener('click', () => {
  if (sequenceMode && !sequencing) minorMode();
      
})

// add listener for scale element
document.getElementById('chord').addEventListener('click', () => {
  if (sequenceMode && !sequencing) chordMode();
})

// add listener for chord chords element
document.getElementById('scale').addEventListener('click', () => {
  if (sequenceMode && !sequencing) scaleMode();   
})

// add listener for backwards element
document.getElementById('backwards').addEventListener('click', () => {
          if (sequenceMode && !sequencing) toggleBackwardsMode();
      }   
);

// add listener for arpeggio element
document.getElementById('arpeggio').addEventListener('click', () => {
  if (sequenceMode && !sequencing) {
      toggleArpeggioMode();
  }
});

document.getElementById('record').addEventListener('click', () => {
  if (!sequencing) {
    toggleRecordMode();
  }
});

document.getElementById('play').addEventListener('click', () => {
  if (!recording && recordArray.length > 1) {        
    playRecording(recordArray)
  }
})

//add listeners to key presses
document.addEventListener('keydown', (event) => {
  if (!sequencing && noteKeys.indexOf(event.keyCode) != -1) {
    notes[noteKeys.indexOf(event.keyCode)].playNote(true);
  }
})

//add listeners to key releases
document.addEventListener('keyup', (event) => {
  console.log(event.keyCode)
  console.log(event.code)
  console.log(event.key)
  if (!sequencing && noteKeys.indexOf(event.keyCode) != -1) {
    paintBack(notes[noteKeys.indexOf(event.keyCode)], true)
    notes[noteKeys.indexOf(event.keyCode)].pauseNote(true)
  }
})