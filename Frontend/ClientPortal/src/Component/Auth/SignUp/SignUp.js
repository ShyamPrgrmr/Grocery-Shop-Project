import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import SectionIntro from './../../Header/Header';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {server:state.server};
}


class SignUpView extends Component{
    
    constructor(props){
        super(props);
        
    }

    onSubmit=(e)=>{
        e.preventDefault();

        let json = JSON.stringify(
            {
                fname:this.state.fname,
                lname:this.state.lname,
                email:this.state.email,
                phone:this.state.phone,
                bdate:{
                    day:this.state.bday,
                    month:this.state.bmonth,
                    year:this.state.byear
                },
                address:this.state.address,
                gender:this.state.gender,
                password:this.state.password,
                checktoken:this.state.temptoken
            }
        );

        fetch(this.props.server+"user/signup",{
            method:"POST",
            headers:{
                "content-type":"Application/json",
                "Accept":"Application/json"
            },
            body:json
        })
        .then(data=>{
            if(data.status !== 409)
            return data.json()
            else {throw new Error("User already exist");}
        })
        .then(userdata=>{
            alert("Signed Up Successful!");
        }).catch(err=>{
            let e = new Error(err);
            alert(e.message); 
        })
    }

    onChange=(e)=>{
        e.preventDefault()
        let val = e.target.value;
        let name = e.target.name;
        this.setState({ [name] : val});
    }

    state={
        fname:"",
        lname:"",
        email:"",
        phone:"",
        gender:"Male",
        bmonth:"1",
        bday:1,
        byear:2002,
        password:"",
        address:"",
        getOTP:false,
        otp:"",
        temptoken:0,
        otpconfirmed:false,
        btndisabled:false
    }

    getMonth=()=>{
        return(<>
            <option value="1" selected>January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">Octomber</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </>);
    }

    getYears=()=>{
        let year = new Date().getFullYear();
        let pryear = year - 80;
        let ret = [];
        for(let i=pryear;i< (year-16);i++){
            ret.push(i);
        }
        let data = ret.map(y=>{
            return <option value={""+y}>{y}</option>
        });
        return data;
    }

    DaysInMonth=()=>{
        return new Date( parseInt(this.state.byear),parseInt(this.state.bmonth),0 ).getDate();
    }

    getDays=()=>{
        let num = this.DaysInMonth(); 
        
        let arr = [];
        for(let i=1;i<=num;i++) arr.push(i);
        let data = arr.map(day=>{
            return <option value={""+day}>{day}</option>;
        });
        return data;
    }

    checkOTP=(e)=>{
        e.preventDefault();
        let token = this.state.temptoken;
        let otp = this.state.otp;
        let json = JSON.stringify({token,otp});
        fetch(this.props.server+"auth/checkotp",{
            method:"POST",
            body:json,
            headers:{
                "content-type":"application/json",
                "accept":"application/json"
            }
        }).then(
            data=>{
                if(data.status===200){
                    this.setState({otpconfirmed:true});
                }else{
                    alert("Problem in checking otp");
                }
            }
        ).catch(e=>{
            alert(new Error(e).message);
        })
    }

    sendOTP=()=>{
        

        let token = "TOKEN"+new String((Math.random()*10000000)).substring(0,6)+new Date().toISOString().replace("-","").replace("-","").replace(":","").replace(":","").replace(".","");
        
        let email = this.state.email;

        let json = JSON.stringify({
            email,token
        });

        fetch(this.props.server+"auth/getotp",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "accept":"application/json"
            },
            body:json
        }).then(data=>{
            if(data.status===200){this.setState({getOTP:true,temptoken:token});}
            else alert("Error is occured while sending mail. please try again!");
        }).catch(e=>{
            let err = new Error(e);
            alert(err);
        })
    
    }

    getOtpBtn=()=>{
        if(!this.state.btndisabled){
            return <button className="btn btn--e-transparent-brand-b-2" onClick={e=>{e.preventDefault(); this.setState({btndisabled:true});  this.sendOTP(); }}>Get OTP.</button>
        }
        else{
            return <button className="btn btn--e-transparent-brand-b-2" disabled>Sending OTP...</button>
        }
    }

    getConfirmBtn=()=>{
        if(this.state.otpconfirmed){
            return <button className="btn btn--e-transparent-brand-b-2" disabled>OTP Confirmed.</button>
        }else{
            return <button className="btn btn--e-transparent-brand-b-2" onClick={this.checkOTP}>Confirm</button>
        }
    }


    getOTP=()=>{
        return !this.state.getOTP ?
        (<><br/>
            <div className="row" style={{marginTop:"10px"}}>
                <div className="col-md-4">
                    {
                        this.getOtpBtn()
                    }
                    
                
                </div>
            </div>
        </>):(<>
            <div className="row" style={{marginTop:"10px"}}>
                <div className="col-md-3">
                    <input type="text" className="input-text input-text--primary-style" placeholder="ENTER OTP" value={this.state.otp} onChange={e=>{this.setState({otp:e.target.value})}}></input>
                </div>

                <div className="col-md-3">
                
                    {this.getConfirmBtn()}

                </div>
                
                <div className="col-md-6">
                    <p>Please check spam in case not received the mail.</p>
                </div>
            </div>
            
        </>)
    }

    render(){
        return(<>    
    <div class="u-s-p-b-60">

    <SectionIntro title="Create An Account"/>
        
        <div class="section__content">
            <div class="container">
                <div class="row row--center">
                    <div class="col-lg-6 col-md-8 u-s-m-b-30">
                        <div class="l-f-o">
                            <div class="l-f-o__pad-box">
                                <h1 class="gl-h1">PERSONAL INFORMATION</h1>
                                <form class="l-f-o__form" onSubmit={this.onSubmit}>
                                    
                                    <div class="u-s-m-b-30">
                                        <label class="gl-label" for="reg-fname">FIRST NAME *</label>
                                        <input class="input-text input-text--primary-style" type="text" onChange={this.onChange} value={this.state.fname} name="fname" placeholder="First Name" required/>
                                    </div>
                                    
                                    <div class="u-s-m-b-30">
                                        <label class="gl-label" for="reg-lname">LAST NAME *</label>
                                        <input class="input-text input-text--primary-style" type="text" onChange={this.onChange} value={this.state.lname} name="lname" placeholder="Last Name" required/>
                                    </div>

                                    <div class="gl-inline">
                                        <div class="u-s-m-b-30">
                                            <span class="gl-label">BIRTHDAY</span>
                                            <div class="gl-dob">
                                                <select class="select-box select-box--primary-style" onChange={this.onChange} value={this.state.bmonth} name="bmonth" required>
                                                    <option selected disabled>Month</option>
                                                    {this.getMonth()}
                                                </select>
                                                <select onChange={this.onChange} value={this.state.bday} name="bday" class="select-box select-box--primary-style">
                                                    <option selected disabled>Day</option>
                                                    {this.getDays()}
                                                </select>
                                                <select onChange={this.onChange} value={this.state.byear} name="byear" class="select-box select-box--primary-style">
                                                    <option selected disabled>Year</option>
                                                    {this.getYears()}
                                                </select></div>
                                        </div>

                                        <div class="u-s-m-b-30">
                                            <label class="gl-label" for="gender">GENDER</label>
                                            <select class="select-box select-box--primary-style u-w-100" onChange={this.onChange} value={this.state.gender} name="gender" id="gender" required>
                                                <option selected>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div class="u-s-m-b-30">
                                        
                                        <label class="gl-label" for="reg-email">E-MAIL *</label>
                                        <input class="input-text input-text--primary-style" onChange={this.onChange} value={this.state.email} name="email" type="email" autoComplet="on" id="reg-email" placeholder="Enter E-mail" required/>
                                        
                                        {this.getOTP()}
                                   
                                    </div>

                                    <div class="u-s-m-b-30">
                                        <label class="gl-label" for="reg-email">Phone *</label>
                                        <input class="input-text input-text--primary-style" onChange={this.onChange} value={this.state.phone} name="phone" type="number" autoComplet="on" placeholder="Enter Phone number" required/>
                                    </div>

                                    <div class="u-s-m-b-30">
                                        <label class="gl-label" for="reg-password">Address *</label>
                                        <input class="input-text input-text--primary-style" onChange={this.onChange} value={this.state.address} name="address" type="address"  placeholder="Enter Delivery Address" required/>
                                    </div>

                                    <div class="u-s-m-b-30">
                                        <label class="gl-label" for="reg-password">PASSWORD *</label>
                                        <input class="input-text input-text--primary-style" onChange={this.onChange} value={this.state.password} name="password" type="password"  placeholder="Enter Password" required/>
                                    </div>

                                    <div class="u-s-m-b-15">
                                        <button class="btn btn--e-transparent-brand-b-2" type="submit">CREATE</button>
                                    </div>

                                    <Link class="gl-link" to="/signin">Return to Signin</Link>
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

const SignUp = connect(mapStateToProps)(SignUpView);
export default SignUp;