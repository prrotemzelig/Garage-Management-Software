import React from 'react';
//import classes from './Card.module.css';
/// rotem
// show the details of each card that in the garage right now
const card = ( props ) => {
    const cardDetails = []; // this is a code to transform each of my open card into an array of all the open cards.

    // for ( let fieldName in props.cardData ) {
    //     cardDetails.push( //the object we are pushing into this array
    //         {
    //             name: fieldName, //store the name of the field 
    //             data: props.cardData[fieldName] // store the value of the field ( what the user entered)
    //         }
    //     );
    // }

    
        cardDetails.push( //the object we are pushing into this array
            {
                name: props.cardData.licenseNumber, //store the name of the field 
               // data: "licenseNumber", // store the value of the field ( what the user entered)
            
                //name: props.cardData.licenseNumber, 
                //data: props.cardData.licenseNumber[props.cardData.licenseNumber],
            }
            
        );

        cardDetails.push( //the object we are pushing into this array
            {
                name: props.cardData.ticketNumber, //store the name of the field 
                //data: "ticketNumber" // store the value of the field ( what the user entered)
            }
        );



        cardDetails.push( //the object we are pushing into this array
            {
                name: props.customerData.customerName, //store the name of the field 
               // data: props.customerData.customerName[props.customerData.customerName] // store the value of the field ( what the user entered)
            }
        );

        cardDetails.push( //the object we are pushing into this array
            {
                name: props.carData.carDescription, //store the name of the field 
                //data: props.carData.carDescription[props.carData.carDescription] // store the value of the field ( what the user entered)
            }
        );

        cardDetails.push( //the object we are pushing into this array
            {
                name: props.cardData.openingDate, //store the name of the field 
               // data: props.cardData.openingDate[props.cardData.openingDate] // store the value of the field ( what the user entered)
            }
        );
    



        

    //after we pushed into the cards array, 
    //we can map my cards to text basically in the return ->  <p> {cardsDetailsOutput}</p>
    const cardsDetailsOutput = cardDetails.map(ig => {
        // here we return some JSX
        //we can use in ig.name as a unique key because it is unique here
        return  <td 
            
                cardData={ig.name}>{ig.name} </td>;
    });

   /*  const cardsDetailsOutput = cardDetails.map(ig => {
        // here we return some JSX
        //we can use in ig.name as a unique key because it is unique here
        return <span 
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
                color: 'black'
                }}
                cardData={ig.name}>{ig.name} ({ig.data})</span>;
    });*/

//     <tr>
//     <th scope="row">1</th>
//     <td>Mark</td>
//     <td>Otto</td>
//     <td>@mdo</td>
//   </tr>
    return (
    
        <tr  style={{fontSize: "18px", direction: "rtl"}}>
    
        {cardsDetailsOutput}
        </tr>  

 
    );
};

{/* <div className={classes.Card} >
<p style={{color:'black'}}>פרטי הרכב </p>
<p> {cardsDetailsOutput}</p>
</div> */}

export default card;