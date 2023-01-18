import React,{Component} from 'react';
import CartScroll from './CartScroll/CartScroll';
import PaymentInformation from './PaymentInformation/PaymentInformation';
import Total from './Total/Total';

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
             <div class="col-lg-6">
                <h1 class="checkout-f__h1">ORDER SUMMARY</h1>
                <div class="o-summary">
                    <div class="o-summary__section u-s-m-b-30">
                        <CartScroll/>
                    </div>

                    <div class="o-summary__section u-s-m-b-30">
                        <Total />
                    </div>

                    <div class="o-summary__section u-s-m-b-30">
                        <PaymentInformation/>
                    </div>

                </div>
             </div>
            </>            
        );
    }
}

export default OrderSummary;