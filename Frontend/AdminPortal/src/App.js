import './App.css';
import React,{Component} from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import AddProduct from './Products/AddProduct/AddProduct';
import Error404 from './error/Error404';
import ListProduct from './Products/ListProduct/ListProduct';
import Order from './Order/Order';
import TopNavbar from './Navbar/TopNavabar';
import Inventory from './Inventory/Inventory';
import LoginPage from './LoginPage/LoginPage';
import Deliveries from './Deliveries/Deliveries';
import Dashboard from './Dashboard/Dashboard';
import Cookies from 'universal-cookie';
import InitNavbar,{NavbarView} from './Navbar/InitNavbar';


export default class App extends Component{
  
  state={
    name : "Shyam Pradhan",
    route : "/Dashboard",
    isLogin:false
  };


  constructor(props) {
    super(props);
  }

  componentDidUpdate=()=>{
  }

  logout=()=>{
    new Cookies().remove("token");
    this.setState({isLogin:false});
  }

  isLogin=(status)=>{
    if(status) this.setState({isLogin:true});
    else this.setState({isLogin:false});
  }

  toTop=(e)=>{  
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop=0;
  }

  pageContent=()=>{
    return this.state.isLogin ?
      <>
        
        <button type="button" class="btn btn-inverse-dark btn-rounded btn-icon to-top" onClick={this.toTop}>
          <i class="mdi mdi-arrow-up-bold"></i>
        </button>
        
        <TopNavbar name={this.state.name} logout={this.logout} route={this.state.route}></TopNavbar>
        
        <div className="container-fluid page-body-wrapper">

            <NavbarView/>
          
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        {this.router()}
                    </div>
                </div>
            </div>
        </div>
      </>
     :
      <LoginPage isLogin={this.isLogin}/>
     ;
  }

  changeRoute=(route)=>{
    this.setState({route:route});
  }

  render(){
    return(
      <>
      <div className="container-scroller">

          {this.pageContent()}
      
      </div>
      
      
    </>
    );
  }

  componentDidMount=()=>{

  }

  router=()=>{
    return(
      
        <Switch>
            <Route path='/dashboard' component={Dashboard} routeprops={this.props}></Route>
            <Route path='/products/addproduct' component={AddProduct} routeprops={this.props}></Route>
            <Route path='/products/listproducts' component={ListProduct} routeprops={this.props}></Route>
            <Route path='/orders' component={Order} routeprops={this.props}></Route>
            <Route path='/deliveries' component={Deliveries} routeprops={this.props}></Route>
            <Route path='/inventory' component={Inventory} routeprops={this.props}></Route>
            <Route component={Error404}></Route>
        </Switch>
      
    );
  }

}
