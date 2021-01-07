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
    
    this.state = {
      email: '',
      username: '',
      password : '',
      confirm_password : '',
      firstname : '',
      lastname : '',
      birthday : '',
      shop_name : '',
      shop_type : '',
      shop_address : ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // handleEmailChange= (e) => {
  //   this.setState({email: e.target.value});
  // }

  // handlePasswordChange= (e) => {
  //   this.setState({password: e.target.value});
  // }

  // handleConfirmPasswordChange= (e) => {
  //   this.setState({confirm_password: e.target.value});
  // }

  handleSubmit = (e) => {
    e.preventDefault()

    if(this.state.password !== this.state.confirm_password){
      console.log('errors');
  }
  else{
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
      console.log(profile);
      const response = fetch('/signup', {
      method : 'POST',
      headers : {
            "Access-Control-Allow-Origin": "*",
            'Content-Type':'application/json'
      },
      body: JSON.stringify(profile)
    })
  }

    

}

    // console.log('pass' + this.state.password);
    // console.log('con' + this.state.confirm_password);


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
                              <input type="email" className="form-control " id="inputemail" name='email' placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                              </div>
                              <div className="input-group my-3">
                                {/* <label for="exampleInputEmail1" className="form-label">Username</label> */}
                                <input type="text" className="form-control" id="inputusername" placeholder="Username" name='username' value={this.state.username} onChange={this.handleChange}/>
                              </div>
                              <div className="row ">
                                <div className="col ">
                                  {/* <label for="exampleInputPassword1" className="form-label">Password</label> */}
                                  <input type="password" className="form-control" id="inputpassword" placeholder="Password" name='password'  value={this.state.password} onChange={this.handleChange} /> 
                                </div>
                                <div className="col">
                                  {/* <label for="exampleInputPassword1" className="form-label">Comfirm Password</label> */}
                                  <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password" name='confirm_password' value={this.state.confirm_password} onChange={this.handleChange} />  
                                </div>
                              </div>
                              <div className="title_part">
                                <p className="col">Personal infomation</p>
                                <hr className="col"/>
                              </div>
                                <div className="row ">
                                    <div className="col">
                                        {/* <label for="inputFirstname" className="form-label">Firstname</label> */}
                                        <input type="text" className="form-control" id="inputfirstname" placeholder="Firstname" name='firstname' value={this.state.firstname} onChange={this.handleChange}/>
                                    </div>
                                    <div className="col">
                                    {/* <label for="inputLastname" className="form-label">Last name</label> */}
                                        <input type="text" className="form-control" id="inputlastname" placeholder="Lastname" name='lastname' value={this.state.lastname} onChange={this.handleChange}/>
                                    </div>
                                    <div className="col">
                                      {/* <label for="exampleInputEmail1" className="form-label">Birthday</label> */}
                                      <input type="date" className="form-control" id="inputdate" name='birthday' value={this.state.birthday} onChange={this.handleChange} />
                                     </div> 
                                </div>
                                <div className=" input-group my-3">
                                  {/* <label for="exampleInputEmail1" className="form-label">Shop name</label> */}
                                  <input type="text" className="form-control" placeholder="Shop name" id="inputshopname" value={this.state.shop_name} name='shop_name' onChange={this.handleChange} />
                                </div>
                                <div className="input-group my-3">
                                  {/* <label for="exampleInputEmail1" className="form-label">Type of sale</label> */}
                                  <input type="text" className="form-control" placeholder="Type of sale" id="inputtypeofsale" value={this.state.shop_type} name='shop_type' onChange={this.handleChange} />
                                </div>
                                <div className="input-group my-3">
                                  {/* <label for="exampleFormControlTextarea1" className="form-label">Shop Address (หากไม่มีให้เว้นว่างเอาไว้)</label> */}
                                  <textarea className="form-control" id="inputshopaddress" rows="2" placeholder="Shop Address (หากไม่มีให้เว้นว่างเอาไว้)" name='shop_address' value={this.state.shop_address} onChange={this.handleChange}></textarea>
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