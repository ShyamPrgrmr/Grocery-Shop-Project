import React,{Component} from 'react';
import { connect } from 'react-redux';
import DeliveryInformation from './DeliveryInformation/DeliveryInformation';
import OrderSummary from './OrderSummary/OrderSummary';
import ReturningUser from './../Auth/ReturningUser/ReturningUser';

function mapStateToProps(state){
    return {isLoggedIn:state.isLoggedIn,username:state.username,cart:state.cart,deliveryAction:state.deliveryAction};
}

class CheckoutView extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn:false,cart:[],deliveryAction:"" };
    }


    componentDidMount=()=>{
        this.setState({isLoggedIn:this.props.isLoggedIn,cart:this.props.cart})
    }

    componentDidUpdate=()=>{
        if(this.state.isLoggedIn != this.props.isLoggedIn || this.state.cart !== this.props.cart || this.state.deliveryAction !=this.props.deliveryAction){
            this.setState({isLoggedIn:this.props.isLoggedIn,cart:this.props.cart,deliveryAction:this.props.deliveryAction});
        }
    }

    loadContent=()=>{
        //please remove ! after work from next statement

        return this.state.isLoggedIn ?(
        <>
            <div class="u-s-p-b-60">
                <div class="section__content">
                    <div class="container">
                        <div class="checkout-f">
                            <div class="row">
                                <DeliveryInformation/>
                                <OrderSummary/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        ):
        (<>

        </>);
    }

    render() {
        return (
            <>
            
            <div class="u-s-p-b-60">
                <div class="section__content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <ReturningUser/>
                                {this.loadContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            </>
        );
    }
}

const Checkout = connect(mapStateToProps)(CheckoutView);
export default Checkout;