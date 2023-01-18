import React,{Component} from 'react';
import {connect} from 'react-redux';
import {removeFromCart} from './../../../redux/action/index';


function mapDispatchToProps(dispatch) {
  return {
    removeFromCart: id => dispatch(removeFromCart(id))
  };
}

function mapStateToProps(state){
    return {
        server:state.server
    }
}


class CartItemView extends Component {
    state = { 
        cartitem : {},
        counter:0,
        counterIncrement:1
    }

    componentDidMount=()=>{
        this.setState({cartitem : this.props.cartitem,counter : this.props.cartitem.quantity });
    }

    componentDidUpdate=()=>{
        if(this.state.cartitem !== this.props.cartitem){
            this.setState({cartitem : this.props.cartitem});
        }
    }

    newState=()=>{
        let cartItem = this.state.cartitem;
        cartItem.quantity = this.state.counter;
        this.setState({cartitem:cartItem});
        this.props.updateCartItem(cartItem);
    }

    counterIncrement=(e)=>{
        e.preventDefault();
        this.setState({counter:this.state.counter+this.state.counterIncrement},this.newState);
    }

    counterDecrement=(e)=>{
        e.preventDefault();
        if(this.state.counter-this.state.counterIncrement <= 0)
         this.setState({counter:this.state.counter-this.state.counterIncrement},this.newState);
        else
         this.setState({counter:this.state.counter-this.state.counterIncrement},this.newState);
    }

    onRemove=(e)=>{
        e.preventDefault();
        this.props.removeFromCart(this.state.cartitem.id);
    }



    render() {
        return (
            <>
                <tr>
                    <td>
                        <div class="table-p__box">
                            <div class="table-p__img-wrap">
                                <img class="u-img-fluid" src={this.props.server+this.state.cartitem.imgsrc} alt=""/>
                            </div>
                            <div class="table-p__info">
                                <span class="table-p__name">
                                    <a href="product-detail.html">{this.state.cartitem.name}</a>
                                </span>
                                <span class="table-p__category">
                                    <a href="shop-side-version-2.html">{this.state.cartitem.category}</a>
                                </span>
                                <ul class="table-p__variant-list">
                                    <li>{this.state.cartitem.description}</li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="table-p__price">{ parseFloat(this.state.cartitem.price) * parseFloat(this.state.cartitem.quantity) + "Rs."}</span>
                    </td>
                    <td>
                        <div class="table-p__input-counter-wrap">
                            <div class="input-counter">
                                <span class="input-counter__minus fas fa-minus" onClick={this.counterDecrement}></span>
                                <input class="input-counter__text input-counter--text-primary-style" type="text" value={this.state.counter}/>
                                <span class="input-counter__plus fas fa-plus" onClick={this.counterIncrement}></span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="table-p__del-wrap">
                            <a class="far fa-trash-alt table-p__delete-link" onClick={this.onRemove}></a>
                        </div>
                    </td>
            </tr>
            </>
        );
    }
}

const CartItem = connect(mapStateToProps,mapDispatchToProps)(CartItemView);

export default CartItem;