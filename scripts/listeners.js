// console.log('as')

// // Add listeners to all notes elements
// for (let i = 0; i < noteNames.length; i++) {
//   document.getElementById(noteNames[i]).addEventListener('mousedown', () => {
//     if (!scaling) notes[i].playNote(1)
//   })
//   document.getElementById(noteNames[i]).addEventListener('mouseup', () => {
//       if (!scaling) {
//           paintBack(i, true)
//           notes[i].pauseNote(true)
//       }      
//   })
//   document.getElementById(noteNames[i]).addEventListener('mouseleave', (event) => {
//       if (!scaling) {
//           paintBack(i, true)
//           notes[i].pauseNote(true)
//       }     
//   })
// }        

// // add listener for chord mode element
// document.getElementById('magicMode').addEventListener('click', () => {
//   if (!scaling) toggleMagicMode();
// })

// // add listener for major element
// document.getElementById("major").addEventListener("click", () => {
//   if (magicMode && !scaling) majorMode();                
// })

// // add listener for minor element
// document.getElementById("minor").addEventListener("click", () => {
//   if (magicMode && !scaling) minorMode();
      
// })

// // add listener for scale element
// document.getElementById("chord").addEventListener("click", () => {
//   if (magicMode && !scaling) chordMode();
// })

// // add listener for chord chords element
// document.getElementById("scale").addEventListener("click", () => {
//   if (magicMode && !scaling) scaleMode();   
// })

// // add listener for backwards element
// document.getElementById("backwards").addEventListener("click", () => {
//           if (magicMode && !scaling) toggleBackwardsMode();
//       }   
// );

// // add listener for arpeggio element
// document.getElementById("arpeggio").addEventListener("click", () => {
//   if (magicMode && !scaling) {
//       toggleArpeggioMode();
//   }
// });

// document.getElementById("record").addEventListener("click", () => {
//   if (!scaling) {
//     toggleRecordMode();
//   }
// });

// document.getElementById("play").addEventListener("click", () => {
//   if (!recording && recordArray.length > 1) {        
//     playSong(recordArray);
//   }
// })

// //add listeners to key presses
// document.addEventListener("keydown", (event) => {
//   if (!scaling && noteKeys.indexOf(event.keyCode) != -1) {
//     notes[noteKeys.indexOf(event.keyCode)].playNote(1);
//   }
// })

// //add listeners to key releases
// document.addEventListener('keyup', (event) => {
//       if (!scaling && noteKeys.indexOf(event.keyCode) != -1) {
//         paintBack(notes[noteKeys.indexOf(event.keyCode)], true)
//         notes[noteKeys.indexOf(event.keyCode)].pauseNote(true)
//       }
//   }
// )