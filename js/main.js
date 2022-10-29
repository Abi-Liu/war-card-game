
let deckID =''
//document.getElementById('player1War').display = none
let player1Score = 0
let player2Score = 0

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then(res => res.json() )
  .then(data => {
    console.log(data)
    deckID = data.deck_id
  })
document.querySelector('button').addEventListener('click', drawTwoCards)


function keepScore(p1, p2){
  player1Score+=p1
  player2Score+=p2
  displayScore(player1Score, player2Score)
}

function displayScore(score1, score2){
  document.getElementById('player1Score').innerText += score1.toString()
  document.getElementById('player2Score').innerText += score2.toString()
}

function drawTwoCards(){
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
