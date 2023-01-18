import React,{Component} from 'react';
import OrderItem from './Order Item/OrderItem';
import './Order.css';
import Cookies from 'universal-cookie';
import urls from "./../properties"


export default class Order extends Component{
    
    state={
        orders:[],
        filterOrder:[],
        server:urls.node_server_url+"/"
    };
    constructor(props){
        super(props);
    }


    filterOreders=(fil)=>{
        const filter = fil.target.value;
        
        
        if(filter==="Arrived"){
            const products = this.state.orders;
        
            let productarr = products.filter(
                (data)=>{
                    if(data.orderstatus===-1) return true;
                    else return false;
                }
            );
            this.setState({filterOrder:productarr});
        }
        else if(filter==="All"){
            const products = this.state.orders;
            this.setState({filterOrder:products});
        }
        else if(filter==="Rejected"){
            const products = this.state.orders;
        
            let productarr = products.filter(
                (data)=>{
                    if(data.orderstatus===0) return true;
                    else return false;
                }
            );

            this.setState({filterOrder:productarr});
        }
        
        else if(filter==="Delivered"){
            const products = this.state.orders;
        
            let productarr = products.filter(
                (data)=>{
                    if(data.orderstatus===3) return true;
                    else return false;
                }
            );

            this.setState({filterOrder:productarr});   
        }
        
        else if(filter==="Accepted"){
            const products = this.state.orders;
        
            let productarr = products.filter(
                (data)=>{
                    if(data.orderstatus===1) return true;
                    else return false;
                }
            );
            this.setState({filterOrder:productarr});
        }

    }

    changeOrderStatus=(id,status)=>{
        this.getOrder();
    }
    
    componentDidMount=()=>{
        this.getOrder();
    }

    getOrder=()=>{
        let order=[];
        const cookies = new Cookies();
        const token = cookies.get("token");
        fetch(this.state.server+"admin/order/getallorders?token="+token,
        {
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            },
        }).then(data=>{
            if(data.status===200)
                return data.json();
            else
                alert("Something went too wrong!");
        }).then(res=>{
            this.setState({orders:res,filterOrder:res});
        }).catch(err=>{

        });
    }

    getList=()=>{
        const orders = this.state.filterOrder;
        
        let orderarr = orders.map(
            (data)=>{
                return(
                    <OrderItem changeOrderStatus={this.changeOrderStatus} {...data} key={data.orderid}></OrderItem>
                );
            }
        );
        return orderarr;
        
    }

    /*
        -1 : not accepted yet waiting       primary
        0 : not accepted                    danger
        1 : accepted                        info
        2 : out for delivery                secondary
        3 : delivered                       warning
    */

    reload=(e)=>{
        e.preventDefault();
        this.getOrder();
    }


    filter=()=>{
        return(
        <>
            <div className="filter">
            <label for="selectordertype">Order type</label>
                  <select class="form-control" onChange={ this.filterOreders}>
                    <option>All</option>
                    <option>Accepted</option> 
                    <option>Rejected</option>
                    <option>Arrived</option>
                    <option>Delivered</option>
                  </select>
            </div>
        </>
        );
    }

    render(){
        return(
            <>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <div className="card-title d-flex justify-content-between"> <p>Orders</p> <button onClick={this.reload} className="btn btn-sm btn-outline-dark">Refresh</button> </div> 
                            {this.filter()}
                            <div className="order--list">
                                
                                {this.getList()}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}