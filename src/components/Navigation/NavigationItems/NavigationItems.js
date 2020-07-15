import React from 'react';
import { connect } from 'react-redux';


import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import IconOverview from '../../../assets/icon-overview.js';
import IconTickets from '../../../assets/icon-tickets.js';
import IconIdeas from '../../../assets/icon-ideas.js';
import IconContacts from '../../../assets/icon-contacts';
 import IconAgents from '../../../assets/icon-agents';
import IconArticles from '../../../assets/icon-articles';
import IconSettings from '../../../assets/icon-settings';
import IconSubscription from '../../../assets/icon-subscription';
import IconPerson from '../../../assets/icon-person';
 import IconBurger from '../../../assets/icon-burger';
 import IconHouse from '../../../assets/icon-house';
 import IconArrowRight from '../../../assets/icon-arrowRight';
 import IconHistory from '../../../assets/icon-history';
 import IconCollection from '../../../assets/icon-collection';
 import IconCalendar3 from '../../../assets/icon-calendar3';
 import IconArchive from '../../../assets/icon-archive';
// import SettingsIcon from '@material-ui/icons/Settings';
// import MetisMenu from 'react-metismenu';
// import SideMenu from 'react-sidemenu';
// import { NavLink } from 'react-router-dom';
//import {  usePushMenu } from 'react-push-menu';//PushMenu
// import Dropdown from 'react-dropdown';


// const data = {
//     menu: {
//       children: [
//         { name: 'דוחות', id: 2, link: '', children: [] },
//       ],
//     },
//   };

// const Content= ()=> {
//     const { toggleMenu } = usePushMenu();
//     return (
//       <div
//         onClick={() => {
//           toggleMenu();
//         }}
//       >
//         <NavigationItem icon={IconOverview} link="/dailyReports" > דוחות יומיים   </NavigationItem> 
//         <NavigationItem icon={IconOverview} link="/MonthlyReports">דוחות חודשיים   </NavigationItem> 

//       </div>
//     );
//   };
  // const options = [
  //   <NavigationItem icon={IconOverview} link="/dailyReports" > דוחות יומיים   </NavigationItem> 
  //   , 'two', 'three'
  // ];
  // const defaultOption = options[1];
const navigationItems = (props ) => (
    <div>

    <ul className={classes.NavigationItems}>

            {props.isAuthenticated
            ? <NavigationItem icon={IconHouse} link="/main" exact>11ראשי   </NavigationItem> 
            : <NavigationItem icon={IconHouse} link="/" exact>11ראשי   </NavigationItem> }


            {props.isAuthenticated ? <NavigationItem  icon={IconCollection} link="/updateTicketStatus">כרטיס עבודה    </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconAgents} link="/openCards">כרטיסים פתוחים   </NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem icon={IconHistory} link="/carHistory">היסטוריית רכב   </NavigationItem> : null}
            {(props.isAuthenticated && props.userPermissions ==='Admin') ? <NavigationItem icon={IconArchive} link="/dailyReports" > דוחות יומיים   </NavigationItem>  : null}
            {(props.isAuthenticated && props.userPermissions ==='Admin') ? <NavigationItem icon={IconCalendar3} link="/MonthlyReports">דוחות חודשיים   </NavigationItem> : null}
            {/* {props.isAuthenticated ? <NavigationItem icon={IconAgents} link="/ordersToCheck">הזמנות לטיפול   </NavigationItem> : null} */}
           
            <div className={classes.separator}></div>

            {(props.isAuthenticated && props.userPermissions ==='Admin') ? <NavigationItem icon={IconPerson} link="/AdminUserManagement">ניהול משתמשים   </NavigationItem> : null}

            {/* {(props.isAuthenticated && props.userPermissions ==='Admin') ? <NavigationItem icon={IconSettings} link="/AdminSettings">הגדרות מנהל ישן   </NavigationItem> : null} */}

            {/* {(props.isAuthenticated && (props.userPermissions ==='User' || props.userPermissions ==='basic')) ? <NavigationItem icon={IconSettings} link="/UserSettings">הגדרות  </NavigationItem> : null} */}

            {!props.isAuthenticated
            ? <NavigationItem icon={IconArticles} link="/auth">התחברות   </NavigationItem>
            : <NavigationItem icon={IconArrowRight} link="/logout">יציאה   </NavigationItem>}

    </ul>
    </div>
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
