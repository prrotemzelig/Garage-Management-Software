import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {Bar,Pie,Line} from 'react-chartjs-2';
import Date from './DatePic';
import {Grid} from "@material-ui/core";
import LineChart from 'react-linechart';
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
      countMonthOpen:0,
      countMonthClose:0,
      countMonthWork:0,
      countMonthParts:0,
      countMonthRevenue:0,
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
createMountlyReport(data){
  for(var i=0; i<data.length; i++){
    let openingDate=data[i].cardData.openingDate;
    let closeDate=data[i].closeDate;

    if(openingDate.includes(this.state.month+"."+this.state.year)){
      this.state.countMonthOpen+=1;
      if(closeDate === undefined || closeDate === null || closeDate === ''){
      }
      else{
        if(closeDate.includes(this.state.month+"."+this.state.year)){
          this.state.countMonthClose+=1;
        }
      }
    }
  }
  for(var i=0; i<data.length; i++){
    let parts=[];
    let parts_card;
    parts=data[i].partsData;

    let openingDate=data[i].cardData.openingDate;
    if(openingDate.includes(this.state.month+"."+this.state.year)){
      if(parts === undefined || parts === null || parts === ''){
      }
      else{
        parts_card=Object.values(data[i].partsData);
        for(var j=0;j<parts_card.length;j++){
          this.state.countMonthParts+=parseInt(parts_card[j].amount, 10) ;
          this.state.countMonthRevenue+=parseInt(parts_card[j].net, 10) ;
        }
      }
    }  
  }
  for(var i=0; i<data.length; i++){
    let work=[];
    let work_card;
    work=data[i].workData;

    let openingDate=data[i].cardData.openingDate;
    if(openingDate.includes(this.state.month+"."+this.state.year)){
      if(work === undefined || work === null || work === ''){
      }
      else{
        work_card=Object.values(data[i].workData);
        for(var j=0;j<work_card.length;j++){
          this.state.countMonthWork+=1;
          this.state.countMonthRevenue+=parseInt(work_card[j].net, 10) ;

        }
      }
    }  
  }
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
          this.state.counter=1;
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
          this.state.counter=1;
        }
      }
    }  
  }
}
isMobile() {
  let check = false;
  ((a => {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
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
  console.log(is_mobile);
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
      this.state.countMonthClose=0;
      this.state.countMonthOpen=0;
      this.state.countMonthWork=0;
      this.state.countMonthParts=0;
      this.state.countMonthRevenue=0;
      this.state.counter=0;

      for(var i=0;i<this.state.card.length;i++){
        cards.push(this.state.card[i]);
      }
      
      for(var i=0;i<this.state.closeCard.length;i++){
        cards.push(this.state.closeCard[i]);
      }
      this.createReport(cards);
      this.createMountlyReport(cards);
      if(this.state.counter==0){this.modalOpen();}
      if(this.state.month==1){this.state.month="ינואר"};
      if(this.state.month==2){this.state.month="פברואר"};
      if(this.state.month==3){this.state.month="מרץ"};
      if(this.state.month==4){this.state.month="אפריל"};
      if(this.state.month==5){this.state.month="מאי"};
      if(this.state.month==6){this.state.month="יוני"};
      if(this.state.month==7){this.state.month="יולי"};
      if(this.state.month==8){this.state.month="אוגוסט"};
      if(this.state.month==9){this.state.month="ספטמבר"};
      if(this.state.month==10){this.state.month="אוקטובר"};
      if(this.state.month==11){this.state.month="נובמבר"};
      if(this.state.month==12){this.state.month="דצמבר"};


    }
   
  const data = {
    animationEnabled: true,
    //exportEnabled: true,
    //theme: "light1", // "light1", "dark1", "dark2"
    labels: [ 'כרטיסים שנפתחו','כרטיסים שנסגרו','חלקים שנמכרו','עבודות שהתבצעו', 'סכום ההכנסות'],
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
      borderWidth: 2,
      data: [this.state.countOpen, this.state.countClose, this.state.countParts,this.state.countWork,this.state.countRevenue,2],
        backgroundColor: [ '#FF6384','#36A2EB','#FFCE56','#BD10E0','#880e4f'],
        hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#BD10E0','#880e4f'],
      }]
  };
  const data_pie = {
    labels: [
     'כרטיסים שנפתחו','כרטיסים שנסגרו','חלקים שנמכרו','עבודות שהתבצעו','סכום ההכנסות'
    ],
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
        this.state.countOpen, this.state.countClose, this.state.countParts,this.state.countWork,this.state.countRevenue],
        backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#BD10E0','#880e4f'],
        hoverBackgroundColor: [ '#FF6384','#36A2EB','#FFCE56','#BD10E0','#880e4f']
      }]
  };
  const dataExcel = [
    {
        openCards: this.state.countMonthOpen,
        closeCards: this.state.countMonthClose,
        parts: this.state.countMonthParts,
        works: this.state.countMonthWork,
        revenue: this.state.countMonthRevenue
    }
  ];

     return (
      <div style={{direction: "rtl" }}>
      
       <Grid container direction="column">
        
         <Date style={{direction: "rtl" }}
         getData={this.getData}
         onClicked={this.onChildClicked}
         chartSelected={this.chartSelected}
         />
          {this.state.counter == 0 
          ?<div>
          <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <div className="form-group">
            אין מידע להציג בתאריך זה
            </div>
            <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={e => this.modalClose(e)} >סגור</Button> 
            
          </Modal>
          </div>
          :<div></div>}
         {is_mobile 
         ? 
         <div style={this.props.backgroundColor=== 'light' ? {direction: "rtl"}:{direction: "rtl",backgroundColor:"white"}}>
          
          {this.state.chartType==="" ? <Bar barSize="2000px" width="100px" height="85px" data={data} /> : <div></div>}
          {this.state.chartType==="Bar" ? <Bar barSize="2000px" width="100px" height="85px" data={data} /> : <div></div>}
          {this.state.chartType==="Line" ? <Line barSize="2000px" width="100px" height="85px" data={data} /> : <div></div>}  
          {this.state.chartType==="Pie" ? <Pie type="doughnut2d" width="100px" barSize="2000px" height="85px" dataFormat="JSON" data={data_pie} /> : <div></div>}
         </div>
         : 
         <div style={this.props.backgroundColor=== 'light' ? {direction: "rtl"}:{direction: "rtl",backgroundColor:"white"}}>
          {this.state.chartType==="" ? <Bar barSize="2000px" height="75px" data={data} /> : <div></div>}
          {this.state.chartType==="Bar" ? <Bar barSize="2000px" height="75px" data={data} /> : <div></div>}
          {this.state.chartType==="Line" ? <Line barSize="2000px" height="75px" data={data} /> : <div></div>}  
          {this.state.chartType==="Pie" ? <Pie type="doughnut2d" barSize="2000px" height="75px" dataFormat="JSON" data={data_pie} /> : <div></div>}
         </div>
         }
         <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
         <Button bsStyle="secondary" style={this.props.backgroundColor=== 'light' ?{borderColor: "black"}:{borderColor: "white"}}   onClick={this.export}>הפקת דוח חודשי לטבלת לאקסל</Button> 
        </div>
         <ExcelExport
                    data={dataExcel}  
                    fileName={"דוח עבור חודש "+this.state.month+".xlsx"}
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