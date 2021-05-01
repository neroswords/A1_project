import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import FlashMessage from 'react-flash-message'

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
    // background: url(${process.env.PUBLIC_URL +'/images/b.png'}) ;
    filter: gray;
    background-size: 40%;
    background-repeat: repeat;
    position: cover;
  }

  .card-regis {
    margin-top: 8%;
    margin-bottom: 10%;
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
    align-items: center;
  }

  .btn-regis .btn {
    text-align: center;
    align-items: center;
  }

  @mixin transition($property: all, $duration: 0.5s, $ease: cubic-bezier(0.65,-0.25,0.25, 1.95)) {
    transition: $property $duration $ease;
  }
  
  .btn-regis button {
    text-align: center;
    align-items: center;
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

  .title_part {
      margin-top: 4rem;
    }

  .title_part  p{
    font-weight: bold;
    margin-top:5%;
  }

  .title_part  .line{
    border: 10;
    height: 4px;
    background-color: #fca311;
    width: 200px;
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
  
  .error {
    background-color: white;
    color: red;
  }
`;


class Profile_edit extends React.Component {
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
      shop_address : '',
      message : '',
      showMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange (evt) {
    this.setState({message:''})
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit = (e) => {
    
    // this.setState({showMessage: true})
    e.preventDefault()
    
    if(this.state.password !== this.state.confirm_password){
      console.log('errors');
    }
    else{
      const snLength = this.state.shop_name.replace(/^\s+|\s+$/gm,'').length
      
      console.log(snLength)
      
      if (snLength == 0){
        this.setState({message:'Please enter Shop name'})
        this.setState({showMessage: true})
        
          
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
          fetch('/profile/'+localStorage.getItem('user_id')+'/edit', {
          method : 'POST',
          headers : {
                "Access-Control-Allow-Origin": "*",
                'Content-Type':'application/json'
          },
          body: JSON.stringify(profile)
        })
      alert("Edit Profile Successfully")
      window.location.replace("/login")
    }
    
          }

  }


componentDidMount ()  {
  fetch('/profile/'+localStorage.getItem('user_id')+'/edit').then((response) => {
      response.json().then((data) => {
        this.setState({ username: data[0].username });
        this.setState({ firstname: data[0].ft_name });
        this.setState({ lastname: data[0].la_name });
        this.setState({ shop_name: data[0].shop_name });
        this.setState({ shop_type: data[0].type_shop });
        this.setState({ shop_address: data[0].address });
        this.setState({ birthday: data[0].birthday });
        this.setState({ email: data[0].email });
        console.log(data)
      });
      
    });
  
      }
    

  render() {
    return(
        <Styles>
              <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-6 mx-auto">
                      <div className="card card-regis">
                        <div className="card-body">
                          <h5 className="card-title text-center">Edit Profile</h5>
                          <form className="form-regis"  onSubmit={this.handleSubmit}>
                          <div className="title_part">
                                <p className="col">Account infomation</p>
                                <div className="line"></div>
                          </div>
                              <div className="my-3">
                              <label for="exampleInputEmail1" className="form-label">Email address</label>
                              <input type="email" className="form-control " value = {this.state.email} id="inputemail" name='email' required value={this.state.email} onChange={this.handleChange} />
                              </div>
                              <div className="my-3">
                                <label for="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" className="form-control" value = {this.state.username} pattern="[A-Za-z0-9]+" id="inputusername" name='username' disabled value={this.state.username} onChange={this.handleChange}/>
                              </div>
                              <div className="row">
                                
                              </div>
                              <div className="title_part">
                                <p className="col">Personal infomation</p>
                                <div className="line"></div>
                              </div>
                                <div className="row my-3">
                                    <div className="col">
                                        <label for="inputFirstname" className="form-label">Firstname</label>
                                        <input type="text" pattern="[A-Za-z]+" className="form-control" value = {this.state.firstname} id="inputfirstname"  name='firstname' value={this.state.firstname} onChange={this.handleChange}/>
                                    </div>
                                    <div className="col">
                                    <label for="inputLastname" className="form-label">Last name</label>
                                        <input type="text" className="form-control" value = {this.state.lastname} id="inputlastname"  name='lastname' value={this.state.lastname} onChange={this.handleChange}/>
                                    </div>
                                    <div className="col">
                                      <label for="exampleInputEmail1" className="form-label">Birthday</label>
                                      <input type="date" className="form-control" id="inputdate" value = {this.state.birthday} name='birthday' value={this.state.birthday} onChange={this.handleChange} />
                                     </div> 
                                </div>
                                <div className="row">
                                  <div className="col my-3">
                                    <label for="exampleInputEmail1" className="form-label">Shop name</label>
                                    
                                    <input type="text" className="form-control"  id="inputshopname" value={this.state.shop_name} name='shop_name' onChange={this.handleChange} />
                                  </div>

                                  <div className="col my-3">
                                    <label for="exampleInputEmail1" className="form-label">Type of sale</label>
                                    <input type="text" className="form-control" pattern="[A-Za-z0-9]+" id="inputtypeofsale" value={this.state.shop_type} name='shop_type' onChange={this.handleChange} />
                                  </div>
                                </div>
                                { this.state.showMessage &&  
                                      <div className="container">
                                          <FlashMessage duration={40000}>
                                            <div className="error">
                                              <strong>{this.state.message}</strong>
                                            </div>  
                                          </FlashMessage>
                                      </div>
                                }
                                <div className="my-3">
                                  <label for="exampleFormControlTextarea1" className="form-label">Shop Address</label>
                                  <textarea className="form-control" id="inputshopaddress"  value = {this.state.shop_address} rows="2" placeholder="หากไม่มีให้เว้นว่างเอาไว้" name='shop_address' value={this.state.shop_address} onChange={this.handleChange}></textarea>
                                </div>
                                {/* <hr className="my-4"/>                            */}
                              <div className="btn-regis mt-5">
                                  <button className="btn btn-primary text-uppercase btn-inregis" type="submit"  >Submit</button>
                              </div>
                              {/* <hr className="my-4"/>
                              <div align="center">
                                <span> Already have an account ? </span>
                                <a  href="/Login" >Log in</a> 
                                 onSubmit={this.handleSubmit}
                              </div> */}
                          </form>
                          
                        </div>
                      </div>
                    </div>
                    
                </div>
        </Styles>
        
    );
  }
}

export default Profile_edit;