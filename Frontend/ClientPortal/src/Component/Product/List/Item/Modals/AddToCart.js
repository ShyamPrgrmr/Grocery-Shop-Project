import React,{Component} from 'react';

export default class AddToCart extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(<div class="modal fade show" id="add-to-cart" style={{display: "block", paddingRight: 17,backgroundColor:"#000000a8"}} aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-radius modal-shadow">

            <button class="btn dismiss-button fas fa-times" type="button" onClick={this.props.onCloseAllModal} ></button>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <div class="success u-s-m-b-30">
                        
                            <div class="success__text-wrap"><i class="fas fa-check"></i>
                                <span>Item is added successfully!</span>
                            </div>
                        
                            <div class="success__img-wrap">
                                <img class="u-img-fluid" src="images/product/electronic/product1.jpg" alt=""/>
                            </div>
                            
                            <div class="success__info-wrap">
                                <span class="success__name">Beats Bomb Wireless Headphone</span>
                                <span class="success__quantity">Quantity: 1</span>
                                <span class="success__price">$170.00</span>
                            </div>
                        
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="s-option">
                            <span class="s-option__text">1 item (s) in your cart</span>
                            <div class="s-option__link-box">
                                <a class="s-option__link btn--e-white-brand-shadow" onClick={this.props.onCloseAllModal}>CONTINUE SHOPPING</a>
                                <a class="s-option__link btn--e-white-brand-shadow" href="cart.html">VIEW CART</a>
                                <a class="s-option__link btn--e-brand-shadow" href="checkout.html">PROCEED TO CHECKOUT</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>);
  }
}