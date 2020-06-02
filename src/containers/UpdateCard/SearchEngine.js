import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from '../../components/Card/CardSearch';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import ShowData from '../../components/Card/showData';
import { Modal } from 'react-bootstrap';
class Search extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
          branchNumber:'',
          carNumber:'',
          found: false,
          click: false,
          modal: false
    }
        this.onChildClicked = this.onChildClicked.bind(this);
  }
    
  modalOpen() {
    this.setState({ modal: true });
  }
    
  modalClose() {
    this.setState({modal: false});
  }
  
  componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
      this.props.onFetchCloseCards(this.props.token, this.props.userId,this.props.branchNumber);  
  }

  onChildClicked() {
    this.setState({click : true,modal: true });
    this.modalOpen();
  }

  check(data){
    if(data.cardData.licenseNumber===this.state.carNumber){
      this.state.found=true;
    }
  }
  
    render () {
      let cards;
      this.state.carNumber= this.props.value;
      console.log(this.state.carNumber);
          if(this.state.carNumber!== "" ){
            if ( !this.props.loading ) { // if it not true - if we not loading
              cards = this.props.cards.map( card => (
                this.check(card),
                <Card
                  data={this.state.carNumber}
                  key={card.id}
                  customerData={card.customerData}
                  closeDate={card.closeDate}
                  carData={card.carData}
                  cardData={card.cardData}
                  onClicked={this.onChildClicked}/> 
               ))
            }
          }

      if(!this.state.found && this.state.carNumber!==''){
        return ( 
          <div style={ this.props.backgroundColor === 'light' ? {direction: "rtl",fontFamily: "Alef Hebrew" }:{ direction: "rtl",fontFamily: "Alef Hebrew", color: "white"}}>
            <h5>לא נמצאה היסטוריה עבור רכב זה </h5></div> 
      );
      }
    
      if(this.state.found && this.state.carNumber!=='' && !this.state.click){
      return (
        <table class="table " style={ this.props.backgroundColor === 'light' ? {direction: "rtl",fontFamily: "Alef Hebrew" }:{ direction: "rtl",fontFamily: "Alef Hebrew", color: "white"}}>
                <thead>
                    <tr style={{fontWeight: "bold", fontSize: "18px"}}>
                        <td scope="col" >שם לקוח</td>
                        <td scope="col" >מספר רכב</td>
                        <td scope="col" >תאריך הנזק</td>
                        <td scope="col" >מספר כרטיס</td>
                        <td scope="col" >תאריך סגירה</td>  
                    </tr> 
                </thead>
                <tbody >
                    {cards}
                </tbody>          
            </table>        
      );
      }
      if(this.state.found && this.state.click){
        return(
          <div  >
            <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <div className="form-group">
            <ShowData
                value={this.state.carNumber}
                />
            </div>
            
            <div className="form-group">
              <button onClick={e => this.modalClose(e)} type="button">
                סגור
              </button>
            </div>
          </Modal>
          
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
            </div>   
        );     
      }
      else{
        return(
          <div ></div> 
        );
        
      }
    }
}
const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      //cards: state.card.cards, // we get my cards from state. we state cards we are reaching out to the card reducer and with cards we then reach out to cards property in the state of my reducer 
      cards: state.card.closeCards,
      loading: state.card.loading,
      token: state.auth.token,
      userId: state.auth.userId,
      branchNumber: state.auth.branchNumber,
      backgroundColor: state.auth.backgroundColor

  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
      onFetchCloseCards: (token,userId,branchNumber) => dispatch( actions.fetchCloseCards(token, userId,branchNumber) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Search, axios ) );