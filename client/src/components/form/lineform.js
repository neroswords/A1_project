import React, { useState, useEffect }from 'react';
import styled from 'styled-components';
import packageJson from '../../../package.json';
import { useHistory } from 'react-router-dom'

const Styles = styled.div`
.container {
    margin-top: 2%;
}

.facebook-card {
    border: 0;
    border-radius: 1rem;
    background-color: #fff;
    color: black;
    // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    // border: 1px solid rgba(0,0,0,.1);
    border: 5px solid #34a853;
}

.facebook {
    padding : 5%;
}

.facebook p{
    font-weight: bold;
    font-size: 23px;
    margin: 0 0 25px;
}

.link i{
    color: #34a853;
}

.link p{
    font-size: 11px;
    color: black;
}

.copy-clipboard {
    color: #34a853;
    position: absolute;
    top: 275px;
    right: 70px;
}

.link button{
    background: white;
    padding: 5px 12px;
    margin-top: 15px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #34a853;
    transition: 0.5s;
}

.facebook .input-Box label{
    font-size: 18px;
}

.facebook .input-Box input{
    box-shadow: none;
    outline: none;
    border: none;
    border-bottom: 2px solid #000;
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
}

#container-button .submit{
    padding: 5px 12px;
    margin-top: 15px;
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
    padding: 5px 12px;
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
                        <div className="group facebook-card col-lg-12">
                            <form className="facebook" onSubmit={ handleSubmit }>
                                <div className="row">
                                    <p className="col">Connect to Line</p>
                                </div>
                                <div className="link">
                                    <p>{packageJson.proxy}bot/webhook/{props.props.bot_id}/line</p>
                                    <button type='button' className="copy-clipboard" onClick={() => {navigator.clipboard.writeText(webhook)}}><i className="fas fa-copy fa-xs"></i></button>
                                </div>
                                <div className="input-Box">
                                <div className="col-lg-12">
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
                                    <button className="submit" type='submit'>Submit</button>
                                    <button className="cancle" type='button' onClick={() => {history.goBack()}} >Back</button>
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </Styles>
        )   
}

