import React, { Component } from 'react'
import { connect } from 'react-redux';

import Card from '../../components/Card/CardSearch';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          carNumber:'',
          //count:0
        }
      }
  
    componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
      this.props.onFetchCards(this.props.token, this.props.userId);
      
  }
    render () {
      let cards;
      this.state.carNumber= this.props.value;
      //this.state.count=this.props.data;
      //console.log(this.state.carNumber+" ");
      //console.log(this.state.count+" ");
      //if(this.state.count === 1){
          if(this.state.carNumber!== "" ){
            cards = <Spinner />;
            //console.log(this.state.count+" ");
            if ( !this.props.loading ) { // if it not true - if we not loading
              cards = this.props.cards.map( card => (
              <Card
                  data={this.state.carNumber}
                  key={card.id}
                  cardData={card.cardData}/>
               ) )
            }
          }
      //}
      return (
          <div >
              {cards} 
          </div>
      );
    }
  
}
const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      cards: state.card.cards, // we get my cards from state. we state cards we are reaching out to the card reducer and with cards we then reach out to cards property in the state of my reducer 
      loading: state.card.loading,
      token: state.auth.token,
      userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
      onFetchCards: (token,userId) => dispatch( actions.fetchCards(token, userId) ) //  return a map to map my props to dispatchable functions
      //here we want to execute an anonymous function where we eventually dispatch the action we just created it
      // note - we need to execute this function - "fetchCards()" to really get the action
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Search, axios ) ); 

