import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './OpenNewCard.module.css';
import axios from '../../axios-cards';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; //

class OpenNewCard extends Component {
    state = { 
        cardForm: {
            name: {
                text:'שם לקוח',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'שם לקוח'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            carNumber: {
                text:'מספר רכב',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'מספר רכב'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },

            cardNumber: {
                text:'מספר כרטיס',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'מספר כרטיס'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },

            descriptionCar: {
                text:'תאור הרכב',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'תאור הרכב'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            street: {
                text:'כתובת',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'כתובת'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        
            phoneNumber: {
                text:'מספר פלאפון',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'מספר פלאפון'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },

            carCode: {
                text:'אזעקה',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'אזעקה'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
  
            email: {
                text:'כתובת מייל',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'כתובת מייל'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                text:'סוג תיקון',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'private', displayValue: 'פרטי'},
                        {value: 'insurance', displayValue: 'ביטוח'}
                    ]
                },
                value: 'insurance', // Default if the user do not enter a value here
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    cardOpeningHandler = ( event ) => {
        event.preventDefault(); // with that we get the Card details
        //this.setState( { loading: true } ); // set the state to loading initially to show a spinner
        const formData = {};
        for (let formElementIdentifier in this.state.cardForm) {
            formData[formElementIdentifier] = this.state.cardForm[formElementIdentifier].value;
        }
        const card = { // here we  prepare the card data
            cardData: formData, 
            userId: this.props.userId
        }   
        this.props.onCardOpening(card, this.props.token); // this contains all the data of card 
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.cardForm[inputIdentifier], {
            // here we pass my cardForm and there (inputIdentifier) -> it show the control 
            // this.state.cardForm[inputIdentifier] -> this is the old object
            // the second object it a java script object
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.cardForm[inputIdentifier].validation),
            touched: true
        });

        const updatedCardForm = updateObject(this.state.cardForm, { // here we want to update the overall card for a given input identifer
            [inputIdentifier]: updatedFormElement // here we need to pass javascript object and pass a new properties and it should be dynamic input identifier where we pick a specific control.
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedCardForm) {
            formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
           
        }
        console.log("check ariel hey " );
        this.setState({cardForm: updatedCardForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.cardForm) {
            formElementsArray.push({
                id: key,
                config: this.state.cardForm[key]
            });
        }
        console.log("line 209 " + this.state.formIsValid);
        let form = (
            <form onSubmit={this.cardOpeningHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        text={formElement.config.text}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>שמירה </Button>
            </form>
            ////   <Button btnType="Success" disabled={!this.state.formIsValid}>שמירה</Button>
        );
        console.log("line 228 " + this.state.formIsValid);

        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            
            <div className={classes.OpenNewCard}>
                <h4 style={{color: "gray" }}>כרטיס עבודה</h4>
                {form}
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        loading: state.card.loading, // the loading is coming from the card
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return { // we need to return a map of props to functions
        onCardOpening: (cardData, token) => dispatch(actions.cardOpening(cardData, token)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OpenNewCard,axios));
