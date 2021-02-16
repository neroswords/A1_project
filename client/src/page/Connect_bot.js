import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import Facebookform from '../Components/Form/facebookform';
import Lineform from '../Components/Form/lineform';
import { withRouter, Redirect } from 'react-router-dom'

import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Container } from "react-bootstrap";

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
    /* background-color: #; */
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
    text-align: center;
  }

  .connect_platform button{
    padding: 7px 10px;
    border-radius: 40px;
    
  }
  

`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  /* position: absolute; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  
`;

const ModalWrapper = styled.div`
  width: 400px;
  height: 550px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #fff;
  z-index: -10 !important;
  grid-template-columns: 1fr 1fr;
  position: absolute;
  margin-top: 20%;
  /* display: grid; */
  /* position: absolute;
  /* top: 50%;
  /* left: 50%; */
  /* transform: translate(0%, -180%); */
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 25px;
  height: 25px;
  padding: 0;
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
`;


export function Connect_bot({ setShowForm, showForm, botID }) {
  const [platform, setplatform] = useState("facebook")
  const renderSwitch = (platform, bot_id) => {
    switch (platform) {
      case 'facebook':
        return <Facebookform props={bot_id} />
      default:
        return <Lineform props={bot_id} />
    }
  }

  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showForm ? 1 : 0,
    transform: showForm ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowForm(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showForm) {
        setShowForm(false);
        console.log('I pressed');
      }
    },
    [setShowForm, showForm]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <Styles>
      <div>
        {showForm ? (
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              {/* <Container> */}
                <ModalWrapper showForm={showForm}>
                  <ModalContent>
                    <div>
                      <button className="con-facebook btn btn-primary text-uppercase" onClick={() => setplatform("facebook")} type=""><i class="icon-facebook fab fa-facebook fa-2x"></i></button>
                      <button className="con-line btn btn-success btn-line text-uppercase" onClick={() => setplatform("line")} type=""><i class="icon-line fab fa-line fa-2x"></i></button>
                    </div>
                    {renderSwitch(platform, botID)}

                  </ModalContent>
                  <CloseModalButton
                    aria-label="Close modal"
                    onClick={() => setShowForm(prev => !prev)}
                  />
                </ModalWrapper>
              {/* </Container> */}
            </animated.div>
          </Background>
        ) : null}
      </div>

    </Styles>
  )
}

{/* <div className="container">
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
                </div> */}


// class Connect_bot extends React.Component {
//   constructor(props, showForm, setShowForm, showIdbot) {
//     super(props);
//     console.log(props.showForm)
//     this.state = {
//       platform: 'facebook',
//       redirect: false,
//       bot_id: ''
//     };
//     this.handlelineChange = this.handlelineChange.bind(this);
//     this.handlefacebookChange = this.handlefacebookChange.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.modalRef = React.createRef();
//     this.keyPress = this.keyPress(this);

//   }

//   renderSwitch(param) {
//     switch (param) {
//       case 'facebook':
//         return <Facebookform props={this.props.match.params} />
//       default:
//         return <Lineform props={this.props.match.params} />
//     }
//   }

//   handlelineChange(evt) {
//     evt.preventDefault();
//     this.setState({ platform: "line" });
//   }
//   handlefacebookChange(evt) {
//     evt.preventDefault();
//     this.setState({ platform: "facebook" });
//     console.log(this.state.platform)
//   }
//   handleChange(evt) {
//     this.setState({ [evt.target.name]: evt.target.value });
//     console.log(this.state)
//   }

//   handleSubmit = (evt) => {
//     evt.preventDefault();
//     // const form = {
//     // }
//     // fetch('/bot/create',{
//     //   method : 'POST',
//     //   headers : {
//     //     "Access-Control-Allow-Origin": "*",
//     //     'Content-Type':'application/json'
//     //   },
//     //   body : JSON.stringify(form)
//     // }).then( res => res.json()).
//     // then(data => {
//     //   this.setState({ bot_id : data.id})
//     //   this.setState({ redirect: true }) 
//     // }
//     // );
//     // .then(data =>
//     // this.props.history.push('/bot/connect_platform'+ data.bot_id +'/line') 
//     // )

//   }
//   // "/profile/"+localStorage.getItem('user_id')

//   render() {
//     console.log(this.showForm)
//     // const modalRef = useRef();
//     const closeModal = e => {
//       if (this.modalRef.current === e.target) {
//         this.setShowForm(false);
//       }
//     };

//     this.keyPress(
//       e => {
//         if (e.key === 'Escape' && this.showForm) {
//           this.setShowForm(false);
//           console.log('I pressed');
//         }
//       },
//       [this.setShowForm, this.showForm]
//     );

//     this.componentDidMount(
//       () => {
//         document.addEventListener('keydown', this.keyPress);
//         return () => document.removeEventListener('keydown', this.keyPress);
//       },
//       [this.keyPress]
//     );


//     const { redirect, bot_id } = this.state;
//     if (redirect) {
//       return <Redirect to={"/bot/" + bot_id + "/connect"} />
//     }
//     else {
//       return (
//         <Styles>
//           <div>
//             {this.showForm ? (
//               <Background onClick={closeModal} ref={this.modalRef}>
//                 {/* <animated.div style={animation}> */}
//                 <Container>
//                   <ModalWrapper showForm={this.showForm}>
//                     <ModalContent>
//                       facebook form
//                 </ModalContent>
//                     <CloseModalButton
//                       aria-label="Close modal"
//                       onClick={() => this.setShowForm(prev => !prev)}
//                     />
//                   </ModalWrapper>
//                 </Container>
//                 {/* </animated.div> */}
//               </Background>
//             ) : null}
//           </div>
//           {/* <div className="container">
//                     <div className="col-sm-10 col-md-9 col-lg-6 mx-auto">
//                         <div className="card card-bot">
//                             <div className="card-body">
//                                 <div className="title_part">
//                                     <p className="col ">Connect platform</p>
//                                     <div className="line"></div>
//                                 </div>
//                                 <div className="connect_platform">
//                                   <button className="con-facebook btn btn-primary text-uppercase" onClick={this.handlefacebookChange} type=""><i class="icon-facebook fab fa-facebook fa-2x"></i></button>
//                                   <button className="con-line btn btn-success btn-line text-uppercase" onClick={this.handlelineChange} type=""><i class="icon-line fab fa-line fa-2x"></i></button>
//                                 </div>
//                                 {this.renderSwitch(this.state.platform)}
//                             </div>
//                         </div>
//                     </div>   
//                 </div> */}
//         </Styles>
//       )
//     }
//   }
// }

export default withRouter(Connect_bot);         