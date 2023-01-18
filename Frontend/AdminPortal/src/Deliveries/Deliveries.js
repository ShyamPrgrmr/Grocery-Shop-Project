import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import ListItem from './ListItem/ListItem';
import './Deliveries.css';
import urls from "./../properties"

export default class Deliveries extends Component{
    constructor(props) {
        super(props);
    }

    state={
        deliveries:[],
        server:urls.node_server_url+"/"
    };

    componentDidMount=()=>{
        let coockie = new Cookies();
        const token = coockie.get('token');

        fetch(this.state.server+"admin/order/getacceptedorder?token="+token,{
            method:"GET",
            headers:{
                "Accept":"application/json"
            }
        }).then(
            data=>{
                return data.json();
            }
        ).then(res=>{
            if(!res) {alert("Error"); return;}
            else{
                this.setState({deliveries : res});
            }
        }).catch(err=>{
            console.error(err);
        });
    }

    getTableBody=()=>{

        let deliveries = this.state.deliveries.map(
            product=>{
                return (
                        <tr>
                            <ListItem {...product}></ListItem>
                        </tr>
                    );                
            }
        );

        return deliveries;
    }

    reload=(e)=>{
        e.preventDefault();
        
        let coockie = new Cookies();
        const token = coockie.get('token');

        fetch(this.state.server+"admin/order/getacceptedorder?token="+token,{
            method:"GET",
            headers:{
                "Accept":"application/json"
            }
        }).then(
            data=>{
                return data.json();
            }
        ).then(res=>{
            if(!res) {alert("Error"); return;}
            else{
                this.setState({deliveries : res});
            }
        }).catch(err=>{
            console.error(err);
        });
    }


    render(){
        return(
        <div className="col-md-12 stretch-card">
          <div className="card">
                <div className="card-body">
                <div className="card-title d-flex justify-content-between"> 
                    <p>All Deliveries</p> 
                    <button onClick={this.reload} className="btn btn-sm btn-outline-dark">Refresh</button> 
                </div> 
                    <div class="table-responsive">
                        <table id="recent-purchases-listing" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getTableBody()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
} 