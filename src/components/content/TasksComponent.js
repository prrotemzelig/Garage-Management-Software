import React from 'react';
import { connect } from 'react-redux';

import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import CardComponent from './CardComponent';
import CheckboxOn from '../../assets/checkbox-on';
import CheckboxOff from '../../assets/checkbox-off';
import { updateObject, checkValidity} from '../../shared/utility'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-cards';
import * as actions from '../../store/actions/index';

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#F0F1F7',
        color: '#9FA2B4',
        fontSize: 20,
        padding: 7
    },
    itemTitle: {
        color: '#252733',
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: '0.2px',
        lineHeight: '20px'
        
    },
    itemValue: {
        color: '#9FA2B4'
    },
    greyTitle: {
        color: '#C5C7CD'
    },
    tagStyles: {
        borderRadius: 5,
        cursor: 'pointer',
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 11,
        letterSpacing: '0.5px',
        lineHeight: '14px',
        padding: '5px 12px 5px 12px'
    },
    checkboxWrapper: {
        cursor: 'pointer',
        marginRight: 0,
        marginLeft: 10
    }
});

const TAGS = {
    URGENT: { text: 'URGENT', backgroundColor: '#FEC400', color: '#FFFFFF' },
    NEW: { text: 'NEW', backgroundColor: '#29CC97', color: '#FFFFFF' },
    DEFAULT: { text: 'DEFAULT', backgroundColor: '#F0F1F7', color: '#9FA2B4' },
}

class TasksComponent extends React.Component {

    constructor(props) {
        super(props)
    this.state = {
        items: [
            {title: 'סיום עדכון דוחות חודשיים', checked: false, tag: TAGS.URGENT },
            {title: 'הוצאת חשבונית לחברת ביטוח שירביט', checked: false, tag: TAGS.NEW },
            {title: 'בדיקת שעות נוכחות מול הרואה חשבון', checked: true, tag: TAGS.DEFAULT }
        ],
    rows: [],
    taskForm: { 
        newTask: { 
            title: '',
             checked: false , 
             tag: TAGS.URGENT,
             list: ''
            }
    },
    isAddNewWorkOpen: false,
    
  }; 
}


    // state = { items: [
    //     {title: 'סיום עדכון דוחות חודשיים', checked: false, tag: TAGS.URGENT },
    //     {title: 'הוצאת חשבונית לחברת ביטוח שירביט', checked: false, tag: TAGS.NEW },
    //     {title: 'בדיקת שעות נוכחות מול הרואה חשבון', checked: true, tag: TAGS.DEFAULT }
    // ]};
    componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
        this.props.onFetchTasks(this.props.token, this.props.userId, this.props.branchNumber,this.props.userKey);
      }

    renderTask = (title, tag  , index,checked) => (
        <Row horizontal="space-between" vertical="center">
            <Row>
                {this.renderCheckbox(checked)}
                <span className={css(styles.itemTitle)}>{title}</span>
            </Row>
            {this.renderTag(tag)}
        </Row>
    );

    renderTask2 = ({title, tag = {} }, index,checked) => (
        <Row horizontal="space-between" vertical="center">
            <Row>
                {this.renderCheckbox(checked)}
                <span className={css(styles.itemTitle)}>{title}</span>
            </Row>
            {this.renderTag2(tag, index)}
        </Row>
    );

    // renderTask = ({title, tag = {} }, index,checked) => (
    //     <Row horizontal="space-between" vertical="center">
    //         <Row>
    //             {this.renderCheckbox(index)}
    //             <span className={css(styles.itemTitle)}>{title}</span>
    //         </Row>
    //         {this.renderTag(tag, index)}
    //     </Row>
    // );

    renderTag = ( tag) => (
        <Row horizontal="center" vertical="center"
            style={{ backgroundColor: '#FEC400', color: '#FFFFFF' }} className={css(styles.tagStyles)}
           >
            {tag}
        </Row>
    );
    
    renderTag2 = ({ text, backgroundColor, color }, index) => (
        <Row horizontal="center" vertical="center"
            style={{ backgroundColor, color }} className={css(styles.tagStyles)}
            onClick={() => this.onTagClick(index)}>
            {text}
        </Row>
    );

    renderCheckbox = (checked) => <div className={css(styles.checkboxWrapper)} >
        {checked ? <CheckboxOn /> : <CheckboxOff />}
    </div>;

//  renderCheckbox = (index) => <div className={css(styles.checkboxWrapper)} onClick={() => this.onCheckboxClick(index)}>
//         {this.state.items[index].checked ? <CheckboxOn /> : <CheckboxOff />}
//     </div>;

    onCheckboxClick = (index) => this.setState(prevState => {
        const items = prevState.items;
        items[index].checked = !items[index].checked;
        return { items };
    });

    getNextTag = (except = 'URGENT') => {
        const tagLabels = ['URGENT', 'NEW', 'DEFAULT'];
        const tagIndex = (tagLabels.indexOf(except) + 1) % 3;
        return TAGS[tagLabels[tagIndex]];
    }

    onTagClick = (index) => this.setState(prevState => {
        const items = prevState.items;
        items[index].tag = this.getNextTag(items[index].tag.text);
        return { items };
    })

    onAddButtonClick = () => this.setState(prevState => {
        const items = prevState.items;
        items.push({ title: `Task ${items.length + 1}`, checked: false, tag: this.getNextTag() });
        return { items };
    });

    renderAddButton = (list) => (
        <Row horizontal="center" vertical="center" className={css(styles.tagStyles, styles.addButton)} onClick= {( event ) => this.taskOpeningHandler( event, list)} >
            +
        </Row>
    ) 

    taskOpeningHandler = ( event,list ) => {
        event.preventDefault(); // with that we get the task details
        const formData = {};
          formData['title'] = this.state.taskForm.newTask.title;
          formData['checked'] = this.state.taskForm.newTask.checked;
          formData['tag'] = this.state.taskForm.newTask.tag.text;
          formData['list'] = list;

        // const task = { // here we  prepare the card data
        //     taskData: formData,
        //     //userId: this.props.userId,
        //     //branchNumber: this.props.branchNumber,
        //    // userKey: this.props.userKey
        // }   

        this.props.onTaskOpening(formData, this.props.token, this.props.branchNumber, this.props.userKey, list); // this contains all the data of card 
    }

    inputChangedHandler = (event,list) => { 

        const updatedFormElement = updateObject(this.state.taskForm[event.target.id], { 
            title: event.target.value,
            list: list
           
        });
        const updatedCardForm = updateObject(this.state.taskForm, { 
            [event.target.id]: updatedFormElement 
        });
      
          this.setState({taskForm: updatedCardForm});
        }

    render() {
        //console.log(this.props.userTask);
        //  ...this.props.userTask.map( task => (task.list==='TODO' ? (this.renderTask(task.title, task.tag , task.index,task.checked)) : this.getNextTag))

        return (
            <div class="form-row" style={{direction: "rtl", fontWeight : "none" ,marginBottom: "4px" }} > 

            <div  class="form-group col-md-4"> 
            <CardComponent containerStyles={this.props.containerStyles} title="TODO" link="ראה הכל" subtitle="היום"
                items={[
                    <Row horizontal="space-between" vertical="center">
                        <input className={css(styles.itemTitle, styles.greyTitle)} type="text" id="newTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                        onChange={(event) => this.inputChangedHandler(event,'todo')}
                        style={{boxShadow: "none",  border: "none",  borderBottom: "none ",fontFamily: "Alef Hebrew",fontStyle: "normal",fontWeight: "600",fontSize: "14px",letterSpacing:" 0.2px",lineHeight: "20px"}}/>

                        {this.renderAddButton('todo')}
                    </Row>,
                    ...this.props.userTasksTODO.map( task =>this.renderTask(task.title, task.tag , task.index,task.checked))
                ]}
            />


            </div> 

            <div  class="form-group col-md-4"> 

            <CardComponent containerStyles={this.props.containerStyles} title="DOING" link="ראה הכל" subtitle="היום"
            items={[
                <Row horizontal="space-between" vertical="center">
                    <input className={css(styles.itemTitle, styles.greyTitle)} type="text" id="newTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                    onChange={(event) => this.inputChangedHandler(event,'doing')}
                    style={{boxShadow: "none",  border: "none",  borderBottom: "none ",fontFamily: "Alef Hebrew",fontStyle: "normal",fontWeight: "600",fontSize: "14px",letterSpacing:" 0.2px",lineHeight: "20px"}}/>

                    {this.renderAddButton('doing')}
                </Row>,
                
                ...this.props.userTasksDOING.map( task =>  this.renderTask(task.title, task.tag , task.index,task.checked))

            ]}
        />
    </div>

<div  class="form-group col-md-4"> 

        <CardComponent containerStyles={this.props.containerStyles} title="DONE" link="ראה הכל" subtitle="היום"
        items={[
            <Row horizontal="space-between" vertical="center">
                    <input className={css(styles.itemTitle, styles.greyTitle)} type="text" id="newTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                    onChange={(event) => this.inputChangedHandler(event,'doing')}
                    style={{boxShadow: "none",  border: "none",  borderBottom: "none ",fontFamily: "Alef Hebrew",fontStyle: "normal",fontWeight: "600",fontSize: "14px",letterSpacing:" 0.2px",lineHeight: "20px"}}/>
                     
                    {this.renderAddButton('done')}

            </Row>,
                ...this.props.userTasksDONE.map( task =>  this.renderTask(task.title, task.tag , task.index,task.checked))
            ]}
    /> 
    </div>
    </div>
        );
    }
}


const mapStateToProps = state => { // here we get the state and return a javascript object
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        branchNumber: state.auth.branchNumber,
        userKey: state.auth.userKey,
        userTasksTODO: state.task.todo,
        userTasksDOING: state.task.doing,
        userTasksDONE: state.task.done
    };
  };

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onTaskOpening: (task, token,branchNumber,userKey,list) => dispatch(actions.taskOpening(task, token, branchNumber,userKey,list)),
    onFetchTasks: (token,userId,branchNumber,userKey) => dispatch( actions.fetchTasks(token, userId,branchNumber,userKey) )

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TasksComponent,axios));