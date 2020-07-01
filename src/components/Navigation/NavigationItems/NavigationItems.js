import React from 'react';
import { connect } from 'react-redux';


import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import IconOverview from '../../../assets/icon-overview.js';
import IconTickets from '../../../assets/icon-tickets.js';
import IconIdeas from '../../../assets/icon-ideas.js';
import IconContacts from '../../../assets/icon-contacts';
// import IconAgents from '../../../assets/icon-agents';
import IconArticles from '../../../assets/icon-articles';
import IconSettings from '../../../assets/icon-settings';
import IconSubscription from '../../../assets/icon-subscription';
// import IconBurger from '../../../assets/icon-burger';
// import SettingsIcon from '@material-ui/icons/Settings';

const navigationItems = (props ) => (
    <ul className={classes.NavigationItems}>

            {props.isAuthenticated
            ? <NavigationItem icon={IconIdeas} link="/main" exact>ראשי   </NavigationItem> 
            : <NavigationItem icon={IconOverview} link="/" exact>ראשי   </NavigationItem> }


            {props.isAuthenticated ? <NavigationItem  icon={IconTickets} link="/updateTicketStatus">כרטיס עבודה    </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconSubscription} link="/openCards">כרטיסים פתוחים   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconContacts} link="/carHistory">היסטוריית רכב   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/dailyUpdates">עדכונים יומיים   </NavigationItem> : null}
            {/* {props.isAuthenticated ? <NavigationItem icon={IconAgents} link="/ordersToCheck">הזמנות לטיפול   </NavigationItem> : null} */}
            {props.isAuthenticated ? <NavigationItem icon={IconOverview} link="/cardOpening"> פתיחת כרטיס ישן   </NavigationItem> : null}

            <div className={classes.separator}></div>

            {(props.isAuthenticated && props.userPermissions ==='Admin') ? <NavigationItem icon={IconSettings} link="/AdminUserManagement">ניהול משתמשים   </NavigationItem> : null}

            {/* {(props.isAuthenticated && props.userPermissions ==='Admin') ? <NavigationItem icon={IconSettings} link="/AdminSettings">הגדרות מנהל ישן   </NavigationItem> : null} */}

            {/* {(props.isAuthenticated && (props.userPermissions ==='User' || props.userPermissions ==='basic')) ? <NavigationItem icon={IconSettings} link="/UserSettings">הגדרות  </NavigationItem> : null} */}

            {!props.isAuthenticated
            ? <NavigationItem icon={IconArticles} link="/auth">התחברות   </NavigationItem>
            : <NavigationItem icon={IconArticles} link="/logout">יציאה   </NavigationItem>}

    </ul>
);

const mapStateToProps = state => {
    return {
        firstName: state.auth.firstName,
        branchNumber: state.auth.branchNumber,
        userPermissions: state.auth.userPermissions
    };
};

export default connect( mapStateToProps )( navigationItems );

//export default navigationItems;
