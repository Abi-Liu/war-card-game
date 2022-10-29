
let deckID =''

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then(res => res.json() )
  .then(data => {
    console.log(data)
    deckID = data.deck_id
  })
document.querySelector('button').addEventListener('click', drawTwoCards)

function drawTwoCards(){
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
  let card1 = ''
  let card2 = ''
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        
        document.getElementById('player1').src = data.cards[0].image
        document.getElementById('player2').src = data.cards[1].image
        if(getNumberValue(data.cards[0].value) > getNumberValue(data.cards[1].value)){
          document.querySelector('h3').innerText='Player 1 Wins!'
        } else if(getNumberValue(data.cards[0].value) < getNumberValue(data.cards[1].value)){
          document.querySelector('h3').innerText='Player 2 Wins!'
      } else {
        document.querySelector('h3').innerText='WARRR'
        war()
      }
      war()
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


