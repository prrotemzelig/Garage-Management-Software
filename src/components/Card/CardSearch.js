import React from 'react';
import { Button } from 'react-bootstrap';

const cardSearch = ( props ) => {
    const number=props.data;
    console.log(props.cardData.licenseNumber);
    console.log(number);
    if(props.cardData.licenseNumber===number){
        console.log("yesss");
        const cardDetails = []; // this is a code to transform each of my open card into an array of all the open cards.
        cardDetails.push( {name: props.customerData.customerName });
        cardDetails.push( {name: props.cardData.licenseNumber });
        cardDetails.push( {name: props.cardData.dateOfDamage});
        cardDetails.push( {name: props.cardData.ticketNumber });
        cardDetails.push( {name: props.closeDate});
       
    const cardsDetailsOutput = cardDetails.map(ig => {
        // here we return some JSX
        //we can use in ig.name as a unique key because it is unique here
        return  <td 
            
                cardData={ig.name}>{ig.name} </td>;
    });

    /**
     * <button 
        type="submit" 
        className="btn btn-md btn-primary sign-in-button"
        onClick={props.onClicked}         >
        הצגת פרטים מלאים
      </button> 
     */
    return (
        <tr  style={{fontSize: "18px", direction: "rtl"}}>
    
        {cardsDetailsOutput} 
        <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={props.onClicked}   >הצגת פרטים מלאים</Button> 

        
        </tr> 
    );
    }
    else{
        return (
            <div></div>
        );
    }
};
export default cardSearch;