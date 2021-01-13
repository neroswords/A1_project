import React from 'react';
import styled from 'styled-components';
import {withRouter, Redirect} from 'react-router-dom'

import Facebookform  from '../components/form/facebookform';
import Lineform  from '../components/form/lineform';

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
  
  .card-bot .card-title {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
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
    background-color: #;
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
    width: 80%;
    text-align: center;
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
`;



class Create_bot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bot_name: '',
      gender: '',
      age: '',
      platform: 'line'
    };
    this.handlelineChange = this.handlelineChange.bind(this);
    this.handlefacebookChange = this.handlefacebookChange.bind(this);
  }
  
  renderSwitch(param) {
    switch(param) {
      case 'facebook':
        return <Facebookform />
      default:
        return <Lineform />
    }
  }
  
  handlelineChange (evt) {
    evt.preventDefault() ;
    this.setState({ platform: "line" });
    console.log(this.state.platform)
  }
  handlefacebookChange (evt) {
    evt.preventDefault() ;
    this.setState({ platform: "facebook" });
    console.log(this.state.platform)
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const data = {
      bot_name: this.state.bot_name,
      gender : this.state.gender,
      age : this.state.age,
      creator : localStorage.getItem('user_id')
    }
    fetch('/bot/create',{
      method : 'POST',
      headers : {
        "Access-Control-Allow-Origin": "*",
        'Content-Type':'application/json'
      },
      body : JSON.stringify(data)
    }).then( res => res.json())
    // .then(data =>
      // this.props.history.push('/bot/connect_platform'+ data.bot_id +'/line') 
    // )
    return <Redirect to={"/profile/"+localStorage.getItem('user_id')} />
  }

    render() {
      return(
        <Styles>
              <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-6 mx-auto">
                      <div className="card card-bot">
                        <div className="card-body">
                          <h5 className="card-title text-center">Create Bot form</h5>
                          <form className="form-bot">
                                <div className="title_part">
                                        <p className="col">Bot infomation</p>
                                        <div className="line"></div>
                                </div>
                                <div className="row">
                                        <div className="group col-lg-6">
                                          <div className="showimage col-lg-8">
                                                <img src='./images/Avatar.jpg'/>                                    
                                          </div>
                                          <div className="mt-3">                                           
                                              <label for="uploadimage">Upload Proflie</label>
                                              <input type="file" className="form-control-file mt-2"name="image"/>
                                            </div>
                                        </div>  
                                        <div className=" group col-lg-6">
                                            <div className="">
                                              <label  className="form-label">Bot Name</label>
                                              <input type="text" className="form-control" id="inputbotname"/>
                                            </div>
                                            <div class="mt-3">
                                              <label for="inputgender" class="form-label">Gender</label>
                                              <select id="inputgender" class="form-select">
                                                  <option selected>Choose...</option>
                                                  <option>Male</option>
                                                  <option>Female</option>
                                              </select>
                                            </div>
                                            <div className="mt-3">
                                                <label for="inputFirstname" className="form-label">Age</label>
                                                <input type="Age" className="form-control" id="inputfirstname" />
                                            </div>
                                        </div>
                                </div>
                                <div className="row row-2">
                                        
                                </div>
                                <div className="title_part">
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
                                </div>

                            {this.renderSwitch(this.state.platform)}
                            {/* <Lineform />                                 */}

                              <div className="btn-createbot">
                                  <button className="btn btn-success text-uppercase" type="submit">Create ChatBot</button>
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

export default withRouter(Create_bot);