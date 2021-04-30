import React, { useState, useEffect }from 'react';
import styled from 'styled-components';
import packageJson from '../../../package.json';
import { useHistory } from 'react-router-dom'

const Styles = styled.div`
.container {
    margin-top: 2%;
}

.line-card {
    height: 30rem;
    width: 25rem;
    /* border: 0; */
    border-radius: 1rem;
    background-color: #fff;
    color: black;
    // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    // border: 1px solid rgba(0,0,0,.1);
    border: 3px solid #34a853;
}

.line {
    padding : 5%;
}

.line p{
    font-weight: bold;
    font-size: 23px;
    color: black;
}

.copy-link p{
    font-size: 15px;
    color: black;
    float:left;
    max-width: 95%;
    overflow-x: auto;
}

.copy-link p::-webkit-scrollbar {
  /* width: 5px; */
  height: 10px;
  cursor: pointer;
}

.copy-link p::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px gray; 
  border-radius: 0.5rem;
  cursor: pointer;
}
.copy-link p::-webkit-scrollbar-thumb {
  background: #dddddd; 
  border-radius: 0.5rem;
  cursor: pointer;
}

.copy-link i{
    color: #34a853;
}

.copy-clipboard {
    color: #34a853;
    /* position: absolute;
    top: 275px;
    right: 70px; */
}

.copy-link button{
    position: relative;
    float : right;
    background: white;
    border-radius: 1rem;
    border: 2px solid #34a853;
    margin: 0 -5% 0 0;
}

.line .input-Box label{
    font-size: 15px;
}

.line .input-Box input{
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

.all-button{
    display: inline;
}

#container-button{
    text-align: center;
}

#container-button{
    text-align: center;
    margin-top: 15%;
}

#container-button .submit{
    padding: 5px 30px;
    /* margin-top: px; */
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #34a853;
    transition: 0.5s;
    margin: 10px;
    background-color: #34a853;
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


`;

export default function Lineform(props) {
    console.log(props)
    const [access_token, setAccess_token] = useState('');
    const [channel_secret, setChannel_secret] = useState('');
    const [basic_id, setBasic_id] = useState('');
    const [webhook, setWebhook] = useState(packageJson.proxy+'bot/webhook/'+props.props.bot_id+'/line');
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        const editData = {
            'access_token':access_token, 
            'channel_secret':channel_secret, 
            'basic_id':basic_id,
            'creator':localStorage.getItem('user_id'),
            'platform': 'line'
            }
        fetch('/bot/'+props.props.bot_id+'/connect', {
            method: 'POST',
            headers : {
                "Access-Control-Allow-Origin": "*",
                'Content-Type':'application/json'
            },
            body: JSON.stringify(editData)
        }).then(response => response.json().then(data => alert(data.message)))
    }

    useEffect(() => {
        fetch('/bot/'+props.props.bot_id+'/connect').then(
            response => response.json()
          ).then(data =>{
            setAccess_token(data.access_token);
            setChannel_secret(data.channel_secret);
            setBasic_id(data.basic_id);
        })
    }, []);

    return(
            <Styles>
                <div className="container">
                    <div className="row my-3">
                        <div className="group line-card ">
                            <form className="line" onSubmit={ handleSubmit }>
                                <div className="row">
                                    <p className="col mb-4">Connect to Line</p>
                                </div>
                                <div className="copy-link">
                                    <p>{packageJson.proxy}bot/webhook/{props.props.bot_id}/line</p>
                                    <button type='button' className="copy-clipboard" onClick={() => {navigator.clipboard.writeText(webhook)}}><i className="fas fa-copy fa-xs"></i></button>
                                </div>
                                <div className="input-Box">
                                <div className="ms-2">
                                    <label  className="form-label">Channel secret</label>
                                    <input type="text" value={channel_secret} onChange={e => setChannel_secret(e.target.value)} className="form-control" id="inputpagefacebook"/>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <label  className="form-label">Channel access token</label>
                                    <input type="text" value={access_token} onChange={e => setAccess_token(e.target.value)} className="form-control" id="inputbotname"/>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <label  className="form-label">Basic ID</label>
                                    <input type="text" value={basic_id} onChange={e => setBasic_id(e.target.value)} className="form-control" id="inputbotname"/>
                                </div>
                                </div>
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

