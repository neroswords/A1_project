import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`

.main-footerrr{
    font-family: 'Athiti', sans-serif;
    color:white;
    background-color: #353a44;
    padding-top: 3em;
    margin: 0;
    position: relative;
    bottom: 0;
    width: 100%;
}

.list-social i {
    cursor: pointer;
    font-size: 30px;
    margin-top: 15px;
    margin-right: 20px;
    border: 4px solid transparent;
    border-radius: 100%;
    padding: 3px 6px;
    background-color: white;
}

.list-social i:hover {
    /* background-color: white; */
    border: 4px solid #fca311;
    border-radius: 100%;
    padding: 3px 6px;
}


.list-social .facebook {
   color: #0078ff;
}

.list-social .line {
    color: #009B00;
    background-color: white;
 }

 .list-social .github {
    color: #211f1f;
 }

.border-footer {
    margin: 10px 0px;
    height: 5px; 	
    width: 70px; 	
    background-color: #fca311;
    /* border-style: ; */
    /* border-style: none; */
    /* border: 0px solid transparent;  */
}

.in-footer h4 {
    font-weight: bold;
}

.powered {
    margin-bottom:15%;
}

.powered i {
    margin-right: 10px;
    color: #fca311;
    margin-top: 10px;
}

.help li {
    margin-top:4%;
}
.help a {
    color : #fca311;

}

.help a:hover {
    color: white;
}

`

function Footer(){
    return (
      <Styles>
        <>
        <div className="main-footerrr">
            <div className="container">
                <div className="row">
                
                <div className="col-md-4 col-sm-4 in-footer">
                    <h4>A1 Chatbot</h4>
                    <ul className="list-unstyled">
                        {/* <li>เกี่ยวกับเรา</li>
                        <li>ติดต่อเรา</li> */}
                    </ul>
                </div>
                
                {/* <div className="col-md-3 col-sm-6 in-footer">
                    <h4>HELP INFORMATON</h4>
                    <div className="border"></div>
                    <ul className="list-unstyled help">
                        <li>สร้างร้านค้า</li>
                        <li>จัดการคำสั่งซื้อ</li>
                        <li>เทรนบอทอย่างไร</li>
                        <li><a href="/file/ข้อตกลงการใช้งานเว็บ.pdf" download>เงื่อนไขและข้อตกลงในการใช้บริการเว็ปไซต์</a></li>
                      <li><a href="/file/คำแนะนำการใช้งาน.pdf" download>คำแนะนำการใช้งาน</a></li>		
                    </ul>
                </div> */}
                
                <div className="col-md-4 col-sm-4 in-footer">
                    <h4>SOCIAL MEDIA</h4>
                    <div className="border-footer"></div>
                    <ul className="list-social list-unstyled">
                        <i onClick={() => window.location.replace('https://www.facebook.com/a1chatbot/')} className="fab fa-facebook-square facebook"></i>
                        <i onClick={() => window.location.replace('https://liff.line.me/')} className="fab fa-line line"/>
                        <i onClick={() => window.location.replace('https://github.com/neroswords/A1_project')} class="fab fa-github github"></i>
                    </ul>
                </div>
                
                <div className="col-md-4 col-sm-4 in-footer">
                    <h4>POWERED BY</h4>
                    <div className="border-footer"></div>
                    <ul className="list-unstyled powered">
                        <li>Teletubbies Team</li>
                        <li><i className="fas fa-map-marker-alt" aria-hidden="true"></i>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</li> 					
                        {/* <li><p>126 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ, กรุงเทพมหานคร</p></li> */}
                        <li><i className="fa fa-phone" aria-hidden="true"></i>+1234567890</li> 					
                        <li><i className="fa fa-envelope" aria-hidden="true"></i>support@A1_chatbot.com</li> 			
                    </ul>
                </div>
                </div>
            </div>
        </div>
        </>
      </Styles>
    )
}   

export default Footer;