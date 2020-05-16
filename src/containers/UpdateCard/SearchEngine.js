import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from '../../components/Card/CardSearch';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import ShowData from '../../components/Card/showData';
import Spinner from '../../components/UI/Spinner/Spinner';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          branchNumber:'',
          carNumber:'',
          found: false,
          click: false
        }
        this.onChildClicked = this.onChildClicked.bind(this);

      }
  
  componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
      this.props.onFetchCards(this.props.token, this.props.userId,this.props.branchNumber);
      
  }
  onChildClicked() {
    this.setState({click : true });
  }
  check(data){
    if(data.cardData.licenseNumber===this.state.carNumber){
      this.state.found=true;
    }
  }
  
    render () {
      var f;
      let cards;
      this.state.carNumber= this.props.value;
      console.log(this.state.click);
          if(this.state.carNumber!== "" ){
            cards = <Spinner />;
            if ( !this.props.loading ) { // if it not true - if we not loading
              cards = this.props.cards.map( card => (
                this.check(card),
                <Card
                  data={this.state.carNumber}
                  key={card.id}
                  customerData={card.customerData}
                  carData={card.carData}
                  cardData={card.cardData}
                  onClicked={this.onChildClicked}/> 
               ))
            }
          }
          console.log(cards);
      if(!this.state.found && this.state.carNumber!==''){
        return ( 
          <div >
            <h5>לא נמצאה היסטוריה עבור רכב זה </h5></div> 
      );
      }
      if(this.state.found && this.state.carNumber!=='' && !this.state.click){
        
      return (
        <table class="table " style={{direction: "rtl",fontFamily: "Alef Hebrew"}}>
                <thead>
                    <tr style={{fontWeight: "bold", fontSize: "18px"}}>
                        <td scope="col" >שם לקוח</td>
                        <td scope="col" >מספר רכב</td>
                        <td scope="col" >תאריך הנזק</td>
                        <td scope="col" >מספר כרטיס</td>
                        <td scope="col" >תאריך פתיחה</td> 
                         
                    </tr>
                    
                </thead>

                <tbody >
                    {cards}
  
                </tbody>
                
            </table>        
      );
      }
      if(this.state.found && this.state.click){
        console.log("aa");
        return(
          <div>  
              <ShowData
                value={this.state.carNumber}
                />
            </div> 
        );     
      }
      else{
        return(
          <div></div>
        );
        
      }
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
      onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId,branchNumber) ),
      //  return a map to map my props to dispatchable functions
      //here we want to execute an anonymous function where we eventually dispatch the action we just created it
      // note - we need to execute this function - "fetchCards()" to really get the action
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Search, axios ) ); 

