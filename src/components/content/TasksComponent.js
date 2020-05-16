import React from 'react';
import { connect } from 'react-redux';

import { updateObject, checkValidity} from '../../shared/utility'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-cards';
import * as actions from '../../store/actions/index';

import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import CardComponent from './CardComponent';
import CheckboxOn from '../../assets/checkbox-on';
import CheckboxOff from '../../assets/checkbox-off';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Modal ,Button } from 'react-bootstrap';
import classes from './TasksComponent.module.css';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

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
        //localStorage.removeItem('userKey');

      }

    renderTask = (title, tag  , index, checked, taskKey, list,isEdit) => {
      // localStorage.setItem(taskKey, false); //post

        return(
        <Row horizontal="space-between" vertical="center">
            <Row>
                {this.renderDelete(taskKey,list)}
                {this.renderEdit(tag,taskKey,list,isEdit)}
                {this.renderCheckbox(checked,taskKey,list)}
                <span className={css(styles.itemTitle)}>{title}</span>
            </Row>
            {this.renderTag(tag,taskKey,list)}
            {this.renderMove(title,checked,tag,list,taskKey,isEdit)} 

        </Row>
    );
    }
    renderTag = ( tag,taskKey,list) => { 
        let backgroundColor;
        let color;

        if(tag === 'URGENT'){
            backgroundColor= "#FEC400";
            color= "#FFFFFF"; }
        else if (tag === 'NEW'){
            backgroundColor= '#29CC97';
            color= '#FFFFFF'; }
        else if(tag === 'DEFAULT'){
            backgroundColor= '#F0F1F7';
            color= '#9FA2B4'; } 

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
    
  

    renderEdit = ( tag,taskKey,list,isEdit) => { 

        //console.log( this.props.userTasksTODO[taskKey]);
       
        // let backgroundColor= "#FEC400";
        // let color= "#FFFFFF";

        // <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"><EditIcon style={{fontSize:"large"}}/></i></a>
        //console.log(taskKey);
        //console.log(taskKey);

        //let open = localStorage.getItem(taskKey);
  //      console.log(taskKey);
     //  console.log(open);
        return(
        <Row horizontal="center" vertical="center">

            <EditIcon 
            style={{ fontSize:"large" }}
            onClick={() => this.onEditClick(taskKey,tag,list,isEdit)}/>  
            
            
            {/* <Dropdown isOpen={isEdit} direction="left" toggle={this.closeAddButton}>
            <DropdownToggle
                tag="span"
                data-toggle="dropdown"
                aria-expanded={this.state.isEditOpen}
            >
                
            </DropdownToggle>
            <DropdownMenu>
                <div onClick={this.closeAddButton}>Custom dropdown item</div>
                <div onClick={this.closeAddButton}>Custom dropdown item</div>
                <div onClick={this.closeAddButton}>Custom dropdown item</div>
                <div onClick={this.closeAddButton}>Custom dropdown item</div>
            </DropdownMenu>
            </Dropdown> */}

            {/* <div class="dropdown" show={this.state.isEditOpen} onHide={this.closeAddButton} >
 
              <a  type="button" id="dropdownMenu2" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
    
            <div class="dropdown-menu dropdown-primary">
                <a class="dropdown-item" href="#"><i class="fab fa-apple-pay"></i>&nbsp;&nbsp;Pay</a>
                <a class="dropdown-item" href="#"><i class="fas fa-bell-slash"></i>&nbsp;&nbsp;Disable alertss</a>
                <a class="dropdown-item" href="#"><i class="far fa-envelope"></i>&nbsp;&nbsp;Check mail</a>
            </div>
            </div> */}
         {/* <Modal  show={this.state.isEditOpen} onHide={this.closeAddButton} dialogClassName={classes.ModalDialog} backdrop= {false}
 
        style={{ display: "flex", textAlign:"right", paddingLeft: "1px" ,width: "50%" }}  >
      <Modal.Header closeButton style={{ padding: "5px", textAlign:"right"}}   >
        <Modal.Title  >עבודות לכרטיס</Modal.Title>   
      </Modal.Header>

      <Modal.Body  style={{ backgroundColor:"#6c757d", display: "block", maxHeight: "calc(100% - 120px)", overFlowY: "scroll", padding:"3px",flex: "none"}}   >
        <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 
         </div> 
        </Modal.Body>
     
        <div className={classes.separator}></div>
      <Modal.Footer style={{padding: "5px", display: "block"}}>
      <div >
          <form  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px"}} >         
            <div> 
           
              <Button onClick={this.handleAddRow} >הוספה</Button> 
            </div>
          </form>
      </div>
      </Modal.Footer>
    </Modal> */}
        </Row>
        );
    }

    handleAddRow = () => {
        this.setState( { isEditOpen: true } );
      
      };

      closeAddButton = () => {
        this.setState( { isEditOpen: false } );
      };

    onEditClick = (taskKey,tag,list,isEdit) =>  {
        //onst items = prevState.items;
        //const newTag = this.getNextTag(tag);
     //   localStorage.setItem(taskKey, true); //post



        // const newEdit = !isEdit ;
        // console.log(newEdit);
        // this.props.onTaskUpdate(newEdit, this.props.token, this.props.branchNumber, this.props.userKey,taskKey ,list, 'isEdit',this.props.userId); // this contains all the data of card 

        console.log(taskKey);




       // let open = localStorage.getItem(taskKey); //post
        // let final = false;

        // if(open === 'true'){
        //     final= true;
        // }
        // console.log(final);

        // return final;
     
        //        this.setState( { isEditOpen: true } );

        //this.handleAddRow();
       // console.log("160");
       // console.log(this.state.isEditOpen);

       // this.props.onTaskUpdate(newTag.text, this.props.token, this.props.branchNumber, this.props.userKey,taskKey ,list, 'tag',this.props.userId); // this contains all the data of card 

}       

    
    renderCheckbox = (checked,taskKey,list) => <div className={css(styles.checkboxWrapper)} onClick={() => this.onCheckboxClick(checked,taskKey,list)} >
        {checked ? <CheckboxOn /> : <CheckboxOff />}
    </div>;

//  renderCheckbox2 = (index) => <div className={css(styles.checkboxWrapper)} onClick={() => this.onCheckboxClick(index)}>
//         {this.state.items[index].checked ? <CheckboxOn /> : <CheckboxOff />}
//     </div>;

    onCheckboxClick = (checked,taskKey,list) => {
        const newChecked = !checked ;
        console.log(newChecked);
        this.props.onTaskUpdate(newChecked, this.props.token, this.props.branchNumber, this.props.userKey,taskKey ,list, 'checked',this.props.userId); // this contains all the data of card 

    }
 
    // onCheckboxClick2 = (index) => this.setState(prevState => {
    //     const items = prevState.items;
    //     items[index].checked = !items[index].checked;
    //     return { items };
    // });

    getNextTag = (except = 'URGENT') => {
        const tagLabels = ['URGENT', 'NEW', 'DEFAULT'];
        const tagIndex = (tagLabels.indexOf(except) + 1) % 3;
        return TAGS[tagLabels[tagIndex]];
    }

    onTagClick = (taskKey,tag,list) =>  {
        //onst items = prevState.items;
        const newTag = this.getNextTag(tag);
        
        console.log(list);
        console.log(tag);

        console.log(tag.text);
        console.log(newTag);
        console.log(newTag.text);
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
        console.log();
        if(list === 'todo'){
            formData['title'] = this.state.taskForm.toDoNewTask.title;
            formData['checked'] = this.state.taskForm.toDoNewTask.checked;
            formData['tag'] = this.state.taskForm.toDoNewTask.tag.text;
            formData['list'] = list;
            formData['isEdit'] = false;
            console.log(this.state.taskForm.toDoNewTask.tag.text);

        }
        else if(list === 'doing'){
            formData['title'] = this.state.taskForm.doingNewTask.title;
            formData['checked'] = this.state.taskForm.doingNewTask.checked;
            formData['tag'] = this.state.taskForm.doingNewTask.tag.text;
            formData['list'] = list;
            formData['isEdit'] = false;
            console.log(this.state.taskForm.doingNewTask.tag.text);
        }
        else if(list === 'done'){
            formData['title'] = this.state.taskForm.doneNewTask.title;
            formData['checked'] = this.state.taskForm.doneNewTask.checked;
            formData['tag'] = this.state.taskForm.doneNewTask.tag.text;
            formData['list'] = list;
            formData['isEdit'] = false;
            console.log(this.state.taskForm.doneNewTask.tag.text);
        }

       // toDoNewTask  doingNewTask  doneNewTask
 
        // const task = { // here we  prepare the card data
        //     taskData: formData,
        //     //userId: this.props.userId,
        //     //branchNumber: this.props.branchNumber,
        //    // userKey: this.props.userKey
        // }   

        this.props.onTaskOpening(formData, this.props.token, this.props.branchNumber, this.props.userKey, list); // this contains all the data of card 
        //console.log(this.state.taskForm.newTask.title);
        
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
        //console.log(this.props.userTask);
        //  ...this.props.userTask.map( task => (task.list==='TODO' ? (this.renderTask2(task.title, task.tag , task.index,task.checked)) : this.getNextTag))
        let { isEditOpen } = this.state;
        return (
            <div class="form-row" style={{direction: "rtl", fontWeight : "none" ,marginBottom: "4px" }} > 
            <div  class="form-group col-md-4"> 
            <CardComponent containerStyles={this.props.containerStyles} title="TODO" link="ראה הכל" subtitle="היום"
                items={[
                    <Row horizontal="space-between" vertical="center">
                        <input className={css(styles.itemTitle, styles.greyTitle)} type="text" id="toDoNewTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                        onChange={(event) => this.inputChangedHandler(event,'todo')} value={this.state.taskForm.toDoNewTask.title}
                        style={{boxShadow: "none",  border: "none",  borderBottom: "none ",fontFamily: "Alef Hebrew",fontStyle: "normal",fontWeight: "600",fontSize: "14px",letterSpacing:" 0.2px",lineHeight: "20px"}}/>
                        {this.renderAddButton('todo')}
                    </Row>,
                    ...this.props.userTasksTODO.map( task =>this.renderTask(task.title, task.tag , task.index,task.checked, task.taskKey,'todo', task.isEdit))
                ]}
            />
            </div> 

            <div  class="form-group col-md-4"> 
            <CardComponent containerStyles={this.props.containerStyles} title="DOING" link="ראה הכל" subtitle="היום"
            items={[
                <Row horizontal="space-between" vertical="center">
                    <input className={css(styles.itemTitle, styles.greyTitle)} type="text" id="doingNewTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                    onChange={(event) => this.inputChangedHandler(event,'doing')} value={this.state.taskForm.doingNewTask.title}
                    style={{boxShadow: "none",  border: "none",  borderBottom: "none ",fontFamily: "Alef Hebrew",fontStyle: "normal",fontWeight: "600",fontSize: "14px",letterSpacing:" 0.2px",lineHeight: "20px"}}/>
                    {this.renderAddButton('doing')}
                </Row>,
                ...this.props.userTasksDOING.map( task =>  this.renderTask(task.title, task.tag , task.index,task.checked, task.taskKey,'doing', task.isEdit))
            ]}
        />
    </div>

<div  class="form-group col-md-4"> 
        <CardComponent containerStyles={this.props.containerStyles} title="DONE" link="ראה הכל" subtitle="היום"
        items={[
            <Row horizontal="space-between" vertical="center">
                    <input className={css(styles.itemTitle, styles.greyTitle)} type="text" id="doneNewTask" class="form-control" aria-describedby="passwordHelpInline"  placeholder= "יצירת משימה חדשה" 
                    onChange={(event) => this.inputChangedHandler(event,'doing')} value={this.state.taskForm.doneNewTask.title}
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
        userKey: state.auth.userKey,
        userTasksTODO: state.task.todo,
        userTasksDOING: state.task.doing,
        userTasksDONE: state.task.done
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

    // state = { items: [
    //     {title: 'סיום עדכון דוחות חודשיים', checked: false, tag: TAGS.URGENT },
    //     {title: 'הוצאת חשבונית לחברת ביטוח שירביט', checked: false, tag: TAGS.NEW },
    //     {title: 'בדיקת שעות נוכחות מול הרואה חשבון', checked: true, tag: TAGS.DEFAULT }
    // ]};
    
      // renderTask2 = ({title, tag = {} }, index,checked) => (
    //     <Row horizontal="space-between" vertical="center">
    //         <Row>
    //             {this.renderCheckbox2(checked)}
    //             <span className={css(styles.itemTitle)}>{title}</span>
    //         </Row>
    //         {this.renderTag2(tag, index)}
    //     </Row>
    // );

    // renderTask2 = ({title, tag = {} }, index,checked) => (
    //     <Row horizontal="space-between" vertical="center">
    //         <Row>
    //             {this.renderCheckbox2(index)}
    //             <span className={css(styles.itemTitle)}>{title}</span>
    //         </Row>
    //         {this.renderTag2(tag, index)}
    //     </Row>
    // );

    // renderTag2 = ({ text, backgroundColor, color }, index) => (
    //     <Row horizontal="center" vertical="center"
    //         style={{ backgroundColor, color }} className={css(styles.tagStyles)}
    //         onClick={() => this.onTagClick2(index)}>
    //         {text}
    //     </Row>
    // );

        // onTagClick2 = (index) => this.setState(prevState => {
    //     const items = prevState.items;
    //     items[index].tag = this.getNextTag(items[index].tag.text);
    //     return { items };
    // })