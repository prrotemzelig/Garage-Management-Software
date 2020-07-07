import React from 'react';
import { Button } from 'react-bootstrap';

const cardSearch = ( props ) => {
    const number=props.data;
    const num=props.cardData.ticketNumber;
    if(props.cardData.licenseNumber===number){
        const cardDetails = []; // this is a code to transform each of my open card into an array of all the open cards.
        cardDetails.push( {name: props.cardData.licenseNumber });
        cardDetails.push( {name: props.customerData.customerName });
        cardDetails.push( {name: props.cardData.ticketNumber });
        cardDetails.push( {name: props.cardData.openingDate });
        cardDetails.push( {name: props.closeDate});
    const cardsDetailsOutput = cardDetails.map(ig => {
        return  <td 
                cardData={ig.name}>{ig.name} </td>;
    });

   
    return (
        <tr  style={props.backGroundColor=== 'light' ?
        {direction: "rtl", backgroundColor: "white"}
        : {direction: "rtl", backgroundColor: "#27293d" , color: "rgba(255, 255, 255, 0.8)"}}>
        {cardsDetailsOutput} 
       
        {window.innerWidth > '376' ? 
        <td>
        <Button bsStyle="secondary" style={props.backGroundColor=== 'light' ?{borderColor: "black"}:{borderColor: "white"}}  onClick={(event)=>props.onClicked(event,num)}   >הצג פרטים</Button>
      </td> 
       :
       <td>
        <Button bsStyle="secondary" style={props.backGroundColor=== 'light' ?{borderColor: "black", fontSize: "8px"}:{borderColor: "white", fontSize: "8px"}}  onClick={(event)=>props.onClicked(event,num)}   > פרטים</Button>
        </td> 
            }
        
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