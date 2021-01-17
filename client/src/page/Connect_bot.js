import React from 'react';
import styled from 'styled-components';
import Facebookform from '../Components/Form/facebookform';
import Lineform from '../Components/Form/lineform';
import {withRouter, Redirect} from 'react-router-dom'


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

class Connect_bot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      platform: 'facebook',
      redirect: false,
      bot_id:''
    };
    this.handlelineChange = this.handlelineChange.bind(this);
    this.handlefacebookChange = this.handlefacebookChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderSwitch(param) {
    switch(param) {
      case 'facebook':
        return <Facebookform props={this.props.match.params}/>
      default:
        return <Lineform props={this.props.match.params} />
    }
  }
  
  handlelineChange (evt) {
    evt.preventDefault() ;
    this.setState({ platform: "line" });
  }
  handlefacebookChange (evt) {
    evt.preventDefault() ;
    this.setState({ platform: "facebook" });
    console.log(this.state.platform)
  }
  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(this.state)
  }

  handleSubmit= (evt) => {
    evt.preventDefault() ;
    // const form = {
    // }
    // fetch('/bot/create',{
    //   method : 'POST',
    //   headers : {
    //     "Access-Control-Allow-Origin": "*",
    //     'Content-Type':'application/json'
    //   },
    //   body : JSON.stringify(form)
    // }).then( res => res.json()).
    // then(data => {
    //   this.setState({ bot_id : data.id})
    //   this.setState({ redirect: true }) 
    // }
    // );
    // .then(data =>
      // this.props.history.push('/bot/connect_platform'+ data.bot_id +'/line') 
    // )
    
  }
  // "/profile/"+localStorage.getItem('user_id')
    render() {
      const { redirect,bot_id } = this.state;
      if (redirect) {
        return <Redirect to={"/bot/"+ bot_id +"/connect"} />
      }
      else {
        return(
            <Styles>
                <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-6 mx-auto">
                        <div className="card card-bot">
                            <div className="card-body">
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
                            </div>
                        </div>
                    </div>   
                </div>
            </Styles>
        )
      }
    }
}

export default withRouter(Connect_bot);         