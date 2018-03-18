

///// DOM ELEMENTS //////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

let pad1 = document.getElementById('pad1')
let pad2 = document.getElementById('pad2')
let pad3 = document.getElementById('pad3')
let pad4 = document.getElementById('pad4')

let padsWindow = document.getElementById('padsWindow')
let startButton = document.getElementById('startButton')
let p = document.getElementsByTagName('p')[0]
let youDo = document.getElementById('youDo')
let winScreen = document.getElementById('winScreen')
let nextButton = document.getElementById('nextButton')
let userButtons = document.getElementsByClassName('userButtons')
let h5 = document.getElementsByTagName('h5')[0]
let watchSimon = document.getElementById('watchSimon')

let cNote = document.getElementById('c')
let eNote = document.getElementById('e')
let gNote = document.getElementById('g')
let aNote = document.getElementById('a')


///// ADD NUM DATA TO PADS ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

pad1.simonNum = 0
pad2.simonNum = 1
pad3.simonNum = 2
pad4.simonNum = 3



///// GLOABAL STATES /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

amountOfNotes = 4
simonNotesArray = []

userPlayedNotes = []
userMiss = 0

intervalTime = 600
userTurn = false
nextReady = true
level = 1



///// KEYDOWN FOR PADS ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

window.addEventListener("keydown", function (e) {

    if (e.keyCode == 87) {
        pad1.style.backgroundColor = "rgb(0, 50, 255)"
        cNote.play()
        if (userTurn == true) {
          userPlayedNotes.push(pad1.simonNum)
          checkWin()
        }
    } else if (e.keyCode == 65) {
        pad2.style.backgroundColor = "rgb(255, 255, 100)"
        eNote.play()
        if (userTurn == true) {
          userPlayedNotes.push(pad2.simonNum)
          checkWin()
        }
    } else if (e.keyCode == 83) {
        pad3.style.backgroundColor = "rgb(255, 50, 50)"
        gNote.play()
        if (userTurn == true) {
          userPlayedNotes.push(pad3.simonNum)
          checkWin()
        }
    } else if (e.keyCode == 68) {
        pad4.style.backgroundColor = "rgb(0, 255, 100)"
        aNote.play()
        if (userTurn == true) {
          userPlayedNotes.push(pad4.simonNum)
          checkWin()
        }
    }

})



///// KEYUP FOR PADS /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

window.addEventListener("keyup", function (e) {

  if (e.keyCode == 87) {
        pad1.style.backgroundColor = "black"
  } else if (e.keyCode == 65) {
        pad2.style.backgroundColor = "black"
  } else if (e.keyCode == 83) {
        pad3.style.backgroundColor = "black"
  } else if (e.keyCode == 68) {
        pad4.style.backgroundColor = "black"
  }

})



///// KEYPRESS FOR ENTER /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

window.addEventListener("keypress", function (e) {
  if (e.keyCode == 13) {
    if (nextReady == true) {

      userButtons[0].style.backgroundColor = "white"
      userButtons[1].style.backgroundColor = "white"

      simonNotesArray = createNotesArray(amountOfNotes)

      setTimeout( ()=> {
        h5.innerHTML = `LEVEL : ${level}`
        startButton.style.display = "none"
        p.style.display = "none"
        winScreen.style.display = "none"
        userButtons[0].style.backgroundColor = "black"
        userButtons[1].style.backgroundColor = "black"

        userTurn = false;
        nextReady = false;

        padsWindow.style.display = "flex"
        playNextArray(simonNotesArray)
        console.log("Level = " + level)
        console.log("Interval = " + intervalTime)
        console.log("Amount = " + amountOfNotes)
        console.log("Simon = " + simonNotesArray)
      }, 200)

    }
  }
})


///// KEYPRESS FOR ENTER /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function playNextArray(arrayToPlay) {

  userTurn = false
  watchSimon.style.display = "block"

  let i = 0

  let playNotes = setInterval( ()=> {

    if (i < arrayToPlay.length) {

      if (arrayToPlay[i] == pad1.simonNum) {
          pad1.style.backgroundColor = "rgb(0, 50, 255)"
          cNote.play()
          setTimeout( ()=>{pad1.style.backgroundColor = "black"}, 200);
          i += 1
      } else if (arrayToPlay[i] == pad2.simonNum) {
          pad2.style.backgroundColor = "rgb(255, 255, 100)"
          eNote.play()
          setTimeout( ()=>{pad2.style.backgroundColor = "black"}, 200);
          i += 1
      } else if (arrayToPlay[i] == pad3.simonNum) {
          pad3.style.backgroundColor = "rgb(255, 50, 50)"
          gNote.play()
          setTimeout( ()=>{pad3.style.backgroundColor = "black"}, 200);
          i += 1
      } else if (arrayToPlay[i] == pad4.simonNum) {
          pad4.style.backgroundColor = "rgb(0, 255, 100)"
          aNote.play()
          setTimeout( ()=>{pad4.style.backgroundColor = "black"}, 200);
          i += 1
      }

    } else if (i >= arrayToPlay.length) {
      clearInterval(playNotes)
      userPlayedNotes = []
      userTurn = true
      watchSimon.style.display = "none"
      youDo.style.display = "block"
    }

  }, intervalTime)

}



///// CHECK WIN FUNCTION /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function checkWin () {


  console.log(userPlayedNotes)

  if (userPlayedNotes.length >= simonNotesArray.length) {

    for (i = 0; i < simonNotesArray.length; i++) {
      if (simonNotesArray[i] == userPlayedNotes[i]) {
        userMiss += 0
      } else if (simonNotesArray[i] != userPlayedNotes[i]) {
        userMiss += 1
      }
    }

    ///// WIN ///////////////////////////////////////////////////////////////
    if (userMiss == 0 ) {
      padsWindow.style.display = "none"
      youDo.style.display = "none"
      winScreen.style.display = "block"

      userTurn = false
      nextReady = true
      level += 1

      if (level % 2 != 0 && level > 2 && intervalTime > 300) {
        intervalTime -= 100
      } else if (level % 2 == 0 && level > 2) {
        amountOfNotes += 1
      }


    ///// WIN ///////////////////////////////////////////////////////////////
    } else if (userMiss >= 1) {
      alert("You Lose!")
      window.location.href = "index.html"
    }

  }

}



///// CREATE NOTES ARRAY FUNCTION /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

  function createNotesArray (num) {

    let createdArray = []

    for (i = 0; i < num; i++ ) {
      createdArray.push(  Math.floor( Math.random() * 4)  )
    }
    return createdArray
  }









//////////////////////////////////////////////////////////////////////////////
