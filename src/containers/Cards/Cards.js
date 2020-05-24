import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../../components/Card/Card';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


//in this page I want to output my all card for each user
class Cards extends Component {

    componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
        this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber); 
    }
    // here we want to output multiple cards, as many cards as needed
    //and the cards I need to output of curse should be fetched from the backend
    render () {
        let cards;

        if (this.props.loading) {
            cards = <div style= {{textAlign: "center",position: "center"}}><Spinner/></div>;
        }

        else if ( !this.props.loading ) { // if it not true - if we not loading
            cards = this.props.cards.map( card => (
                <Card
                    key={card.id}
                    cardData={card.cardData}
                    customerData={card.customerData}
                    carData={card.carData}
                    />
            ) )
        }
        return (
            <div class="table-wrapper" style={{direction: "rtl", backgroundColor: "white"}}>

            <table class="table table-bordered" style={{marginBottom: "1px",direction: "rtl",fontFamily: "Alef Hebrew"}} >
                <thead>
                    <tr style={{fontWeight: "bold", fontSize: "18px"}}>
                        <td scope="col" >מספר רישוי</td>
                        <td scope="col" >מספר כרטיס</td>
                        <td scope="col" >שם לקוח</td>
                        <td scope="col" >תיאור רכב</td>
                        <td scope="col" >תאריך פתיחה</td>
    
                    </tr>
                </thead>

                <tbody >
                    {cards}
                    
                </tbody>
            </table> 
            </div>
        );
    }
}

// return (
//     <div >
//         {cards} 
//     </div>
// );

const mapStateToProps = state => { // here we get the state and return a javascript object
    return {
        cards: state.card.cards, // we get my cards from state. we state cards we are reaching out to the card reducer and with cards we then reach out to cards property in the state of my reducer 
        loading: state.card.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        branchNumber: state.auth.branchNumber
    };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
    return {
        onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId, branchNumber) ) //  return a map to map my props to dispatchable functions
        //here we want to execute an anonymous function where we eventually dispatch the action we just created it
        // note - we need to execute this function - "fetchCards()" to really get the action
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Cards, axios ) ); // I need to pass axios otherwise this won't work
// I can check if withErrorHandler by delete from axios.get('/cards.json') the .json and just -> get('/cards')  

/*
    <Card
        key={card.id}
        cardData={card.cardData}/>
          
    with that -> we are passing the information to Card Component ( the other file in Component folder)
    and there we need to output it there in the Card component.
*/