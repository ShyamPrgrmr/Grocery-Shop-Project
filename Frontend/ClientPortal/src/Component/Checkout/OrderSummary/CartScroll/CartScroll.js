import React,{Component} from 'react';
import { connect } from "react-redux";
import CartScrollItem from './CartScrollItem/CartScrollItem';

function mapStateToProps(state){
    return {cart : state.cart }
}


class CartScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = { cart:[] };
    }

    componentDidMount=()=>{
        this.setState({cart:this.props.cart});
    }

    componentDidUpdate=()=>{
        if(this.state.cart !== this.props.cart){
            this.setState({cart:this.props.cart}); 
        }
    }

    loadCartItem=()=>{
        let data = this.state.cart.map(item=>{
            return <CartScrollItem cartitem={item}/>
        });

        return data;
    }

    render() {
        return (
            <>
                 <div class="o-summary__item-wrap gl-scroll">
                     {this.loadCartItem()}
                 </div>
            </>
        );
    }
}


const CartScroll = connect(mapStateToProps)(CartScrollView);
export default CartScroll;