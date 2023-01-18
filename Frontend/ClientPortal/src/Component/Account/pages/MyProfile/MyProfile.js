import React,{Component} from 'react';
import {connect} from 'react-redux';


 function mapStateToProps(state){
    return {    
        username : state.username,
        email:state.email,
        phone:state.mobile,
        address:state.address
    }
}


class MyProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"User",
            email:"Email@123.com",
            phone:"7788996655",
            birthdate:"22/07/22",
            gender:"Male",
            address:"Near Lokmanya Tilak nagar, Dastur nagar, Amravati"

         };
    }

    componentDidMount=()=>{
        this.setState({...this.props});
    }

    componentDidUpdate=()=>{
        if(this.state.username !== this.props.username){
            this.setState({...this.props});
        }
    }


    render() {
        return (
            <>
            
            <div class="col-lg-9 col-md-12">
                <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div class="dash__pad-2">
                        <h1 class="dash__h1 u-s-m-b-14">My Profile</h1>

                        <span class="dash__text u-s-m-b-30">Look all your info, you could customize your profile.</span>
                        <div class="row">
                            <div class="col-lg-4 u-s-m-b-30">
                                <h2 class="dash__h2 u-s-m-b-8">Full Name</h2>

                                <span class="dash__text">{this.state.username}</span>
                            </div>
                            <div class="col-lg-4 u-s-m-b-30">
                                <h2 class="dash__h2 u-s-m-b-8">E-mail</h2>

                                <span class="dash__text">{this.state.email}</span>

                            </div>
                            <div class="col-lg-4 u-s-m-b-30">
                                <h2 class="dash__h2 u-s-m-b-8">Phone</h2>

                                <span class="dash__text">{this.state.phone}</span>
                            </div>
                            
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div class="u-s-m-b-30">
                                    <h2 class="dash__h2 u-s-m-b-8">Address</h2>
                                    <span class="dash__text">{this.state.address}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                
                                <div class="u-s-m-b-16">
                                    <a class="dash__custom-link btn--e-transparent-brand-b-2" onClick={(e)=>{e.preventDefault(); this.props.loadEditProfile(); }}>Edit Profile</a>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            </>
        );
    }
}

const MyProfile = connect(mapStateToProps)(MyProfileView);

export default MyProfile;