import React,{Component} from 'react';
import {connect} from 'react-redux';
import { setDeliveryAction } from './../../../../redux/action/index'

function mapStateToProps(state){
    return {cart : state.cart }
}

function mapDispatchToProps(dispatch){
    return { deliveryType : action=>{ dispatch( setDeliveryAction(action) ) } }
}

class TotalView extends Component {
    constructor(props) {
        super(props);
        this.state = { action:"delivery",cart:[],total:0,deliveryToatal:0,grandTotal:0 };
        this.loadGrandTotal = this.loadGrandTotal.bind(this);
    }

    componentDidMount=()=>{
        this.setState({cart:this.props.cart});
    }
    
    componentDidUpdate=()=>{
        if(this.state.cart !== this.props.cart){
            this.setState({cart:this.props.cart});
        }
    }

    loadGrandTotal=()=>{
        
        let deliveryTotal = 0;
        if(this.state.action === 'delivery')
        deliveryTotal =5;
        
        let subtotal = 0;
        this.state.cart.forEach(item=>{ subtotal = subtotal + parseInt(item.quantity) * parseInt(item.price) });

        let grandTotal = subtotal + deliveryTotal;


        return (<table class="o-summary__table">
            <tbody>
                <tr>
                    <td>Delivery Charges</td>
                    <td>{deliveryTotal} Rs.</td>
                </tr>

                <tr>
                    <td>SUBTOTAL</td>
                    <td>{subtotal} Rs.</td>
                </tr>
                
                <tr>
                    <td>GRAND TOTAL</td>
                    <td>{grandTotal} Rs.</td>
                </tr>
            </tbody>
        </table>)
    }

    loadMenu=()=>{
        return this.state.action === 'delivery'?
        <>
            <span class="js-shop-grid-target is-active">Delivery</span>
            <span class="js-shop-list-target" onClick={e=>{e.preventDefault(); this.setState({action:'pickup'}); this.props.deliveryType("Pickup"); }}>Pickup</span>
        </>
        : 
        <>
            <span class="js-shop-grid-target" onClick={e=>{e.preventDefault(); this.setState({action:'delivery'}); this.props.deliveryType("Delivery");  }}>Delivery</span>
            <span class="js-shop-list-target is-active">Pickup</span>
        </>
    }

    render() {
        return (
            <>
                <div class="o-summary__box">

                    <div class="shop-p__tool-style">
                        <div class="tool-style__group u-s-m-b-8">
                            {this.loadMenu()}
                        </div>
                    </div>

                    
                    {this.loadGrandTotal()}
                    
                </div>

            </>
        );
    }
}

const Total = connect(mapStateToProps,mapDispatchToProps)(TotalView);
export default Total;