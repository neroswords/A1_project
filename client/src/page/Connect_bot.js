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
 
  .con-line{
    margin-left: 50px;
  }

  .connect_platform button{
    padding: 7px 5px;
    border-radius: 40px;
  }
  
  .model-popup {
    /* position: relative;
    left: 50px;
    right: 150px;
    top: -250px;
    z-index :1000;
    background-color: black; */
    /* background-color:black; */
    /* width: 100%;
    height: 100%; */
  }  
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: blue;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background :rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalWrapper = styled.div`
  background-color: white;
  padding: 3rem 3rem;
  border-radius: 0.5rem;
  /* width: 400px; */
  /* height: 550px; */
  /* z-index: 1000; */
  /* position: absolute; */
  /* top: calc(100% - 450px); // half of width */
  /* right: calc(100% - 800px); // half of height */

  /* box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2); */
  /* border-radius: 10px; */
  /* background: #f4f4f4; */
  /* grid-template-columns: 1fr 1fr; */
  /* display: grid; */
  /* top: 50%;
  left: 50%; */
  /* transform: translate(0%, -180%); */
  /* @media (max-width: 960px) {
      background: red;
    } */
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
  /* margin-top: 20%; */
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

//   const popupCenter = ({url, title, w, h}) => {
//     // Fixes dual-screen position                             Most browsers      Firefox
//     const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
//     const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

//     const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
//     const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

//     const systemZoom = width / window.screen.availWidth;
//     const left = (width - w) / 2 / systemZoom + dualScreenLeft
//     const top = (height - h) / 2 / systemZoom + dualScreenTop
//     const newWindow = window.open(url, title, 
//       `
//       scrollbars=yes,
//       width=${w / systemZoom}, 
//       height=${h / systemZoom}, 
//       top=${top}, 
//       left=${left}
//       `
//     )

//     // if (window.focus) newWindow.focus();
// }

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
      <div className="model-popup">
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