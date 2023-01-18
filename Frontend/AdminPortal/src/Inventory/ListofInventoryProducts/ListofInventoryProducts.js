import React,{Component} from 'react';
import Cookies from 'universal-cookie'; 
import urls from "./../../properties";

export default class AddInventoryProducts extends Component{
    constructor(props){
        super(props);       
    }

    state={
        products:[],
        currentPage:1,
        server:urls.node_server_url+"/"
    };

    componentDidMount=()=>{
        this.loadProducts();
    }

    loadProducts=()=>{
        const cookies = new Cookies();
        const token = cookies.get("token");

        fetch(this.state.server+"admin/inventory/viewproductsininventory?token="+token+"&page="+this.state.currentPage,
        {
            method:"GET",
            headers:{
                "Accept":"application/json"
            }
        }
        ).
        then(data=> { if(data.status===200) return data.json(); else alert("Something went wrong"); }).
        then(res=>{
            this.setState({products:res});
        }).
        catch(e=>{console.error(e)});   
    }
    

    getListofProducts=()=>{
        const data = this.state.products;
        let index = 0;
        let list = data.map(
            product=>{
                index++;
                let badge="";
                if(product.quantity<10){
                    badge = <td><label class="badge badge-danger">Refill Stock</label></td>
                }
                else if(product.quantity<200){
                    badge = <td><label class="badge badge-warning">In Stock</label></td>
                }
                else{
                    badge = <td><label class="badge badge-success">In Stock</label></td> 
                }

                return(
                    <tr>
                        <td>{index}</td>
                        <td>{product.name}</td>
                        <td>{product.price+"Rs. / piece"}</td>
                        <td>{product.quantity+" pieces"}</td>
                        {badge}
                    </tr>
                );
            }
        );
        return list;
    }

    reload=(e)=>{
        e.preventDefault();
        this.loadProducts();
    }



    previousButtonClicked=async (e)=>{
        e.preventDefault();
        await this.setState({currentPage:this.state.currentPage-1});
        this.loadProducts();
    }
    nextButtonClicked=async (e)=>{
        e.preventDefault();
        await this.setState({currentPage:this.state.currentPage+1});
        this.loadProducts();
    }

    currentPage=()=>{
        let currentPage = this.state.currentPage;
        return currentPage === 1 ?(
            <div className="btn-group" role='group'>
                <button className='btn btn-primary btn-sm' disabled> 0 </button>
                <button className='btn btn-outline-secondary btn-sm' disabled> {this.state.currentPage} </button>
                <button className='btn btn-primary btn-sm' onClick={this.nextButtonClicked}> {this.state.currentPage+1} </button>
            </div>
        ) : (
            <div className="btn-group" role='group'>
                <button className='btn btn-primary btn-sm' onClick={this.previousButtonClicked}> {this.state.currentPage-1} </button>
                <button className='btn btn-outline-secondary btn-sm' disabled> {this.state.currentPage} </button>
                <button className='btn btn-primary btn-sm' onClick={this.nextButtonClicked}> {this.state.currentPage+1} </button>
            </div>
        );
    }

    render(){
        return(
            <div className="row">
            <div className="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                    <div className="card-title d-flex justify-content-between"> <p>Products in Inventory</p> <button className="btn btn-sm btn-outline-dark" onClick={this.reload}>Reload</button> </div> 
                    <div class="table-responsive">
                        <table id="recent-purchases-listing" class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getListofProducts()}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-center">
                            {this.currentPage()}                    
                    </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

