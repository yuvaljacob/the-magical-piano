let notes = []
let sequenceMode = false
let isScaleMode = false
let sequencing = false
let isBackwards = false
let isArpeggio = false
let scaleSpeed = 0
let endTime
let recording = false
let startTime = 0
let recordCounter = 1
let oldNote
let playing
let step
let currentSequenceNote
let elapsedRecordingTime = 0
let recordIncrement = 0
let scaleNote = [0, 0, 0, 0, 0, 0, 0]
// songArray = [
//     [0, 0], [7,  0], [4, 500], [4, 500], 
//     [5, 1000], [2, 500], [2, 500], [0, 1000], 
//     [2, 500], [4, 500], [5, 500], [7, 500], 
//     [7, 500], [7, 500]
// ]
let recordArray = [[0, 0]]
let pauseArray = [[0, 0]]

// Add play method to Audio class
Audio.prototype.playNote = function(isRootNote) {
    console.log(this)
    this.load()
    this.play()
    document.getElementById(noteNames[this.index]).style.backgroundColor = 'gray'
    if (isRootNote) {
        document.getElementById('current-note').innerHTML += noteNames[this.index] + ' '
        if (sequenceMode) {
            document.getElementById('current-note').innerHTML += ' ' + currentScale + ' ' + currentMode
            sequencing = true
            let current = this.index
            playSequence(current)
        }
    }
    if (recording && isRootNote) {
        if (recordCounter === 1) {
            oldNote = this.index
        }
        endTime = performance.now()
        if (recordCounter > 1) {
            recordArray[recordCounter - 1] = [oldNote, endTime - startTime]
        }
        recordArray.push([this.index, 0])
        startTime = endTime
        recordCounter++
        oldNote = this.index
    }
}

// Add pause method to Audio class
Audio.prototype.pauseNote = function(isRootNote) {
    this.pause()
    paintBack(this.index)
    if (isRootNote && sequenceMode) {     
        if (isScaleMode) {
            for (let i = 0; i < scaleNote.length; i++) {
                if (!isBackwards && this.index + scaleNote[i] < notes.length) {
                    notes[this.index + scaleNote[i]].pauseNote(false); 
                } else if (isBackwards && this.index + scaleNote[7 - i] - 12 >= 0) {
                    notes[this.index + scaleNote[7 - i] - 12].pauseNote(false)
                }
            }
        } else if (!isBackwards) {
            notes[this.index + scaleNote[2]].pauseNote(false)
            notes[this.index + scaleNote[4]].pauseNote(false)
        } else {
            if (this.index + scaleNote[2] - 12 < 0) return
            notes[this.index + scaleNote[4] - 12].pauseNote(false)
            notes[this.index + scaleNote[2] - 12].pauseNote(false)
        }   
    }
}

let chordLoop = (note) => {
    currentSequenceNote = !isBackwards ? note + scaleNote[step * 2] : note + scaleNote[(3 - step) * 2] - 12
    setTimeout(() => {
        if (currentSequenceNote >= 0 && currentSequenceNote < notes.length) {
            if (!isBackwards) {
                notes[currentSequenceNote].playNote(false)
                 // need to add 'if standardChord' here (instead of 7th for example)
            } else { // playing backwards
                    notes[currentSequenceNote].playNote(false)
            }
            step++
            if (step <= numOfSteps) {
                chordLoop(note)
            } else {
                if (isArpeggio) setTimeout(paintBack(note, true), scaleSpeed)
                sequencing = false
            }
        }
    }, scaleSpeed)
}

let scaleLoop = (note) => {
    currentSequenceNote = !isBackwards ? note + scaleNote[step] : note - scaleNote[step]
    setTimeout(() => {
        if (currentSequenceNote >= 0 && currentSequenceNote < notes.length) {
            if (!isBackwards) { // playing forwards
                notes[note + scaleNote[step]].playNote(false)
            } else { // playing backwards
                notes[note + scaleNote[7 - step] - 12].playNote(false)
            }
            step++
            if (step <= numOfSteps) {
                scaleLoop(note)
            } else {
                if (isArpeggio) setTimeout(paintBack(note, true), scaleSpeed)
                sequencing = false
            }
        } else {
            paintBack(note, true)
            sequencing = false
        }
    }, scaleSpeed)
}

function playSequence(note) {
    currentSequenceNote = 0
    step = 1
    switch (currentMode) {
        case 'Chord':
            chordLoop(note)
            break
        case 'Scale':
            scaleLoop(note)
            break
        default:
            console.error('Unexpcetedly defaulted playSequence switch statement')
    }
}

// Paint elements back to their original color
function paintBack(note, isRoot = false) {
    if (isRoot) {
        document.getElementById('current-note').innerHTML = ''
    }
    if (note >= 0 && note < notes.length) {
        if (document.getElementById(noteNames[note]).className === 'white-key') {
            document.getElementById(noteNames[note]).style.backgroundColor = 'white'
        } else {
            document.getElementById(noteNames[note]).style.backgroundColor = 'black'
        }
    }
    if (isRoot && sequenceMode) {
        if (isScaleMode) {
            for (let i = 1; i < scaleNote.length; i++) {
                if (!isBackwards) {
                    paintBack(note + scaleNote[i])
                }
                paintBack(note + scaleNote[7 - i] - 12)
            }
        } else if (!isBackwards) {
            paintBack(note + scaleNote[2])
            paintBack(note + scaleNote[4])
        } else {
            paintBack(note + scaleNote[4] - 12)
            paintBack(note + scaleNote[2] - 12)
        } 
    }
}

let clockRun = () => { // Inefficient, needs re-writing
    document.getElementById('clock').innerHTML = ('Recording time: ' + elapsedRecordingTime.toFixed(2) + ' seconds');
    elapsedRecordingTime += recordIncrement
    setTimeout(clockRun, 100)
}

function playRecording(songArray) {
    elapsedRecordingTime = 0
    recordIncrement = 0.1
    clockRun()
    playing = true
    let x = 1
    function songLoop() {
        setTimeout(function () {
            notes[songArray[x - 1][0]].pauseNote(false)
            notes[songArray[x][0]].playNote(true)
            x++
            if (x < songArray.length) {
                songLoop()
            } else {
                document.getElementById('currentnote').innerHTML = ''
                paintBack(songArray[x - 1][0], false)
                recordIncrement = 0
                playing = false
            }
        }, songArray[x - 1][1])
    }
    songLoop()
}
        
// Create an object for each note
for (let i = 0; i < noteNames.length; i++) {
    assignNote(i)
}
