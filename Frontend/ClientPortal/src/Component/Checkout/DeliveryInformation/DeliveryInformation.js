import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state){
    return {
        fname:state.fname,
        lname:state.lname,
        email:state.email,
        address:state.address,
        phone:state.mobile,
    };
}

class DeliveryInformationView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            billingfname:"",
            billinglname:"",
            billingemail:"",
            billingphone:"",
            billingstreet:"",
            billingsteetoptional:"",
        };
    }

    componentDidMount=()=>{
        this.setState({
            billingfname:this.props.fname,
            billinglname:this.props.lname,
            billingemail:this.props.email,
            billingphone:this.props.phone,
            billingstreet:this.props.address
        });
    }


    render() {
        return (
            <>
            <div class="col-lg-6">
                <h1 class="checkout-f__h1">DELIVERY INFORMATION</h1>
                <div class="checkout-f__delivery">
                    <div class="u-s-m-b-30">

                        <div class="gl-inline">
                            <div class="u-s-m-b-15">
                                <label class="gl-label" for="billing-fname">FIRST NAME *</label>
                                <input class="input-text input-text--primary-style" type="text" value={this.state.billingfname} required name="billingfname" placeholder="First name"/>
                            </div>
                            <div class="u-s-m-b-15">
                                <label class="gl-label" for="billing-lname">LAST NAME *</label>
                                <input class="input-text input-text--primary-style" placeholder="Last name" value={this.state.billinglname} type="text" required name="billinglname"/>
                            </div>
                        </div>
                        
                        <div class="u-s-m-b-15">
                            <label class="gl-label" for="billing-email">E-MAIL *</label>
                            <input class="input-text input-text--primary-style" type="text" required name="billingemail" value={this.state.billingemail} placeholder="Email address"/>
                        </div>
                        
                        <div class="u-s-m-b-15">
                            <label class="gl-label" for="billing-phone">Mobile *</label>
                            <input class="input-text input-text--primary-style" type="text" required name="billingphone" value={this.state.billingphone} placeholder="Mobile number"/>
                        </div>
                        
                        <div class="u-s-m-b-15">
                            <label class="gl-label" for="billing-street">ADDRESS *</label>
                            <input class="input-text input-text--primary-style" type="text" required value={this.state.billingstreet} name="billingstreet" placeholder="House name and street name"/>
                        </div>

                        <div class="u-s-m-b-15" style={{marginTop:"30px"}}>
                            <Link class="btn btn--e-brand-b-2" to="/my-account" >Change Address Details</Link>
                        </div>



                    </div>
                </div>
            </div>
            </>
        );
    }
}

const DeliveryInformation = connect(mapStateToProps)(DeliveryInformationView);

export default DeliveryInformation;