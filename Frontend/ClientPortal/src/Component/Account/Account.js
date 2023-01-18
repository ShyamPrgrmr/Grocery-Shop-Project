import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReturningUser from '../Auth/ReturningUser/ReturningUser';
import Navigator from './Navigator/Navigator';
import EditProfile from './pages/EditProfile/EditProfile';
import MyAccount from './pages/MyAccount/MyAccount';
import MyOrder from './pages/MyOrder/MyOrder';
import MyProfile from './pages/MyProfile/MyProfile';
import OrderDetails from './pages/OrderDetails/OrderDetails';

function mapStateToProps(state){
    return {username : state.username,
            isLoggedIn:state.isLoggedIn,
            }
}

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn:false,username:"",page:"account",orderid:"",orderdata:{} };
    }

    componentDidMount=()=>{
        this.setState({isLoggedIn:this.props.isLoggedIn,username:this.props.username});
    }

    componentDidUpdate=()=>{
        if(this.props.isLoggedIn !== this.state.isLoggedIn){
            this.setState({isLoggedIn:this.props.isLoggedIn,username:this.props.username});
        }
    }

    menuItemClicked=(menuitem)=>{
        this.setState({page:menuitem});
    }

    loadLoginContent=()=>{
        //add ! after working

        return !this.state.isLoggedIn ? (
            <div class="col-lg-12">
                <ReturningUser/>
            </div>
        ) : (
            <>
            <div class="col-lg-3 col-md-12">
                <Navigator menuItemClicked={this.menuItemClicked} username={this.state.username}/>
            </div>
            {this.loadCurrentPage()}
            </>
        );
    }

    loadOrderDetails=(id,data)=>{
        this.setState({orderid:id,page:"orderdetails",orderdata:data});
    }

    loadEditProfile=()=>{
        this.setState({page:"editprofile"});
    }

    loadCurrentPage=()=>{
        if(this.state.page==="account"){
            return <MyAccount loadOrderDetails={this.loadOrderDetails} loadEditProfile={this.loadEditProfile}/>
        }
        else if(this.state.page==="profile"){
            return <MyProfile loadEditProfile={this.loadEditProfile}/>
        }
        else if(this.state.page==="addbook"){

        }
        else if(this.state.page==="myorder"){
            return <MyOrder loadOrderDetails={this.loadOrderDetails} />
        }
        else if(this.state.page==="orderdetails"){
            return <OrderDetails id={this.state.orderid} data={this.state.orderdata}/>
        }
        else if(this.state.page==="editprofile"){
            return <EditProfile />
        }
        return <> </>
    }

    render() {
        return (
            <div className="u-s-p-b-60">
                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            {
                                this.loadLoginContent()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Account = connect(mapStateToProps)(ProfileView);

export default Account;