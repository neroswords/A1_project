import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import styled from 'styled-components';

const Styles = styled.div`

.AnchorLink{
  float: right;
  padding: 5% 5%;
  
}
.container-manual{
  padding: 40px 80px;
  width: 80%;
}
.img-manual img{
  padding: 10px 5px;
  width: 35%;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

}

.container-manual-inside{
    margin-top: 1%;
    background-color: white;
    padding: 15px 30px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
}

.container-manual-inside h4{
  font-weight: bold;
  color: #fca311;
}

.container-manual-inside h5{
  font-weight: bold;

}
`

function Manual() {
  const SmoothScroll = () => (
    <div>
      <div className="manual-page">
        <div className="AnchorLink">
          <AnchorLink href='#ManageBot'>Manage Bot</AnchorLink> <br></br>
          <ul>
            <li><AnchorLink href='#CreateNewBot'>CreateNewBot</AnchorLink></li>
            <li><AnchorLink href='#EditBot'>Edit bot</AnchorLink></li>
            <li><AnchorLink href='#DeleteBot'>Delete bot</AnchorLink></li>
            <li><AnchorLink href='#ConnectBot'>Connect bot</AnchorLink></li>
          </ul>

          <AnchorLink href='#TrainBot'>Train bot</AnchorLink><br></br>
          <ul>
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

        <div className="container-manual">
          <div className="container-manual-inside">
          <section id='ManageBot'>
            <h4>Manage Bot</h4>
          </section>
          <section id='CreateNewBot'>
            <h5>Create new bot</h5>
            <p>กดไปที่ <i class="fa-lg fad fa-caret-circle-down"></i>  ด้านบน navbar จากนั้น กดที่ Manage bot จากนั้นกดที่ Add new bot ก็จะขึ้นตัว create bot form ขึ้นมา</p>
          </section>
          <section id='EditBot'>
            <h5>Edit bot</h5>
            <p>กดไปที่ <i class="fa-lg fad fa-caret-circle-down"></i> ด้านบน navbar จากนั้น กดที่ Manage bot จากนั้นกดที่ <i class="fa-lg fas fa-ellipsis-v"></i> ของบอทที่คุณต้องการที่จะ edit จากนั้น กดที่edit</p>
          </section>
          <section id='DeleteBot'>
            <h5>Delete bot</h5>
            <p>กดไปที่ <i class="fa-lg fad fa-caret-circle-down"></i> ด้านบน navbar จากนั้น กดที่ Manage bot จากนั้นกดที่ <i class="fa-lg fas fa-ellipsis-v"></i> ของบอทที่คุณต้องการที่จะ delete จากนั้นกดที่ delete จะขึ้น pop up ยืนยันการ delete ของคุณ กดไปที่ delete</p>
          </section>
          <section id='ConnectBot'>
            <h5>Connect bot</h5>  
            <p>กดไปที่ <i class="fa-lg fad fa-caret-circle-down"></i>  ด้านบน navbar จากนั้น กดที่ Manage bot จากนั้นกดที่ <i class="fa-lg fas fa-ellipsis-v"></i> ของบอทที่คุณต้องการที่จะ connect <br></br>
              <h6>Connect to Facebook</h6>
      ถ้าคุณเชื่อมต่อบอทกับเฟสบุค ให้click icon Facebook กดปุ่ม copy เพื่อนำ URL ไปใส่ที่ URL ติดต่อการเรียกกลับ ของ Facebook for developer
      <div className="img-manual">
                <img className="connectbot-URL" src="./images/manual/connectbot1-URL.png" /> <br></br>
              </div>
      และกรอกรายละเอียดอื่นๆเพิ่มเติมได้แก่ <br></br>
      Access token หาได้จาก Facebook for developer &rarr; application &rarr; messenger &rarr; setting &rarr; create token <br></br>
              <div className="img-manual">
                <img className="connectbot2-createtoken" src="./images/manual/connectbot2-createtoken.jpg" /> <br></br>
              </div>
      Verify token สารมารถตั้งค่าได้ตามที่ต้องการ (กรุณากรอกใน webhook ของ Facebook ให้เหมือนกับในเว็ป A1 chatbot)
      <br></br>
      จากนั้น set page webhook เลือก message และกดบันทึก <br></br>
              <div className="img-manual">
                <img className="connectbot3-setwebhook" src="./images/manual/connectbot3-setwebhook.jpg" /> <br></br>
              </div>
      เมื่อใส่ข้อมูลครบแล้วสามารถกดบันทึกได้เลย

      <h6>Connect to Line</h6>
      ถ้าคุณต้องการเชื่อต่อบอทกับ line ให้ click ที่ icon line จากนั้น กดปุ่ม copy URL นำไปว่างที่ webhook URL ใน line developer <br></br>
              <div className="img-manual">
                <img className="connectbot4-URL-line" src="./images/manual/connectbot4-URL-line.jpg" /> <br></br>
              </div>
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
      </p>
          </section>

          <section id='TrainBot'>
            <h4>Train Bot</h4>
            <p>กดไปที่ <i class="fad fa-caret-circle-down"></i> ด้านบน navbar จากนั้น กดที่ Manage bot จากนั้นกดที่ bot ที่คุณต้องการที่จะ train</p>
          </section>

          <section id='TrainingBot'>
            <h5>Training bot</h5>
            <p>หน้า training bot เป็นหน้าที่แสดงข้อความที่รับเข้ามาผ่าน chat โดยข้อมูลที่แสดงประกอบด้วย
              word, reply word, confidence <br></br>
              word คือ คำที่ลูกค้าถาม <br></br>
              reply word คือ คำที่ bot ตอบกลับลูกค้า <br></br>
              confidence คือ ค่าความมั่นใจของ bot ที่อ่านข้อความนั้น โดยเปรียบเทียบกับสิ่งที่เคยสอนในหน้า trained <br></br>
              เมื่อมีข้อมูลแสดงในตารางคุณสามารถเลือกข้อความมี่ต้องการ train กดเลือก ข้อความนั้น จากนั้นกด ปุ่ม train ข้อความจะถูกนำไปแสดงที่หน้า trained <br></br>
              ถ้าคุณต้องการที่จะลบ word ออกจากตารางคุณสามรถเลือกที่ปุ่ม checkbox ข้อความนั้น และกด delete ทำการยืนยันว่าคุณต้องการจะลบโดยกด delete อีกครั้ง คำที่คุณต้องการจะลบจะหารไปจากตาราง
            </p>
          </section>

          <section id='Trained'>
            <h5>Trained</h5>
            <p>หน้า trained เป็นหน้าที่แสดงข้อความที่ได้รับการยืนยันแล้ว หรือ บอทได้รับการเรียนรู้แล้ว
        โดยข้อมูลที่แสดงประกอบด้วย word, reply word <br></br>
        word คือ คำที่ลูกค้าถาม <br></br>
        reply word คือ คำที่ bot ตอบกลับลูกค้า <br></br>
        คุณสามารถที่จะเพิ่มข้อความ การถามและการตอบได้ โดยคุณกดปุ่ม add word จากนั้นจะขึ้น pop up คุณสามารถกรอก คำถามที่ถูกค้าถาม และ กรอกคำตอบที่ต้องการให้ bot ตอบกลับลูกค้าได้ เมื่อกรอกครบถุกต้อง กด confirm <br></br>
        ถ้าคุณต้องการที่จะลบ word ออกจากตารางคุณสามรถเลือกที่ปุ่ม checkbox ข้อความนั้น และกด delete ทำการยืนยันว่าคุณต้องการจะลบโดยกด delete อีกครั้ง คำที่คุณต้องการจะลบจะหารไปจากตาราง <br></br>

            </p>
          </section>

          <section id='Group'>
            <h5>Group</h5>
            <p>หน้า group เป็นหน้าที่แสดงกลุ่มของข้อความ
        โดยข้อมูลที่แสดงประกอบด้วย group และปุ่ม edit group <br></br>
        Group คือ กลุ่มของประโยคที่จะให้bot ตอบกลับ <br></br>
        edit group คือ ปุ่มที่คุณสามารถกดแล้วสามาถแก้ไข, เพิ่มประโยคได้<br></br>
        คุณสามรถเพิ่มกลุ่มประโยคได้โดยกดที่ปุ่ม Add group จากนั้น จะขึ้น pop up ที่คุณสามารถใส่ group name เข้าไปได้ เมื่อกดยืนยัน group name จะถูกแสดงในตาราง <br></br>
            </p>
            <p>
              ถ้าคุณต้องการจะเพิ่มประประโยคใน group name ที่คุณสร้างขึ้น สามารถกดไปที่ edit group <br></br>
            </p>
            <p>
              ถ้าคุณต้องการเพิ่มการตอบกลับเป็นข้อความ ให้กดที่ icon text และกรอกข้อความเข้าไปที่ add group และ กดปุ่ม add <br></br>
            </p>
            <p>
              แต่ถ้าคุณต้องการตอบกลับเป็นรูปภาพ ให้กดที่ icon image และ กดเลือกไฟล์ เมื่อยืนยันการเลือกไฟล์แล้ว จากนั้น กด add <br></br>
        เมื่อคุณใส่ข้อมูลครบแล้ว สามรถกดปุ่ม success <br></br>
        ถ้าคุณต้องการที่จะลบ group (กลุ่มของประโยค) ออกจากตารางคุณสามรถเลือกที่ปุ่ม checkbox ข้อความนั้น และกด delete <br></br>
        ทำการยืนยันว่าคุณต้องการจะลบโดยกด delete อีกครั้ง คำที่คุณต้องการจะลบจะหายไปจากตาราง
      </p>

          </section>

          <section id='Mapping'>
            <h5>Mapping</h5>
            <p>หน้า Mapping เป็นหน้าที่แสงข้อความตอบกลับของ process การจ่ายเงิน
        โดยมีการถามชื่อ ถามที่อยู่ ถามเบอร์โทรศัพท์ ตามลำดับ <br></br>
        และจะมีปุ่ม link จะสามารถเปิดหน้าที่เก็บข้อมูลการถามชื่อ ถามที่อยู่ ถามเบอร์โทรศัพท์ คุณสามารถแก้ข้อมูลได้โดยการกดไปที่กลองข้อความที่คุณต้องการจะแก้ <br></br>
        จากนั้นไปแก้ที่ answer และสามารถแก้ข้อความได้ เมื่อแก้ไขเรียบร้องให้กดปุ่ม save
        </p>
          </section>

          <section id='Order'>
            <h5>Order</h5>
            <p>
              หน้า order เป็นหน้าที่แสดงรายละเอียดการขาย
      โดยข้อมูลที่แสดงหน้านี้จะมี  New order, Total order, Tracking number, กราฟแสดงยอดขาย<br></br>
      ถ้าคุณต้องการจะรู้คำสั่งซื้อใหม่ กดไปที่ more info ของกล่อง new order เมื่อกดจะมี ตารางคำสั่งซื้อ<br></br>
      โดยข้อมูลประกอบไปด้วย Date, Name, Total และ ปุ่ม download PDF<br></br>
      Date คือ วันที่สั่งซื้อสินค้า <br></br>
      Name คือ ชื่อ Line หรือ Facebook ลูกค้า <br></br>
      Total คือ ราคาที่ลูกค้าสั่ง <br></br>
      ปุ่ม download PDF คือปุ่มที่จะ download PDF ของลูกค้าคนนั้น <br></br> </p>

            <p>ถ้าคุณต้องการที่จะรู้รายการ order ทั้งหมด กดไปที่ more info ของกล่อง total order เมื่อกดจะมี ตาราง order แสดงขึ้นมา <br></br>
      โดยข้อมูลประกอบไปด้วย date, name, income, tracking number <br></br>
      Date คือ วันที่สั่งซื้อสินค้า <br></br>
      Name คือ ชื่อ Line หรือ Facebook ลูกค้า <br></br>
      Income คือ รายรับของท่านใน order นั้น <br></br>
      Tracking number คือ หมายเลขพัสดุของ order นั้น <br></br> </p>

            <p>ถ้าคุณต้องการที่จะรู้หมายเลขพัสดุของแต่ละ order กดไปที่ more info ของกล่อง Tracking number  เมื่อกดจะมี ตาราง Tracking number ขึ้นมา <br></br>
      โดยข้อมูลประกอบไปด้วย ID, Name, Date และ ปุ่ม add tracking <br></br>
      ID คือ ID ของ order นั้น <br></br>
      Name คือ ชื่อ Line หรือ Facebook ลูกค้า <br></br>
      Date คือ วันที่สั่งซื้อสินค้า <br></br>
      ปุ่ม add tracking คือ ปุ่มที่คุณสามารถใส่ หมายเลข Tracking number ของorder นั้นได้ <br></br></p>

            <p>ถ้าคุณต้องการดูกราฟแสดงยอดขาย สามารถเลื่อนลงมาดูด้านล่างของหน้า order จะมีปุ่ม today, by date, by month <br></br>
      เมื่อกดปุ่ม Today กราฟที่แสดงจะเป็น รายรับของวันนั้นๆ <br></br>
      เมื่อกดปุ่ม by date กราฟที่แสดงจะเป็น รายรับที่แสดงค่าแต่ละวันของเดือนนั้นๆ <br></br>
      เมื่อกดปุ่ม by month กราฟที่แสดงจะเป็น รายรับที่แสดงค่าแต่ละเดือนของปีนั้นๆ <br></br>
            </p>
          </section>

          <section id='Inventory'>
            <h5>Inventory</h5>
            <p>หน้า inventory เป็นหน้าที่แสดงสินค้าในคลังของร้านคุณ คุณสามารถเพิ่มสินค้าได้ในหน้านี้ <br></br>
      ถ้าคุณต้องการ เพิ่มสินค้าใหม่ กดที่ ปุ่ม create เมื่อกรอกข้อมูลครบถ้วนและถูกต้อง  กด submit ข้อมูลสินค้าจะถูกนำมาแสดงที่หน้า inventory </p>
          </section>

          <section id='CustomerInformation'>
            <h5>Cuntomer information</h5>
            <p>หน้า customer information เป็นหน้าที่แสดงข้อมูลลูกค้าทั้งหมด
      โดยข้อมูลในหน้านี้จะมี User name, name, Address <br></br>
      User name คือ ชื่อ Line หรือ Facebook ลูกค้า <br></br>
      Name คือ ชื่อจริงของลูกค้า <br></br>
      Address คือ ที่อยู่ของลูกค้า <br></br>
            </p>
          </section>

          <section id='Chat'>
            <h5>Chat</h5>
            <p>หน้า chat เป็นหน้าที่สามารถเห็น chat รวม ทั้ง Facebook และ line ที่ bot สนทนากับลูกค้า <br></br>
        และคุณสามารถตอบลูกค้าได้จากทางนี้เมื่อคุณกดปุ่ม ปิดให้ขึ้นสีแดง <i className=" fa-2x fad fa-toggle-off "></i> ด้านบนขวา bot จะถูกปิดการทำงานและคุณสามารถตอบกลับลูกค้าได้ทันที <br></br>
        โดยจะมีปุ่ม all message เป็นปุ่มรวมแชทของลูกค้า ทั้ง Facebook และ line <br></br>
        ปุ่ม line คือ ปุ่มรวมแชทของลูกค้าที่ผ่านทางไลน์<br></br>
        ปุ่ม Facebook คือ ปุ่มรวมแชทของลูกค้าที่ผ่านทาง Facebook<br></br>
            </p>
          </section>

          <section id='DashboardBot'>
            <h5>Dashboard Bot</h5>
            <p>หน้า Dashboard bot เป็นหน้าที่แสดงกราฟยอดการตอบกลับของ bot<br></br>
        เมื่อกดปุ่ม Today กราฟที่แสดงจะเป็น ยอดการตอบกลับของ botของวันนั้นๆ<br></br>
        เมื่อกดปุ่ม by date กราฟที่แสดงจะเป็น ยอดการตอบกลับของ botที่แสดงค่าแต่ละวันของเดือนนั้นๆ<br></br>
        เมื่อกดปุ่ม by month กราฟที่แสดงจะเป็น ยอดการตอบกลับของ botที่แสดงค่าแต่ละเดือนของปีนั้นๆ<br></br>
            </p>
          </section>
        </div>
      </div>
      </div>
    </div>

  )

  return (
    <Styles>
      <div>
        <SmoothScroll />
      </div>
    </Styles>
  )
}

export default Manual
