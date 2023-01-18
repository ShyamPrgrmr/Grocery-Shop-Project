import React,{Component} from 'react';
import {connect} from 'react-redux';
import {removeFromCart} from './../../../../../redux/action/index';


function mapDispatchToProps(dispatch) {
  return {
    removeFromCart: id => dispatch(removeFromCart(id))
  };
}

function mapStateToProps(state){
    return {server:state.server};
}


class CartScrollItemView extends Component {
    constructor(props) {
        super(props);
        this.state = { cartitem:{} };
    }

    onDelete=(e)=>{
        e.preventDefault();
        this.props.removeFromCart(this.state.cartitem.id);
    }

    componentDidMount=()=>{
        this.setState({cartitem:this.props.cartitem});
    }

    componentDidUpdate=()=>{
        if(this.state.cartitem !== this.props.cartitem)
        this.setState({cartitem:this.props.cartitem});
    }

    render() {
        return (
           <>
            <div class="o-card">
                <div class="o-card__flex">

                    <div class="o-card__img-wrap">
                        <img class="u-img-fluid" src={this.props.server+this.state.cartitem.imgsrc} alt="image"/>
                    </div>
                    
                    <div class="o-card__info-wrap">
                        <span class="o-card__name">
                            <a href="#">{this.state.cartitem.name}</a>
                        </span>
                        <span class="o-card__quantity">Quantity x {this.state.cartitem.quantity}</span>
                        <span class="o-card__price">{ parseFloat(this.state.cartitem.price) * parseFloat(this.state.cartitem.quantity) + "Rs." }</span>
                    </div>
                
                </div>
                <a class="o-card__del far fa-trash-alt" onClick={this.onDelete}></a>
            </div>
            
           </> 
        );
    }
}
const CartScrollItem = connect(mapStateToProps,mapDispatchToProps)(CartScrollItemView);
export default CartScrollItem;