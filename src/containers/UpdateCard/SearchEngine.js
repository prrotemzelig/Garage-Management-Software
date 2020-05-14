import React, { Component } from 'react'
import { connect } from 'react-redux';
import classes from '../../components/Card/Card.module.css';
import Card from '../../components/Card/CardSearch';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Serch.css'
class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          carNumber:'',
          found: false,
        }
      }
  
    componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
      this.props.onFetchCards(this.props.token, this.props.userId,this.props.branchNumber);
      
  }
  check(data){
    if(data.cardData.licenseNumber===this.state.carNumber){
      this.state.found=true;
      //this.state.dataBaseCarNumber=data.cardData.licenseNumber;
      //this.state.carDetails=data.carData;
      //this.state.cardDetails=data.cardData;
      //this.state.customer_details=data.customerData;
      //console.log(this.state.carDetails);
      //console.log(this.state.cardDetails);
      //console.log(this.state.customer_details); 
    }
  }
  
  
    render () {
      let cards;
      console.log(this.props.value);
      this.state.carNumber= this.props.value;
          if(this.state.carNumber!== "" ){
            cards = <Spinner />;
            if ( !this.props.loading ) { // if it not true - if we not loading
              cards = this.props.cards.map( card => (
                this.check(card),
              <Card
                  data={this.state.carNumber}
                  key={card.id}
                  cardData={card.cardData}/> 
               ))
               //this.check(card)
            }
          }
      //if(this.state.found && this.state.carNumber!==''){
      if(!this.state.found && this.state.carNumber!==''){
        return ( 
          <div style={{
            alignitems: 'center',
            justifycontent: 'center'}}>
            <h5>לא נמצאה היסטוריה עבור רכב זה </h5></div>
         
      );
      }else{
      return (
          <div >
              {cards} 
          </div>
      );
      }
      /*}if(!this.state.found && this.state.carNumber!==''){
        return (
          
          <div >
            <div className={classes.Card} >
              <div className="result">
              <h5>לא נמצאה היסטוריה לרכב זה</h5>
              </div>
            </div>
          </div>
      );

      }
      else{
        return(
          <div></div>
        );
      }*/
    }
  
}
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
      onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId,branchNumber) ) //  return a map to map my props to dispatchable functions
      //here we want to execute an anonymous function where we eventually dispatch the action we just created it
      // note - we need to execute this function - "fetchCards()" to really get the action
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Search, axios ) ); 

