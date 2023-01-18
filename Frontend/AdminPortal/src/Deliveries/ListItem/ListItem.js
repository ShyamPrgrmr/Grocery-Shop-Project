import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import urls from "./../../properties"

export default class ListItem extends Component{
    
    constructor(props){
        super(props);
    }

    state={
        userid: "",
        username: {
            firstname: "",
            lastname: ""
        },
        usermobile: {
            mob_1: ""
        },
        useraddress: {
            route: "",
            pincode: 0
        },
        products: [
            {
                name:"",
                price:0,
                quantity:0
            }
        ],
        totalprice: 0,
        placedat: "",
        orderid: "",
        orderstatus: 1,
        open:false,
        serever:urls.node_server_url+"/",
        ordertype:false
    };

    componentDidMount=()=>{
        this.setState(this.props);
    }


    toggleButton=(e)=>{
        e.preventDefault();
        this.setState({open:!this.state.open});
    }


    loadCurateButton=()=>{
        return this.state.open ? <i className="mdi mdi-chevron-up"/> : <i className="mdi mdi-chevron-down"/> ; 
    }

    loadCollapse=()=>{
        return this.state.open ?
            <div id={this.state.orderid} className="co" style={{height:'auto',overflow:'visible'}}>
               {this.loadContent()}
            </div>
        :
            <div id={this.state.orderid} className="co" style={{height:0,overflow:'hidden'}}>
                {this.loadContent()}
            </div>
    }

    getPricing=()=>{
        if(this.state.ordertype==="Delivery"){
            return (
                <>
                    <tr className="total">
                        <td/><td>Total</td><td>{" "+this.state.totalprice+" RS."}</td>
                    </tr>
                    <tr className="total">
                        <td/><td>Delivery Charges</td><td>{" "+ 5 +" RS"}</td>
                    </tr>

                    <tr className="total">
                        <td/><td>Total Price</td><td>{" "+(this.state.totalprice+5)+" RS."}</td>
                    </tr>
                
                </>
            );
        }else{
            return (
                <>
                    <tr className="total">
                        <td/><td>Total</td><td>{" "+this.state.totalprice+" RS."}</td>
                    </tr>
                    <tr className="total">
                        <td/><td>Delivery Charges</td><td>{" "+ 0 +" RS"}</td>
                    </tr>

                    <tr className="total">
                        <td/><td>Total Price</td><td>{" "+(this.state.totalprice)+" RS."}</td>
                    </tr>
                
                </>
            );
        }

    }

    loadContent=()=>{
        return( 
        <div class="card card-body d-flex flex-column">
            
            <div className="d-flex justify-content-between ">
                <p>
                    {"ID : "+this.state.orderid}
                </p>
                <p>
                    {"Date : "+this.state.placedat}
                </p>
            </div>
            
            <div className="table-responsive">
                <table id="recent-purchases-listing" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.loadTable()}
                        
                        {this.getPricing()}
                    </tbody>
                </table>            
            </div>

        </div>)
    }


    loadDeleiveredButton=()=>{
        return this.state.orderstatus===1 ?
            <button className="btn btn-sm btn-primary" onClick={this.deliveredClicked}>Deliver</button>
        :   <button className="btn btn-sm btn-success" disabled={true}>Delivered</button>
    }


    loadTable=()=>{
        let data = this.state.products.map(product=>{
            return (
                <tr>
                    <td>
                        {product.name}
                    </td>
                    <td>
                        {product.quantity}
                    </td>
                    <td>
                        {product.price}
                    </td>
                </tr>
            );
        })

        return data;
    }


    deliveredClicked=(e)=>{
        e.preventDefault();

        let coockie = new Cookies();
        const token = coockie.get('token');
        let json = JSON.stringify(
            {
                token:token,
                orderid:this.state.orderid
            }
        );

        fetch(this.state.serever+"admin/order/delivered",{
            method:"PUT",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            },
            body:json
        }).then(data=> { if(data.status===200) return data.json(); else alert("error") }).then( res=>{
            this.setState({orderstatus:2});
        }).catch(e=>{alert("Error!")})
    }

    notDeliveredClicked=(e)=>{
        e.preventDefault();
    }

    render(){
        return(
            <>
            <td className="w-75 p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                        <b>{this.state.username.firstname +" " +this.state.username.lastname+","+"  "}</b>
                        {this.state.useraddress.route + ",  "+this.state.useraddress.pincode+", Mob: "+this.state.usermobile.mob_1} 
                    </div>
                    <button class="btn btn-link" type="button" onClick={this.toggleButton}>
                        {this.loadCurateButton()}
                    </button>
                </div>
                {this.loadCollapse()}
            </td>
            <td className="w-25 p-3">
                <div className="d-flex justify-content-around">
                    {this.loadDeleiveredButton()}
                </div>
            </td>

            </>
        );
    }
}

/*
{
    <p>
                    
                </p>


    "userid": "5ffd63f9d49fd14098ba6251",
    "username": {
        "firstname": "Shyam",
        "lastname": "Pradhan"
    },
    "usermobile": {
        "mob_1": "7387954553"
    },
    "useraddress": {
        "route": "wadali camp amravati",
        "pincode": 444606
    },
    "products": [
        {
            "name": "test",
            "quantity": 3,
            "price": 600,
            "id": "6010dea6505d014bd4e9ef03"
        }
    ],
    "totalprice": 600,
    "placedat": "2021-01-27T04:19:13.202Z",
    "orderid": "6010e9c13841022270a63fa5",
    "orderstatus": 1
}

*/