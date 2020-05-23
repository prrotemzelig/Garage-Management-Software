import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {Bar, Pie} from 'react-chartjs-2';
import Date from './DatePic';
import { Modal } from 'react-bootstrap';


class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      click: false,
      date: '',
      countOpen:0,
      countClose:0,
      data:[],
      card:[]
    }
    this.onChildClicked = this.onChildClicked.bind(this);
    this.getData=this.getData.bind(this);
  
  }
  
  onChildClicked() {
    this.setState({click : true});
  }
  getData(data){
    this.setState({date : data});
  }
  componentDidMount(){
    this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);

  }
  componentWillMount(){
    this.props.onFetchCloseCards(this.props.token, this.props.userId,this.props.branchNumber);
  }



createReport(data){
 
  for(var i=0; i<data.length; i++){
  let openingDateFromClose=data[i].cardData.openingDate;
  let closeDate=data[i].closeDate;
  console.log(data[i].cardData.openingDate+'  '+data[i].cardData.licenseNumber);
  console.log(data[i].closeDate);
    if(openingDateFromClose.includes(this.state.date)){
      this.state.countOpen+=1;
      if(closeDate === undefined || closeDate === null || closeDate === ''){
        console.log("aaa");
      }
      else{
        if(closeDate.includes(this.state.date)){
          this.state.countClose+=1;
        }
      }
    }
  }
}


  render() {
   let cards=[];
     
   if(this.props.cards!=''){
    console.log(this.props.cards[0].closeDate);
    if(this.state.card.length<2){
      console.log(this.props.cards[0]);
      if(this.state.card.length===0){
          this.state.card.push(this.props.cards);
      }
      if(this.state.card.length===1){
        if(this.state.card[0][0].closeDate===this.props.cards[0].closeDate){
        }
        else{
          this.state.card.push(this.props.cards);
        } 
      } 
    }
   }
    console.log(this.state.card);

    if(this.state.date!='' && this.state.click){
      this.state.click=false;
      this.state.countClose=0;
      this.state.countOpen=0;
      
      for(var i=0;i<this.state.card[0].length;i++){
        cards.push(this.state.card[0][i]);
      }
      if(this.state.card.length>1){
        for(var i=0;i<this.state.card[1].length;i++){
          cards.push(this.state.card[1][i]);
        }
      }
      this.createReport(cards);

    }
    
    const data = {
      labels: [
       'כרטיסים שנפתחו ביום זה',
       'כרטיסים שנסגרו ביום זה',
       'חלקים שנמכרו ביום זה'
      ],
      datasets: [{
         data: [this.state.countOpen, this.state.countClose, 0,2],
         backgroundColor: [
           '#FF6384',
           '#36A2EB',
           '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
   };
   
     return (
      <div style={{direction: "rtl" }}>
         <Date style={{direction: "rtl" }}
         getData={this.getData}
         onClicked={this.onChildClicked}/>
         <div style={{direction: "rtl" }}>
          {this.state.click && this.state.date!='' ? <Bar height="100px" data={data} />:<Bar height="100px" data={data} />}
         </div>
       </div>
     );   
  }
  

}

const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      cards: state.card.cards, 
      loading: state.card.loading,
      token: state.auth.token,
      userId: state.auth.userId,
      branchNumber: state.auth.branchNumber
  };
};


const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
      onFetchCloseCards: (token,userId,branchNumber) => dispatch( actions.fetchCloseCards(token, userId,branchNumber) ),
      onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId,branchNumber) )
      //onFetch: (token,userId,branchNumber) => dispatch( actions.fetchData(token, userId,branchNumber) ),

  };
};

export default connect( mapStateToProps, mapDispatchToProps)( withErrorHandler( BarChart, axios ) );