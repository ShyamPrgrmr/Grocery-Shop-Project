import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { setlogin } from '../../../redux/action';

function mapStateToProps(state){
    return {isLoggedIn:state.isLoggedIn,username:state.username};
}

function mapDispatchToProps(dispatch) {
    return { setLogin : loginData =>  dispatch( setlogin(loginData) )}
}

class ReturningUserView extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn:false };
    }

    componentDidMount=()=>{
        this.setState({username:this.props.username,isLoggedIn:this.props.isLoggedIn});
    }

    componentDidUpdate=()=>{
        if(this.props.isLoggedIn != this.state.isLoggedIn){
            this.setState({username:this.props.username,isLoggedIn:this.props.isLoggedIn});
        }
    }

    loadLoginContainer=()=>{

        return !this.state.isLoggedIn ? (
            <div id="checkout-msg-group">
                <div class="msg u-s-m-b-30">  
                    <div >
                        <div class="l-f u-s-m-b-16">
                            <span class="gl-text u-s-m-b-16">You are not logged in!, please log in.</span>
                            <form class="l-f__form">
                                <div class="gl-inline">
                                    <div class="u-s-m-b-15">
                                        <label class="gl-label" for="login-email">E-MAIL *</label>
                                        <input class="input-text input-text--primary-style" type="text" id="login-email" placeholder="Enter E-mail"/>
                                    </div>
                                    <div class="u-s-m-b-15">
                                        <label class="gl-label" for="login-password">PASSWORD *</label>
                                        <input class="input-text input-text--primary-style" type="text" id="login-password" placeholder="Enter Password"/>
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