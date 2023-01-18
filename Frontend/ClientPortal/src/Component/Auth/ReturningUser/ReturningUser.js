import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { setlogin } from '../../../redux/action';
import Cookies from 'universal-cookie';

function mapStateToProps(state){
    return {isLoggedIn:state.isLoggedIn,username:state.username,server:state.server};
}

function mapDispatchToProps(dispatch) {
    return { setLogin : loginData =>  dispatch( setlogin(loginData) )}
}

class ReturningUserView extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn:false,email:"",password:"",invalid:false };
    }

    componentDidMount=()=>{
        this.setState({username:this.props.username,isLoggedIn:this.props.isLoggedIn});
    }

    componentDidUpdate=()=>{
        if(this.props.isLoggedIn != this.state.isLoggedIn){
            this.setState({username:this.props.username,isLoggedIn:this.props.isLoggedIn});
        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
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
                   this.setState({invalid:true});
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

            }
        ).catch(err=>{
        });
    }


    loadErrorMessage=()=>{
        return this.state.invalid ? <span class="gl-text u-s-m-b-16" style={{color:"red"}}>Email or password is wrong</span>:<span class="gl-text u-s-m-b-16">You are not logged in!, please log in.</span>
    }

    loadLoginContainer=()=>{

        return !this.state.isLoggedIn ? (
            <div id="checkout-msg-group">
                <div class="msg u-s-m-b-30">  
                    <div >
                        <div class="l-f u-s-m-b-16">
                            {this.loadErrorMessage()}
                            <form class="l-f__form" onSubmit={this.onSubmit}>
                                <div class="gl-inline">
                                    <div class="u-s-m-b-15">
                                        <label class="gl-label" for="login-email">E-MAIL *</label>
                                        <input class="input-text input-text--primary-style" type="text" name="email" onChange={this.onChange} value={this.state.email} id="login-email" placeholder="Enter E-mail"/>
                                    </div>
                                    <div class="u-s-m-b-15">
                                        <label class="gl-label" for="login-password">PASSWORD *</label>
                                        <input class="input-text input-text--primary-style" type="password" name="password" onChange={this.onChange} value={this.state.password}  id="login-password" placeholder="Enter Password"/>
                                    </div>
                                </div>
                                <div class="gl-inline">
                                    <div class="u-s-m-b-15">
                                        <button class="btn btn--e-transparent-brand-b-2" type="submit">LOGIN</button>
                                    </div>
                                    <div class="u-s-m-b-15">
                                        <Link class="gl-link" to="/forgotpassword">Lost Your Password?</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    ) : <></>;
    }

    render() {
        return (
            <>
                    {this.loadLoginContainer()}
                
            </>
        );
    }
}

const ReturningUser = connect(mapStateToProps,mapDispatchToProps)(ReturningUserView);
export default ReturningUser;