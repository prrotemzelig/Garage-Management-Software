import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

import IconOverview from '../../../assets/icon-overview.js';
import IconTickets from '../../../assets/icon-tickets.js';
import IconIdeas from '../../../assets/icon-ideas.js';
import IconContacts from '../../../assets/icon-contacts';
import IconAgents from '../../../assets/icon-agents';
import IconArticles from '../../../assets/icon-articles';
import IconSettings from '../../../assets/icon-settings';
import IconSubscription from '../../../assets/icon-subscription';
import IconBurger from '../../../assets/icon-burger';

const navigationItems = (props ) => (
    <ul className={classes.NavigationItems}>

            {props.isAuthenticated
            ? <NavigationItem icon={IconOverview} link="/main" exact>ראשי   </NavigationItem> 
            : <NavigationItem icon={IconOverview} link="/" exact>ראשי   </NavigationItem> }



            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/cardOpening">פתיחת כרטיס   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/openCards">כרטיסים פתוחים   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/updateTicketStatus">עדכון כרטיס   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/dailyUpdates">עדכונים יומיים   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/ordersToCheck">הזמנות לטיפול   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/carHistory">היסטוריית רכב   </NavigationItem> : null}
            
            <div className={classes.separator}></div>
            
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/settings">הגדרות   </NavigationItem> : null}
            {!props.isAuthenticated
            ? <NavigationItem icon={IconOverview} link="/auth">התחברות   </NavigationItem>
            : <NavigationItem icon={IconOverview} link="/logout">יציאה   </NavigationItem>}

    </ul>
);


//            <NavigationItem icon={IconOverview} link="/" exact>ראשי   </NavigationItem> 

export default navigationItems;

