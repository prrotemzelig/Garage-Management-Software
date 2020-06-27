import React from 'react';
import DatePicker from 'react-datepicker';
import './style.css'
import "react-datepicker/dist/react-datepicker.css";
//import 'bootstrap/dist/css/bootstrap.min.css';

class Datepic extends React.Component {

        constructor (props) {
                super(props)
                this.state = {
                startDate: new Date()
                
        };
        this.props.getData(new Date().getUTCDate()+'.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear())
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.chartTypeSelected= this.chartTypeSelected.bind(this);
        }

        handleChange(date) {
        this.setState({startDate: date})
        this.props.getData(date.getUTCDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear());
        }
        
        onFormSubmit(e) {
        e.preventDefault();
        }
        chartTypeSelected(e){
           this.props.chartSelected(e.target.value);
        }
        

        render() {   
        return (
        <div class="form-row" style={{direction: "rtl"}} > 
           <div className="text-center"  style={{direction: "rtl"}} >
             <form onSubmit={ this.onFormSubmit } style={{direction: "rtl"}}>
                <div className="form-group"  style={{direction: "rtl"}} >
                <h6>בחר דיאגרמה לתצוגה</h6>
                <select class="form-control"  style={{backgroundColor: "white"}}
                onChange={(event) => this.chartTypeSelected(event)} >
                        <option>מקלות</option>
                        <option>עוגה</option>
                        <option>גרף</option>  
                </select>
                <DatePicker
                        selected={ this.state.startDate }
                        onChange={ this.handleChange }
                        //dateFormat="MMMM d, yyyy"
                        dateFormat="d/MM/yyyy"
                        className="form-control"
                />
                </div>
                <button className="btn btn-primary"
                onClick={this.props.onClicked} >
                 בחר תאריך
                </button>
              </form>
            </div>
        </div>
);
}
//dd/MM/yyyy 01/05/2020
}

export default Datepic;