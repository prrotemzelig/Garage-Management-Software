import React, { Component } from 'react';
import classes from './openingPage.module.css';

class openingPage extends Component {
    render() {
        return (
            <div className={classes.Opening}>
                <p><strong>ברוכים הבאים למוסכניק</strong></p> 
                <p> האתר הטוב ביותר לניהול המוסך שלך</p> 
                <p> כאן תוכל לנהל באופן מלא את המוסך שלך</p> 
                <p> ולקבל את חווית המשתמש הטובה ביותר</p> 

            </div>
        )
}


    
 
}
export default openingPage;

