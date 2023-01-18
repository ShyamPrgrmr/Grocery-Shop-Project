import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import SectionIntro from '../Header/Header';
import CartItem from './CartItem/CartItem';
import { updateCart } from './../../redux/action/index';
import RouteBox from './RouteBox/RouteBox';
import GrandTotal from './GrandTotal/GrandTotal';

function mapStateToProps(state){
    return {cart : state.cart }
}

function mapDispatchToProps(dispatch){
    return { updateCart : cart => dispatch( updateCart(cart) )  }
}

class CartView extends Component{
    constructor(props){
        super(props);
    }

    state={
        cart:[],
        isCartUpdated:false,
        total:0.0
    }

    componentDidMount=()=>{
        this.setState({cart:this.props.cart});
    }
    
    componentDidUpdate=()=>{
        if(this.state.cart !== this.props.cart){
            this.setState({cart:this.props.cart});
        }
    }

    getCartItemList=()=>{
        let total = 0;
        let data = this.state.cart.map(
            item=>{
                return <CartItem cartitem={item} updateCartItem={this.updateCartItem}/>
            }
        );
        return data;
    }

    getContent=()=>{
        return this.state.cart.length === 0 ? 
            <div class="empty">
                <div class="empty__wrap">
                    <span class="empty__big-text">EMPTY</span>
                    <span class="empty__text-1">No items found on your cart.</span>
                    <Link class="empty__redirect-link btn--e-brand" to="/">CONTINUE SHOPPING</Link>
                </div>
            </div>
            : 
            <>
                <div class="table-responsive">
                    <table class="table-p">
                        <tbody>
                            {this.getCartItemList()}
                        </tbody>
                    </table>
                </div>
            </>
    }

    updateCart=()=>{
        this.props.updateCart(this.state.cart);
        this.setState({isCartUpdated:false});
    }

    updateCartItem=(cartItem)=>{
        let updatedCart = this.state.cart.map(
            item => {
                return item.id === cartItem.id ? cartItem : item;
            } 
        );

        this.setState({cart:updatedCart,isCartUpdated:true} );

    }

    getRouterBox=()=>{
        if(this.state.cart.length !== 0){
            return <> <RouteBox updateCart={this.updateCart} isCartUpdated={ this.state.isCartUpdated }/></>
        }
        else return <></>
    }

    getGrandTotal=()=>{
        let total = 0;
        this.state.cart.forEach(item=>{ total = total + parseInt(item.quantity) * parseInt(item.price) });

        if(this.state.cart.length !== 0){
            return <> <GrandTotal total={total}/></>
        }
        else return <></>
    }

    render(){
        return(
        <>
            <SectionIntro title="Shoping Cart"/>
            <div class="section__content">
                <div class="container">
                    <div class="row">
                        {
                            this.getRouterBox()
                        }
                        
                        <div class="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                            {
                                this.getContent()
                            }
                        </div>

                        
                    </div>
                    <div className="row"  >
                        {
                            this.getGrandTotal()
                        }
                    </div>
                </div>
            </div>

            
        </>
        );
    }
}  

const Cart = connect(mapStateToProps,mapDispatchToProps)(CartView);

export default Cart;