import React,{Component} from 'react';
import AddToCart from './Modals/AddToCart';
import QuickView from './Modals/QuickView';
import {addToCart} from './../../../../redux/action/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Item.css';
import Stars from './Stars/Stars';

function mapDispatchToProps(dispatch) {
  return {
    addToCart: cartItem => dispatch(addToCart(cartItem))
  };
}

function mapStateToProps(state){
  return {server:state.server};
}


class ItemClass extends Component{
  constructor(props){
    super(props);
  }

  state={
      showAddToCart:false,
      showQuickView:false,
      product:{}
  }

  onShowAddTOCart=(e)=>{
    e.preventDefault();
    this.setState({showAddToCart:true});
  }

  componentDidMount=()=>{
    this.setState({product:this.props});
    
  }

  componentDidUpdate=()=>{
    if(this.state.product !== this.props){
      this.setState({product:this.props});
    }
  }

  onShowQuickLook=(e)=>{
    e.preventDefault();
    this.setState({showQuickView:true});
  }

  
  onCloseAllModal=(e)=>{
    this.setState({showAddToCart:false,showQuickView:false});
  }


  showQuickView=()=>{
      return this.state.showQuickView ? (<>
        <QuickView onCloseAllModal={this.onCloseAllModal} addToWishlist={this.addTOWish} addToCart={this.addToCart} data={this.state.product} server={this.props.server}></QuickView></>):<></>;
  }
  
  showCartModal=()=>{
    return this.state.showAddToCart ? (<AddToCart onCloseAllModal={this.onCloseAllModal}></AddToCart>):<></>;
  }

  addToCart=(d)=>{
    let data = this.state.product;
    let cartI = Object.assign({},data,{
      quantity:d
    });
    this.props.addToCart(cartI);
  }

  addTOWish=()=>{

  }

  addToWishList=(e)=>{
      e.preventDefault();
      this.addTOWish();  
  }

  render(){
    return(<>
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item headphone">
            <div class="product-o product-o--hover-on product-o--radius my-change-box">
                <div class="product-o__wrap">
                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img class="aspect__img" src={this.props.server+this.state.product.imgsrc} alt=""/>
                    </a>
                    <div class="product-o__action-wrap">
                        <ul class="product-o__action-list">
                            
                            <li>
                                <a title="Quick View" onClick={this.onShowQuickLook}><i class="fas fa-search-plus"></i></a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                
                <span class="product-o__category">
                    <a href="">{this.state.product.category}</a>
                </span>
                
                <span class="product-o__name">
                    <Link to={"/product-details?id="+this.state.product.id}>{this.state.product.name}</Link>
                    <Stars review = {this.props.review}/>
                </span>
                <span class="product-o__price">{this.state.product.price} Rs.</span>
            </div>
        </div>
        {this.showCartModal()}
        {this.showQuickView()}
    </>);
  }
}


const Item = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemClass);


export default Item;