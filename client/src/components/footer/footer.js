import React from 'react';
import "./footer.css";

function Footer(){
    return (
        
        <div className="main-footer">
        <div className="container">
            <div className="row">
            {/* col1 */}
            <div className="col-md-3 col-sm-6">
                <h4>A1 Chatbot</h4>
                <ul className="list-unstyled">
                    <li>เกี่ยวกับเรา</li>
                    <li>ติดต่อเรา</li>
                </ul>
            </div>
            {/* col2 */}
            <div className="col-md-3 col-sm-6">
                <h4>HELP INFORMATON</h4>
                <ul className="list-unstyled">
                    <li>สร้างร้านค้า</li>
                    <li>จัดการคำสั่งซื้อ</li>
                    <li>เทรนบอทอย่างไร</li>
                </ul>
            </div>
            {/* col3 */}
            <div className="col-md-3 col-sm-6">
                <h4>SOCIAL MEDIA</h4>
                <ul className="list-unstyled">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            {/* col4 */}
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
    )
}

export default Footer;