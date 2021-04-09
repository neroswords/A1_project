import React from 'react';
import styled from 'styled-components';
// import {bglogin} from './images/bg-login.png';
import FlashMessage from 'react-flash-message'

const Styles = styled.div`
  .page {
        background: url(${process.env.PUBLIC_URL +'/images/b.png'});
        background-size: 30%;
        background-repeat: repeat-x;
        background-position: right top;
        position: cover;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
  }

  .container {
    margin-top:5%;
    font-family: 'Public Sans', sans-serif;
  }

  .card-signin {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  
  .card-signin .card-title {
    margin-bottom: 2rem;
    font-weight: bold;
    font-size: 3rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
  }
  
  .card-signin .card-body {
    padding: 2rem;
    margin: 2rem;
  }
  
  .form-signin input {
    border-radius: 1rem;
    padding: 0.5rem;
  }

  .form-signin .btn {
    border-radius: 1rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 100%;
    align-items: center;
    margin-top: 10%;
  }

  .form-signin .row {
    margin-top: 5%;
    border-radius: 1rem;
  }

  .btn-login .btn {
    margin-top:15%;
    text-align: center;
    align-items: center;
  }

  @mixin transition($property: all, $duration: 0.5s, $ease: cubic-bezier(0.65,-0.25,0.25, 1.95)) {
    transition: $property $duration $ease;
  }
  
  .detect-message{
    color : red;
  }

  .alert-message{
    margin-top: 10%;
  }

  .btn-login button {
    text-align: center;
    align-items: center;
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    &.btn-inlogin {
      @include transition(all, 0.5s, cubic-bezier(0.65,-0.25,0.25,1.95));
      font-weight: 900;
      color: $black;
      padding: 1.25rem 2rem;
      background: $white;
      text-transform: uppercase;
      &:hover, &:focus, &:active {
        letter-spacing: 0.4rem;
      }
    }
  }
  
  // @supports (display: grid) {
  //   body {
  //     display: grid;
  //     grid-template-columns: repeat(4, 1fr);
  //     grid-gap: 0.625rem;
  //     grid-template-areas: ". main main ." ". main main .";
  //   }
    
  //   .btn-login {
  //     grid-area: main;
  //     align-self: center;
  //     justify-self: center;
  //   }
  // }

  .detect {
    background-color: white;
    color: red;
  }


`;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password : '',
      showMessage: false,
      message : ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSignIn = e =>{
    e.preventDefault() ;
    const formLogin = {
      username: this.state.username,
      password : this.state.password
    }

    fetch('/profile/login', {
      method: 'POST',
      headers : {
        "Access-Control-Allow-Origin": "*",
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formLogin)
      }).then( res => res.json())
      .then(data=>{
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('username', data.username);
          localStorage.setItem('user_id', data.user_id);
          if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
            window.location.replace("/")
          }else{
            this.setState({ showMessage: true })
            this.setState({ message: data.error })
        }
      }).catch(error => console.log(error)).then(this.setState({ showMessage: false }))
  }

  render(){
      return(
          <Styles>
            <div className="page">
                <div className="container">
                      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                          <div class="card-body">
                            <h5 class="card-title text-center">Log in</h5>
                            <form class="form-signin">
                                <div class="form-floating ">
                                  <input type="text" class="form-control" name="username" id="floatingInput" value={this.state.username} onChange={this.handleChange} placeholder="Email" required/>
                                  <label for="floatingInput">Username</label>
                                </div>

                                <div class="form-floating mt-3">
                                  <input type="password" class="form-control" name="password" id="floatingPassword" value={this.state.password} onChange={this.handleChange} placeholder="Password" required />
                                  <label for="floatingPassword">Password</label>
                                </div>
                                { this.state.showMessage &&  
                                  <div className="container">
                                      <FlashMessage duration={4000}>
                                        <div className="detect">
                                          <strong>Login Error : {this.state.message}</strong>
                                        </div>  
                                      </FlashMessage>
                                  </div>
                                }
                                <div className="btn-login col-lg-9 col-md-12 col-sm-12 col-xs-12 ms-5">
                                    <button class="btn btn-primary text-uppercase btn-inlogin " type="submit" name="btn-login" onClick={this.handleSignIn}>Log in</button>
                                </div>
                                <hr className="my-4"/>
                                
                                <div align="center">
                                  <span>Don't have an account ? </span>
                                  <a  href="/Register" name="li-regist">Register</a> 
                                </div>
                            </form>
                          </div>
                        </div>
                      </div>
                  </div>
                  
                  
                  </div>
                  
          </Styles>
    );
  }
}
export default Login;