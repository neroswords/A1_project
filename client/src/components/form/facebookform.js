import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import packageJson from '../../../package.json';
import { useHistory } from 'react-router-dom'
import { MDBNotification, MDBContainer } from "mdbreact";
import FlashMessage from 'react-flash-message'

const Styles = styled.div`
.container {
    margin-top: 2%;
}

.facebook-card {
    height: 30rem;
    width: 25rem;
    /* padding: 4rem 3rem; */
    border: 0;
    border-radius: 1rem;
    background-color: #fff;
    color: white;
    // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    border: 3px solid #0078ff;
}
.facebook {
    padding : 5%;
}

.facebook p{
    font-weight: bold;
    font-size: 23px;
    color: black;
}

.copy-link p{
    /* display: inline-block; */
    font-size: 15px;
    color: black;
    float:left;
    max-width: 95%;
    overflow-x: auto;

}

.copy-link p::-webkit-scrollbar {
  /* width: 5px; */
  height: 10px;
}

.copy-link p::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px gray; 
  border-radius: 0.5rem;
}
.copy-link p::-webkit-scrollbar-thumb {
  background: #dddddd; 
  border-radius: 0.5rem;
}

/* .copy-link p::-webkit-scrollbar-thumb:hover {
  background: gray; 
} */

.copy-link i{
    color: #0078ff;
}

.copy-clipboard {
    color: #34a853;
    /* top: 195px;
    right: 70px; */
}

.copy-link button{
    /* display:inline-block; */
    position: relative;
    float : right;
    background: white;
    border-radius: 1rem;
    border: 2px solid #0078ff;
    /* margin-left: -3%;
    margin-right: -8px; */
    margin: 0 -5% 0 0;
    /* padding: */
    /* text-align:center; */
} 

.facebook .input-Box label{
    font-size: 15px;
    color: black;
}

.facebook .input-Box input{
    box-shadow: none;
    outline: none;
    border: none;
    border-bottom: 2px solid #d3d3d3;
    outline: none;
    /* margin-bottom: 30px; */
    margin-top: 1px;
    font-size: 16px;
    padding: 5px 0;
}

#container-button{
    text-align: center;
    /* margin-top: 40%; */
}

#container-button .submit{
    padding: 5px 30px;
    margin-top: 15px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #0078ff;
    transition: 0.5s;
    margin: 10px;
    background-color: #0078ff;
    color: #fff;
    
}

#container-button .submit:hover{
    color: #000;
}

#container-button .cancle{
    padding: 5px 30px;
    margin-top: 15px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #CD5C5C;
    transition: 0.5s;
    margin: 10px;
    background-color: #CD5C5C;
    color: #fff;
}

#container-button .cancle:hover{
    color: #000;
}
.loader {
  animation:spin 1s infinite linear;
  border:solid 2vmin transparent;
  border-radius:50%;
  border-right-color:#fca311;
  border-top-color:#fca311;
  box-sizing:border-box;
  height:20vmin;
  left:calc(50% - 10vmin);
  position:fixed;
  top:calc(50% - 10vmin);
  width:20vmin;
  z-index:1;
  &:before {
    animation:spin 2s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcc111;
    border-top-color:#fcc111;
    box-sizing:border-box;
    content:"";
    height:16vmin;
    left:0;
    position:absolute;
    top:0;
    width:16vmin;
  }
  &:after {
    animation:spin 3s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcd111;
    border-top-color:#fcd111;
    box-sizing:border-box;
    content:"";
    height:12vmin;
    left:2vmin;
    position:absolute;
    top:2vmin;
    width:12vmin;
  }
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
`;

export default function Facebookform({botID,setReload,setShowForm}) {
    const [access_token, setAccess_token] = useState('');
    const [verify_token, setVerify_token] = useState('');
    const [webhook, setWebhook] = useState(packageJson.proxy+'bot/webhook/'+botID+'/facebook')
    const history = useHistory()
    const [successState, setSuccessState] = useState(false)

    const handleSubmit = (event) => {

        event.preventDefault();
        
        
        
          
              const editData = {
            'page_facebook_access_token':access_token, 
            'verify_token':verify_token,
            'creator':localStorage.getItem('user_id'),
            'platform':'facebook'
            }
            fetch('/bot/'+botID+'/connect', {
                method: 'POST',
                headers : {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(editData)
            }).then(response => response.json().then(setSuccessState(true)).then(setReload(prev => !prev)).then(setShowForm(prev => !prev)))
            // .then( res => res.json())
            // .then(data=>{
            //     localStorage.setItem('access_token', data.access_token);
            //     localStorage.setItem('username', data.username);
            //     localStorage.setItem('user_id', data.user_id);
            //     if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
            //       window.location.replace("/")
            //     }else{
            //         alert(data.error);  
            //   }
            // }).catch(error => console.log(error));
            
        
    }

    const [loading,setLoading] = useState(false);
    useEffect(() => {
        fetch('/bot/'+botID+'/connect').then(
            response => response.json()
          ).then(data =>{
            setAccess_token(data.page_facebook_access_token);
            setVerify_token(data.verify_token);
            setLoading(true)
        })
    }, []);

    return (
        <Styles>
             { successState && 
             <div className="successstate">

                              
                    <MDBNotification
                    style={{
                    // width: "auto",
                    position: "absolute",
                    // top: "10px",
                    // left: "500px",
                    zIndex: 9999
                    }}
                    bodyClassName="p-2 font-weight-bold white-text "
                    className="stylish-color-dark position-absolute top-0 start-50 translate-middle-x"
                    closeClassName="blue-grey-text"
                    fade
                    icon="bell"
                    iconClassName="text-danger"
                    message="Connect bot successfully"
                    show

                    title="Success"
                    titleClassName="elegant-color-dark white-text"

                    />
                    </div>
            
            

                }
            <div className="container">
                 <div className="row my-3">
                    <div className="group facebook-card col-lg-12">
                        <form className="facebook" onSubmit={ handleSubmit }>
                            <div className="row">
                                <p className="col mb-4">Connect to facebook</p>
                                {/* <i className="col fab fa-facebook"></i> */}
                            </div>
                            <div className="copy-link">
                                <p>{packageJson.proxy}/bot/webhook/{botID}/facebook</p>
                                <button type="button" className="copy-clipboard" onClick={() => {navigator.clipboard.writeText(webhook)}}><i className="fas fa-copy fa-xs copy-clipboard"></i></button>
                            </div>
                         
                            {loading ?                    
                       <div className="input-Box">
                       <div className="ms-2">
                           <label  className="form-label">Access token</label>
                           <input type="text" value={access_token} onChange={e => setAccess_token(e.target.value)} className="form-control" id="inputpagefacebook" required/>
                       </div>
                      
                       <div className="col-lg-12 mt-3">
                           <label  className="form-label">Verify token</label>
                           <input type="text" value={ verify_token } onChange={e => setVerify_token(e.target.value)} className="form-control" id="inputverity" required/>
                       </div>
                       </div>
               
                    : <div class="loader"></div>}

                            <div id="container-button">
                                {/* <button className="cancle" type='button' onClick={() => {history.goBack()}} >Back</button> */}
                                <button className="submit" type='submit'>Connect</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </Styles>
    )
}