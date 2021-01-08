import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  .container {
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
    margin-top 5%;
    border-radius: 1rem;
  }

`;
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password : '',
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

    const response = fetch('/login', {
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

        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
          window.location.replace("/")
        }else{
            alert(data.error);
        }
      }).catch(err => console.log(err));
  }

  render(){
      return(
          <Styles>
                <div class="container">
                      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                          <div class="card-body">
                            <h5 class="card-title text-center">Log in</h5>
                            <form class="form-signin">
                                <div class="form-floating ">
                                  <input type="email" class="form-control" name="username" id="floatingInput" value={this.state.username} onChange={this.handleChange} placeholder="Email" required/>
                                  <label for="floatingInput">Email address</label>
                                </div>

                                <div class="form-floating">
                                  <input type="password" class="form-control" name="password" id="floatingPassword" value={this.state.password} onChange={this.handleChange} placeholder="Password" required />
                                  <label for="floatingPassword">Password</label>
                                </div>

                                <div className="btn-login my-4">
                                    <button class="btn btn-primary text-uppercase" type="submit">Log in</button>
                                </div>
                                <hr className="my-4"/>
                                
                                <div align="center">
                                  <span>Don't have an account ? </span>
                                  <a  href="/Register" >Register</a> 
                                </div>
                            </form>
                          </div>
                        </div>
                      </div>
                  </div>
          </Styles>
    );
  }
}
export default Login;