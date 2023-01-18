import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import SectionIntro from './../../Header/Header';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {server:state.server};
}


class ForgotPassword extends Component{
    constructor(props){
        super(props);
        
    }

    state = {
        email:"",
        isEmailSend:false,
        sendingMail:false
    }

    isEmailed=()=>{
        if(this.state.isEmailSend){
            return <p>Email has been send, Check Your Email.</p>
        }else{
            if(this.state.sendingMail){
                return <button class="btn btn--e-transparent-brand-b-2" disabled>Sending Email...</button>
            }
            else{
                return <button class="btn btn--e-transparent-brand-b-2" onClick={e=>{e.preventDefault(); this.setState({sendingMail:true}); this.getEmail(); }}>GET Email</button>
            }
        }
    }



    getEmail=()=>{
        let email = this.state.email;
        let server = this.props.server;
        let json = JSON.stringify({email});

        fetch(server+"auth/forgotpassword",{
            method:"POST",
            body:json,
            headers:{
                "content-type":"application/json",
                "accept":"application/json"
            }
        }).then(data=>{
            if(data.status===200) { this.setState({isEmailSend:true}) }

        }).catch(e=>{alert( console.log(new Error(e).stack))})
    }

    render(){
        return(<>
            <div class="u-s-p-b-60">

<SectionIntro title="Forgot Password"/>

<div class="section__content">
    <div class="container">
        <div class="row row--center">
            <div class="col-lg-6 col-md-8 u-s-m-b-30">
                <div class="l-f-o">
                    <div class="l-f-o__pad-box">
                        <h1 class="gl-h1">PASSWORD RESET</h1>

                        <span class="gl-text u-s-m-b-30">Enter your email below and we will send you new Password.</span>
                        
                        <div class="l-f-o__form">
                            
                            <div class="u-s-m-b-30">

                                <label class="gl-label" for="reset-email">E-MAIL *</label>
                                <input value={this.state.email} onChange={e=>{ this.setState({email:e.target.value}) }} class="input-text input-text--primary-style" type="text" id="reset-email" placeholder="Enter E-mail"/>    
                            </div>

                            <div class="u-s-m-b-30">

                                {this.isEmailed()}
                            
                            </div>

                            <div class="u-s-m-b-30">
                                <Link class="gl-link" to="/signin">Back to Login</Link>
                            </div>

                        </div>
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

export default connect(mapStateToProps)(ForgotPassword);