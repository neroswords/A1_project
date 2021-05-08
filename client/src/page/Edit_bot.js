  
import React from 'react';
import styled from 'styled-components';
import {Link,withRouter, Redirect} from 'react-router-dom'
import FlashMessage from 'react-flash-message'
import { MDBNotification, MDBContainer } from "mdbreact";

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
    margin-top: 2%;
  }
  .card-bot{
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  .loader {
  animation:spin 1s infinite linear;
  border:solid 2vmin transparent;
  border-radius:50%;
  border-right-color:#fca311;
  border-top-color:#fca311;
  box-sizing:border-box;
  height:20vmin;
  left:calc(50% - 10vmin);
  position:fixed;
  top:calc(50% - 10vmin);
  width:20vmin;
  z-index:1;
  &:before {
    animation:spin 2s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcc111;
    border-top-color:#fcc111;
    box-sizing:border-box;
    content:"";
    height:16vmin;
    left:0;
    position:absolute;
    top:0;
    width:16vmin;
  }
  &:after {
    animation:spin 3s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcd111;
    border-top-color:#fcd111;
    box-sizing:border-box;
    content:"";
    height:12vmin;
    left:2vmin;
    position:absolute;
    top:2vmin;
    width:12vmin;
  }
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
  .card-bot .card-title-cretebot {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    margin-top: 15px;
  }
  
  .card-bot .card-body {
    margin: 1rem;
  }
  
  .title_part p{
      font-weight: bold;
      margin-top: 9%;
  }
  .title_part  .line{
    border: 10;
    height: 4px;
    background-color: #fca311;
    width: 200px;
    margin-bottom: 5%;
  }
  .form-bot .btn {
    border-radius: 1rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 80%;
    align-items: center;
    /* background-color: #; */
  }
  .btn-createbot{
      margin-top: 3rem;
      text-align : center;
  }
  .form-bot input {
    border-radius: 0.5rem;
  }
  .form-bot select{
    border-radius: 0.5rem;
  }
  .row-2{
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  input[type=file]::-webkit-file-upload-button {
    border: 2px;
    padding: 0.5rem ;
    border-radius: 0.75rem;
    background-color: #fca311;
    transition: 1s;
    color: white;
    width: 40%;
    
  }
  
  input[type="file"] {
    max-width: 100%;
  }
  .showimage {
    margin-bottom: 1%;
    text-align: center;
  }
  .showimage img{
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 170px;
    height: 170px;
    text-align: center;
    object-fit: cover;
  }
  
  .vertical-line {
    border-left: 1px solid black;
  }
  .btn-facebook {
    background-color: #0078ff;
  }
  .btn-line {
    background-color: #34a853 ;
  }

  .button-close-edit-bot i {
    float: right;
    color: red;
    font-size: 18px;
  }

  .req-icon{
    color: red;
    font-size: 1rem;
  }
  .error{
      color: red;
    }
`;

class Edit_bot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bot_name: '',
      gender: '',
      age: '',
      bot_id:'',
      imageURL: '',
      Image: '',
      message : '',
      showMessage: false,
      errorState: false,
      successState: false,
      loading : false
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
 
  handleChange (evt) {
    
    this.setState({ [evt.target.name]: evt.target.value });
    const field = evt.target.name
     if(field == "bot_name" ){
        this.setState({showMessage: false})
     }
    // console.log(this.state)
  }
  _handleImageChange(e) {
    e.preventDefault();
    
    let reader = new FileReader();
    // console.log(e.target.files[0])
    if(e.target.files[0] == undefined){
      return
    }
    else{
      let fileimg = e.target.files[0];
      let type = e.target.files[0].type;
      // console.log(type)
      
      // console.log(fileimg)
      if (!fileimg){
        return
      }
      this.setState({errorState: false})
      if( type != "image/jpeg" && type != "image/png"){
        this.setState({errorState: true})
        
      }
      else{
        reader.onloadend = () => {
        this.setState({
          file: fileimg,
          imagePreviewUrl: reader.result
          });      
        }
      reader.readAsDataURL(fileimg)
      }
    }
    
    
  }
  handleUploadImage(ev) {
    ev.preventDefault();
    // console.log(ev)
    this.setState({errorState: false}) 
    const files = ev.target[0].files[0]
    const BotnameLength = this.state.bot_name.replace(/^\s+|\s+$/gm,'').length
    console.log(files)
    console.log(this.uploadInput.files[0])
    if (BotnameLength == 0){
      this.setState({message:'Please enter Bot name'})
      this.setState({showMessage: true})
      console.log("show")

    }
    else{
      if(!files){
        console.log(this.state.Image)
        this.setState({ successState: true})
      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('bot_name',this.bot_name.value);
      data.append('gender' ,this.gender.value);
      data.append('age' ,this.age.value);
      data.append('creator' , localStorage.getItem('user_id'))
      data.append('Image' , this.state.Image)
      fetch('/bot/'+this.props.match.params.bot_id+'/edit', {
        method: 'POST',
        // headers : {
        //   "Access-Control-Allow-Origin": "*",
        //   //'Content-Type':'application/json'
        // },
        //body : JSON.stringify(form),
        body: data,
      }).then((response) => {
        this.setState({ successState: false})
        response.json().then((body) => {
          this.setState({ imageURL: `/${body.file}` });
          this.setState({ bot_id : data.id})
          this.setState({ redirect: true }) 
        });
      });
      }
      else{
        console.log(this.state.Image)
        const type = ev.target[0].files[0].type;
        // console.log(type)
        if( type != "image/jpeg" && type != "image/png"){
          this.setState({errorState: true})
            }
            else{
              
              console.log(BotnameLength)
              this.setState({ successState: true})
              const data = new FormData();
            data.append('file', this.uploadInput.files[0]);
            data.append('bot_name',this.bot_name.value);
            data.append('gender' ,this.gender.value);
            data.append('age' ,this.age.value);
            data.append('creator' , localStorage.getItem('user_id'))
            data.append('Image' , this.state.Image)
            console.log(data)
            fetch('/bot/'+this.props.match.params.bot_id+'/edit', {
              method: 'POST',
              // headers : {
              //   "Access-Control-Allow-Origin": "*",
              //   //'Content-Type':'application/json'
              // },
              //body : JSON.stringify(form),
              body: data,
            }).then((response) => {
              response.json().then((body) => {
                this.setState({ successState: false})
                console.log(body.file)
                this.setState({ imageURL: `/${body.file}` });
                this.setState({ bot_id : data.id})
                this.setState({ redirect: true }) 
              });
            });
            }
      }
    }
    
    
    
    
  }
     componentDidMount ()  {
    fetch('/bot/'+this.props.match.params.bot_id+'/edit').then((response) => {
        response.json().then((data) => {
          this.setState({ bot_name: data[0].bot_name });
          this.setState({ gender : data[0].gender});
          this.setState({ age: data[0].age }) ;
          this.setState({ Image: data[0].Img }); 
          this.setState({ loading: true }); 
        });
        
      });
        
        }
      
    render() {
    const { redirect,bot_id } = this.state;
    if (redirect) {
      window.location.assign("/bot_list/"+ localStorage.getItem('user_id'))
      // return <Redirect to={"/bot_list/"+ localStorage.getItem('user_id')} />
    }
    else {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
      return(
        <Styles>
          { this.state.successState ? <div>
                    {/* <img src={ImageWarnning} alt="warnning" className="warnning_img" /> */}
                    <div class="loader">Loading...</div>
                  </div>
            : this.state.errorState &&  
            <div className="errorstate">

                              
                                  <MDBNotification
                                  style={{
                                    // width: "auto",
                                    position: "absolute",
                                    // top: "10px",
                                    // left: "500px",
                                    zIndex: 9999
                                  }}
                                  bodyClassName="p-2 font-weight-bold white-text "
                                  className="stylish-color-dark position-absolute top-0 start-50 translate-middle-x"
                                  closeClassName="blue-grey-text"
                                  fade
                                  icon="bell"
                                  iconClassName="text-danger"
                                  message="Only PNG or JPG is accepted."
                                  show
                                  
                                  title="Error"
                                  titleClassName="elegant-color-dark white-text"
                    
                                  />
                                </div>

                                }
              <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
                    
                      <div className="card card-bot">
                        
                        <div className="card-body">
                        <Link to={"/bot_list/" +localStorage.getItem("user_id") + "#main" }  className="button-close-edit-bot">
                              <i className="fas fa-times"></i>
                        </Link>
                          <h5 className="card-title-cretebot ">Edit Bot form</h5>
                          <form className="form-bot" onSubmit={this.handleUploadImage}>
                                <div className="title_part">
                                        <p className="col">Bot information</p>
                                        <div className="line"></div>
                                </div>
                              
                                {this.state.loading ?                    
                      <div className="row">
                      <div className="group col-lg-6">
                        <div className="showimage col-lg-8">
                        { imagePreviewUrl ?   $imagePreview :  <img src={'/images/bot/bot_pic/'+this.state.Image}/> }            
                        </div>
                        <div className="mt-3">                                           
                            <label for="uploadimage">Upload Proflie</label>
                            <input accept="image/x-png,image/gif,image/jpeg" ref={(ref) => { this.uploadInput = ref; }} onChange={(e)=>this._handleImageChange(e)} type="file"  />
                          </div>
                      </div>  
                      <div className=" group col-lg-6">
                          <div className="">
                            <label  className="form-label">Bot Name</label>
                            <span className="req-icon"> *</span>
                            <input type="text"  name="bot_name" value = {this.state.bot_name}  ref={(ref) => { this.bot_name = ref; }} onChange={this.handleChange} className="form-control" id="inputbotname"/>
                          </div>
                          { this.state.showMessage &&  
                      <div className="container">
                          <FlashMessage duration={40000}>
                            <div className="error">
                              <strong>* {this.state.message}</strong>
                            </div>  
                          </FlashMessage>
                      </div>
                }
                          <div class="mt-3">
                            <label for="inputgender" class="form-label">Gender</label>
                            <span className="req-icon"> *</span>
                            <select id="inputgender" name="gender" value = {this.state.gender}  ref={(ref) => { this.gender = ref; }} onChange={this.handleChange} class="form-select">
                                <option selected>Choose...</option>
                                <option>Male </option>
                                <option>Female</option>
                            </select>
                          </div>
                          <div className="mt-3">
                              <label for="inputFirstname" className="form-label">Age</label>
                              <span className="req-icon"> *</span>
                              <input type="text" pattern="\d*"  min="1" step="1"  name="age" className="form-control" id="inputfirstname" value = {this.state.age}   ref={(ref) => { this.age = ref; }} onChange={this.handleChange} no-float/>
                          </div>
                      </div>
              </div>
               
                               : <div class="loader"></div>}


                                <div className="row row-2">
                                        
                                </div>
                                {/* <div className="title_part">
                                        <p className="col ">Connect platform</p>
                                        <div className="line"></div>
                                </div>
                                <div className="connect_platform">
                                  <div className="row col-lg-12">
                                      <div className="col-lg-6">
                                          <button className="btn btn-primary text-uppercase" onClick={this.handlefacebookChange} type="">facebook</button>
                                      </div>
                                      <div className="col-lg-6">
                                          <button className="btn btn-success btn-line text-uppercase" onClick={this.handlelineChange} type="">line</button>
                                      </div>
                                  </div>
                                </div> */}

                            {/* {this.renderSwitch(this.state.platform)} */}
                            {/* <Lineform />                                 */}

                              <div className="btn-createbot">
                                  <button className="btn btn-success text-uppercase" onSubmit={this.handleUploadImage} type="submit">Edit Bot</button>
                              </div>


                          </form>
                          
                        </div>
                      </div>
                    </div>
                    
                </div>
        </Styles>
      )
    }
}
}

export default Edit_bot;