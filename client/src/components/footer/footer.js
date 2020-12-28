import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
.main-footer{
    color:white;
    background-color: #353a44;
    padding-top: 3em;
    position: relative;
    bottom: 0;
    width: 100%;
}
`;

function Footer(){
    return (
      <Styles>
        <div className="main-footer">
        <div className="container">
            <div className="row">
            
            <div className="col-md-3 col-sm-6">
                <h4>A1 Chatbot</h4>
                <ul className="list-unstyled">
                    <li>เกี่ยวกับเรา</li>
                    <li>ติดต่อเรา</li>
                </ul>
            </div>
            
            <div className="col-md-3 col-sm-6">
                <h4>HELP INFORMATON</h4>
                <ul className="list-unstyled">
                    <li>สร้างร้านค้า</li>
                    <li>จัดการคำสั่งซื้อ</li>
                    <li>เทรนบอทอย่างไร</li>
                </ul>
            </div>
            
            <div className="col-md-3 col-sm-6">
                <h4>SOCIAL MEDIA</h4>
                <ul className="list-unstyled">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            
            <div className="col-md-3 col-sm-6">
                <h4>POWERED BY</h4>
                <ul className="list-unstyled">
                    <li>teletubbies</li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            </div>
        </div>
        </div>
      </Styles>
    )
}   

export default Footer;