import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import urls from "./../../../properties"
export default class EditProduct extends Component{
  
  state={
      product:{},
      name:"",
      manufacturer:"",
      description:"",
      measurement:"",
      id:"",
      server:urls.node_server_url+"/",
      category:"Dal"
  };

  constructor(props) {
    super(props);
  }

  onChange=(e)=>{
    const {name, value} = e.target;
    this.setState({[name] : value});
  }

  componentDidMount=()=>{
      this.setState({
        product:this.props.edit,
        name:this.props.edit.name,
        manufacturer:this.props.edit.manufacturer,
        description:this.props.edit.description,
        measurement:this.props.edit.measurement,
        id:this.props.edit._id,
        category:this.props.edit.category
    });
  }

  changeToList=(e)=>{
    e.preventDefault();
    this.props.changeToList();
  }

  onSave=(e)=>{
    e.preventDefault();
    
    const cookies = new Cookies();
    const token = cookies.get("token");

    let json = JSON.stringify({
        id:this.state.id,
        name:this.state.name,
        description:this.state.description,
        manufacturer:this.state.manufacturer,
        measurement:this.state.measurement,
        token:token,
        category:this.state.category
    });  

    fetch(this.state.server+"admin/updateproduct",
        {
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                'accept':'application/json'
            },
            body:json
        }
    ).then(data=>{
        if(data.status==200)    
            return data.json();
    }).then(res=>{
        if(res){
            this.props.changeProductInforamtion({
                name:this.state.name,
                measurement:this.state.measurement,
                manufacturer:this.state.manufacturer,
                description:this.state.description,
                id:this.state.id
            });
            this.props.changeToList();
        }
        
    }).catch(e=>{
        console.log(e);
        alert("Something gone wrong!");
    });
  }

  render(){
      return (
          <>
            <div className="card-title d-flex justify-content-between align-items-center"> Product Inforamtion
                <button onClick={this.changeToList} className="btn btn-sm btn-icon btn-link">
                    <i className="mdi mdi-close text-dark"></i>
                </button>
            </div> 
            <div className="forms-sample">
                <div class="form-group">
                    <label for="exampleInputName1">Name</label>
                    <input type="text" onChange={this.onChange} name="name" class="form-control" value={this.state.name} placeholder="Name of product"/>
                </div>
              
                <div class="form-group">
                    <label for="exampleInputCity1">Manufacturer</label>
                    <input type="text" onChange={this.onChange} name="manufacturer" class="form-control" value={this.state.manufacturer}  id="exampleInputCity1" placeholder="Manufacturer"/>
                </div>
              
                <div class="form-group">
                    <label for="exampleInputCity1">Measurement</label>
                    <input type="text" onChange={this.onChange} name="measurement" class="form-control" value={this.state.measurement}  id="exampleInputCity1" placeholder="Measurement"/>
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail3">Description</label>
                    <textarea type="text" onChange={this.onChange} name="description" class="form-control" value={this.state.description} id="exampleInputEmail3" placeholder="Product description"></textarea>
                </div>

                <div class="form-group">
                <label for="category">Category</label>
                  <select class="form-control" name="category" onChange={this.onChange} value={this.state.category}>
                    <option value="Dal">Dal</option>
                    <option value="Oil">Oil</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Grains">Grains</option>
                    <option value="Snakes">Snakes</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Vegitables">Vegitables</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>

                <button type="submit" onClick={this.onSave} class="btn btn-primary mr-2">Save</button>

            </div>
          </>
      );
  }
}