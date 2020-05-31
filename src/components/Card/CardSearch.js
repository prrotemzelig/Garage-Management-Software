import React from 'react';


const cardSearch = ( props ) => {
    const number=props.data;

    if(props.cardData.licenseNumber===number){
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

    
    return (
        <tr  style={{fontSize: "18px", direction: "rtl"}}>
    
        {cardsDetailsOutput} 
        <button 
        type="submit" 
        className="btn btn-md btn-primary sign-in-button"
        onClick={props.onClicked}         >
        הצגת פרטים מלאים
      </button> 
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