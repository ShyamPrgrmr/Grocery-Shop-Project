import './AddProduct.css';
import React,{Component} from 'react';
import ImageUploader from './ImageUploader/ImageUploader';
import Cookies from 'universal-cookie';
import { InputTags } from 'react-bootstrap-tagsinput';
import AddCategory from './AddCategory/AddCategory';
import urls from "./../../properties"


export default class AddProduct extends Component{
  
  state={
    name:"",
    measurement:"Kilo Gram",
    manufacturer:"",
    description:"",
    images:[],
    token:"",
    server:urls.node_server_url+"/",
    category:"Dal",
    keywords:[],
    fil:[]
  };

  constructor(props) {
    super(props);
    this.loadCategoryList();
  }

  addFilter=(fil)=>{
    let temp = this.state.fil;
    temp.push(fil);
    this.setState({fil:temp});
  }

  loadCategoryList=()=>{
    fetch(this.state.server+"shop/getfilters").then(data=>{ if(data.status===200) return data.json(); })
    .then(data=>{
      let fil = data.filters;
      this.setState({fil});
    });
  }

  onNewImgAdd=(src)=>{
    let listSrc = this.state.images;
    if(listSrc.length<3)
    {
      listSrc.push(src);
      this.setState({images:listSrc});
    } 
  }

  componentDidMount=()=>{
    const cookies = new Cookies();
    const token = cookies.get("token");
    this.setState({token});
  }

  onSubmit=(e)=>{
    e.preventDefault();
    if(this.state.images.length === 0)
    {
      alert("Please upload images!");
      return;
    }
    const cookies = new Cookies();
    const token = cookies.get("token");
    const json = JSON.stringify({
      name:this.state.name,
      measurement:this.state.measurement,
      manufacturer:this.state.manufacturer,
      images:this.state.images,
      description:this.state.description,
      token:token,
      category:this.state.category,
      keywords:this.state.keywords
    });

    fetch(
      this.state.server + "admin/addproductdata",
      {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
          'Accept':'application/json'
        },
        body:json
      }
    ).then(data=>{return data.json(); }).then(res=>{
      alert("Product added succefully!");
      this.setState({
        name:"",
        measurement:"Kilo Gram",
        manufacturer:"",
        images:[],
        description:"",
        category:"Dal",
        keywords:[]
        
      });
    }).catch(e=>{
      console.log(e);
    });
  }

  onChange=(e)=>{
    let {name,value} = e.target;
    this.setState({[name]:value});
  }

  displayFilters=()=>{
    let data = this.state.fil.map(d=>{ return(<option value={d}>{d}</option>); });
    return data;
  }


  render(){
      return( <>  

        <AddCategory addCategory={this.addFilter}/>

        <div class="col-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">   
          <div className="card-title">Add Category</div>
            <div class="forms-sample">
              <div class="form-group">
                <label>Name</label>
                <input name="name" autoFocus onChange={this.onChange} value={ this.state.name} type="text" class="form-control" placeholder="Name of product"/>
              </div>
              
              
              
            <div class="form-group">
                <label for="exampleSelectGender">Measurement</label>
                  <select class="form-control" name="measurement" onChange={this.onChange}>
                    <option value="Kilo Gram">Kilo Grams</option>
                    <option value="Litres">Litres</option>
                    <option value="Mili Litres">Mili Litres</option>
                    <option value="Grams">Grams</option>
                    <option value="Pieces">Pieces</option>
                  </select>
            </div>

              <div class="form-group">
                <ImageUploader onNewImgAdd={this.onNewImgAdd}/>
              </div>

              <div class="form-group">
                <ImageUploader onNewImgAdd={this.onNewImgAdd}/>
              </div>

              <div class="form-group">
                <ImageUploader onNewImgAdd={this.onNewImgAdd}/>
              </div>

              
              <div class="form-group">
                <label for="exampleInputCity1">Manufacturer</label>
                <input type="text" class="form-control " value={this.state.manufacturer} name="manufacturer" onChange={this.onChange} placeholder="Manufacturer"/>
              </div>
              
              <div class="form-group">
                <label for="exampleInputEmail3">Description</label>
                <textarea type="email" class="form-control" value={this.state.description} onChange={this.onChange} name="description" placeholder="Product description"></textarea>
              </div>

              <div class="form-group">
                <label for="category">Category</label>
                  <select class="form-control" name="category" onChange={this.onChange}>

                    {this.displayFilters()}
                  
                  </select>
              </div>

              <div class="form-group">
                <label for="keywords">Enter Keywords</label>              
                <InputTags values={this.state.keywords} onTags={(value) => {this.setState({keywords:value.values});
                
              }} />
              </div>


              <button onClick={this.onSubmit} class="btn btn-primary mr-2">Submit</button>

            </div>
          </div>
        </div>
      </div>
      </>
      );
  }
}


 /*
  dal (mung,chana,tur,udid,),
	oil (Dalda,Soyabean,Soyabean refine),
	personal care (soap,shampoo,),
	grains  (rice,wheat) ,
	snakes (wafers,),
	dairy (milk,yagut),
	vegitables (),
	drinks (Coke,pepsi)
 
 */
