import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxn/Auxn';
import LogoComponent from '../../sidebar/LogoComponent';

//sideDrawer    
const sideDrawer = ( props ) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) { // if this is true, the attachedClasses should actually not have to Close class but the Open class
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed} >
                <div > 
                <LogoComponent />
                </div>
                <nav >
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>

    );
};

export default sideDrawer;

// //sideDrawer    
// const sideDrawer = ( props ) => {
//     let attachedClasses = [classes.SideDrawer, classes.Close];
//     if (props.open) { // if this is true, the attachedClasses should actually not have to Close class but the Open class
//         attachedClasses = [classes.SideDrawer, classes.Open];
//     }

//     return (
//         <Aux>
//             <Backdrop show={props.open} clicked={props.closed} />
//             <div className={attachedClasses.join(' ')} onClick={props.closed} >
//                 <div className={classes.Logo}> 
//                     <Logo/>
//                 </div>
//                 <nav>
//                     <NavigationItems isAuthenticated={props.isAuth}/>
//                 </nav>
//             </div>
//         </Aux>

//     );
// };


{/* <Aux>
<Backdrop show={props.open} clicked={props.closed}/>
<div className={attachedClasses.join(' ')} onClick={props.closed}>
    <div className={classes.Logo}> 
        <Logo/>
    </div>
    <nav>
        <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
</div>
</Aux> */}


// .SideDrawer {

//     position: fixed;
//     width: 280px;
//     max-width: 70%;
//     height: 100%;
//     left: 0;
//     top: 0;
//     z-index: 200;
//     background-color: white;
//     padding: 32px 16px;
//     box-sizing: border-box;
//     transition: transform 0.3s ease-out;
// }

// @media (min-width: 500px) {
//     .SideDrawer {
        
//         display: none;
//     }
// }

// .Open {
//     transform: translateX(0);
// }

// .Close {
//     transform: translateX(-100%);
// }

// .Logo {
//     height: 11%;
//     margin-bottom: 32px;
// }





// .SideDrawer {

//     position: fixed;
//     width: 280px;
//     max-width: 70%;
//     height: 100%;
//     right: 0;
//     top: 0;
//     z-index: 200;
//     background-color: white;
//     padding: 32px 16px;
    
//     box-sizing: border-box;
//     transition: transform 0.3s ease-out;
// }

// @media (min-width: 500px) {
//     .SideDrawer {
//         display: none;
//     }
// }

// .Open {
//     transform: translateX(0);
// }

// .Close {
//     transform: translateX(150%);
// }

// .Logo {
//     height: 11%;
//     margin-bottom: 32px;
// }