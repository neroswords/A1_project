import React from 'react';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom'
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
  }
  
  .card-bot .card-title {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
  }
  
  .card-bot .card-body {
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
    letter-spacing: .1rem;
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
    margin-top: 10%;
    margin-left: -1%;
    justify-content:center;
    position: absolute;
    padding: 10px 20px;
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
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    margin-bottom: 1%;
  }

  .showimg-newinv img{
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    height: 150px;
    width: 150px;
    object-fit: cover;
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
    width: 150px;
    height: 150px;
    
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
      imagesPreviewUrl: [],
      options: ["d1","2"],
      value: [],
      price: '',
      message : '',
      showMessage: false,
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.Onend = this.Onend.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
   
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
    console.log(this.state)
  }



  _handleImageChange(e) {
    e.preventDefault();
   
    // console.log(this.state.value)
    // console.log(this.state)
    let i
    // if( type != "image/jpeg" && type != "image/png"){
    //   alert("Only PNG or JPG is accepted")
      
    // }
    for (i = 0; i < e.target.files.length; i++) {
      
      if(e.target.files[i].type != "image/jpeg" && e.target.files[i].type != "image/png"){
        alert("Only PNG or JPG is accepted")
      }
      else{
        let reader = new FileReader();
        fileimg.push(this.uploadInput.files[i])
        if (!fileimg) {
          return
        }
        // console.log(this.state.imagesPreviewUrl)
        reader.onloadend = () => {
          this.setState({
            file: this.uploadInput.files[i],
            imagesPreviewUrl: [...this.state.imagesPreviewUrl, reader.result]
          });
        }
        // console.log(reader.result)
        reader.readAsDataURL(this.uploadInput.files[i])
      }
      

    }

    console.log(fileimg)


  }
  handleUploadImage(ev) {
    ev.preventDefault();

    // const files = ev.target[0].files[0]
    const itemnameLength = this.state.item_name.replace(/^\s+|\s+$/gm,'').length
    var i

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
      if (imagePreviewUrl) {

        $imagePreview = (<img src={imagePreviewUrl} />);
      }
      return (
        <Styles>
          <div className="container">
            <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
              <div className="card card-bot">
                <div className="card-body">
                  <h5 className="card-title text-center mt-3 mb-4">Create New Item</h5>
                  <form className="form-additem" onSubmit={this.handleUploadImage}>
                   <div className="title_addinv">
                          <p className="col">Upload image</p>
                          <div className="line-inv"></div>
                    </div> 
                    <div className="showimg-newinv form-row d-flex justify-content-between">
                          <div className="col showimg-newinv">
                            <div className="col upload-newinv">
                                <input ref={(ref) => { this.uploadInput = ref; }} onChange={(e) => this._handleImageChange(e)} type="file" multiple />
                            </div>
                              {this.state.imagesPreviewUrl.map((imagesPreviewUrl) => {
                                return <img key={imagesPreviewUrl} alt='previewImg' src={imagesPreviewUrl} />
                              })}
                          </div>  
                    </div>  
                    
                          
                          <div className="title_addinv">
                            <p className="col">Item descriptions</p>
                            <div className="line-inv"></div>
                          </div>
                          <div className="row">
                              <div className="col">
                                <label className="form-label">Item name *</label>
                                <input type="text" name="item_name" value={this.state.item_name} ref={(ref) => { this.item_name = ref; }} onChange={this.handleChange} className="form-control"required />
                              </div> 
                              { this.state.showMessage &&  
                                        <div className="container">
                                            <FlashMessage duration={4000}>
                                              <div className="error">
                                                <strong>* {this.state.message}</strong>
                                              </div>  
                                            </FlashMessage>
                                        </div>
                                  }                       
                              <div className="col">
                                <label className="form-label">Price *</label>
                                <input type="number" min="0" step="any" name="price" value={this.state.price} ref={(ref) => { this.price = ref; }} onChange={this.handleChange} className="form-control"required />
                              </div>
                          </div>
                          {/* <div class="mt-3"  onKeyDown ={((e) => this.Onend(e))}> */}
                          <div className="row">
                            <div class="col mt-2"  >
                              <label for="inputtype" class="form-label" required>Type</label>
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
                              <label for="inputAmout" className="form-label" required>Amount *</label>
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

