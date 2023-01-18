import React,{Component} from 'react';
import {connect} from 'react-redux';
import {updateUserData} from './../../../../redux/action/index'

function mapStateToProps(state){
    return {
        fname:state.fname,
        lname:state.lname,
        email:state.email,
        address:state.address,
        mobile:state.mobile,
        server:state.server,
        token:state.token
    };
}

function mapDispatchToProps(dispatch){
    return {updateUserData : data=>{ dispatch( updateUserData(data)); }}
}


class EditProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fname:"Shyam",
            lname:"Pradhan",
            email:"123@123.com",
            password:"",
            address:"Near Gandhi nagar, Amravati",
            phone:"4433443322",
            oldpassword:""
         };
    }

    componentDidMount=()=>{
        this.setState(
            {
                fname:this.props.fname,
                lname:this.props.lname,
                email:this.props.email,
                address:this.props.address,
                phone:this.props.mobile
            }
        )
    }


    onChange=(e)=>{
        e.preventDefault()
        let val = e.target.value;
        let name = e.target.name;
        this.setState({ [name] : val});
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const json = JSON.stringify({
            name:{
                firstname:this.state.fname,
                lastname:this.state.lname
            },
            mobile:{
                mob_1:this.state.phone,
                mob_2:this.state.phone
            },
            address:{
                route:this.state.address,
                pincode:444601
            },
            token:this.props.token       
        });

        fetch(this.props.server+"user/updateuserdata",{
            headers:{
                "Accept":"Application/json",
                "Content-type":"Application/json"
            },
            method:"PUT",
            body:json
        }).then(
            data=>{
                if(data.status === 200){
                    this.props.updateUserData(this.state);
                    return data.json();
                }
            }
        ).then(
            data=>{
                alert("Data updated!");
            }
        ).catch(e=>{alert(e)});

    }

    onSubmitChangePassword=(e)=>{
        e.preventDefault();
        let password = this.state.oldpassword;
        let json = JSON.stringify({password,token:this.props.token});
        fetch(this.props.server+"auth/changepassword",
        {
            headers:{
                "Accept":"Application/json",
                "Content-type":"Application/json"
            },
            method:"POST",
            body:json
        }).then(data=>{ if(data.status===200) alert("Password Changed Successfully!");}).catch(e=>{
            alert(e);
        })
    }


    render() {
        return (
            <>
                <div class="col-lg-9 col-md-12">
                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                        <div class="dash__pad-2">
                            <h1 class="dash__h1 u-s-m-b-14">Edit Profile</h1>

                            <span class="dash__text u-s-m-b-30">Looks like you haven't update your profile</span>
                            
                            <div class="row">
                                <div class="col-lg-12">
                                    <form class="dash-edit-p" onSubmit={this.onSubmit}>
                                        <div class="gl-inline">
                                            <div class="u-s-m-b-30">

                                                <label class="gl-label" for="reg-fname">FIRST NAME *</label>

                                                <input class="input-text input-text--primary-style" type="text" name="fname" placeholder="First name" value={this.state.fname} onChange={this.onChange}/></div>
                                            <div class="u-s-m-b-30">

                                                <label class="gl-label" for="reg-lname">LAST NAME *</label>

                                                <input class="input-text input-text--primary-style" type="text" name="lname" placeholder="Last name" value={this.state.lname} onChange={this.onChange}/></div>
                                        </div>

                                        


                                        <div class="gl-inline">
                                            <div class="u-s-m-b-30">
                                                <h2 class="dash__h2 u-s-m-b-8">E-mail</h2>

                                                <span class="dash__text">{this.state.email}</span>
                                                
                                            </div>
                                            <div class="u-s-m-b-30">
                                                <h2 class="dash__h2 u-s-m-b-8">Phone</h2>
                                                <input class="input-text input-text--primary-style" type="number" name="phone" value={this.state.phone} onChange={this.onChange} placeholder="Phone"/>
                                            </div>
                                        </div>

                                        <div className="gl-inline">
                                            <div class="u-s-m-b-30">
                                                <h2 class="dash__h2 u-s-m-b-8">Address</h2>
                                                <input class="input-text input-text--primary-style" type="text" name="address" value={this.state.address} onChange={this.onChange} placeholder="Address"/>
                                            </div>
                                        </div>

                                        <button class="btn btn--e-brand-b-2" type="submit">SAVE</button>
                                    </form>
                                </div>
                            </div>


                            <br/>
                            <h1 class="dash__h1 u-s-m-b-14">Change Your Password</h1>
                            <div class="row">
                                <div class="col-lg-12">
                                    <form class="dash-edit-p" onSubmit={this.onSubmitChangePassword}>
                                        
                                        <div class="gl-inline">
                                            <div class="u-s-m-b-30">

                                                <label class="gl-label" for="reg-fname">New Password *</label>

                                                <input class="input-text input-text--primary-style" type="text" name="oldpassword" placeholder="Enter New Password" value={this.state.oldpassword} onChange={this.onChange}/>
                                            </div>
                                        </div>

                                        <button class="btn btn--e-brand-b-2" type="submit">CHANGE PASSWORD</button>
                                    </form>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </>
        );
    }
}


const EditProfile = connect(mapStateToProps,mapDispatchToProps)(EditProfileView);
export default EditProfile;