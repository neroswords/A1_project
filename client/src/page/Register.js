import React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import FlashMessage from 'react-flash-message'
import Regis_submit from '../Components/Regis_submit';
import { MDBNotification, MDBContainer } from "mdbreact";
import { faMailBulk, faTerminal } from '@fortawesome/free-solid-svg-icons';

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
    background: url(${process.env.PUBLIC_URL +'/images/b.png'}) ;
    filter: gray;
    background-size: 40%;
    background-repeat: repeat;
    position: cover;
  }

  .card-regis {
    padding: 20px;
    margin-top: 8%;
    margin-bottom: 10%;
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  
  .card-title-regis {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
    text-align: center;
  }
  
  .card-regis .card-body-regis {
    margin: 1rem;
    padding: 1rem;
  }
  
  .form-regis input {
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  .form-regis input {
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  .form-regis .btn {
    margin-left: 10%;
    border-radius: 1rem;
    letter-spacing: 0.1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 80%;
    text-align: center;
    /* align-item: center; */
  }

  .btn-regis .btn {
    text-align: center;
    /* align-item: center; */
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

  .req-icon{
    color: red;
    font-size: 1rem;
  }

  @mixin transition($property: all, $duration: 0.5s, $ease: cubic-bezier(0.65,-0.25,0.25, 1.95)) {
    transition: $property $duration $ease;
  }
  
  .btn-regis button {
    text-align: center;
    /* align-item: center; */
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    &.btn-inregis {
      @include transition(all, 0.5s, cubic-bezier(0.65,-0.25,0.25,1.95));
      font-weight: 900;
      color: $black;
      padding: 1rem 1rem;
      background: $white;
      text-transform: uppercase;
      &:hover, &:focus, &:active {
        letter-spacing: 0.4rem;
      }
    }
  }

    // label {
    //     font-weight: 
    // }

  .title_part-regis {
      margin-top: 4rem;
    }

  .title_part-regis p{
    font-weight: bold;
    margin-top:5%;
  }

  .title_part-regis .line{
    border: 10;
    height: 4px;
    background-color: #fca311;
    width: 200px;
  }

  /* .input-icon{
    display: flex;
    width: 100%;
    margin-bottom: 15px;
  } */

  .form-check{
    margin-top: 10%;
    margin-bottom: 3%;
  }
  
  .error {
    background-color: white;
    color: red;
    font-weight: 600;
    
  }

  span.ex-password {
    margin-top: 5px;
    font-size: 14px;
    color: gray;
  }
`;


class Register extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: null,
      username: null,
      password : null,
      confirm_password : null,
      firstname : null,
      lastname : null,
      birthday : null,
      shop_name : null,
      shop_type : null,
      shop_address : null,
      redirect : false,
      message : '',
      messageShopname : '',
      messageFirstname : '',
      messageLastname : '',
      showMessageUsername: false,
      showMessagePassword: false,
      showMessageShopname: false,
      showMessageFirstname: false,
      showMessageLastname: false,
      successState: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }

  

  handleChange (evt) {

    this.setState({ [evt.target.name]: evt.target.value });
    
    const field = evt.target.name
    if(field == "firstname"){
      this.setState({showMessageFirstname: false})
    }
    else if(field == "lastname"){
      this.setState({showMessageLastname: false})
    }
    else if(field == "shop_name"){
      this.setState({showMessageShopname: false})
    }
    else{
      return
    }
  }
 
  handleSubmit = (e) => {
    e.preventDefault()
    
    if(this.state.password !== this.state.confirm_password){
      this.setState({message:'your password and confirm password was not match'})
      this.setState({showMessagePassword: true})
      this.scrollToTop()
      // console.log(this.state.showMessagePassword)
  }
  else{
    const snLength = this.state.shop_name.replace(/^\s+|\s+$/gm,'').length
    const fnLength = this.state.firstname.replace(/^\s+|\s+$/gm,'').length
    const lnLength = this.state.lastname.replace(/^\s+|\s+$/gm,'').length
    if (fnLength == 0 ){
      this.setState({messageFirstname:'Please enter First name'})
      this.setState({showMessageFirstname: true})
      if(lnLength == 0){
        this.setState({messageLastname:'Please enter Last name'})
        this.setState({showMessageLastname: true})
        if(snLength == 0){
          this.setState({messageShopname:'Please enter Shop name'})
          this.setState({showMessageShopname: true})
        }
      }  
    }
    
    else if (lnLength == 0){
      this.setState({messageLastname:'Please enter Last name'})
      this.setState({showMessageLastname: true})
      if(snLength == 0){
        this.setState({messageShopname:'Please enter Shop name'})
        this.setState({showMessageShopname: true})
      }
      
    }
    else if (snLength == 0){
      this.setState({messageShopname:'Please enter Shop name'})
      this.setState({showMessageShopname: true})
      
    }
    else{
      this.setState({ successState: true})
      const profile = {
        email: this.state.email,
        username: this.state.username,
        password : this.state.password,
        firstname : this.state.firstname,
        lastname : this.state.lastname,
        birthday : this.state.birthday,
        shop_name : this.state.shop_name,
        shop_type : this.state.shop_type,
        shop_address : this.state.shop_address
      }
      fetch('/profile/signup', {
      method : 'POST',
      headers : {
            "Access-Control-Allow-Origin": "*",
            'Content-Type':'application/json'
      },
      body: JSON.stringify(profile)
    }).then((res)=>res.json()).then(data=>{
      if(data.message){
        this.setState({successState:false})

        this.setState({redirect:true})
      }
      else if(data.error){
        this.setState({message:data.error})
        this.setState({showMessageUsername: true})
        this.scrollToTop()
      }
    }).then(this.setState({showMessageUsername: false})).then(this.setState({showMessagePassword: false}))
    }
    
  }
}
flash = (e) =>{
  if (this.state.flash == true){
    return(
      <div>
        {e}
      </div>)
  }
}

  render() {
    const { redirect } = this.state;
      if (redirect) {
        return <Redirect to={"/login"} />
      }
      else {
        return(
          <Styles>
            
            
                  {this.state.successState ? 
                  <div>
                    {/* <img src={ImageWarnning} alt="warnning" className="warnning_img" /> */}
                    <div class="loader">Loading...</div>
                  </div>
                  
                  :   <div className="container">
                      <div className="col-sm-11 col-md-10 col-lg-9 mx-auto">
                        <div className="card card-regis">
                          <div className="card-body-regis">
                            <h5 className="card-title-regis">Register</h5>
                            <form className="form-regis" onSubmit={this.handleSubmit}>
                            <div className="title_part-regis">
                                  <p className="">Account infomation</p>
                                  <div className="line"></div>
                            </div>
                                <div className="my-3">
                                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <span className="req-icon"> *</span>
                                  <input type="email" className="form-control " id="inputemail" name='email' required value={this.state.email} onChange={this.handleChange} placeholder="example@mail.com"/>
                                </div>
                                <div className="my-3">
                                  <label for="exampleInputEmail1" className="form-label">Username</label>
                                  <span className="req-icon"> *</span>
                                  <input type="text" className="form-control" pattern="[A-Za-z0-9]+" id="inputusername" name='username' required minLength={5} maxLength={12} required value={this.state.username} onChange={this.handleChange}/>
                                  { this.state.showMessageUsername &&  
                                        <div className="container">
                                            <FlashMessage duration={4000}>
                                              <div className="msg-error">
                                                <strong>* {this.state.message}</strong>
                                              </div>  
                                            </FlashMessage>
                                        </div>
                                  }<span for="examplePassword" className="ex-password">*  Please input only alphabet or number (more than 5 character)</span>
                                </div>
                                
                                <div className="row">
                                  <div className="col ">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <span className="req-icon"> *</span>
                                    <input type="password" className="form-control" pattern="[A-Za-z0-9]+" id="inputpassword" name='password' required  minLength={6} value={this.state.password} onChange={this.handleChange} /> 
                                    
                                  </div>
                                  <div className="col">
                                    <label for="exampleInputPassword1" className="form-label">Comfirm Password</label>
                                    <span className="req-icon"> *</span>
                                    <input type="password" className="form-control" pattern="[A-Za-z0-9]+" id="confirmpassword" name='confirm_password' minLength={6} value={this.state.confirm_password} onChange={this.handleChange} />  
                                  </div>
                                  { this.state.showMessagePassword &&  
                                      <div className="container">
                                          <FlashMessage duration={4000}>
                                            <div className="error">
                                              <strong>* {this.state.message}</strong>
                                            </div>  
                                          </FlashMessage>
                                      </div>
                                }
                                <span for="examplePassword" className="ex-password">*  Please input only alphabet or number <br/>(more than 5 character)</span>
                                </div>
                                <div className="title_part-regis">
                                  <p className="col">Personal infomation</p>
                                  <div className="line"></div>
                                </div>
                                  <div className="row my-3">
                                      <div className="col">
                                          <label for="inputFirstname" className="form-label">Firstname</label>
                                          <span className="req-icon"> *</span>
                                          <input type="text" className="form-control"  id="inputfirstname" required  name='firstname' value={this.state.firstname} onChange={this.handleChange}/>
                                          { this.state.showMessageFirstname &&  
                                      <div className="container">
                                          <FlashMessage duration={40000}>
                                            <div className="error">
                                              <strong>* {this.state.messageFirstname}</strong>
                                            </div>  
                                          </FlashMessage>
                                      </div>
                                  }
                                      </div>
                                      
                                      <div className="col">
                                      <label for="inputLastname" className="form-label">Last name</label>
                                      <span className="req-icon"> *</span>
                                          <input type="text" className="form-control"  id="inputlastname" required name='lastname' value={this.state.lastname} onChange={this.handleChange}/>
                                          { this.state.showMessageLastname &&  
                                      <div className="container">
                                          <FlashMessage duration={40000}>
                                            <div className="error">
                                              <strong>* {this.state.messageLastname}</strong>
                                            </div>  
                                          </FlashMessage>
                                      </div>
                                }
                                      </div>
                                      
                                      <div className="col">
                                        <label for="exampleInputEmail1" className="form-label">Birthday</label>
                                        <input type="date" className="form-control" id="inputdate" name='birthday' value={this.state.birthday} onChange={this.handleChange} />
                                       </div> 
                                  </div>
                                  <div className="row">
                                    <div className="col my-3">
                                      <label for="exampleInputEmail1" className="form-label">Shop name</label>
                                      <span className="req-icon"> *</span>
                                      <input type="text" className="form-control"  id="inputshopname" required value={this.state.shop_name} name='shop_name' onChange={this.handleChange} />
                                      { this.state.showMessageShopname &&  
                                      <div className="container">
                                          <FlashMessage duration={40000}>
                                            <div className="error">
                                              <strong>* {this.state.messageShopname}</strong>
                                            </div>  
                                          </FlashMessage>
                                      </div>
                                }
                                    </div>
                                    <div className="col my-3">
                                      <label for="exampleInputEmail1" className="form-label">Type of sale</label>
                                      <span className="req-icon"> *</span>
                                      <input type="text" className="form-control" pattern="[A-Za-z0-9]+" id="inputtypeofsale" value={this.state.shop_type} name='shop_type' onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  
                                  <div className="my-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Shop Address</label>
                                    <textarea className="form-control" id="inputshopaddress" rows="3" placeholder="หากไม่มีให้เว้นว่างเอาไว้" name='shop_address' value={this.state.shop_address} onChange={this.handleChange}></textarea>
                                  </div>
                                <div class="form-check">
                                  <input className="form-check-input" type="checkbox" value="" name="checkvalidate" required/>
                                  <label className="form-check-label" for="flexCheckDefault">
                                    ยินยอมตามข้อกำหนด
                                    <a  href="/Login"> ข้อกำหนดการใช้บริการ </a>
                                    ตามที่ระบุไว้ 
                                  </label>
                                </div>                                
                                <div className="btn-regis">
                                    <button className="btn btn-primary text-uppercase btn-inregis" type="submit" name="btn-regist">register</button>
                                </div>
                                <hr className="my-4"/>
                                <div align="center">
                                  <span> Already have an account ? </span>
                                  <a  href="/Login" name="li-login">Log in</a> 
                                </div>
                            </form>
                            
                            <Regis_submit showPopup={this.state.successState} ></Regis_submit>
                          </div>
                        </div>
                      </div>
                      
                  </div>}
          </Styles>
          
      );
      }
   
  }
}

export default Register;