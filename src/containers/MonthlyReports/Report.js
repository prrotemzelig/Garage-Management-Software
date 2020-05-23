import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {Bar} from 'react-chartjs-2';
import Date from './DatePic';
import axios2 from '../../axios-cards';


class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      click: false,
      date: '',
      countOpen:0,
      countClose:0,
      temp: true,
      data:[],
      card:[],
      open_card:[],
      close_card:[],
      count:0
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



check(data){
 
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
     if(this.state.open_card.length<2){
    if(this.state.open_card.length===1){
      if(this.state.open_card[0]!== this.props.cards && this.state.open_card[0].length!== this.props.cards.length){
        this.state.open_card.push(this.props.cards);
       }
    }
    if(this.state.open_card.length===0){
      this.state.open_card.push(this.props.cards);
     }
    }
   }
    console.log(this.state.open_card);

    if(this.state.date!='' && this.state.click){
      this.state.click=false;
      console.log(this.state.date);
      this.state.countClose=0;
      this.state.countOpen=0;
      
      for(var i=0;i<this.state.open_card[0].length;i++){
        //this.state.card.push(this.state.open_card[0][i]);
        cards.push(this.state.open_card[0][i]);
      }
      if(this.state.open_card.length>1){
      for(var i=0;i<this.state.open_card[1].length;i++){
        //this.state.card.push(this.state.open_card[1][i]);
        cards.push(this.state.open_card[1][i]);
      }
    }
      //console.log(this.state.card);
      //this.check(this.state.card);
      this.check(cards);

    }
    const data = {
      labels: [
       'כרטיסים שנפתחו ביום זה',
       'כרטיסים שנסגרו ביום זה',
       'Yellow'
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
      <div style={{direction: "rtl" ,color: "gray" }}>
         <Date style={{direction: "rtl" ,color: "gray" }}
         getData={this.getData}
         onClicked={this.onChildClicked}/>
         {this.state.click && this.state.childData!='' ? <Bar height="100px" data={data} />:<Bar height="100px" data={data} />}
       </div>
     );
     //return(<div></div>);
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