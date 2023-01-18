import React,{Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import SectionIntro from './../../Header/Header';
import {connect} from 'react-redux';
import { setlogin } from '../../../redux/action';
import Cookies from 'universal-cookie';

function mapStateToProps(state){
    return {isLoggedIn:state.isLoggedIn,username:state.username,server:state.server};
}

function mapDispatchToProps(dispatch) {
    return { setLogin : loginData =>  { dispatch( setlogin(loginData)) }}
}

class LoginView extends Component{
    
    constructor(props){
        super(props);
    }

    state={
        email:"",
        password:"",
        status:false,
        isLoggedIn:false
    }

    loadErrorMessage=()=>{
        return !this.state.status ? <span class="gl-text u-s-m-b-30">If you have an account with us, please log in.</span> : <span class="gl-text u-s-m-b-30" style={{color:"red"}}>Email and Password Not Matched!</span>;
    }

    loadRedirect=()=>{
        return this.state.isLoggedIn ? <Redirect to="/my-account"/> : <></>
    }

    onSubmit=(e)=>{
        e.preventDefault();
        let json = JSON.stringify(
            {
                email:this.state.email,
                password:this.state.password
            }
        );

        fetch(
            this.props.server+"user/login",
            {
                body:json,
                headers:{
                    "content-type":"Application/json",
                    "accept":"Application/json",
                },
                method:"POST"
            }
        ).then(
            data=>{
                if(data.status === 404){
                   this.setState({status:true});
                    throw new Error("");
                }
                else{
                    return data.json();
                }
            }
        ).then(
            udata=>{

                let now = new Date();
                now.setTime(now.getTime() + 1 * 3600 * 1000);
                const cookies = new Cookies();
                cookies.set('tokencustomer', udata.token, { path: '/',expires:now });

                let username = udata.udata.name.firstname+" "+udata.udata.name.lastname;
                let address = udata.udata.address.route;
                let mobile = udata.udata.mobile.mob_1;
                let fname = udata.udata.name.firstname;
                let lname = udata.udata.name.lastname;
                let token = udata.token;
                let email = this.state.email;

                this.props.setLogin({
                    username,address,mobile,token,fname,lname,email
                });

                this.setState({isLoggedIn:true});
            }
        ).catch(err=>{
        });

    }

    onChange=(e)=>{
        this.setState({ [e.target.name]:e.target.value});
    }

    render(){
        return(<>
        {this.loadRedirect()}
        <div class="u-s-p-b-60">
        <SectionIntro title="Already Registered?"/>
                <div class="section__content">
                    <div class="container">
                        <div class="row row--center">
                            <div class="col-lg-6 col-md-8 u-s-m-b-30">
                                <div class="l-f-o">
                                    <div class="l-f-o__pad-box">
                                        <h1 class="gl-h1">I'M NEW CUSTOMER</h1>

                                        <span class="gl-text u-s-m-b-30">By creating an account with our store, you will be able to move through the checkout process faster, store shipping addresses, view and track your orders in your account and more.</span>
                                        
                                        <div class="u-s-m-b-15">
                                            <Link class="l-f-o__create-link btn--e-transparent-brand-b-2" to="/signup" >CREATE AN ACCOUNT</Link>
                                        </div>
                                        
                                        <h1 class="gl-h1">SIGNIN</h1>
                                        {this.loadErrorMessage()}
                                        <form class="l-f-o__form" onSubmit={this.onSubmit}>

                                            <div class="u-s-m-b-30">
                                                <label class="gl-label" for="login-email">E-MAIL *</label>
                                                <input class="input-text input-text--primary-style" type="email" id="login-email"  onChange={this.onChange}  name="email" value={this.state.email} placeholder="Enter E-mail" required/>
                                            </div>
                                            
                                            <div class="u-s-m-b-30">
                                                <label class="gl-label" for="login-password">PASSWORD *</label>
                                                <input class="input-text input-text--primary-style" type="password" id="login-password" onChange={this.onChange}  name="password" value={this.state.password} placeholder="Enter Password" required/>
                                            </div>
                                            
                                            <div class="gl-inline">
                                                <div class="u-s-m-b-30">
                                                    <button class="btn btn--e-transparent-brand-b-2" type="submit">LOGIN</button>
                                                </div>
                                                
                                                <div class="u-s-m-b-30">
                                                    <Link class="gl-link" to="/forgotpassword">Lost Your Password?</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>);
    }
}

const Login = connect(mapStateToProps,mapDispatchToProps)(LoginView);
export default Login;