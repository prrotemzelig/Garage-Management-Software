import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact> ראשי</NavigationItem> 

      


             {props.isAuthenticated ? <NavigationItem link="/CardOpening">פתיחת כרטיס</NavigationItem> : null}
             {props.isAuthenticated ? <NavigationItem link="/openCards">כרטיסים פתוחים</NavigationItem> : null}
             {props.isAuthenticated ? <NavigationItem link="/UpdateTicketStatus">עדכון כרטיס </NavigationItem> : null}
             {props.isAuthenticated ? <NavigationItem link="/dailyUpdates">עדכונים יומיים </NavigationItem> : null}
             {props.isAuthenticated ? <NavigationItem link="/ordersToCheck">הזמנות לטיפול</NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem link="/carHistory"> היסטוריית רכב</NavigationItem> : null}
       
            {!props.isAuthenticated
            ? <NavigationItem link="/auth">התחברות</NavigationItem>
            : <NavigationItem link="/logout">יציאה</NavigationItem>}




    </ul>
);

export default navigationItems;

