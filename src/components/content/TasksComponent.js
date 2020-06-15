import React from 'react';
import { connect } from 'react-redux';

import { updateObject} from '../../shared/utility'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-cards';
import * as actions from '../../store/actions/index';

import { Row,Column } from 'simple-flexbox'; //Column
import { StyleSheet, css } from 'aphrodite/no-important';
import CardComponent from './CardComponent';
import CheckboxOn from '../../assets/checkbox-on';
import CheckboxOff from '../../assets/checkbox-off';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import AddIcon from '@material-ui/icons/Add';
// import CheckIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';
// import { Modal ,Button } from 'react-bootstrap';
// import classes from './TasksComponent.module.css';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import { DropdownItem } from "reactstrap";

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#F0F1F7',
        color: '#9FA2B4',
        fontSize: 20,
        padding: 7,
        marginRight: 10
        
    },
    itemTitle: {
        wordWrap: 'break-word',
        color: '#252733',
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: '0.2px',
        lineHeight: '20px'
        
    },
    itemTitleDark: {
        color: 'white'
        
    },
    itemValue: {
        color: '#9FA2B4'
    },
    greyTitle: {
        color: '#C5C7CD',
        marginLeft: '10px'
    },
    tagStyles: {
        marginRight: 10,
        borderColor: 'gray',
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
    URGENT: { text: 'דחוף', backgroundColor: '#FEC400', color: '#FFFFFF' },
    NEW: { text: 'חדש', backgroundColor: '#29CC97', color: '#FFFFFF' },
    DEFAULT: { text: 'רגיל', backgroundColor: '#F0F1F7', color: '#9FA2B4' },
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
        toDoNewTask: {  
            title: '',
             checked: false , 
             tag: TAGS.NEW,
             list: '',
             isEdit: false
        },
        doingNewTask: { 
            title: '',
             checked: false , 
             tag: TAGS.NEW,
             list: '',
             isEdit: false

        },
        doneNewTask: { 
            title: '',
            checked: false , 
            tag: TAGS.NEW,
            list: '',
            isEdit: false
        }
    },

    isEditOpen: false
  }; 
}

    componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
        this.props.onFetchTasks(this.props.token, this.props.userId, this.props.branchNumber,this.props.userKey);
      }

    renderTask = (title, tag  , index, checked, taskKey, list,isEdit) => {

        return(

        <Column horizontal="space-between" style={{marginBotton:"10px",wordWrap: "break-word"}}>
            <Column style={{wordWrap: "break-word"}}>
                <Row style={{wordWrap: "break-word"}}>
                    {this.renderCheckbox(checked,taskKey,list)}
                        <Column style={{wordWrap: "break-word"}}>
                            <span className={this.props.backgroundColor==='light' ?
                            css(styles.itemTitle)
                            : css(styles.itemTitle, styles.itemTitleDark)} >{title}</span>
                        </Column>
                </Row>
            <Row vertical = "left" style={{direction: "ltr"}}>
                {this.renderEdit(title, tag, checked, taskKey, list, isEdit)}
                {this.renderTag(tag,taskKey,list)}
            </Row>
            </Column>
        </Column>
    );
    }

    renderTag = ( tag,taskKey,list) => { 
        let backgroundColor;
        let color;

        if(this.props.sidebarBackgroundColor==='primary'){
            if(tag === 'דחוף'){
                backgroundColor= "#7b1fa2";
                color= "#FFFFFF"; }
            else if (tag === 'חדש'){
                backgroundColor= '#ba68c8';
                color= '#FFFFFF'; }
          
            }
        
        else if(this.props.sidebarBackgroundColor==='blue'){
            if(tag === 'דחוף'){
                backgroundColor= "#1976d2";
                color= "#FFFFFF"; }
            else if (tag === 'חדש'){
                backgroundColor= '#64b5f6';
                color= '#FFFFFF'; }
        }

        else if(this.props.sidebarBackgroundColor==='green'){
            if(tag === 'דחוף'){
                backgroundColor= "#0097a7";
                color= "#FFFFFF"; }
            else if (tag === 'חדש'){
                backgroundColor= '#4dd0e1';
                color= '#FFFFFF'; }
        }

        if(tag === 'רגיל'){
            if(this.props.backgroundColor==='light'){
                backgroundColor = 'lightgray';
                color = 'white';
            }
            else{
            backgroundColor = '#F0F1F7';
            color = '#9FA2B4'; 
        } 
    }

        // if(tag === 'URGENT'){
        //     backgroundColor= "#FEC400";
        //     color= "#FFFFFF"; }
        // else if (tag === 'NEW'){
        //     backgroundColor= '#29CC97';
        //     color= '#FFFFFF'; }
        // else if(tag === 'DEFAULT'){
        //     backgroundColor= '#F0F1F7';
        //     color= '#9FA2B4'; } 

        return(
        <Row horizontal="center" vertical="center"
            style={{ backgroundColor, color }} className={css(styles.tagStyles)}
            onClick={() => this.onTagClick(taskKey,tag,list)}>  
            {tag}
        </Row>);
    }

    renderMove = (title,checked,tag,list,taskKey,isEdit) => { 
        let backgroundColor = '#F0F1F7';
        let color= '#9FA2B4';

        return(
        <Row horizontal="center" vertical="center"
            style={{ backgroundColor, color }} className={css(styles.tagStyles)}
            onClick={() => this.onMoveClick(title,checked,tag,list,taskKey,isEdit, "doing")}>  
            MOVE DOING
        </Row>);
    }

    onMoveClick = (title,checked,tag,oldList,taskKey,isEdit,newList) =>  {

        const formData = {};
        formData['title'] = title;
        formData['checked'] = checked;
        formData['tag'] = tag;
        formData['list'] = newList;
        formData['isEdit'] = isEdit;
        formData['openedByFirstName'] = this.props.firstName;
        formData['openedByLastName'] = this.props.lastName;
        //delete from the old list and then then send the request to taskOpening
        this.props.onTaskDelete(this.props.token, this.props.branchNumber, this.props.userKey,taskKey ,oldList,this.props.userId); // this contains all the data of card 
        this.props.onTaskOpening(formData, this.props.token, this.props.branchNumber, this.props.userKey, newList); // this contains all the data of card 


    }       

    renderDelete = (taskKey,list) => { 
        return(
        <Row horizontal="center" vertical="center">
            <DeleteIcon 
            style={{ fontSize:"large" }}
            onClick={() => this.onDeleteClick(taskKey,list)}/>     
        </Row>
        );
    }

    onDeleteClick = (taskKey,list) =>  {
        this.props.onTaskDelete(this.props.token, this.props.branchNumber, this.props.userKey,taskKey ,list,this.props.userId); // this contains all the data of card 
    }  
    

    renderEdit = (title, tag, checked, taskKey, list, isEdit) => { 
        // let backgroundColor = '#F0F1F7';
        // let color= '#9FA2B4';
       
        return(
        <Row horizontal="center" vertical="center">

            <EditIcon 
            style={{ fontSize:"large" }}
            onClick={() => this.onEditClick(title, tag, checked, taskKey, list, isEdit)}/>  
            
             <Dropdown isOpen={isEdit} direction="up" toggle={this.closeAddButton}  >
            <DropdownToggle
                tag="span"
                data-toggle="dropdown"
                aria-expanded={this.state.isEditOpen} >
                
            </DropdownToggle>
       
            {list=== 'todo' ?
                          
                <DropdownMenu style={{textAlign: "right", backgroundColor: "#F7F8FC",direction: "rtl"}}>
                <DropdownItem value="option-1" onClick={() => this.onMoveClick(title,checked,tag,list,taskKey,!isEdit, "doing")}>העבר ל DOING</DropdownItem>
                <DropdownItem value="option-2" onClick={() => this.onMoveClick(title,checked,tag,list,taskKey,!isEdit, "done")}>העבר ל DONE</DropdownItem>  
                <DropdownItem value="option-3" onClick={() => this.onDeleteClick(taskKey,list)}>מחק</DropdownItem>
 
                </DropdownMenu>
                : null
            }             

             {list==='doing' ?
             <DropdownMenu style={{textAlign: "right", backgroundColor: "#F7F8FC", direction: "rtl"}}>

                <DropdownItem value="option-1" onClick={() => this.onMoveClick(title,checked,tag,list,taskKey,!isEdit, "todo")}>העבר ל TODO</DropdownItem>
                <DropdownItem value="option-2" onClick={() => this.onMoveClick(title,checked,tag,list,taskKey,!isEdit, "done")}>העבר ל DONE</DropdownItem>
                <DropdownItem value="option-3" onClick={() => this.onDeleteClick(taskKey,list)}>מחק</DropdownItem>

                </DropdownMenu>
                : null
            }          

             {list==='done' ?
                <DropdownMenu style={{textAlign: "right", backgroundColor: "#F7F8FC"}}>
                <DropdownItem value="option-1" onClick={() => this.onMoveClick(title,checked,tag,list,taskKey,!isEdit, "todo")}>העבר ל TODO</DropdownItem>
                <DropdownItem value="option-2" onClick={() => this.onMoveClick(title,checked,tag,list,taskKey,!isEdit, "doing")}>העבר ל DOING</DropdownItem>
                <DropdownItem value="option-3" onClick={() => this.onDeleteClick(taskKey,list)}>מחק</DropdownItem>

                </DropdownMenu>
                : null
            }
          
            </Dropdown> 
        </Row>
        );
    }

    handleAddRow = () => {
        this.setState( { isEditOpen: true } );
      
      };

      closeAddButton = () => {
        //  console.log("393");
        this.setState( { isEditOpen: false } );
      };

    onEditClick = (title, tag, checked, taskKey, list, isEdit) =>  {
    const newEdit = !isEdit ;
    this.props.onTaskUpdate(newEdit, this.props.token, this.props.branchNumber, this.props.userKey,taskKey ,list, 'isEdit',this.props.userId); // this contains all the data of card 

}       

    
    renderCheckbox = (checked,taskKey,list) => <div className={css(styles.checkboxWrapper)} onClick={() => this.onCheckboxClick(checked,taskKey,list)} >
        {checked ? <CheckboxOn /> : <CheckboxOff />}
    </div>;

    onCheckboxClick = (checked,taskKey,list) => {
        const newChecked = !checked ;
        this.props.onTaskUpdate(newChecked, this.props.token, this.props.branchNumber, this.props.userKey,taskKey ,list, 'checked',this.props.userId); // this contains all the data of card 

    }

    getNextTag = (tag) => { //(except = 'דחוף')
        let tagLabels = ['URGENT', 'NEW', 'DEFAULT'];
        // const tagIndex = (tagLabels.indexOf(except) + 1) % 3;
        if(tag === 'דחוף')
            return TAGS[tagLabels[1]];
            
        if(tag === 'חדש')
            return TAGS[tagLabels[2]];

        if(tag === 'רגיל')
            return TAGS[tagLabels[0]];
    }

    onTagClick = (taskKey,tag,list) =>  {
        //const items = prevState.items;
        const newTag = this.getNextTag(tag);
        this.props.onTaskUpdate(newTag.text, this.props.token, this.props.branchNumber, this.props.userKey,taskKey ,list, 'tag',this.props.userId); // this contains all the data of card 
    }       

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
        if(list === 'todo'){
            formData['title'] = this.state.taskForm.toDoNewTask.title;
            formData['checked'] = this.state.taskForm.toDoNewTask.checked;
            formData['tag'] = this.state.taskForm.toDoNewTask.tag.text;
            formData['list'] = list;
            formData['isEdit'] = false;
            formData['openedByFirstName'] = this.props.firstName;
            formData['openedByLastName'] = this.props.lastName;
         //   console.log(this.state.taskForm.toDoNewTask.tag.text);

        }
        else if(list === 'doing'){
            formData['title'] = this.state.taskForm.doingNewTask.title;
            formData['checked'] = this.state.taskForm.doingNewTask.checked;
            formData['tag'] = this.state.taskForm.doingNewTask.tag.text;
            formData['list'] = list;
            formData['isEdit'] = false;
            formData['openedByFirstName'] = this.props.firstName;
            formData['openedByLastName'] = this.props.lastName;
        }
        else if(list === 'done'){
            formData['title'] = this.state.taskForm.doneNewTask.title;
            formData['checked'] = this.state.taskForm.doneNewTask.checked;
            formData['tag'] = this.state.taskForm.doneNewTask.tag.text;
            formData['list'] = list;
            formData['isEdit'] = false;
            formData['openedByFirstName'] = this.props.firstName;
            formData['openedByLastName'] = this.props.lastName;
        }

        this.props.onTaskOpening(formData, this.props.token, this.props.branchNumber, this.props.userKey, list); // this contains all the data of card 
        
        let updateTaskForm =  { 
                toDoNewTask: {  
                    title: '',
                     checked: false , 
                     tag: TAGS.NEW,
                     list: '',
                     isEdit: false
                },
                doingNewTask: { 
                    title: '',
                     checked: false , 
                     tag: TAGS.NEW,
                     list: '',
                     isEdit:false
                },
                doneNewTask: { 
                    title: '',
                    checked: false , 
                    tag: TAGS.NEW,
                    list: '',
                    isEdit: false
                }
        }
        this.setState({taskForm: updateTaskForm});
        //this.setState( { showWorkModel: true } );
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
        //  ...this.props.userTask.map( task => (task.list==='TODO' ? (this.renderTask2(task.title, task.tag , task.index,task.checked)) : this.getNextTag))
        // let { isEditOpen } = this.state;
        return (
            <div class="form-row" style={{direction: "rtl", fontWeight : "none" ,marginBottom: "4px" }} > 
            <div  class="form-group col-md-4"> 
            <CardComponent containerStyles={this.props.containerStyles} title="לטיפול" link="ראה הכל" subtitle="היום"
                items={[
                    <Row horizontal="space-between" vertical="center">
                        <input className={css(styles.itemTitle, styles.greyTitle)} type="text" autocomplete="off" id="toDoNewTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                        onChange={(event) => this.inputChangedHandler(event,'todo')} value={this.state.taskForm.toDoNewTask.title}
                        style={{boxShadow: "none",  border: "none",  borderBottom: "none ",fontFamily: "Alef Hebrew",fontStyle: "normal",fontWeight: "600",fontSize: "14px",letterSpacing:" 0.2px",lineHeight: "20px"}}/>
                        {this.renderAddButton('todo')}
                    </Row>,
                    ...this.props.userTasksTODO.map( task =>this.renderTask(task.title, task.tag , task.index,task.checked, task.taskKey,'todo', task.isEdit))
                ]}
            />
            </div> 

            <div  class="form-group col-md-4"> 
            <CardComponent containerStyles={this.props.containerStyles} title="בטיפול" link="ראה הכל" subtitle="היום"
            items={[
                <Row horizontal="space-between" vertical="center">
                    <input className={css(styles.itemTitle, styles.greyTitle)} type="text" autocomplete="off" id="doingNewTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                    onChange={(event) => this.inputChangedHandler(event,'doing')} value={this.state.taskForm.doingNewTask.title}
                    style={{boxShadow: "none",  border: "none",  borderBottom: "none ",fontFamily: "Alef Hebrew",fontStyle: "normal",fontWeight: "600",fontSize: "14px",letterSpacing:" 0.2px",lineHeight: "20px"}}/>
                    {this.renderAddButton('doing')}
                </Row>,
                ...this.props.userTasksDOING.map( task =>  this.renderTask(task.title, task.tag , task.index,task.checked, task.taskKey,'doing', task.isEdit))
            ]}
        />
    </div>

<div  class="form-group col-md-4"> 
        <CardComponent containerStyles={this.props.containerStyles} title="טופל" link="ראה הכל" subtitle="היום"
        items={[
            <Row horizontal="space-between" vertical="center">
                    <input className={css(styles.itemTitle, styles.greyTitle)} type="text" autocomplete="off" id="doneNewTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                    onChange={(event) => this.inputChangedHandler(event,'done')} value={this.state.taskForm.doneNewTask.title}
                    style={{boxShadow: "none",  border: "none",  borderBottom: "none ",fontFamily: "Alef Hebrew",fontStyle: "normal",fontWeight: "600",fontSize: "14px",letterSpacing:" 0.2px",lineHeight: "20px"}}/>         
                    {this.renderAddButton('done')}
            </Row>,
                ...this.props.userTasksDONE.map( task =>  this.renderTask(task.title, task.tag , task.index,task.checked, task.taskKey,'done', task.isEdit))
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
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        userKey: state.auth.userKey,
        userTasksTODO: state.task.todo,
        userTasksDOING: state.task.doing,
        userTasksDONE: state.task.done,
        backgroundColor: state.auth.backgroundColor,
        sidebarBackgroundColor: state.auth.sidebarBackgroundColor

    };
  };

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onTaskOpening: (task, token,branchNumber,userKey,list) => dispatch(actions.taskOpening(task, token, branchNumber,userKey,list)),
    onFetchTasks: (token,userId,branchNumber,userKey) => dispatch( actions.fetchTasks(token, userId,branchNumber,userKey) ),
    onTaskUpdate: (updateData,token,branchNumber,userKey,taskKey,list,field,userId) => dispatch( actions.taskUpdate(updateData,token,branchNumber,userKey,taskKey,list,field,userId) ),
    onTaskDelete: (token, branchNumber, userKey,taskKey ,list,userId) => dispatch( actions.taskDelete(token,branchNumber,userKey,taskKey,list,userId) )

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TasksComponent,axios));
