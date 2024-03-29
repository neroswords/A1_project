import React, { useState, useEffect } from 'react';

import packageJson from '../../../package.json';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
const Styles = styled.div`
.container {
    margin-top: 2%;
}

.optional-card {
    height: 30rem;
    width: 25rem;
    /* padding: 4rem 3rem; */
    border: 0;
    border-radius: 1rem;
    background-color: #fff;
    color: white;
    // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    border: 3px solid #fca311;
}
.optional-form {
    padding : 5%;
}

.optional-form p{
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
    color: #fca311;
}

.copy-clipboard {
    color: #fca311;
    /* top: 195px;
    right: 70px; */
}

.copy-link button{
    /* display:inline-block; */
    position: relative;
    float : right;
    background: white;
    border-radius: 1rem;
    border: 2px solid #fca311;
    /* margin-left: -3%;
    margin-right: -8px; */
    margin: 0 -5% 0 0;
    /* text-align:center; */
} 

.optional-form .input-Box label{
    font-size: 15px;
    color: black;
}

.optional-form .input-Box input{
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
    /* margin-top: 0%; */
}

#container-button .submit{
    padding: 5px 30px;
    margin-top: 10px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #fca311;
    transition: 0.5s;
    background-color: #fca311;
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

export default function Etcform({botID,setReload,setShowForm}) {
    const [OMISE_SECRET_KEY, setOMISE_SECRET_KEY] = useState('');
    const [OMISE_PUBLIC_KEY, setOMISE_PUBLIC_KEY] = useState('');
    const [liffID, setliffID] = useState('');
    const [webhook, setWebhook] = useState(packageJson.proxy+'bot/webhook/'+botID+'/facebook')
    const history = useHistory()
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const editData = {
            'OMISE_SECRET_KEY':OMISE_SECRET_KEY,
            'OMISE_PUBLIC_KEY':OMISE_PUBLIC_KEY,
            'liffID':liffID,
            'creator':localStorage.getItem('user_id'),
            'platform':'etc'
        }
        fetch('/bot/'+botID+'/connect', {
            method: 'POST',
            headers : {
                "Access-Control-Allow-Origin": "*",
                'Content-Type':'application/json'
            },
            body: JSON.stringify(editData)
        }).then(response => response.json().then(data => alert(data.message)).then(setReload(prev => !prev)).then(setShowForm(prev => !prev)))
    }

    const [loading,setLoading] = useState(false);
    useEffect(() => {
        fetch('/bot/'+botID+'/connect').then(
            response => response.json()
          ).then(data =>{
            setOMISE_SECRET_KEY(data.OMISE_SECRET_KEY);
            setOMISE_PUBLIC_KEY(data.OMISE_PUBLIC_KEY)
            setliffID(data.liff_id);
            setLoading(true)
        })
      
    }, []);

    return (
        <Styles>
            <div className="container">
                 <div className="row my-3">
                    <div className="group optional-card col-lg-12">
                        <form className="optional-form" onSubmit={ handleSubmit }>
                            <div className="row">
                                <p className="col mb-4">Optional connection</p>
                                {/* <i className="col fab fa-facebook"></i> */}
                            </div>
                      
                            {loading ?                    
                          <div className="input-Box">
                          <div className="ms-2">
                              <label  className="form-label">OMISE SECRET KEY</label>
                              <input type="text" value={ OMISE_SECRET_KEY } onChange={e => setOMISE_SECRET_KEY(e.target.value)} className="form-control" id="inputpagefacebook" />
                          </div>
                          <div className="ms-2">
                              <label  className="form-label">OMISE PUBLIC KEY</label>
                              <input type="text" value={ OMISE_PUBLIC_KEY } onChange={e => setOMISE_PUBLIC_KEY(e.target.value)} className="form-control" id="inputpagefacebook" />
                          </div>
                          <div className="ms-2 copy-link mt-4">
                                <label  className="form-label">Liff Link</label>
                              <p>{packageJson.proxy}/liff/{botID}</p>
                              <button type="button" className="copy-clipboard" onClick={() => {navigator.clipboard.writeText(webhook)}}><i className="fas fa-copy fa-xs copy-clipboard"></i></button>
                          </div>
                          <div className="ms-2">
                              <label  className="form-label">Liff ID</label>
                              <input type="text" value={ liffID } onChange={e => setliffID(e.target.value)} className="form-control" id="inputverity" />
                          </div>
                          </div>
               
                    : <div class="loader"></div>}


                            <div id="container-button">
                                {/* <button className="cancle" type='button' onClick={() => {history.goBack()}} >Back</button> */}
                                <button className="submit" type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Styles>
    )
}