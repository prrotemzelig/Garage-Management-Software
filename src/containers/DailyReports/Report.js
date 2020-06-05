import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {Bar} from 'react-chartjs-2';
import Date from './DatePic';


class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      click: false,
      date: '',
      countOpen:0,
      countClose:0,
      countWork:0,
      countParts:0,
      countRevenue:0,
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
  let openingDate=data[i].cardData.openingDate;
  let closeDate=data[i].closeDate;
  
  console.log(data[i].cardData.openingDate+'  '+data[i].cardData.licenseNumber);
  console.log(data[i].closeDate);
    if(openingDate.includes(this.state.date)){
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
  for(var i=0; i<data.length; i++){
    let parts=[];
    let parts_card;
    parts=data[i].partsData;

    let openingDate=data[i].cardData.openingDate;
    if(openingDate.includes(this.state.date)){
      if(parts === undefined || parts === null || parts === ''){
      }
      else{
        parts_card=Object.values(data[i].partsData);
        for(var j=0;j<parts_card.length;j++){
          this.state.countParts+=parseInt(parts_card[j].amount, 10) ;
          this.state.countRevenue+=parseInt(parts_card[j].net, 10) ;
        }
      }
    }  
  }
  for(var i=0; i<data.length; i++){
    let work=[];
    let work_card;
    work=data[i].workData;

    let openingDate=data[i].cardData.openingDate;
    if(openingDate.includes(this.state.date)){
      if(work === undefined || work === null || work === ''){
      }
      else{
        work_card=Object.values(data[i].workData);
        for(var j=0;j<work_card.length;j++){
          this.state.countWork+=1;
          this.state.countRevenue+=parseInt(work_card[j].net, 10) ;

        }
      }
    }  
  }
}


  render() {
   let cards=[];
     
   if(this.props.cards !==''){
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

    if(this.state.date!=='' && this.state.click){
      this.state.click=false;
      this.state.countClose=0;
      this.state.countOpen=0;
      this.state.countWork=0;
      this.state.countParts=0;
      this.state.countRevenue=0;

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
       'חלקים שנמכרו ביום זה',
       'עבודות שהתבצעו ביום זה',
       'סכום ההכנסות ביום זה'
    ],
    datasets: [{
      label: '',
      fill: false,
      data: [this.state.countOpen, this.state.countClose, this.state.countParts,this.state.countWork,this.state.countRevenue,2],
         backgroundColor: [
           '#FF6384',
           '#36A2EB',
           '#FFCE56',
           '#BD10E0',
           '#880e4f'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#BD10E0',
        '#880e4f'
      ]
    }]
   };
   
     return (
       
      <div style={{direction: "rtl" }}>
        
         <Date style={{direction: "rtl" }}
         getData={this.getData}
         onClicked={this.onChildClicked}/>
         <div style={{direction: "rtl" }}>
          <Bar barSize="2000px" height="100px" data={data} />        

         </div>
       </div>
     );   
     
  }
  //          {this.state.click && this.state.date!='' ? <Bar height="100px" data={data} />:<Bar height="100px" data={data} />}


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