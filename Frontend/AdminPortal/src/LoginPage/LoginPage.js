import React,{Component} from 'react';
import logo from './../logo.svg';
import './LoginPage.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import urls from "./../properties"

export default class LoginPage extends Component{
    
    state={
        email:"",
        password:"",
        loginStatus:true,
        isLoggedin:false
    };

    constructor(props){
        super(props);
    }
    
    componentDidMount=()=>{
      
    }

    changeEmail=(e)=>{
        e.preventDefault();
        this.setState({email:e.target.value});
    }

    changePassword=(e)=>{
        e.preventDefault();
        this.setState({password:e.target.value});
    }
    server_url=urls.node_server_url+"/";

    onLogin= async (e)=>{
      e.preventDefault();
      const email = this.state.email;
      const password = this.state.password;
      
      const credentials = JSON.stringify({ 
        email,password
      });

      try{
        let res = await axios.post(this.server_url+"admin/login",credentials,{
          headers:{
            'Content-Type': 'application/json',
            'Accept':'application/json'
          }
        });
        const token = res.data.token;
        let now = new Date();
        now.setTime(now.getTime() + 1 * 3600 * 1000);
        const cookies = new Cookies();
        cookies.set('token', token, { path: '/',expires:now });
        this.setState({loginStatus:true});
        this.props.isLogin(true);
 
      }catch(e){
        this.setState({loginStatus:false});
        this.props.isLogin(true);
      }
    }

    loginStatus=()=>{
      return !this.state.loginStatus?<pre>Login credentials are wrong</pre>:<></>;
    }
    render(){

        return <><div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <img src={logo} alt="logo"/>
              </div>
              <h4>Hello! Admin</h4>
              <h6 class="font-weight-light">Sign in to continue.</h6>
              {this.loginStatus()}
              <div class="pt-3">
                
                <div class="form-group">
                  <input type="email" value={this.state.email} onChange={this.changeEmail} class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email"/>
                </div>
                <div class="form-group">
                  <input type="password" value={this.state.password} onChange={this.changePassword} class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div class="mt-3">
                 
                  <button class="btn btn-block btn-primary btn-lg font-weight-medium " onClick={this.onLogin}>SIGN IN</button>
                
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div></>
    }
}