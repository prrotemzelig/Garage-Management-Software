import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from '../../components/Card/CardSearch';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import ShowData from '../../components/Card/showData';
import {  Button } from 'react-bootstrap'; //Modal

class Search extends Component {
  
    constructor(props){
        super(props);
        this.state = {
          branchNumber:'',
          carNumber:'',
          ticketNumber:'',
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

  onChildClicked(data,num) {
    this.setState({click : true,modal: true,ticketNumber:num });
    this.modalOpen();
  }

  check(data){
    // console.log(data);
    if(data.cardData.licenseNumber===this.state.carNumber){
    //  this.setState({ found: true });
      
      this.state.found=true;
    }
    // console.log(this.state.found);

    // else{
    //   console.log("51");
    //   this.state.found=false;

    // }
  }
 
  isMobile() {
    let check = false;
    ((a => {
      //        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;

        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true;
        }))(navigator.userAgent || navigator.vendor);
    return check;
   }
  
    render () {
      let cards;
      //let temp;

//      this.setState({ carNumber: this.props.value });
     this.state.carNumber= this.props.value;
      // console.log(this.props.value);
          if(this.state.carNumber!== "" ){
            if ( !this.props.loading ) { // if it not true - if we not loading
              cards= this.props.cards.map( card => (
               // eslint-disable-next-line no-sequences
               this.check(card),
                <Card
                  data={this.state.carNumber}
                  key={card.id}
                  customerData={card.customerData}
                  closeDate={card.closeDate}
                  carData={card.carData}
                  cardData={card.cardData}
                  onClicked={this.onChildClicked}
                  backGroundColor={this.props.backgroundColor}
                  />
              ))
            }

            // console.log(this.state.found);
          }
      
      if(!this.state.found && this.state.carNumber!==''){
        // console.log("83");

        return ( 
          // alert("לא נמצאה היסטוריה עבור רכב זה");
          <div style={ this.props.backgroundColor === 'light' ? {direction: "rtl",fontFamily: "Alef Hebrew" }:{ direction: "rtl",fontFamily: "Alef Hebrew", color: "white"}}>
            <h5>לא נמצאה היסטוריה עבור רכב זה </h5></div> 
      );
      }
    
      if(this.state.found && this.state.carNumber!=='' && !this.state.click ){
        //this.state.found=false;
        // console.log("93");
      return (
        <div class="table-wrapper" style={this.props.backgroundColor=== 'light' ?
            {direction: "rtl", backgroundColor: "white"}
            : {direction: "rtl", backgroundColor: "#27293d" , color: "rgba(255, 255, 255, 0.8)"}}>

            <table class="table table-bordered" style={{marginBottom: "1px",direction: "rtl",fontFamily: "Alef Hebrew",tableLayout: "fixed"}} >
                <thead>
                    <tr style={{fontWeight: "bold", fontSize: "16px"}}>
                        <td>מספר רכב</td> 
                        <td>שם לקוח</td>
                        <td>מספר כרטיס</td>
                        <td>תאריך פתיחה</td>
                        <td>תאריך סגירה</td>
                        <td>פעולות</td> 

                    </tr> 
                </thead>
                <tbody >
                    {cards}
                </tbody>          
            </table>         
            </div>
      );
      }
      if(this.state.found && this.state.click){
        //this.state.found=false;
        // console.log("121");

        return(
          <div  >
            {/* <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}> */}
            {this.state.modal ?
            
            <div className="form-group">
            <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={e => this.modalClose(e)} >חזור לטבלה</Button> 

            <div className="form-group">
            <ShowData
                value={this.state.carNumber}
                data={this.state.ticketNumber}
                />
            </div>
            {/* <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={e => this.modalClose(e)} >סגור את כרטיס ההיסטוריה</Button>  */}
            </div>
            : null}
          {/* </Modal> */}


          {!this.state.modal ?

          <div class="table-wrapper" style={this.props.backgroundColor=== 'light' ?
            {direction: "rtl", backgroundColor: "white"}
            : {direction: "rtl", backgroundColor: "#27293d" , color: "rgba(255, 255, 255, 0.8)"}}>

            <table class="table table-bordered" style={{marginBottom: "1px",direction: "rtl",fontFamily: "Alef Hebrew",tableLayout: "fixed"}} >
                <thead>
                    <tr style={{fontWeight: "bold", fontSize: "16px"}}>
                        <td>מספר רכב</td>
                        <td>שם לקוח</td>
                        <td>מספר כרטיס</td>
                        <td>תאריך פתיחה</td>
                        <td>תאריך סגירה</td>
                        <td>פעולות</td>
                    </tr>     
                </thead>
                <tbody >
                    {cards}
                </tbody>  
            </table>  
            </div>

            : null}
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
      backgroundColor: state.auth.backgroundColor,
  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
      onFetchCloseCards: (token,userId,branchNumber) => dispatch( actions.fetchCloseCards(token, userId,branchNumber)),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Search, axios ) );