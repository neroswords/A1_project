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
  
  .form-floating input {
    border-radius: 1rem;
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

  input {
    margin-top : 6%;
  }

`;

function Login(){
    return(
        <Styles>
              <div class="container">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                      <div class="card card-signin my-5">
                        <div class="card-body">
                          <h5 class="card-title text-center">Log in</h5>
                          <form class="form-signin">
                              <div class="form-floating ">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Email" required/>
                                <label for="floatingInput">Email address</label>
                              </div>

                              <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required />
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

export default Login;