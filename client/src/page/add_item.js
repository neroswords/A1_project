import React from 'react';
import styled from 'styled-components';
import {Link, withRouter, Redirect } from 'react-router-dom'
// import { Multiselect } from 'multiselect-react-dropdown';
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets' 
import FlashMessage from 'react-flash-message'
import { PanelGroup } from 'react-bootstrap';
import { MDBNotification, MDBContainer } from "mdbreact";

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
    margin-top: 2%;
  }
  .card-bot{
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    padding: 4%;
  }
  
  .card-bot .card-title-add-item {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
    text-align: center;
  }
  
  .card-bot .card-body-add-item {
    margin: 1rem;
  }
  
  .title_additem p{
      font-weight: bold;
      margin-top: 5%;
      
  }

  .line-inv{
    border: 10;
    height: 4px;
    background-color: black;
    width: 200px;
    margin-bottom: 3%;
  }

  .form-additem input{
    justify-content: space-between;
  }
  
  .form-additem .btn {
    border-radius: 1rem;
    letter-spacing: 0.1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 80%;
    align-items: center;
    /* background-color: #; */
  }
  .btn-submitinv{
      margin-top: 3rem;
      text-align : center;
  }
  .form-mt-2 input {
    border-radius: 0.5rem;
  }
  .form-mt-2 select{
    border-radius: 0.5rem;
  }
  .row-2{
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  input[type=file]::-webkit-file-upload-button {
    /* border: 2px;
    padding: 0.5rem ;
    border-radius: 0.75rem;
    background-color: #fca311;
    transition: 1s;
    color: white;
    width: 40%;
    margin-top: 30%; */
    margin-top: 80px;
    margin-left: -1.3%;
    justify-content:center;
    position: absolute;
    padding: 10px 15px;
    background-color: #fca311;
    border: none;
    border-radius: 0.75rem;
    color: white;
    transition: 100ms ease-out;
    cursor: pointer;
  }
  
  input[type="file"] {
    max-width: 80%;
    margin-top: 5%;
  }

  .showimg-newinv{
    text-align: center;
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 10px;
    margin-bottom: 1%;
    /* margin-top: 50px; */
  }

  .showimg-newinv img{
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    height: 140px;
    width: 140px;
    margin-bottom: 8%;
    object-fit: cover;
    padding : 10px;
    border: 2px dashed #fca311;
  }
  
  /* .showimg-newinv img:hover{
    z-index: 2;
    width:100%
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1.5);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1.5);   
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1.5);
    transition: all 200ms ease-in;
    transform: scale(1.2);
  } */
  @media only screen and (max-width: 1200px){
    .showimg-newinv{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 4%;
    }
  } 

  @media only screen and (max-width: 760px){
    .showimg-newinv{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1%;
    }
  } 

  @media only screen and (max-width: 690px){
    .showimg-newinv{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 5%;
    }
  }

  .upload-newinv{
    /* display:flex; */
    
    background-color: #feecd1;
    border: 2px dashed #fca311;
    border-radius : 0.75rem;
    text-align:center;
    width: 140px;
    height: 140px;
    
  }

  .req-icon{
    color: red;
    font-size: 1rem;
  }

  .button-to-inventory i {
  /* display: flex; */
  /* float:right; */
  /* color: red; */
  font-size: 18px;
  }

.btn-delete-img {
  position: relative;
  right: 0;
  background-color: #fff;
  border-style: none;
}

.btn-delete-img i{
    color: red;
    float: right;
}

.preview-img .btn-delete-img {
  margin-top: -30px;
  background-color: transparent;
  position: relative;
  float: right;
  border-style: none;
}

.btn-delete-img {
  position : relative;
  top: 20px;
  right: -10px;
}

.btn-delete-img i{
    font-size: 18px;
    color: red;
    /* float: right; */ 
} 

.error {
  color: red;
}

`;
let fileimg = []

export default class Add_item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item_name: '',
      type: '',
      amount: '',
      bot_id: '',
      imageURL: '',
      Image: '',
      des: '',
      file: [],
      imagesPreviewUrl: [],
      options: ["d1","2"],
      value: [],
      price: '',
      message : '',
      showMessage: false,
      errorState: false
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.Onend = this.Onend.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.deleteImg = this.deleteImg.bind(this)
   
  }
  deleteImg (img,index) {
    
    
      const preview_image = this.state.imagesPreviewUrl
      const preview_img = preview_image.filter(e => e != img);
      
      const data_image = fileimg
      
      const data_img = data_image.filter(e => e != data_image[index]);
     fileimg = data_img
    
 
     // OldImg.pop(index)
     
     this.setState({
       imagesPreviewUrl: preview_img
       
     })
     // console.log(this.state.url_preview)
     
   }

  handleCreate(name) {
    let { options, value } = this.state;


 
    this.setState({
      value: [...value, name],  // select new option
      options: [...options, name] // add new option to our dataset
    })
    console.log(this.state)
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
   
  }



  _handleImageChange(e) {
    e.preventDefault();
    this.setState({errorState: false})
    // console.log(this.state.value)
    // console.log(this.state)
    let i
    // if( type != "image/jpeg" && type != "image/png"){
    //   alert("Only PNG or JPG is accepted")
      
    // }
    for (i = 0; i < e.target.files.length; i++) {
      
      if(e.target.files[i].type != "image/jpeg" && e.target.files[i].type != "image/png"){
        this.setState({errorState: true})
      }
      else{
        let reader = new FileReader();
        console.log(this.uploadInput.files[i])
        fileimg.push(this.uploadInput.files[i])
        if (!fileimg) {
          return
        }
        // console.log(this.state.imagesPreviewUrl)
        reader.onloadend = () => {
          this.setState({
            file: [...this.state.file,this.uploadInput.files[i]],
            imagesPreviewUrl: [...this.state.imagesPreviewUrl, reader.result]
          });
        }
        // console.log(reader.result)
        reader.readAsDataURL(this.uploadInput.files[i])
      }
      

    }
    
    // console.log(fileimg)


  }
  


  handleUploadImage(ev) {
    ev.preventDefault();
    this.setState({errorState: false})
    // const files = ev.target[0].files[0]
    const itemnameLength = this.state.item_name.replace(/^\s+|\s+$/gm,'').length
    var i

    if (itemnameLength == 0){
      this.setState({message:'Please enter Item name'})
      this.setState({showMessage: true})

    }

    else{
      if(fileimg.length == 0){
        this.setState({errorState: true})
      }
      else{
        const data = new FormData();
      
        for (i = 0; i < fileimg.length; i++) {
          
          // file.push(this.uploadInput.files[i])
          
          data.append('file' + [i], fileimg[i]);
        }
    
    
    
        // console.log(fileimg)
        // data.append('file', file);
        data.append('item_name', this.item_name.value);
        data.append('type', JSON.stringify(this.state.value));
        data.append('amount', this.amount.value);
        data.append('creator', localStorage.getItem('user_id'))
        data.append('Image', this.state.Image)
        data.append('des', this.des.value);
        data.append('price', this.price.value);
        fetch('/bot/' + this.props.match.params.bot_id + '/additem', {
          method: 'POST',
          // headers : {
          //   "Access-Control-Allow-Origin": "*",
          //   'Content-Type':'application/json'
          // },
          // body : JSON.stringify(json5),
          body : data
        }).then((response) => {
          response.json().then((body) => {
            this.setState({ imageURL: `/${body.file}` });
            this.setState({ bot_id: data.id })
            fileimg = []
            this.setState({ redirect: true })
          });
        });
      }
      
  
    }
    
  }

 
    // componentDidMount ()  {
    //  var a = []
    //  var unique = []
    //   fetch('/bot/'+this.props.match.params.bot_id+'/getitem').then((response) => {
    //   response.json().then((data) => {
    //     // console.log(data) 
    //     var i = 0
    //     for(i = 0 ;i<data.length;i++){
    //       a.push(...data[i].type)
    //       unique = [...new Set(a)];
    //   }
    //   this.setState ({ options : unique})
    // });
    // });

    //   }

  render() {
    const { redirect, bot_id } = this.state;
    if (redirect) {
      return <Redirect to={"/bot/" + this.props.match.params.bot_id+"/inventory"} />
    }
    else {
      let { imagePreviewUrl } = this.state;
      
      let $imagePreview = null;
      // if (imagePreviewUrl) {
      //   console.log(imagePreviewUrl)
      //   $imagePreview = (<img src={imagePreviewUrl} />);
      // }
      return (
        <Styles>
           { this.state.errorState &&  
            <div className="errorstate">

                              
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
                                  message="Only PNG or JPG is accepted."
                                  show
                                  
                                  title="Error"
                                  titleClassName="elegant-color-dark white-text"
                    
                                  />
                                </div>

                                }
          <div className="container">
            <div className="col-12 col-lg-9 mx-auto">
              <div className="card card-bot">
                <Link to= {"/bot/" + this.props.match.params.bot_id+"/inventory" } className="button-to-inventory">
                  <i class="fas fa-long-arrow-left"></i>
                </Link>
                <div className="card-body-add-item">
                  <h5 className="card-title-add-item mt-3 mb-4">Create New Item</h5>
                  <form className="form-additem" onSubmit={this.handleUploadImage}>
                   <div className="title_additem">
                          <p className="">Upload image <span className="req-icon"> *</span></p>
                          
                          <div className="line-inv"></div>
                    </div>
                    
                    <div className="showimg-newinv form-row d-flex justify-content-between">
                          <div className="showimg-newinv">
                            <div className="upload-newinv">
                                <input accept="image/x-png,image/gif,image/jpeg" ref={(ref) => { this.uploadInput = ref; }} onChange={(e) => this._handleImageChange(e)} type="file" multiple />
                            </div>
                            {/* {this.state.file.map((file) => {
                                console.log(file) 
                               })} */}
                            {this.state.file}
                              {this.state.imagesPreviewUrl.map((imagesPreviewUrl,index) => {
                               
                                return (
                                  
                                  <div className="preview-img">
                                    <div className="btn-delete-img" >
                                          <i className="fas fa-times-circle" onClick={() => this.deleteImg(imagesPreviewUrl,index) }></i>
                                      </div>
                                      
                                      <img key={imagesPreviewUrl} alt='previewImg' src={imagesPreviewUrl} />
                                </div>
                              )})}
                          </div>  
                    </div>  
                    
                          
                          <div className="title_additem">
                            <p className="">Item descriptions</p>
                            <div className="line-inv"></div>
                          </div>
                          <div className="row">
                              <div className="col">
                                <label className="form-label">Item name</label>
                                <span className="req-icon"> *</span>
                                <input type="text" name="item_name" value={this.state.item_name} ref={(ref) => { this.item_name = ref; }} onChange={this.handleChange} className="form-control"required />
                                { this.state.showMessage &&  
                                        <div className="container">
                                            <FlashMessage duration={4000}>
                                              <div className="error">
                                                <strong>* {this.state.message}</strong>
                                              </div>  
                                            </FlashMessage>
                                        </div>
                                  } 
                              </div> 
                                                    
                              <div className="col">
                                <label className="form-label">Price</label>
                                <span className="req-icon"> *</span>
                                <input type="number" min="0" step="any" name="price" value={this.state.price} ref={(ref) => { this.price = ref; }} onChange={this.handleChange} className="form-control"required />
                              </div>
                          </div>
                          {/* <div class="mt-3"  onKeyDown ={((e) => this.Onend(e))}> */}
                          <div className="row">
                            <div class="col mt-2">
                              <label for="inputtype" class="form-label" required>Type</label>
                              <span className="req-icon"> *</span>
                              <Multiselect
                                data={this.state.options}
                                value={this.state.value}
                                allowCreate="onFilter"
                                onCreate={name => this.handleCreate(name)}
                                onChange={value => this.setState({ value })}
                                textField="name"
                              />
                              
                            </div>
                            <div className="col mt-2">
                              <label for="inputAmout" className="form-label" required>Amount</label>
                              <span className="req-icon"> *</span>
                              <input type="text" pattern="\d*"  name="amount" className="form-control" id="inputfirstname" value={this.state.amount} ref={(ref) => { this.amount = ref; }} onChange={this.handleChange} />
                            </div>
                         </div> 
                          <div className="mt-2">
                            <label for="inputDesciption" className="form-label">Desciption</label>
                            <textarea type="text" name="des" className="form-control" id="inputfirstname" rows="4" value={this.state.des} ref={(ref) => { this.des = ref; }} onChange={this.handleChange}> </textarea>
                          </div>
                    
                    <hr className="mt-5"></hr>
                    <div className="btn-submitinv">
                      <button className="btn btn-success text-uppercase" onSubmit={this.handleUploadImage} type="submit">Submit</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>

          </div>
        </Styles>
      )
    }
  }
}

