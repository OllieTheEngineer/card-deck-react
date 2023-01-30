import React, { useState, useEffect } from 'react'
import Cards from './Cards';
import axios from "axios";

// Build an app that displays a deck of cards, one card at a time. 
// When the page loads, go to the Deck of Cards API to create a new deck, 
// and show a button on the page that will let you draw a card.
// Every time you click the button, display a new card, 
// until there are no cards left in the deck. 
// If you try to draw when there are no cards remaining, 
// an alert message should appear on the screen with the text 
// “Error: no cards remaining!”.


// 1- set variables with useState

// 2- use useEffect to load cardDeck from the API after the page loads

// 3- create an onclick that will draw a new card

// 4- create button for the onclick that will display cards

// 5- create a condition in which if there are no cards remaining
// it will display an alert message

// 6- create a button that will reset deck

function DeckOfCards() {
    const [cards, setCards ] = useState(null);
    const [ cardDeck, setCardDeck] = useState(null);

    // downloading cards in the deck from API
    useEffect(() => {
        async function fetchData() {
            let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
            setCards(res.data);
        }
        fetchData();
    }, [setCards]);


  const drawNewCard = () => {
    if(cardDeck === 0) {
      async function fetchCard(){
        let results = await axios.get("https://deckofcardsapi.com/api/deck/<<deck_id>>/draw");
        setCards(results.data[0]);
        setCardDeck(results.data.remaining);
      }
      fetchCard();
    } else {
      alert("Error: There are no cards remaining!");
    }
  };

const card = cardDeck.map( c => (
  <Cards key={c.id} name={c.name} image={c.image}/>
))

  return (
    <div>
        <div>{card}</div>
        <button onClick={drawNewCard}> Give me a new card</button>
    </div>
  )
}

export default DeckOfCards;