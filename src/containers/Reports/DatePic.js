import React from 'react';
import DatePicker from 'react-datepicker';
import './style.css'
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';

//import 'bootstrap/dist/css/bootstrap.min.css';

const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']
const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

const locale = {
  localize: {
    month: n => months[n],
    day: n => days[n]
  },
  formatLong: {}
}
class Datepic extends React.Component {

        constructor (props) {
                super(props)
                this.state = {
                startDate: new Date()
                
        };
        this.props.getData(new Date().getUTCDate()+1 +'.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear(),new Date().getMonth()+1,new Date().getFullYear());
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.chartTypeSelected= this.chartTypeSelected.bind(this);
        }

        handleChange(date) {
        this.setState({startDate: date})
        this.props.getData(date.getUTCDate()+1 +'.'+(date.getMonth()+1)+'.'+date.getFullYear(),date.getMonth()+1,date.getFullYear());
        }
        
        onFormSubmit(e) {
        e.preventDefault();
        }
        chartTypeSelected(e){
           this.props.chartSelected(e.target.value);
        }
        

        render() {   
        return (
        <div class="form-row" style={{direction: "rtl" ,fontFamily: "Alef Hebrew"}} > 
           <div className="text-center"  style={this.props.backgroundColor=== 'light' ?{direction: "rtl"}:{direction: "rtl",backgroundColor:"white"}} >
             <form onSubmit={ this.onFormSubmit } style={{direction: "rtl"}}>
                <div className="form-group"  style={{direction: "rtl",textAlign: "-webkit-center"}} >
                <h6 >בחר דיאגרמה לתצוגה</h6>
                <div style={{width: "fit-content"}}> 
                <select class="form-control" 
                onChange={(event) => this.chartTypeSelected(event)}  >
                        <option>מקלות</option>
                        <option>עוגה</option>
                        <option>גרף</option>  
                </select>
                {this.props.format==="month"
                ?
                <DatePicker
                        selected={ this.state.startDate }
                        onChange={ this.handleChange }
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        locale={locale}
                />
                :<DatePicker
                selected={ this.state.startDate }
                onChange={ this.handleChange }
                dateFormat="d/MM/yyyy"
                className="form-control"
                locale={locale}
                />
                }

                </div>
                </div>
                <Button bsStyle="secondary" style={this.props.backgroundColor=== 'light' ?{borderColor: "black"}:{borderColor: "white"}}  
                onClick={this.props.onClicked} >בחר תאריך</Button>

              </form>
            </div>
        </div>
);
}
//dd/MM/yyyy 01/05/2020
}

export default Datepic;