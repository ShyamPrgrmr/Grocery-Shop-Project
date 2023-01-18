import React,{Component} from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Footer from './Component/Footer/Footer';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import './App.css'
import SignUp from './Component/Auth/SignUp/SignUp';
import Login from './Component/Auth/Login/Login';
import ForgotPassword from './Component/Auth/ForgotPassword/ForgotPassword';
import {connect} from 'react-redux';
import { PathView } from './Component/Path/Path';
import Cart from './Component/Cart/Cart';
import Checkout from './Component/Checkout/Checkout';
import Account from './Component/Account/Account';
import {setlogin} from './redux/action/index';
import Cookies from 'universal-cookie';
import ProductDescription from './Component/ProductDescription/ProductDescription';

function mapStateToProps(state){
  return {state : state,isProductDescription:state.isProductDescription};
}

function mapDispatchToProps(dispatch){
  return {setLogin : logindata=>{ dispatch(setlogin(logindata)) }}
}


class AppContent extends Component{
  
  constructor(props){
    super(props); 
  }

  state={
    isLoggedIn:false,
    isProductDescription:""
  }

  router=()=>{
    return (
      <Switch>
        <Route component={SignUp} path="/signup" key="Sign Up"></Route>
        <Route component={Login} path="/signin" key="Sign In"></Route>
        <Route component={ForgotPassword} path="/forgotpassword" key="Password Recovery"></Route>
        <Route component={Cart} path="/cart" key="Cart"></Route>
        <Route component={Checkout} path="/checkout" key="Checkout"></Route>
        <Route component={Account} path="/my-account" key="my-account"></Route>
        <Route component={ProductDescription} path="/product-details" key="description"></Route>
        <Route component={ProductDescription} path="/product-details-more" key="description-1"></Route>
        <Route component={Home} path="/"></Route>
      </Switch>
    );
  }

  componentDidMount(){
    this.setState({isLoggedIn:this.props.state.isLoggedIn});
    this.checkCoockies();
  }

  checkCoockies=async ()=>{
    let cookies = new Cookies();
    let token =await cookies.get("tokencustomer");
    
    if(token){
      fetch(this.props.state.server+"user/getuserdata?token="+token).then(
        data=>{
          if(data.status === 404){
            throw new Error("user not found");
          }
          else{
            return data.json();
          }
        }
      ).then(
        udata=>{
          
          let username = udata.user.name.firstname+" "+udata.user.name.lastname;
          let address = udata.user.address.route;
          let mobile = udata.user.mobile.mob_1;
          let fname = udata.user.name.firstname;
          let lname = udata.user.name.lastname;
          let email = udata.email;

          this.props.setLogin({
              username,address,mobile,token,fname,lname,email
          });
          
        }
      );
    }
  
  }

  loadProductDescription=()=>{
    if(this.state.isProductDescription !=="yes" ){
      
    }
    
  }

  componentDidupdate=()=>{
    if(this.state.isLoggedIn !== this.props.state.isLoggedIn)   
      this.setState({isLoggedIn:this.props.isLoggedIn});

  }

  render(){
    return(
    <>
      <div id="app">
          <Navbar/>
          <div className="app-content">
            <PathView/>
            {this.router()}
            {this.loadProductDescription()}
          </div>
      </div>
    </>);
  }
}

const App = connect(mapStateToProps,mapDispatchToProps)(AppContent);

export default withRouter(App);
