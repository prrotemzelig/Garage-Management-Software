import React from 'react';
import DatePicker from 'react-datepicker';
import './style.css'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


        
class Datepic extends React.Component {

        constructor (props) {
                super(props)
                this.state = {
                startDate: new Date()
                
        };
        this.props.getData(new Date().getUTCDate()+'.'+(new Date().getMonth()+1)+'.'+new Date().getFullYear())
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        }

        handleChange(date) {
        this.setState({startDate: date})
        this.props.getData(date.getUTCDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear());
        }
        
        onFormSubmit(e) {
        e.preventDefault();
        }
        
        

        render() {   
        return (
        <div class="form-row" style={{direction: "rtl"}} > 
           <div className="text-center"  style={{direction: "rtl"}} >
             <form onSubmit={ this.onFormSubmit }>
                <div className="form-group"  style={{direction: "rtl"}} >
                <DatePicker
                        selected={ this.state.startDate }
                        onChange={ this.handleChange }
                        dateFormat="MMMM d, yyyy"
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