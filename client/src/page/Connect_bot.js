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
    margin-top: 5%;
    font-size: 23px;

  }

  .title_part  .line{
    border: 10px;
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
  
  .con-line{
    margin-left: 50px;
  }

  .connect_platform{
    text-aling: center;
  }

  .connect_platform button{
    padding: 7px 10px;
    border-radius: 40px;
    
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
                                  <button className="con-facebook btn btn-primary text-uppercase" onClick={this.handlefacebookChange} type=""><i class="icon-facebook fab fa-facebook fa-2x"></i></button>
                                  <button className="con-line btn btn-success btn-line text-uppercase" onClick={this.handlelineChange} type=""><i class="icon-line fab fa-line fa-2x"></i></button>
                                </div>
                                {this.renderSwitch(this.state.platform)}
                            </div>
                        </div>
                    </div>   
                </div>
                <svg height="100%" width="100%" id="bg-svg" viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient"><stop offset="5%" stop-color="#fcb90088"></stop><stop offset="95%" stop-color="#f78da788"></stop></linearGradient></defs><path d="M 0,500 C 0,500 0,166 0,166 C 116.57142857142858,188.10714285714286 233.14285714285717,210.21428571428572 349,202 C 464.85714285714283,193.78571428571428 580,155.25 705,149 C 830,142.75 964.8571428571429,168.7857142857143 1089,177 C 1213.142857142857,185.2142857142857 1326.5714285714284,175.60714285714283 1440,166 C 1440,166 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150"></path><defs><linearGradient id="gradient"><stop offset="5%" stop-color="#fcb900ff"></stop><stop offset="95%" stop-color="#f78da7ff"></stop></linearGradient></defs><path d="M 0,500 C 0,500 0,333 0,333 C 118.10714285714286,294.5 236.21428571428572,256 349,280 C 461.7857142857143,304 569.2500000000001,390.5 683,392 C 796.7499999999999,393.5 916.7857142857142,310 1044,286 C 1171.2142857142858,262 1305.607142857143,297.5 1440,333 C 1440,333 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150"></path></svg>
            </Styles>
        )
      }
    }
}

export default withRouter(Connect_bot);         