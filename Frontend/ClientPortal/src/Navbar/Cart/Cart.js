import React,{Component} from 'react';
import CartItem from './CartItem/CartItem';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

function mapStateToProps(state){
    return {cart:state.cart};
}

class CartList extends Component{
  constructor(props){
    super(props);
    this.loadCartList = this.loadCartList.bind(this);
  }

  state={toggle:false,cart:[]}

  componentDidMount(){
      this.setState({cart:this.props.cart});
  }
  
  componentDidUpdate(){
      if(this.state.cart !== this.props.cart){
          this.setState({cart:this.props.cart});
      }
  }

  loadCartList=()=>{
    if(this.state){
        let data = this.state.cart.map(cartitem=>{
            return <CartItem key={cartitem.id} data={ cartitem } />
          })
        return data;
    }
    else{
        return <></>
    }
      
  }

  onToggle=(e)=>{
    e.preventDefault();
    this.setState({toggle:!this.state.toggle});
  }

  openCloseClass=()=>{
    return this.state.toggle ? "mini-cart open-menu-1" : "mini-cart close-menu-1" ; 
  }

  getNumberOfItem=()=>{
    let data = this.props.cart;
    return data.length;
  }

  render(){
    return(<>
        <li class="has-dropdown">
            <Link class="mini-cart-shop-link" to="/cart">
                <i class="fas fa-shopping-bag"></i>
                <span class="total-item-round">{this.getNumberOfItem()}</span>
            </Link>
        </li>
    </>);
  }
}


const Cart = connect(mapStateToProps)(CartList)

export default Cart;


/**
 * 
 
<span class="js-menu-toggle" onClick={this.onToggle}></span>
<div className={this.openCloseClass()}>

    <div class="mini-product-container gl-scroll u-s-m-b-15">
        
        {this.loadCartList()}

    </div>

    <div class="mini-product-stat">
        <div class="mini-total">
            <span class="subtotal-text">SUBTOTAL</span>
            <span class="subtotal-value">$16</span></div>
        <div class="mini-action">
            <Link class="mini-link btn--e-brand-b-2" to="/checkout">PROCEED TO CHECKOUT</Link>
            <Link class="mini-link btn--e-transparent-secondary-b-2" to="/cart">VIEW CART</Link></div>
    </div>


</div>
 * 
 */