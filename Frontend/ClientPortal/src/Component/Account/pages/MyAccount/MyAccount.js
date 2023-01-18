import React,{Component} from 'react';
import {connect} from 'react-redux';
import { getOrders } from '../../../../redux/action';

function mapStateToProps(state){
    return { username:state.username,
             phone:state.mobile,
             address:state.address, 
             email:state.email, 
             isLoggedIn : state.isLoggedIn,
             server:state.server,
             token:state.token
            }
}

function mapDispatchToProps(dispatch){
    return {setorders : data => dispatch(getOrders(data)) }
}

class MyAccountView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders:[],
            orderFilter:"last_5"
         };
    }



    onOrderDetailsClick=(e)=>{
        e.preventDefault();
        let id = e.target.name;
        let ordata = this.state.orders.filter(d=>{
            if(d._id === id){
                return true;
            }
            return false;
        })
        this.props.loadOrderDetails(ordata[0]._id,ordata[0]);
    }


    loadTable=()=>{
    
        let ret = this.state.orders.map(
            data=>{
                return (
                    <tr>
                        <td>{ new String(data._id).toUpperCase().toString() }</td>
                        <td>{data.date}</td>
                        <td>{data.totalprice} Rs.</td>
                        <td>
                            <div class="dash__link dash__link--brand">
                                <a onClick={this.onOrderDetailsClick} name={data._id}>Order Details</a>
                            </div>
                        </td>
                    </tr>
                )
            }
        );

        return ret;
    }
    
    componentDidMount=()=>{
        this.setState({
            name:this.props.username,
            phone:this.props.phone,
            address:this.props.address,
            email:this.props.email,
        });
        this.loadData();
    }

    loadData=()=>{
        let filter = this.state.orderFilter;
        
        let lastfive = false;
        let url = this.props.server+"shop/getorders?token="+this.props.token

        if(filter === "lastfive"){
            url = url + "&lastfive=" + lastfive;
        }
        else if(filter === "today"){
            let date = new Date();
            let string = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            url = url + "&date=" + string +"&lastfive=" + false;
        }else{
            url = url + "&lastfive=" + false;
        }

        fetch(url).then(data=>{
            if(data.status===200) return data.json();
        }).then(data=>{ 
            this.setState({orders:data});
            this.props.setorders({orders:data});
        })
    }
    
    componentDidUpdate=()=>{
        if(this.props.username !== this.state.name){
            this.setState({
                name:this.props.username,
                phone:this.props.phone,
                address:this.props.address,
                email:this.props.email,
            })
        }
    }

    filterOrder=(e)=>{
        this.setState({orderFilter:e.target.value});
    }

    render() {
        return (
            <>
                <div class="col-lg-9 col-md-12">

                <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div class="dash__pad-2">
                <h1 class="dash__h1 u-s-m-b-14">Manage My Account</h1>
                <span class="dash__text u-s-m-b-30">From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.</span>
                <div class="row">
                    <div class="col-lg-6 u-s-m-b-30">
                        <div class="dash__box dash__box--bg-grey dash__box--shadow-2 u-h-100">
                            <div class="dash__pad-3">
                                <h2 class="dash__h2 u-s-m-b-8">PERSONAL PROFILE</h2>
                                
                                <span class="dash__text">{this.state.name}</span>
                                <span class="dash__text">{this.state.email}</span>

                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 u-s-m-b-30">
                        <div class="dash__box dash__box--bg-grey dash__box--shadow-2 u-h-100">
                            <div class="dash__pad-3">
                                <h2 class="dash__h2 u-s-m-b-8">ADDRESS BOOK</h2>
                                <div class="dash__link dash__link--secondary u-s-m-b-8">
                                    <a onClick={(e)=>{e.preventDefault(); this.props.loadEditProfile();}}>Edit</a>
                                </div>
                                <span class="dash__text">{this.state.address}</span>
                                <span class="dash__text">{this.state.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div></div>
                
                <div class="dash__box dash__box--shadow dash__box--bg-white dash__box--radius" style={{height:"324px",overflowY:"scroll"}}>
                    <h2 class="dash__h2 u-s-p-xy-20">MY ORDERS</h2>
                   
                    <table class="dash__table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Placed On</th>
                                <th>Total</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.loadTable()}
                        </tbody>
                    </table>
                </div>
                
                </div>
            </>
        );
    }
}


const MyAccount = connect(mapStateToProps,mapDispatchToProps)(MyAccountView);
export default MyAccount;