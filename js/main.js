
let player1Score 
let player2Score 

let deckID = localStorage.getItem('id')


//document.getElementById('player1War').display = none



if(localStorage.getItem('p1Score') && localStorage.getItem('p2Score')){
   player1Score = Number(localStorage.getItem('p1Score'))
   player2Score = Number(localStorage.getItem('p2Score'))
} else {
  localStorage.setItem('p1Score', 0)
  localStorage.setItem('p2Score', 0)
}



if(!localStorage.getItem('id')){
  
  fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then(res => res.json() )
  .then(data => {
    console.log(data)
    localStorage.setItem('id', data.deck_id)
    deckID = localStorage.getItem('id')
  })
}

document.getElementById('deal').addEventListener('click', drawTwoCards)
document.getElementById('reset').addEventListener('click', resetGame)


function resetGame(){
  localStorage.setItem('id', '')
  deckID = ''
  localStorage.setItem('p1Score', 0)
  player1Score = 0
  localStorage.setItem('p2Score', 0)
  player2Score = 0
  document.getElementById('player1Score').innerText = `Score: ` + 0
  document.getElementById('player1Score').innerText = `Score: ` + 0
  fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then(res => res.json() )
  .then(data => {
    console.log(data)
    localStorage.setItem('id', data.deck_id)
    deckID = localStorage.getItem('id')
  })
  .catch(err => {
    console.log(`error ${err}`)
  })
}

function keepScore(p1, p2){
  player1Score+=p1
  player2Score+=p2
  localStorage.setItem('p1Score', player1Score)
  localStorage.setItem('p2Score', player2Score)
  displayScore()
}

function displayScore(){

  document.getElementById('player1Score').innerText = 'Score:' + player1Score
  document.getElementById('player2Score').innerText = `Score: ` + player2Score
}

function drawTwoCards(){
  document.querySelectorAll('.faceDown').forEach(x => x.innerHTML = '')
  document.getElementById('player1War').innerHTML = ''
  document.getElementById('player2War').innerHTML = ''
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        
        document.getElementById('player1').src = data.cards[0].image
        document.getElementById('player2').src = data.cards[1].image
        if(getNumberValue(data.cards[0].value) > getNumberValue(data.cards[1].value)){
          document.getElementById('result').innerText='Player 1 Wins!'
          keepScore(2, 0)
        } else if(getNumberValue(data.cards[0].value) < getNumberValue(data.cards[1].value)){
          document.getElementById('result').innerText='Player 2 Wins!'
          keepScore(0, 2)
      } else {
        document.getElementById('result').innerText='WARRR'
        war()
      }
    })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function getNumberValue(card){
  if(card === 'ACE'){
    return 14
  } else if (card === 'KING'){
    return 13
  } else if (card === 'QUEEN'){
    return 12
  } else if (card === 'JACK'){
    return 11
  } else {
    return Number(card)
  }
}


function war(){
  document.querySelectorAll('.faceDown').forEach(x => x.innerHTML = '<img class = "faceDownCards" src = "https://deckofcardsapi.com/static/img/back.png"></img>' )
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=6`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))


  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        
        document.getElementById('player1War').innerHTML = `<img class = "faceDownCards" src = "https://deckofcardsapi.com/static/img/${data.cards[0].code}.png"></img>`
        document.getElementById('player2War').innerHTML = `<img class = "faceDownCards" src = "https://deckofcardsapi.com/static/img/${data.cards[1].code}.png"></img>`
        if(getNumberValue(data.cards[0].value) > getNumberValue(data.cards[1].value)){
          document.getElementById('result').innerText='Player 1 Wins!'
          keepScore(10, 0)
        } else if(getNumberValue(data.cards[0].value) < getNumberValue(data.cards[1].value)){
          document.getElementById('result').innerText='Player 2 Wins!'
          keepScore(0, 10)
      } else {
        document.getElementById('result').innerText='WARRR'
      }
    })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
