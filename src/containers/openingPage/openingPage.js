import React, { Component } from 'react';
import classes from './openingPage.module.css';
import Button from '../../components/UI/MenuButton/MenuButton';


class openingPage extends Component {
    render() {
        return ( 
            <div  className={ classes.backgroundImage}> 
            <form className={classes.Opening}>
                <p><strong>ברוכים הבאים למוסכניק</strong></p> 
                <p> האתר הטוב ביותר לניהול המוסך שלך</p> 
                <p> כאן תוכל לנהל באופן מלא את המוסך שלך</p> 
                <p> ולקבל את חווית המשתמש הטובה ביותר</p> 
            </form> 
        </div>  
        )
    }
}
export default openingPage;



{/* <form className={classes.Opening}>
<p><strong>ברוכים הבאים למוסכניק</strong></p> 
<p> האתר הטוב ביותר לניהול המוסך שלך</p> 
<p> כאן תוכל לנהל באופן מלא את המוסך שלך</p> 
<p> ולקבל את חווית המשתמש הטובה ביותר</p> 


           </form> */}

    //        <div>
    //        <Button style={classes.Button} btnType="openCard" disabled={true}>פתיחת כרטיס</Button>
    //    </div> 