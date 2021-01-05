import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
  }

  .card-regis {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  
  .card-regis .card-title {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
  }
  
  .card-regis .card-body {
    margin: 1rem;
  }
  
  .form-floating input {
    border-radius: 1rem;
    height: 2%;
  }

  .form-regis{
    
  }

  .form-regis .btn {
    border-radius: 1rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 100%;
    align-items: center;
  }

    label {
        font-weight: 
    }

  input {
  }

  .title_part  p{
    font-weight: bold;
    margin-top:5%;
  }

  input-icon{
    display: flex;
    width: 100%;
    margin-bottom: 15px;
  }

  .form-check{
    margin-top: 10%;
    margin-bottom: 3%;
  }
  
`;


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {password : '',
                  confirm_password : ''};
  
  }

  handlePasswordChange= (e) => {
    this.setState({password: e.target.value});
    console.log(this.state.password);
  }

  handleConfirmPasswordChange= (e) => {
    this.setState({confirm_password: e.target.value});
  }

  handleSubmit= (e) => {
    e.preventDefault()

    if (this.state.password !== this.state.confirm_password){
      console.log('error');
    }
    // console.log('pass' + this.state.password);
    // console.log('con' + this.state.confirm_password);
  }

  render() {
    return(
        <Styles>
              <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-6 mx-auto">
                      <div className="card card-regis">
                        <div className="card-body">
                          <h5 className="card-title text-center">Register</h5>
                          <form className="form-regis">
                          <div className="title_part">
                                <p className="col">Account infomation</p>
                                <hr className="col"/>
                              </div>
                              <div className="input-group my-3">
                                {/* <label for="exampleInputEmail1" className="form-label">Email address</label> */}
                               {/* <i class="fa fa-lock"></i> */}
                              <input type="email" className="form-control " id="inputemail"  placeholder="Email Address" />
                              </div>
                              <div className="input-group my-3">
                                {/* <label for="exampleInputEmail1" className="form-label">Username</label> */}
                                <input type="text" className="form-control" id="inputusername" placeholder="Username"/>
                              </div>
                              <div className="row ">
                                <div className="col ">
                                  {/* <label for="exampleInputPassword1" className="form-label">Password</label> */}
                                  <input type="password" className="form-control" id="inputpassword" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} /> 
                                </div>
                                <div className="col">
                                  {/* <label for="exampleInputPassword1" className="form-label">Comfirm Password</label> */}
                                  <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.handleConfirmPasswordChange} />  
                                </div>
                              </div>
                              <div className="title_part">
                                <p className="col">Personal infomation</p>
                                <hr className="col"/>
                              </div>
                                <div className="row ">
                                    <div className="col">
                                        {/* <label for="inputFirstname" className="form-label">Firstname</label> */}
                                        <input type="text" className="form-control" id="inputfirstname" placeholder="Firstname"/>
                                    </div>
                                    <div className="col">
                                    {/* <label for="inputLastname" className="form-label">Last name</label> */}
                                        <input type="text" className="form-control" id="inputlastname" placeholder="Lastname"/>
                                    </div>
                                    <div className="col">
                                      {/* <label for="exampleInputEmail1" className="form-label">Birthday</label> */}
                                      <input type="date" className="form-control" id="inputdate"/>
                                     </div> 
                                </div>
                                <div className=" input-group my-3">
                                  {/* <label for="exampleInputEmail1" className="form-label">Shop name</label> */}
                                  <input type="text" className="form-control" placeholder="Shop name" id="inputshopname"/>
                                </div>
                                <div className="input-group my-3">
                                  {/* <label for="exampleInputEmail1" className="form-label">Type of sale</label> */}
                                  <input type="text" className="form-control" placeholder="Type of sale" id="inputtypeofsale" />
                                </div>
                                <div className="input-group my-3">
                                  {/* <label for="exampleFormControlTextarea1" className="form-label">Shop Address (หากไม่มีให้เว้นว่างเอาไว้)</label> */}
                                  <textarea className="form-control" id="inputshopaddress" rows="2" placeholder="Shop Address (หากไม่มีให้เว้นว่างเอาไว้)"></textarea>
                                </div>
                              <div class="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="chaeckvalidate"/>
                                <label className="form-check-label" for="flexCheckDefault">
                                  ยินยอมตามข้อกำหนด
                                  <a  href="/Login"> ข้อกำหนดการใช้บริการ </a>
                                  ตามที่ระบุไว้ 
                                </label>
                              </div>                                
                              <div className="btn-login">
                                  <button className="btn btn-primary text-uppercase" type="submit" onClick={this.handleSubmit} >register</button>
                              </div>
                              <hr className="my-4"/>
                              <div align="center">
                                <span> Already have an account ? </span>
                                <a  href="/Login" >Log in</a> 
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

export default Register;