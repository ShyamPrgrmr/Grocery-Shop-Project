import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import urls from "./../../properties";


export default class OrderItem extends Component{

    constructor(props){
        super(props);
        this.state = props;
    }

    state={
        server:urls.node_server_url+"/"
    }

    
    componentDidMount=()=>{
    }

    componentDidUpdate=(props,state)=>{

    }


    onClick=(e)=>{
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get("token");
        const orderid = this.props.orderid;
        let status = 0;

        if(e.target.value==="1"){
           status=1;
        }
        else if(e.target.value==="0"){
            status=0;
        }

        const json = JSON.stringify(
            {
                token:token,
                orderid:orderid,
                status:status
            }
        );

        fetch(urls.node_server_url+"/admin/order/setdelivery",
        {
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            },
            body:json
        }).then(
            data=>{return data.json();}
        ).then(res=>{

            if(!res){ alert("Error!"); return; }
            this.props.changeOrderStatus(orderid,status);
            this.setState({orderstatus:status});

        }).catch(e=>{console.error(e);})

    }
    

    displayButton=()=>{
        if(this.state.orderstatus===-1){
            return <>
                <button className="btn btn-primary btn-sm" style={{marginRight:3}} onClick={this.onClick} value={1}>Accept</button>
                <button className="btn btn-danger btn-sm" onClick={this.onClick} value={0}>Reject</button>
            </>;
        }
        else if(this.state.orderstatus===0){
            return <div className="r">Rejected</div>;
        }
        else if(this.state.orderstatus===1){
            return <div className="ar">Being Deliver</div>;
        }
        
        else if(this.state.orderstatus===3){
            return <div className="d">Delivered</div>;
        }
    }

    borderColor=()=>{
        if(this.state.orderstatus===-1){
            return "order--list__item arrived";
        }
        else if(this.state.orderstatus===0){
            return "order--list__item rejected";
        }
        else if(this.state.orderstatus===1){
            return "order--list__item accepted";
        }
        
        else if(this.state.orderstatus===3){
            return "order--list__item delivered";
        }
        
    }

    loadtable=()=>{
        const products = this.state.products;
        let tabledata = products.map(
            product=>{
                return(
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.quantity } Pcs.</td>
                        <td>{product.inventory_q} Pcs.</td>
                        <td>{product.price} Rs.</td>
                    </tr>
                );
            }
        );
        return tabledata;
    }

    loadCharges=()=>{
        if(this.state.ordertype==="Delivery"){
            return <tr className="total">
                <td>Delivery Charges</td>
                <td></td>
                <td/>
                <td>{5} Rs.</td>
            </tr>
        }
        else if(this.state.ordertype==="Pickup"){
            return <tr className="total">
                <td>Delivery Charges</td>
                <td></td>
                <td/>
                <td>{0} Rs.</td>
            </tr>
        }
    }

    render(){
        return(
            <div className={this.borderColor()}>
                <div className='main'>
                    <h4>{this.state.username.firstname+" "+this.state.username.lastname}</h4>
                    <div >
                       {this.displayButton()} 
                    </div>
                </div>

                <div className="sub">
                    <p className="address">
                        {this.state.useraddress.route}, 
                        {" "+this.state.useraddress.pincode}
                        <br/>
                         {this.state.usermobile.mob_1}
                    </p>
                    <p style={{fontSize:"20px",fontWeight:"600",color:"red"}}>Orders Type : {this.state.ordertype}</p>
                </div>
                <hr/>
                <div className="product-list">
                    <div class="table-responsive">
                        <table id="recent-purchases-listing" class="table">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Quantity</th>
                                    <th>Stock Available</th>
                                    <th>Product Price</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.loadtable()}
                                {this.loadCharges()}
                                <tr className="total">
                                    <td>Total Amount</td><td/><td/>
                                    <td>{ this.state.ordertype==="Delivery"?( (parseFloat(this.state.totalprice) + 5) ):( this.state.totalprice ) } Rs.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
        
                </div>

            </div>
        );
    }
    

}
