import React, { Component } from 'react';
import classes from './openingPage.module.css';


class openingPage extends Component {
    
    render() {
        return ( 
            <div  style={{ backgroundColor: "rgb(247, 248, 252)"}}> 
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