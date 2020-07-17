import React, { Component } from 'react';
import { connect } from 'react-redux';
import Open from './openNew';
class ImageUpload extends React.Component {
  constructor(props){
    super(props);
    
  }
  state = {
    files: [],
    ImgFile:[],
    arr:[],
    Arr:[],
    type:''
  }
  
    fileSelectedHandler = (e) => {
    // console.log(e.target.files[0].type);
        this.setState({ files: [...this.state.files, ...e.target.files]})

    }

    
    render() {
      //console.log(this.state.files);

      if(this.props.value==="image"){
        return (
          <form>
            <h5>תמונות:</h5>
            <input type="file" id={"image"} multiple onChange={this.fileSelectedHandler} />
          </form>
        )
      }
      else{
        return (
          <form>
            <h5>מסמכים:</h5>
            <input type="file" id={"doc"} multiple onChange={this.fileSelectedHandler} />
          </form>
        )
      }
    }
  }
  
  export default ImageUpload
 // ReactDOM.render(<ImageUpload />, document.getElementById('app'))
 /**
  * <form>
                    <h5>תמונות:</h5>
                        <input type="file" id="image" multiple onChange={this.fileSelectedHandler}/>
                  </form>
                  <form>
                    <h5>מסמכים:</h5>
                        <input type="file" id="doc" multiple onChange={this.fileSelectedHandler} />
                  </form>
  */