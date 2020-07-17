import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {Bar,Pie,Line} from 'react-chartjs-2';
import Date from './DatePic';
import {Grid} from "@material-ui/core";
//import LineChart from 'react-linechart';
import { Modal ,Button } from 'react-bootstrap';

import {ExcelExport,ExcelExportColumn,ExcelExportColumnGroup} from '@progress/kendo-react-excel-export';

//import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
//import ApexCharts from 'apexcharts'


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
      card:[],
      closeCard:[],
      chartType:'',
      excelData:[],
      month:'',
      year:'',
      counter:0,
      modal: false

    }
    this.onChildClicked = this.onChildClicked.bind(this);
    this.getData=this.getData.bind(this);
    this.chartSelected=this.chartSelected.bind(this);
  }
  modalOpen() {
    this.setState({ modal: true });
  }
    
  modalClose() {
    this.setState({modal: false});
  }
  onChildClicked() {
    this.setState({click : true});
  }
  getData(data,month,year){
    this.setState({date: data,month: month,year: year});
  }
componentDidMount(){
  this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);
}
componentWillMount(){
  this.props.onFetchCloseCards(this.props.token, this.props.userId,this.props.branchNumber);
}
chartSelected(data){
    if(data==='עוגה'){this.state.chartType="Pie";}
    if(data==='מקלות'){this.state.chartType="Bar";}
    if(data==='גרף'){this.state.chartType="Line";}
}

createReport(data){
 
  for(var i=0; i<data.length; i++){
  let openingDate=data[i].cardData.openingDate;
  let closeDate=data[i].closeDate;
  
    if(openingDate.includes(this.state.date)){
      this.state.countOpen+=1;
      this.state.counter=1;
      if(closeDate === undefined || closeDate === null || closeDate === ''){
      }
      else{
        if(closeDate.includes(this.state.date)){
          this.state.countClose+=1;
          this.state.counter=1;
        }
      }
    }
  }
  for(var s=0; s<data.length; s++){
    let parts=[];
    let parts_card;
    parts=data[s].partsData;

    let openingDate=data[s].cardData.openingDate;
    if(openingDate.includes(this.state.date)){
      if(parts === undefined || parts === null || parts === ''){
      }
      else{
        parts_card=Object.values(data[s].partsData);
        for(var j=0;j<parts_card.length;j++){
          if(parts_card[j].amount === undefined || parts_card[j].amount === null || parts_card[j].amount === ''){}
          else{
            this.state.countParts+=parseInt(parts_card[j].amount, 10) ;
            this.state.counter=1;
          }
          if(parts_card[j].net === undefined || parts_card[j].net === null || parts_card[j].net === ''){}
          else{
            this.state.countRevenue+=parseInt(parts_card[j].net, 10) ;
            this.state.counter=1;
          }
        }
      }
    }  
  }
  for(var z=0; z<data.length; z++){
    let work=[];
    let work_card;
    work=data[z].workData;

    let openingDate=data[z].cardData.openingDate;
    if(openingDate.includes(this.state.date)){
      if(work === undefined || work === null || work === ''){
      }
      else{
        work_card=Object.values(data[z].workData);
        for(var k=0;k<work_card.length;k++){
          if(work_card[k].net === undefined || work_card[k].net === null || work_card[k].net === ''){
          }
          else{
          this.state.countWork+=1;
          this.state.countRevenue+=parseInt(work_card[k].net, 10) ;
         // console.log(parseInt(work_card[k].net, 10)+ work_card[k].workDescription);
          this.state.counter=1;
          }
        }
      }
    }  
  }
}
isMobile() {
  let check = false;
  ((a => {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true;
  }))(navigator.userAgent || navigator.vendor);
  return check;
 }
_exporter;
export = () => {
        this._exporter.save();
    }
render() {
  let cards=[];
  let is_mobile=this.isMobile();
 // console.log(is_mobile);
  if(this.props.cards !==''){
    this.state.card=this.props.cards;
    this.state.closeCard=this.props.closeCards; 
  }
  if(this.state.date!=='' && this.state.click){
      this.state.click=false;
      this.state.countClose=0;
      this.state.countOpen=0;
      this.state.countWork=0;
      this.state.countParts=0;
      this.state.countRevenue=0;
      this.state.counter=0;

      for(var i=0;i<this.state.card.length;i++){
        cards.push(this.state.card[i]);
      }
      
      for(var j=0;j<this.state.closeCard.length;j++){
        cards.push(this.state.closeCard[j]);
      }
      this.createReport(cards);
      if(this.state.counter===0){this.modalOpen();}
    }
  const data = {
    animationEnabled: true,
    //exportEnabled: true,
    //theme: "light1", // "light1", "dark1", "dark2"
    labels: [ 'כרטיסים פתוחים','כרטיסים סגורים','חלקים שנמכרו','עבודות שהתבצעו'],
    axisX:{
      labelFontColor: "white"
    },
    axisY:{
      labelFontColor: "white"
    },
    datasets: [{
      label: '',
      fill: false,
      showpercentvalues: "1",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1", 
      borderWidth: 5,
      data: [this.state.countOpen, this.state.countClose, this.state.countParts,this.state.countWork,2],
        backgroundColor: [ '#FF6384','#36A2EB','#FFCE56','#BD10E0','#880e4f'],
        hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#BD10E0','#880e4f'],
      }]
  };
  const data_line = {
    animationEnabled: true,
    //exportEnabled: true,
    //theme: "light1", // "light1", "dark1", "dark2"
    labels: [ 'כרטיסים פתוחים','כרטיסים סגורים','חלקים שנמכרו','עבודות שהתבצעו'],
    axisX:{
      labelFontColor: "white"
    },
    axisY:{
      labelFontColor: "white"
    },
    datasets: [{
      label: '',
      fill: false,
      steppedLine: true,
      showpercentvalues: "1",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1", 
      borderWidth: 5,
      borderColor: "rgba(75,192,192,1)",
      data: [this.state.countOpen, this.state.countClose, this.state.countParts,this.state.countWork,2],
      }]
  };
  const data_pie = {
    labels: [ 'כרטיסים פתוחים','כרטיסים סגורים','חלקים שנמכרו','עבודות שהתבצעו'],
    datasets: [{
      label: '',
      fill: false,
      showpercentvalues: "1",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1", 
      backgroundColor: "#FF6384",
      theme: "fusion",
      data: [
        this.state.countOpen, this.state.countClose, this.state.countParts,this.state.countWork],
        backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#BD10E0','#880e4f'],
        hoverBackgroundColor: [ '#FF6384','#36A2EB','#FFCE56','#BD10E0','#880e4f']
      }]
  };
  const dataExcel = [
    {
        openCards: this.state.countOpen,
        closeCards: this.state.countClose,
        parts: this.state.countParts,
        works: this.state.countParts,
        revenue: this.state.countRevenue
    }
  ];

     return (
      <div style={{direction: "rtl" ,fontFamily: "Alef Hebrew"}}>
      
       <Grid container direction="column">
        
         <Date style={{direction: "rtl" }}
         getData={this.getData}
         onClicked={this.onChildClicked}
         chartSelected={this.chartSelected}
         />
          {this.state.counter === 0 && this.state.modal
          ?
          // <div>
          
            alert("אין מידע להציג בתאריך זה",this.modalClose())
           
          /* <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <div className="form-group">
            אין מידע להציג בתאריך זה
            </div>
            <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={e => this.modalClose(e)} >סגור</Button> 
            
          </Modal> */
          // </div>
          : null}
         {is_mobile 
         ? 
         <div style={this.props.backgroundColor=== 'light' ? {direction: "rtl"}:{direction: "rtl",backgroundColor:"white"}}>
          
          {this.state.chartType==="" ? <div><div style={{display: "flex",justifyContent: "center",alignItems: "center"}}><h5>{"סכום ההכנסות עבור תאריך "+this.state.date+": "+this.state.countRevenue}</h5></div>
          <Bar barSize="2000px" width="100px" height="85px" data={data} /> </div>: <div></div>}
          {this.state.chartType==="Bar" ? <div><div style={{display: "flex",justifyContent: "center",alignItems: "center"}}><h5>{"סכום ההכנסות עבור תאריך "+this.state.date+": "+this.state.countRevenue}</h5></div>
          <Bar barSize="2000px" width="100px" height="85px" data={data} /> </div>: <div></div>}
          {this.state.chartType==="Line" ?<div><div style={{display: "flex",justifyContent: "center",alignItems: "center"}}><h5>{"סכום ההכנסות עבור תאריך "+this.state.date+": "+this.state.countRevenue}</h5></div> 
          <Line barSize="2000px" width="100px" height="85px" data={data_line} /> </div>: <div></div>}  
         {this.state.chartType==="Pie" ? <div><div style={{display: "flex",justifyContent: "center",alignItems: "center"}}><h5>{"סכום ההכנסות עבור תאריך "+this.state.date+": "+this.state.countRevenue}</h5></div>
          <Pie type="doughnut2d" width="100px" barSize="2000px" height="85px" dataFormat="JSON" data={data_pie} /> </div> : <div></div>}
         </div>
         : 
         <div style={this.props.backgroundColor=== 'light' ? {direction: "rtl"}:{direction: "rtl",backgroundColor:"white"}}>
          {this.state.chartType==="" ? <div><div style={{display: "flex",justifyContent: "center",alignItems: "center"}}><h5>{"סכום ההכנסות עבור תאריך "+this.state.date+": "+this.state.countRevenue}</h5></div>
          <Bar barSize="2000px" height="65px" data={data} /> </div>: <div></div>}
          {this.state.chartType==="Bar" ? <div><div style={{display: "flex",justifyContent: "center",alignItems: "center"}}><h5>{"סכום ההכנסות עבור תאריך "+this.state.date+": "+this.state.countRevenue}</h5></div>
          <Bar barSize="2000px" height="65px" data={data} /> </div> : <div></div>}
          {this.state.chartType==="Line" ? <div><div style={{display: "flex",justifyContent: "center",alignItems: "center"}}><h5>{"סכום ההכנסות עבור תאריך "+this.state.date+": "+this.state.countRevenue}</h5></div>
          <Line barSize="2000px" height="65px" data={data_line} /> </div>: <div></div>}  
          {this.state.chartType==="Pie" ? <div><div style={{display: "flex",justifyContent: "center",alignItems: "center"}}><h5>{"סכום ההכנסות עבור תאריך "+this.state.date+": "+this.state.countRevenue}</h5></div>
          <Pie type="doughnut2d" barSize="2000px" height="65px" dataFormat="JSON" data={data_pie} /></div> : <div></div>}
         </div>
         }
         <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
         <Button bsStyle="secondary" style={this.props.backgroundColor=== 'light' ?{borderColor: "black"}:{borderColor: "white"}}   onClick={this.export}>הפקת דוח יומי לטבלת אקסל</Button> 
        </div>
         <ExcelExport
                    data={dataExcel}  
                    fileName={"דוח עבור  "+this.state.date+".xlsx"}
                    ref={(exporter) => { this._exporter = exporter; }}
                >
                    <ExcelExportColumn field="openCards" title="כרטיסים פתוחים" locked={true} width={150} />
                    <ExcelExportColumn field="closeCards" title="כרטיסים סגורים" width={150} />
                    <ExcelExportColumn field="parts" title="חלקים שנמכרו" width={150} />
                    <ExcelExportColumn field="works" title="עבודות שהתבצעו" width={150} />
                    <ExcelExportColumn field="revenue" title="סכום ההכנסות" width={150} />

                    <ExcelExportColumnGroup title="Availability" headerCellOptions={{ textAlign: 'center' }}></ExcelExportColumnGroup>
        </ExcelExport>
      
         </Grid>
       </div>
     );   
     
  }
}

const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      cards: state.card.cards, 
      closeCards: state.card.closeCards,
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