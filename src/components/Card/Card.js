import React from 'react';
import classes from './Card.module.css';

// show the details of each card that in the garage right now
const card = ( props ) => {
    const cardDetails = []; // this is a code to transform each of my open card into an array of all the open cards.

    for ( let fieldName in props.cardData ) {
        cardDetails.push( //the object we are pushing into this array
            {
                name: fieldName, //store the name of the field 
                data: props.cardData[fieldName] // store the value of the field ( what the user entered)
            }
        );
    }

    //after we pushed into the cards array, 
    //we can map my cards to text basically in the return ->  <p> {cardsDetailsOutput}</p>
    const cardsDetailsOutput = cardDetails.map(ig => {
        // here we return some JSX
        //we can use in ig.name as a unique key because it is unique here
        return <span 
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={ig.name}>{ig.name} ({ig.data})</span>;
    });

    return (
        <div className={classes.Card}>
            <p>פרטי הרכב </p>
            <p> {cardsDetailsOutput}</p>
        </div>
    );
};

export default card;