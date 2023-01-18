import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import urls from "./../../properties"

export default class AddInventoryProducts extends Component{
    constructor(props){
        super(props);
        
    }

    state={
        products : [],
        id:"",
        quantity:0,
        name:"",
        measurement:"",
        productdata:[],
        listOfProduct:[]
    };

    componentDidMount=()=>{
        this.loadProductData();
    }

    loadProductData=()=>{
        const  data = [];
        const cookies = new Cookies();
        const token = cookies.get("token");
        let url = urls.node_server_url+"/product/getallproducts?token="+token;

        fetch(url,{
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'accept':'application/json'
            },
        }).then(response=>{
            return response.json();
        }).then(data=>{
           this.setState({listOfProduct:data.product})
        });
    }

    getNamesofProducts=()=>{
        let products = this.state.listOfProduct.map(
            product=>{
                return(<option value={product._id} id={product._id} title={product.name} about={product.measurement}>{product.name}</option>);
            }
        );
        return products;
    }

    addProduct=(e)=>{
        e.preventDefault();
        let list = this.state.products;
        list.push({name:this.state["name"],id:this.state["id"],productid:this.state["id"],quantity:this.state["quantity"],measurement:this.state["measurement"]});
        this.setState({products:list});
    }

    selectProduct=(e)=>{
        e.preventDefault();
        let name = document.getElementById(e.target.value).title;
        let measurement = document.getElementById(e.target.value).attributes.about.value;
        this.setState({id:e.target.value,name,measurement});
    }

    inputId=(e)=>{
        e.preventDefault();
        this.setState({quantity:e.target.value});
    }

    deleteProductInList=(e)=>{
        e.preventDefault();
        let id = e.target.value;
        let list = this.state.products.filter(
            product=>{
                if(product.id === id) return false;
                else return true;
            }
        );
        this.setState({products:list});
    }

    getListofProducts=()=>{
        let data = this.state.products.map(
            product=>{
                return (
                <tr>
                    <td>{product.name}</td>
                    <td>{product.quantity+" "+product.measurement}</td>
                    <td>
                        <button className="btn btn-danger btn-sm" value={product.id} onClick={this.deleteProductInList} >delete</button>
                    </td>
                </tr>
                );
            }
        );

        return data;
    }

    addToInventory=(e)=>{
        e.preventDefault();
        
        const cookies = new Cookies();
        const token = cookies.get("token");
        let url = urls.node_server_url+"/admin/inventory/addproductstoinventory";
        const json = JSON.stringify(
            {
                products:this.state.products,
                token:token
            }
        );

        fetch(url,
            {
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                    "Accept":"application/json"
                },
                body:json
            }
        ).then(data=>{
        
            if(data.status === 200){
                return data.json();
            }else{
                alert("Something went wrong!");
                return;
            }
        
        }).then(res=>{
            
            this.setState({products:[]});

        }).catch(e=>{console.error(e)})
    }

    render(){
        return(
        <div className="row">
            <div class="col-6  grid-margin stretch-card" id="first-container-add-product">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">Add Product
                        </div>
                        <div className="form-sample">
                            <div class="form-group">
                                <label for="">Name of products</label>
                                <select class="form-control" value={this.state.id} onChange={this.selectProduct}>
                                    <option disabled></option>
                                    {this.getNamesofProducts()}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="">Quantity</label>
                                <input type="text" class="form-control" id="exampleInputName1" placeholder="Quantity" onChange={this.inputId}/>
                            </div>

                            <button type="submit" class="btn btn-primary mr-2" onClick={this.addProduct}>Add</button>
                        
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-6 grid-margin stretch-card">
                <div class="card ">
                    <div class="card-body table-card">
                        <h4 class="card-title">List of Products</h4>
                        <div class="table-responsive">
                            <table id="recent-purchases-listing" class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getListofProducts()}
                            </tbody>
                            </table>
                        </div>
                    </div>  
                    <button className="btn btn-primary in-btn"  onClick={this.addToInventory}>Add to Inventory</button>
                    
                </div>
            </div>

        </div>);
    }
}