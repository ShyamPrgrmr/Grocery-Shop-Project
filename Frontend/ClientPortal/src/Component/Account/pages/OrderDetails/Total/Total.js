import React,{Component} from 'react';


class Total extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            subtotal:0,
            deliverytype:"Delivery"
         };
    }

    componentDidMount=()=>{
        this.setState({
            deliverytype:this.props.deliverytype,
            subtotal: parseFloat(this.props.subtotal)
        });
    }

    componentDidUpdate=()=>{
        if( parseFloat(this.props.subtotal) != this.state.subtotal)
        this.setState({
            deliverytype:this.props.deliverytype,
            subtotal: parseFloat(this.props.subtotal)
        });
    }

    loadDeliveryCharges=()=>{
        return this.state.deliverytype === "Delivery" ? 5 : 0 ;
    }

    loadTotal=()=>{
        return this.state.deliverytype === "Delivery" ? (parseFloat(this.state.subtotal)+5) : parseFloat(this.state.subtotal); 
    }

    render() {
        return (
            <div className="row">
                <div class="col-lg-12">
                <div class="dash__box dash__box--bg-white dash__box--shadow u-h-100">
                    <div class="dash__pad-3">
                        <h2 class="dash__h2 u-s-m-b-8">Total Summary</h2>
                        <div class="dash-l-r u-s-m-b-8">
                            <div class="manage-o__text-2 u-c-secondary">Subtotal</div>
                            <div class="manage-o__text-2 u-c-secondary">{this.state.subtotal} Rs.</div>
                        </div>
                        <div class="dash-l-r u-s-m-b-8">
                            <div class="manage-o__text-2 u-c-secondary">Delivery Charges</div>
                            <div class="manage-o__text-2 u-c-secondary">{this.loadDeliveryCharges()} Rs.</div>
                        </div>
                        <div class="dash-l-r u-s-m-b-8">
                            <div class="manage-o__text-2 u-c-secondary">Total</div>
                            <div class="manage-o__text-2 u-c-secondary">{this.loadTotal()} Rs.</div>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Total;