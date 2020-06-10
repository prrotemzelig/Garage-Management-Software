import React from 'react';
import { Button } from 'react-bootstrap';

const cardSearch = ( props ) => {
    const number=props.data;
    const num=props.cardData.ticketNumber;
    if(props.cardData.licenseNumber===number){
        const cardDetails = []; // this is a code to transform each of my open card into an array of all the open cards.
        cardDetails.push( {name: props.customerData.customerName });
        cardDetails.push( {name: props.cardData.licenseNumber });
        cardDetails.push( {name: props.cardData.dateOfDamage});
        cardDetails.push( {name: props.cardData.ticketNumber });
    const cardsDetailsOutput = cardDetails.map(ig => {
        // here we return some JSX
        //we can use in ig.name as a unique key because it is unique here
        return  <td 
            
                cardData={ig.name}>{ig.name} </td>;
    });

   
    return (

        <tr  style={{fontSize: "18px", direction: "rtl"}}>
    
        {cardsDetailsOutput} 
        <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={(event)=>props.onClicked(event,num)}   >הצג פרטים</Button>

        
        </tr> 
    );
    }
    else{
        return (
            <div></div>
        );
    }
    
};
//onClick={props.onClicked} 

export default cardSearch;