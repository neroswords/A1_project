
import React from 'react';
import styled from 'styled-components';
import { Link, withRouter, Redirect } from 'react-router-dom';
// import { Multiselect } from 'multiselect-react-dropdown';
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets' 
import FlashMessage from 'react-flash-message'

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
  
  .card-bot .card-title-edit-product {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
  }
  
  .card-bot .card-body-edit-item {
    margin: 1rem;
  }
  
  .title_addinv p{
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
  }

  .showimg-newinv img{
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    height: 140px;
    width: 140px;
    object-fit: cover;
    padding : 10px;
    border: 2px dashed #fca311;
    margin-bottom : 10px;
  }
  
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

  .upload-newinv{
    /* display:flex; */
    
    background-color: #feecd1;
    border: 2px dashed #fca311;
    border-radius : 0.75rem;
    text-align:center;
    height: 140px;
    width: 140px;
    
  }
  @media only screen and (max-width: 760px){
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
    width: 150px;
    height: 150px;
    
  }
  @media only screen and (max-width: 760px){
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
    width: 150px;
    height: 150px;
    
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
  .button-to-inventory i {
  /* display: flex; */
  /* float:right; */
  /* color: red; */
  font-size: 18px;
  }

.preview-img .btn-delete-img-edit {
  margin-top: -30px;
  background-color: transparent;
  position: relative;
  float: right;
  border-style: none;
}

.btn-delete-img-edit {
  position : relative;
  top: 20px;
  right: -10px;
}

.btn-delete-img-edit i{
    font-size: 18px;
    color: red;
    /* float: right; */ 
}

.error {
  color: red;
}

`;
let fileimg = []
export default class Product_edit extends React.Component {
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
      imagesPreviewUrl: [],
      options: ["d1","2"],
      value: [],
      price: '',
      url_preview: [],
      message : '',
      showMessage: false,
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.Onend = this.Onend.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.OnDeletepic = this.OnDeletepic.bind(this);
    
  }

  handleCreate(name) {
    let { options, value } = this.state;


 
    this.setState({
      value: [...value, name],  // select new option
      options: [...options, name] // add new option to our dataset
    })

  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });

  }
  OnDeletepic = (e) => {
    console.log(e)
}



  _handleImageChange(e) {
    e.preventDefault();
    
    let i
    for (i = 0; i < e.target.files.length; i++) {
      if(e.target.files[i].type != "image/jpeg" && e.target.files[i].type != "image/png"){
        console.log(this.uploadInput)
        alert("Only PNG or JPG is accepted")
      }
      else{
        let reader = new FileReader();
        fileimg.push(this.uploadInput.files[i])
        if (!fileimg) {
          return
        }
        reader.onloadend = () => {
          this.setState({
            file: this.uploadInput.files[i],
            imagesPreviewUrl: [...this.state.imagesPreviewUrl, reader.result]
          });
        }
        reader.readAsDataURL(this.uploadInput.files[i])
      }

      }
      

  }
  handleUploadImage(ev) {
    ev.preventDefault();


    var i
    const itemnameLength = this.state.item_name.replace(/^\s+|\s+$/gm,'').length
    if (itemnameLength == 0){
      this.setState({message:'Please enter Item name'})
      this.setState({showMessage: true})

    }
    else{
      const data = new FormData();
      
      for (i = 0; i < fileimg.length; i++) {
      
      // file.push(this.uploadInput.files[i])
      
          data.append('file' + [i], fileimg[i]);
      }


    // data.append('file', file);
      data.append('item_name', this.item_name.value);
      data.append('type', JSON.stringify(this.state.value));
      data.append('amount', this.amount.value);
      data.append('creator', localStorage.getItem('user_id'))
      console.log(this.state.Image)
      data.append('Image', this.state.Image)
      data.append('des', this.des.value);
      data.append('price', this.price.value);
      fetch('/inventory/'+this.props.match.params.bot_id+'/product_edit/'+this.props.match.params.product_id, {
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
    componentDidMount ()  {
    //  var a = []
    //  var unique = []
    //   fetch('/bot/'+this.props.match.params.bot_id+'/getitem').then((response) => {
    //   response.json().then((data) => {console.log(data) 
    //     var i = 0
    //     for(i = 0 ;i<data.length;i++){
    //       a.push(...data[i].type)
    //       unique = [...new Set(a)];
    //   }
    //   this.setState ({ options : unique})
    // });
    // });
    // console.log('/inventory/'+this.props.match.params.bot_id+'/product_edit/'+this.props.match.params.product_id)
    fetch('/inventory/'+this.props.match.params.bot_id+'/product_edit/'+this.props.match.params.product_id).then((response) => {
        response.json().then((data) => {
          this.setState({ item_name: data.item_name });
          this.setState({ value: data.type });
          this.setState({ amount: data.amount });
          this.setState({ url_preview: data.img });
          this.setState({ Image: data.img });
          this.setState({ des: data.des });
          this.setState({ price: data.price });
          console.log(this.state.Image)
        });
        
      });
    
        }
    

      

  render() {
    const { redirect, bot_id } = this.state;

    if (redirect) {
      return <Redirect to={"/bot/" + this.props.match.params.bot_id+"/inventory"} />
    }
    else {
      let { imagePreviewUrl } = this.state;
      
      let $imagePreview = null;
      if (imagePreviewUrl) {

        $imagePreview = (<img src={"imagePreviewUrl"} />);

      }
      return (
        <Styles>
          <div className="container">
            <div className="col-12 col-lg-9 mx-auto">
              <div className="card card-bot">
              <Link to={"/bot/"+ this.props.match.params.bot_id +"/inventory/product_detail/"+this.props.match.params.product_id} className="button-to-inventory">
                  <i class="fas fa-long-arrow-left"></i>
                </Link>
                <div className="card-body-edit-item">
                  <h5 className="card-title-edit-product text-center mt-3 mb-4">Edit Item Details</h5>
                  <form className="form-additem" onSubmit={this.handleUploadImage}>
                   <div className="title_addinv">
                          <p className="">Upload image <span className="req-icon"> *</span></p>
                          <div className="line-inv"></div>
                    </div> 
                    <div className="showimg-newinv form-row d-flex justify-content-between">
                          <div className="showimg-newinv">
                            <div className="upload-newinv">
                                <input accept="image/x-png,image/gif,image/jpeg" ref={(ref) => { this.uploadInput = ref; }} onChange={(e) => this._handleImageChange(e)} type="file" multiple />
                            </div>
                              {this.state.url_preview.map((url_preview) => {
                                return [ (
                                <div className="preview-img"> 
                                  <button className="btn-delete-img-edit">
                                        <i className="fas fa-times-circle"></i>
                                  </button>
                                    <img key={url_preview} alt='previewImg' src={"/images/bucket/"+url_preview} />
                                  </div> 
                                  )]
                              })}
                                {this.state.imagesPreviewUrl.map((imagesPreviewUrl) => {
                                return (
                                <div className="preview-img">
                                    <button className="btn-delete-img-edit">
                                          <i className="fas fa-times-circle"></i>
                                      </button>
                                      <img key={imagesPreviewUrl} alt='previewImg' src={imagesPreviewUrl} />
                                </div> 
                                )})}
                          </div>  
                    </div>  
                    
                          
                          <div className="title_addinv">
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
                            <div class="col mt-2"  >
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
                            <textarea type="integer" name="des" className="form-control" id="inputfirstname" rows="4" value={this.state.des} ref={(ref) => { this.des = ref; }} onChange={this.handleChange}> </textarea>
                          </div>
                    
                    <hr className="mt-5"></hr>
                    <div className="btn-submitinv">
                      <button className="btn btn-success text-uppercase" onClick={this.handleUploadImage} type="submit">Edit</button>
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

