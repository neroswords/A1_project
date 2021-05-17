import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import styled from 'styled-components';

const Styles = styled.div`

.manual-page{
  display:grid;
  grid-template-columns: 2fr 1fr;
}

.AnchorLink{
  position: -webkit-sticky;
  position: sticky;
  background-color: white;
  top: 30px;
  height: max-content;
  margin-left: 20px;
  /* padding: 20px; */
  /* margin: 20%; */
}

.Anchor-detail{
  padding: 30px;
}

.container-manual{
  /* padding: 40px 80px; */
  margin-top: 20px;
}

.img-manual img{
  padding: 10px 5px;
  width: 100%;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.container-manual-inside{
    margin-bottom: 20px;
    background-color: white;
    padding: 15px 30px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    line-height: 40px;
}

.container-manual-inside h4{
  font-weight: bold;
  color: #fca311;
}

.container-manual-inside h5{
  font-weight: bold;
}

.manual-title{
  background-color: white;
  padding: 20px 30px;
}

.hr-section{
  width: 250px;
}

.container-manual-inside section{
  margin-bottom: 35px;
}

`

function Manual() {
  const SmoothScroll = () => (
        <div className="container-xxl container-manual">
          <div className="manual-page">
            <div className="manual-dtail">
                <h2 className="manual-title">Manual /  คู่มือการใช้งาน</h2>
                <div className="container-manual-inside">
                <section id='ManageBot'>
                  <h4>Manage Bot</h4>
                  <hr className="hr-section"/>
                </section>
                <section id='CreateNewBot'>
                  <h5>Create new bot</h5>
                  <ol>
                    <li>กดไปที่ <i class="fa-lg fad fa-caret-circle-down"></i> ด้านบน navbar</li>
                    <li><span>จากนั้น กดที่ Manage bot จากนั้นกดที่ Add new bot ก็จะขึ้นตัว create bot form ขึ้นมา</span></li>
                  </ol>
                </section>
                <section id='EditBot'>
                  <h5>Edit bot</h5>
                  <ol>
                    <li>กดไปที่ <i class="fa-lg fad fa-caret-circle-down"></i> ด้านบน navbar</li>
                    <li><span>จากนั้น กดที่ Manage bot จากนั้นกดที่ <i class="fa-lg fas fa-ellipsis-v"></i> ของบอทที่คุณต้องการที่จะ edit จากนั้น กดที่edit</span></li>
                  </ol>
                </section>
                <section id='DeleteBot'>
                  <h5>Delete bot</h5>
                  <ol>
                    <li>กดไปที่ <i class="fa-lg fad fa-caret-circle-down"></i> ด้านบน navbar</li>
                    <li><span>กดที่ <i class="fa-lg fas fa-ellipsis-v"></i> ของบอทที่คุณต้องการที่จะ delete</span></li>
                    <li><span>จากนั้นกดที่ delete จะขึ้น pop up กดไปที่ delete เพื่อยืนยันการลบ</span></li>
                  </ol>
                </section>
                <section id='ConnectBot'>
                  <h5>Connect bot</h5>
                  <ol>
                    <li>กดไปที่ <i class="fa-lg fad fa-caret-circle-down"></i> ด้านบน navbar</li>
                    <li><span>จากนั้น กดที่ Manage bot</span></li>
                    <li><span>จากนั้นกดที่ <i class="fa-lg fas fa-ellipsis-v"></i> ของบอทที่คุณต้องการที่จะ connect</span></li>
                  </ol>  
        
                    <h6>Connect to Facebook</h6>
                  <ol>
                    <li><span>ถ้าคุณต้องการเชื่อมต่อบอทกับเฟซบุ๊ก ให้กด "Icon Facebook"</span></li>
                    <li><span>จะแสดง pop up ของการเชื่อมต่อ</span></li>
                    <li><span>กดปุ่ม copy เพื่อนำ URL ไปใส่ที่ "URL ติดต่อกลับ" ของ Facebook for developer</span></li>
                    <li><span>เข้าสู่ระบบเว็บไซต์ Facebook developer </span></li>
                    <li><span>กดเลือก "แอพของฉัน"</span></li>
                    <li><span>กดไปที่ "Messenger" เลือก "การตั้งค่า"</span></li>
                    <li><span>เลื่อนหาหัวข้อ "Webhooks"</span></li>
                    <div className="img-manual">
                      <img className="connectbot-URL" src="./images/manual/connectbot1-URL.png" /> <br></br>
                    </div>
                    <li><span>กรอกรายละเอียดของ Access token</span></li>
                    <li><span>หลังจากนั้นกด "create token" เพื่อสร้างโทเค็น</span></li>
                    <div className="img-manual">
                      <img className="connectbot2-createtoken" src="./images/manual/connectbot2-createtoken.jpg" /> <br></br>
                    </div>
                    <li><span>หลังจากนั้นกดคัดลอก token ที่ Create token เสร็จเรียบร้อยแล้ว และจึงนำไปวางไปที่ "Access token" ในข้อ2</span></li>
                    <li><span>สร้าง Verify token</span></li>
                    <li><span></span></li>
            Verify token สารมารถตั้งค่าได้ตามที่ต้องการ (กรุณากรอกใน webhook ของ Facebook ให้เหมือนกับในเว็ป A1 chatbot)
            <br></br>
            จากนั้น set page webhook เลือก message และกดบันทึก <br></br>
                    <div className="img-manual">
                      <img className="connectbot3-setwebhook" src="./images/manual/connectbot3-setwebhook.jpg" /> <br></br>
                    </div>
            เมื่อใส่ข้อมูลครบแล้วสามารถกดบันทึกได้เลย
                  </ol>

                  <h6>Connect to Line</h6>
                  <ol>
                    <li><span>ถ้าคุณต้องการเชื่อต่อบอทกับ line ให้ click ที่ icon line</span></li>
                    <li><span>จากนั้น กดปุ่ม copy URL นำไปว่างที่ webhook URL ใน line developer</span></li>
                    <li><span>เข้าสู่ระบบเว็บไซต์ Line developer</span></li>
                    <div className="img-manual">
                      <img className="connectbot4-URL-line" src="./images/manual/connectbot4-URL-line.jpg" /> <br></br>
                    </div>
                  </ol>
                    
            และกรอกรายละเอียกอื่นๆเพิ่มเติมได้แก่ <br></br>
            Channel secret, Channel access token, Basic ID สามารถ copy จาก line developer นำมาวางได้เลย <br></br>
                    <div className="img-manual">
                      <img className="channel-secret-1" src="./images/manual/channel-secret-1.jpg" /> <br></br>
                      <img className="channel-access-token-2" src="./images/manual/channel-access-token-2.jpg" /> <br></br>
                      <img className="connectbot-line-basicID-3" src="./images/manual/connectbot-line-basicID-3.jpg" /> <br></br>
                    </div>
            เมื่อกรอกเสร็จสิ้น กด connect

            <h6>Connect to Omise</h6>
            ถ้าคุณต้องการเชื่อมต่อระบบชำระเงินกับ omise
            คุณต้องสมัครสมาชิกบน web omise จากนั้น นำ SECRET KEY, PUBLIC KEY มาใส่ในเว็ป A1 chatbot <br></br>
                    <div className="img-manual">
                      <img className="connectbot-omise-1" src="./images/manual/connectbot-omise-1.jpg" /> <br></br>
                    </div>
            คุณสามารถ copy URL ใน form นำไปใส่ใน endpoint URL ของ line developer ได้เลย <br></br>
                    <div className="img-manual">
                      <img className="endpoint-URL" src="./images/manual/endpoint-URL.jpg" /> <br></br>
                    </div>
            เมื่อสร้างเสร็จคุณจะได้ Liff ID คุณสามารถ copy Liff ID ใน line developer นำมาวางใน form ได้เลย<br></br>
                    <div className="img-manual">
                      <img className="LIFF-ID" src="./images/manual/LIFF-ID.jpg" /> <br></br>
                    </div>
            เมื่อกรอกข้อมูลครบถ้วน กด submit
            
                </section>
            </div>
            <div className="container-manual-inside">
                <section id='TrainBot'>
                  <h4>Train Bot</h4>
                  <hr className="hr-section"/>
                  <ol>
                    <li>กดไปที่ <i class="fad fa-caret-circle-down"></i>ด้านบน navbar</li>
                    <li><span>จากนั้นกดที่ "Manage bot"</span></li>
                    <li><span>จากนั้นกดเลือกบอทที่คุณต้องการที่จะ Train</span></li>
                  </ol>
                </section>

                <section id='TrainingBot'>
                  <h5>Training bot</h5>
                  <span>
                      หน้า training bot เป็นหน้าที่แสดงข้อความที่รับเข้ามาผ่าน chat โดยข้อมูลที่แสดงประกอบด้วย
                      word, reply word และ confidence
                  </span>
                  <ul>
                    <li><span>Word คือ คำที่ลูกค้าส่งมาหา Bot</span> </li>
                    <li><span>Reply word คือ คำที่ Bot ตอบกลับลูกค้า</span></li>
                    <li><span>Confidence คือ ค่าความมั่นใจของ Bot ที่อ่านข้อความนั้น โดยเปรียบเทียบกับสิ่งที่เคยสอนในหน้า Trained</span></li>
                  </ul>
                  <span>ฟังก์ชั่นที่สามารถใช้งานได้</span>
                  <ul>
                    <li><span>Edit Word</span></li>
                    <ol>
                      <li>
                        <span>สามารถ Click ที่ข้อความเพื่อ Edit ได้เลย</span>
                      </li>
                    </ol>
                    <li><span>Trained</span></li>
                    <ol>
                      <li>
                        <span>คุณสามารถเลือกคำจากตาราง โดยสามารถทำเครื่องหมาย <i className="fas fa-check"></i> ลงใน <i className="far fa-square"><span>ในคอลัมน์แรกในแต่ละแถว</span></i></span>
                      </li>
                      <li>
                        <span>กดปุ่ม "Train" เพื่อเลือกคำเพื่อ Train Word นั้นๆ</span>
                      </li>
                      <li>
                        <span>จะแสดงหน้า Pop-up ขึ้นมา กดยืนยันเพื่อยืนยันการ Train Word และกดยกเลิกเพื่อยกเลิกการ Train Word</span>
                      </li>
                    </ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    <li><span>Delete</span></li>
                    <ol>
                      <li>
                        <span>คุณสามารถเลือกคำจากตาราง โดยสามารถทำเครื่องหมาย <i className="fas fa-check"></i> ลงใน <i className="far fa-square"> <span>ในคอลัมน์แรกในแต่ละแถว</span></i></span>
                      </li>
                      <li>
                        <span>กดปุ่ม "Delete" </span>
                      </li>
                      <li>
                        <span>จะแสดงหน้า Pop-up ขึ้นมา กดยืนยันเพื่อยืนยันการ Delete Word และกดยกเลิกเพื่อยกเลิกการ Delete Word</span>
                      </li>
                    </ol>
                  </ul>              
                </section>

                <section id='Trained'>
                  <h5>Trained</h5>
                  <span>หน้า trained เป็นหน้าที่แสดงข้อความที่ได้รับการยืนยันแล้ว หรือ บอทได้รับการเรียนรู้แล้ว
                    โดยข้อมูลที่แสดงประกอบด้วย word, reply word </span>
                  <ul>
                    <li>
                      <span>word คือ คำที่ลูกค้าถาม</span>
                    </li>
                    <li>
                      <span> reply word คือ คำที่ bot ตอบกลับลูกค้า</span>
                    </li>
                  </ul>
                  <span>ฟังก์ชั่นที่สามารถใช้งานได้</span>
                  <ul>
                    <li><span>Add Word</span></li>
                    <ol>
                      <li>
                        <span>สามารถกดที่ปุ่ม "Add Word" เพื่อเพิ่มข้อความที่คุณต้องการได้</span>
                      </li>
                      <li>
                        <span>จะแสดงหน้า Pop-up ขึ้นมาเพื่อกรอกข้อความ</span>
                      </li>
                      <li>
                        <span>กรอกข้อความใน "Question" เพื่อระบุคำถามที่คุณคิดว่าลูกค้าจะถาม</span>
                      </li>
                      <li>
                        <span>กรอกข้อความใน "Answer" เพื่อระบุคำตอบตอบกลับของQuestionที่ต้องการให้ Bot ตอบกลับลูกค้า</span>
                      </li>
                      <li>
                        <span>กดปุ่ม "Confirm" เพื่อยืนยันในการเพิ่มคำถามและคำตอบ</span>
                      </li>
                    </ol>
                    <li><span>Edit</span></li>
                    <ol>
                      <li>
                      <span>สามารถ Click ที่ข้อความเพื่อ Edit ได้เลย</span>
                      </li>
                    </ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    <li><span>Delete</span></li>
                    <ol>
                      <li>
                        <span>คุณสามารถเลือกคำจากตาราง โดยสามารถทำเครื่องหมาย <i className="fas fa-check"></i> ลงใน <i className="far fa-square"> <span>ในคอลัมน์แรกในแต่ละแถว</span></i></span>
                      </li>
                      <li>
                        <span>กดปุ่ม "Delete" </span>
                      </li>
                      <li>
                        <span>จะแสดงหน้า Pop-up ขึ้นมา กดยืนยันเพื่อยืนยันการ Delete Word และกดยกเลิกเพื่อยกเลิกการ Delete Word</span>
                      </li>
                    </ol>
                  </ul>
                </section>

                <section id='Group'>
                  <h5>Group</h5>
                  <span>หน้า group เป็นหน้าที่แสดงกลุ่มของข้อความ
                        โดยข้อมูลที่แสดงประกอบด้วย group และปุ่ม edit group</span>
                  <ul>
                    <li>
                      <span>Group คือ กลุ่มของประโยคที่จะให้bot ตอบกลับ</span>
                    </li>
                    <li>
                      <span>edit group คือ ปุ่มที่คุณสามารถกดแล้วสามาถแก้ไข, เพิ่มประโยคได้</span>
                    </li>
                  </ul>
                  <span>ฟังก์ชั่นที่สามารถใช้งานได้</span>
                  <ul>
                    <li><span>Add Group</span></li>
                    <ol>
                      <li>
                        <span>สามารถกดที่ปุ่ม "Add Group" เพื่อเพิ่มกลุ่มข้อความที่คุณต้องการได้</span>
                      </li>
                      <li>
                        <span>จะแสดงหน้า Pop-up ขึ้นมาเพื่อกรอกของกลุ่มที่ต้องการสร้าง</span>
                      </li>
                      <li>
                        <span>กดปุ่ม "Confirm" เพื่อยืนยันในการเพิ่ม Group ใหม่</span>
                      </li>
                    </ol>
                    <li><span>Edit Group</span></li>
                    <ol>
                      <li>
                        <span>ถ้าคุณต้องการจะเพิ่มประประโยคใน Group ที่คุณสร้างขึ้น สามารถกดไปที่ <i className="far fa-edit"></i> เพื่อเข้าสู่การแก้ไข</span>
                      </li>
                      <li>
                        <span>ถ้าคุณต้องการเพิ่มการตอบกลับเป็นข้อความ ให้กดที่ <i className="fas fa-text"></i>และกรอกข้อความเข้าไปที่ add group หลังจากนั้นกดปุ่ม Add </span>
                      </li>
                      <li>
                        <span>คุณต้องการตอบกลับเป็นรูปภาพ ให้กดที่ <i className="fas fa-image"></i> กดเลือกไฟล์ เมื่อยืนยันการเลือกไฟล์แล้ว หลังจากนั้นกด Add</span>
                      </li>
                      <li>
                        <span>เมื่อคุณใส่ข้อมูลครบถ้วนตสมที่ต้องการแล้วให้กดปุ่ม Success เพื่อเสร็จจากการทำรายการนี้</span>
                      </li>
                    </ol>
                    <li><span>Delete</span></li>
                    <ol>
                      <li>
                        <span>คุณสามารถเลือก Group (กลุ่มของประโยค) จากตาราง โดยสามารถทำเครื่องหมาย <i className="fas fa-check"></i> ลงใน <i className="far fa-square"> <span>ในคอลัมน์แรกในแต่ละแถว</span></i></span>
                      </li>
                      <li>
                        <span>กดปุ่ม "Delete" </span>
                      </li>
                      <li>
                        <span>จะแสดงหน้า Pop-up ขึ้นมา กดยืนยันเพื่อยืนยันการ Delete Word และกดยกเลิกเพื่อยกเลิกการ Delete Word</span>
                      </li>
                    </ol>
                  </ul>
                </section>

                <section id='Mapping'>
                  <h5>Mapping</h5>
                  <span>หน้า Mapping เป็นหน้าที่แสงข้อความตอบกลับของกระบวนการทำงานของระบบ การจ่ายเงิน โดยมีการถามชื่อ ถามที่อยู่ ถามเบอร์โทรศัพท์ ตามลำดับ </span>
                  <span>ฟังก์ชั่นที่สามารถใช้งานได้</span>
                  <ul>
                    <li><span>Link</span></li>
                    <ol>
                      <li>
                        <span>สามารถกดที่ <i className="far fa-edit"></i> เพื่อสามารถเปิดหน้าที่เก็บข้อมูลการถามชื่อ ถามที่อยู่ ถามเบอร์โทรศัพท์</span>
                      </li>
                      <li>
                        <span>คุณสามารถแก้ไขข้อมูลได้โดยการกดไปที่กล่องข้อความที่คุณต้องการจะแก้</span>
                      </li>
                      <li>
                        <span>จากนั้นไปแก้ที่กล่องข้อความของ Answer และสามารถแก้ไขข้อความได้</span>
                      </li>
                      <li>
                        <span>เมื่อเสร็จแล้วทำการบันทึกด้วยการกด Save</span>
                      </li>
                    </ol>
                  </ul>
                </section>

                <section id='Order'>
                  <h5>Order</h5>
                  <span> หน้า order เป็นหน้าที่แสดงรายละเอียดการขาย
                          โดยข้อมูลที่แสดงหน้านี้จะมี New order, Total order, Tracking number และ กราฟแสดงยอดขาย</span>
                  <ul>
                    <li>
                      <span>Group คือ กลุ่มของประโยคที่จะให้bot ตอบกลับ</span>
                    </li>
                    <li>
                      <span>edit group คือ ปุ่มที่คุณสามารถกดแล้วสามาถแก้ไข, เพิ่มประโยคได้</span>
                    </li>
                  </ul>
                  <span>ฟังก์ชั่นที่สามารถใช้งานได้</span>
                  <ul>
                    <li><span>New Orders</span></li>
                    <ol>
                      <li>
                        <span>ถ้าคุณต้องการจะรู้คำสั่งซื้อใหม่ กดไปที่ More info ของกล่อง New Orders</span>
                      </li>
                      <li>
                        <span>คุณจะเห็นข้อมูลในตารางประกอบไปด้วย Date = วันที่สั่งซื้อสินค้า, Name = ชื่อผู้สั่ง(Line หรือ Facebook ของลูกค้า) และ Total = ราคาที่ลูกค้าสั่ง </span>
                      </li>
                      <li>
                        <span>สามารถกดปุ่ม "download PDF" เพื่อดาวน์โหลด</span>
                      </li>
                    </ol>
                    <li><span>Total Order</span></li>
                    <ol>
                      <li>
                        <span>ถ้าคุณต้องการที่จะรู้รายการ order ทั้งหมดกดไปที่ More info ของกล่อง Total Order</span>
                      </li>
                      <li>
                        <span>โดยข้อมูลในตารางประกอบไปด้วย Date = วันที่สั่งซื้อสินค้า, Name = ชื่อผู้สั่ง(Line หรือ Facebook ของกค้า), Income = รายรับของท่านใน Order นั้นและ Tracking Number = หมายเลขพัสดุของ Order นั้น</span>
                      </li>
                    </ol>
                    <li><span>Tracking Number</span></li>
                    <ol>
                      <li>
                        <span>ถ้าคุณต้องการที่จะรู้หมายเลขพัสดุของแต่ละ Order กดไปที่ More Info ของกล่อง Tracking number</span>
                      </li>
                      <li>
                        <span>โดยจะแสดงตารางที่ประกอบด้วย ID = หมายเลขID ของ Order นั้น, Name = ชื่อผู้สั่ง(Line หรือ Facebook ของลูกค้า), Date = วันที่สั่งซื้อสินค้า และ Add Tracking = ปุ่มที่สามารถเพิ่มหมายเลขพัสดุของ Order นั้นได้</span>
                      </li>
                      <li>
                        <span>หากคุณต้องการที่จะเพิ่มเลขพัสดุของ Order นั้นๆ ให้กดไปที่ปุ่ม "Add Tracking" ของ Oder นั้นๆ และทำการใส่ Tracking Number และกด Confirm</span>
                      </li>
                      <li>
                        <span>หลังจากนั้น Order ที่คุณได้ทำการใส่ Tracking Number แล้วจะหายไปจากหน้านี้และไปอยู่ในหน้า Total Order แทน</span>
                      </li>
                    </ol>
                    <li><span>กราฟแสดงยอดขาย</span></li>
                    <ol>
                      <li>
                        <span>ถ้าคุณต้องการดูกราฟแสดงยอดขาย สามารถเลื่อนลงมาดูด้านล่างของหน้า Order จะมีปุ่ม Today, By date, By month </span>
                      </li>
                      <li>
                        <span>เมื่อกดเลือก Today กราฟที่แสดงจะเป็น รายรับของวันนั้นๆ</span>
                      </li>
                      <li>
                        <span>เมื่อกดเลือก by date กราฟที่แสดงจะเป็น รายรับที่แสดงค่าแต่ละวันของเดือนนั้นๆ</span>
                      </li>
                      <li>
                        <span>เมื่อกดเลือก by month กราฟที่แสดงจะเป็น รายรับที่แสดงค่าแต่ละเดือนของปีนั้นๆ </span>
                      </li>
                    </ol>
                  </ul>
                </section>

                <section id='Inventory'>
                  <h5>Inventory</h5>
                  <p>หน้า inventory เป็นหน้าที่แสดงสินค้าในคลังของร้านคุณ คุณสามารถเพิ่มสินค้าได้ในหน้านี้ <br></br>
            ถ้าคุณต้องการ เพิ่มสินค้าใหม่ กดที่ ปุ่ม create เมื่อกรอกข้อมูลครบถ้วนและถูกต้อง  กด submit ข้อมูลสินค้าจะถูกนำมาแสดงที่หน้า inventory </p>
                </section>

                <section id='CustomerInformation'>
                  <h5>Customer information</h5>
                  <span>หน้า customer information เป็นหน้าที่แสดงข้อมูลลูกค้าทั้งหมดอัตโนมัติเมื่อมีลูกค้าเพิ่มบอทเป็นเพื่อน โดยข้อมูลในตารางหน้านี้จะประกอบไปด้วย Username, Name และ Address </span>
                  <ul>
                   <ol>
                    <li>
                      <span>Username คือ ชื่อผู้สั่ง(Line หรือ Facebook ของลูกค้า)</span>
                    </li>
                    <li>
                      <span>Name คือ ชื่อจริงของลูกค้า</span>
                    </li>
                    <li>
                      <span>Address คือ ที่อยู่ของลูกค้า</span>
                    </li>
                    </ol> 
                  </ul>
                </section>

                <section id='Chat'>
                  <h5>Chat</h5>
                  <span>หน้า Chat เป็นหน้าที่สามารถเห็น Chat รวมทั้ง Facebook และ line ที่ Bot สนทนากับลูกค้า </span>
                  <ul>
                    <li><span>การดูแพลตฟอร์มลูกค้า</span></li>
                    <ol>
                      <li>
                        <span>สามารถกดที่ "All Massage" เพื่อกดดูแชททั้งหมด</span>
                      </li>
                      <li>
                        <span>สามารถกดที่ "Line" เพื่อกดดูแชทจากไลน์</span>
                      </li>
                      <li>
                        <span>สามารถกดที่ "Facebook" เพื่อกดดูแชทจากเฟซบุ๊ก</span>
                      </li>
                    </ol>
                  </ul>
                  <ul>
                  <span>การเปิด-ปิด ฟังก์ชั่นการตอบกลับอัติโนมัติของบอท</span>
                    <li><span>Link</span></li>
                    <ol>
                      <li>
                        <span>สามารถกดที่ <i className="far fa-edit"></i> เพื่อสามารถเปิดหน้าที่เก็บข้อมูลการถามชื่อ ถามที่อยู่ ถามเบอร์โทรศัพท์</span>
                      </li>
                      <li>
                        <span>คุณสามารถแก้ไขข้อมูลได้โดยการกดไปที่กล่องข้อความที่คุณต้องการจะแก้</span>
                      </li>
                      <li>
                        <span>จากนั้นไปแก้ที่กล่องข้อความของ Answer และสามารถแก้ไขข้อความได้</span>
                      </li>
                      <li>
                        <span>เมื่อเสร็จแล้วทำการบันทึกด้วยการกด Save</span>
                      </li>
                    </ol>
                  </ul>
                  <p><br></br>
              และคุณสามารถตอบลูกค้าได้จากทางนี้เมื่อคุณกดปุ่ม ปิดให้ขึ้นสีแดง <i className=" fa-2x fad fa-toggle-off "></i> ด้านบนขวา bot จะถูกปิดการทำงานและคุณสามารถตอบกลับลูกค้าได้ทันที <br></br>
              โดยจะมีปุ่ม all message เป็นปุ่มรวมแชทของลูกค้า ทั้ง Facebook และ line <br></br>
              ปุ่ม line คือ ปุ่มรวมแชทของลูกค้าที่ผ่านทางไลน์<br></br>
              ปุ่ม Facebook คือ ปุ่มรวมแชทของลูกค้าที่ผ่านทาง Facebook<br></br>
                  </p>
                </section>

                <section id='DashboardBot'>
                  <h5>Dashboard Bot</h5>
                  <span>หน้า Dashboard bot เป็นหน้าที่แสดงกราฟยอดการตอบกลับของ Bot</span>
                  <span>ฟังก์ชั่นที่สามารถใช้งานได้</span>
                  <ul>
                    
                      <li>
                        <span>Today กราฟที่แสดงจะเป็น ยอดการตอบกลับของ botของวันนั้นๆ</span>
                      </li>
                      <li>
                        <span>กดเลือก By date กราฟที่แสดงจะเป็น ยอดการตอบกลับของ botที่แสดงค่าแต่ละวันของเดือนนั้นๆ</span>
                      </li>
                      <li>
                        <span>กดเลือก By month กราฟที่แสดงจะเป็น ยอดการตอบกลับของ botที่แสดงค่าแต่ละเดือนของปีนั้นๆ</span>
                      </li>
                  </ul>  
                </section>
              </div>
            </div>
            
            <div className="AnchorLink">
              <div className="Anchor-detail">
                <h5>Content in this page</h5>
                <div className="anchor-list1">
                  <AnchorLink href='#ManageBot'>Manage Bot</AnchorLink> <br></br>
                    <ul className="manual-menu">
                      <li><AnchorLink href='#CreateNewBot'>CreateNewBot</AnchorLink></li>
                      <li><AnchorLink href='#EditBot'>Edit bot</AnchorLink></li>
                      <li><AnchorLink href='#DeleteBot'>Delete bot</AnchorLink></li>
                      <li><AnchorLink href='#ConnectBot'>Connect bot</AnchorLink></li>
                    </ul>
                </div>
                <div className="anchor-list2">
                  <AnchorLink href='#TrainBot'>Train bot</AnchorLink><br></br>
                    <ul className="manual-menu">
                      <li><AnchorLink href='#TrainingBot'>Training bot</AnchorLink></li>
                      <li><AnchorLink href='#Trained'>Trained</AnchorLink></li>
                      <li><AnchorLink href='#Group'>Group</AnchorLink></li>
                      <li><AnchorLink href='#Mapping'>Mapping</AnchorLink></li>
                      <li><AnchorLink href='#Order'>Order</AnchorLink></li>
                      <li><AnchorLink href='#Inventory'>Inventory</AnchorLink></li>
                      <li><AnchorLink href='#CustomerInformation'>Customer information</AnchorLink></li>
                      <li><AnchorLink href='#Chat'>Chat</AnchorLink></li>
                      <li><AnchorLink href='#DashboardBot'>Dashboard Bot</AnchorLink></li>
                    </ul>
                </div>
              </div>
            
            </div>
          </div>
        </div>
  )

  return (
    <Styles>
        <SmoothScroll />
    </Styles>
  )
}

export default Manual
