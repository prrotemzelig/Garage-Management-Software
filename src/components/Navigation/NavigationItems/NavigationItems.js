import React from 'react';
import { connect } from 'react-redux';


import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import IconOverview from '../../../assets/icon-overview.js';
import IconTickets from '../../../assets/icon-tickets.js';
//import IconIdeas from '../../../assets/icon-ideas.js';
//import IconContacts from '../../../assets/icon-contacts';
//import IconAgents from '../../../assets/icon-agents';
//import IconArticles from '../../../assets/icon-articles';
//import IconSettings from '../../../assets/icon-settings';
//import IconSubscription from '../../../assets/icon-subscription';
//import IconBurger from '../../../assets/icon-burger';

const navigationItems = (props ) => (
    <ul className={classes.NavigationItems}>

            {props.isAuthenticated
            ? <NavigationItem icon={IconOverview} link="/main" exact>ראשי   </NavigationItem> 
            : <NavigationItem icon={IconOverview} link="/" exact>ראשי   </NavigationItem> }


            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/updateTicketStatus">כרטיס עבודה    </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/openCards">כרטיסים פתוחים   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/carHistory">היסטוריית רכב   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/dailyUpdates">עדכונים יומיים   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/ordersToCheck">הזמנות לטיפול   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/cardOpening"> פתיחת כרטיס ישן   </NavigationItem> : null}

            <div className={classes.separator}></div>

            {(props.isAuthenticated && props.userPermissions ==='Admin') ? <NavigationItem icon={IconOverview} link="/AdminUserManagement">ניהול משתמשים   </NavigationItem> : null}

            {(props.isAuthenticated && props.userPermissions ==='Admin') ? <NavigationItem icon={IconOverview} link="/AdminSettings">הגדרות מנהל ישן   </NavigationItem> : null}

            {(props.isAuthenticated && (props.userPermissions ==='User' || props.userPermissions ==='basic')) ? <NavigationItem icon={IconOverview} link="/UserSettings">הגדרות  </NavigationItem> : null}

            {!props.isAuthenticated
            ? <NavigationItem icon={IconOverview} link="/auth">התחברות   </NavigationItem>
            : <NavigationItem icon={IconOverview} link="/logout">יציאה   </NavigationItem>}

    </ul>
);

//            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/carHistory">היסטוריית רכב   </NavigationItem> : null}
//            <NavigationItem icon={IconOverview} link="/" exact>ראשי   </NavigationItem> 

const mapStateToProps = state => {
    return {
        firstName: state.auth.firstName,
        branchNumber: state.auth.branchNumber,
        userPermissions: state.auth.userPermissions
    };
};

export default connect( mapStateToProps )( navigationItems );

//export default navigationItems;

// {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/updateTicketStatus">פתיחת כרטיס 2 רותם   </NavigationItem> : null}
// {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/updateTicketStatusAriel">עדכון כרטיס אריאל   </NavigationItem> : null}