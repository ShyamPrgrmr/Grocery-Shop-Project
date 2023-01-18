import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addToCart} from './../../redux/action/index';
import ImageScroller from './ImageScroller/ImageScroller';
import './ImageScroller/style.css';
import ProductReview from './ProductReview/ProductReview';
import Stars from './../../Home/ProductList/List/Item/Stars/Stars';
import Header from './../Header/Header';
import ProductList from './../Product/ProductList';


function mapStateToProps(state){
    return {products:state.products,server:state.server};
}

function mapDispatchToProps(dispatch) {
    return {
      addToCart: cartItem => dispatch(addToCart(cartItem))
    };
  }

class ProductDescriptionView extends Component {
    constructor(props) {
        super(props);
        this.state = { product:{},counter:1,images:[],counterIncrement:1,review:{} };
    }

    componentDidMount=()=>{
        let id = this.props.id || this.props.location.search.substring(this.props.location.search.indexOf("=")+1);
        let product = this.props.products.filter(item=>{ if(item.id === id) return true; else return false; })
        

        if(!product[0]){

           fetch(this.props.server + "shop/getsingleproductdata?id="+id).then(
               data=>{
                   if(data.status===200){
                    return data.json();
                   }
               }
           ).then(
               data=>{
                    let images = data.product.images;
                    let length = images.length;
                    while(length<4){
                        images.push(images[0]);
                        length++;
                    }

                   this.setState({product:data.product,images});
               }
           )


        }
        else{
            let images = product[0].images;
            let length = images.length;
            while(length<4){
                images.push(images[0]);
                length++;
            }
            this.setState({product:product[0],images});
        } 
    }

    loadStarAndReview=()=>{
        let review = this.state.product.review;
        
        return review ? (
            <div class="u-s-m-b-15">
                <div class="pd-detail__rating gl-rating-style">
                    <Stars review ={review} nocount="yes"></Stars>
                    <span class="pd-detail__review u-s-m-l-4">
                        <a>{review.count} Reviews</a>
                    </span>
                </div>
            </div>
        ) : <></>;
    }

    loadProductReview=()=>{
        let review = this.state.product.review;
        let name = this.state.product.name;
        let id = this.state.product.id;
        
        return review ? (
            <ProductReview name={name} id={id} review={review} />
        ) : <></>;
    }

    componentDidUpdate=()=>{
        
    }

    counterIncrement=(e)=>{
        e.preventDefault();
        this.setState({counter:this.state.counter+this.state.counterIncrement});
    }

    counterDecrement=(e)=>{
        e.preventDefault();
        if(this.state.counter-this.state.counterIncrement <= 1)
        this.setState({counter:this.state.counter-this.state.counterIncrement});
        else
        this.setState({counter:this.state.counter-this.state.counterIncrement});
    }

    addToCartButtonClicked=(e)=>{
        e.preventDefault();
        let data = this.state.product;
        let cartI = Object.assign({},data,{
        quantity:this.state.counter
        });
        this.props.addToCart(cartI);
    }

    loadProductList=()=>{
        let id = this.state.product.id;
        if(!this.state.product.category) return <></>
        else return <ProductList filter={this.state.product.category} id={id}/>
    }


    loadNewProductDescription=(e)=>{
        e.preventDefault();
    }

    render() {
        return (
            <>
                <div class="u-s-p-t-90 paddingTopBottomZero">
                <div class="container">
                <div class="row">
                    <div className="col-lg-5">
                        <div class="pd u-s-m-b-30" style={{height:"100%"}}>
                            <div className="img-container row" style={{height:"100%"}}>
                                <div className="img-container_1 col-lg-12" style={{height:"100%"}}>
                                    <img src={this.props.server+this.state.images[0]}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-7">

                    <div class="pd-detail">
                        <div>

                            <span class="pd-detail__name">{this.state.product.name}</span></div>
                        <div>
                            <div class="pd-detail__inline">

                                <span class="pd-detail__price">{this.state.product.price} Rs.</span>
                            </div>
                        </div>

                        {this.loadStarAndReview()}

                        <div class="u-s-m-b-15">
                            <div class="pd-detail__inline">
                                <span class="pd-detail__stock">in stock</span>
                            </div>
                        </div>


                        <div class="u-s-m-b-15">
                            <span class="pd-detail__preview-desc">
                                {this.state.product.description}
                            </span>
                        </div>
    
                        <div class="u-s-m-b-15" style={{marginTop:'auto'}}>
                            <div class="pd-detail__form">
                                <div class="pd-detail-inline-2">
                                    <div class="u-s-m-b-15">
                                        <div class="input-counter">

                                            <span class="input-counter__minus fas fa-minus" onClick={this.counterDecrement}></span>

                                            <input class="input-counter__text input-counter--text-primary-style" value={this.state.counter} onChange={e=>{ this.setState({counter:e.target.value}) }}/>

                                            <span class="input-counter__plus fas fa-plus" onClick={this.counterIncrement}></span></div>
                                    </div>
                                    <div class="u-s-m-b-15">

                                        <button class="btn btn--e-brand-b-2" onClick={this.addToCartButtonClicked}>Add to Cart</button></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
                </div>
                </div>

                {this.loadProductReview()}

                <Header title="CUSTOMER ALSO VIEWED"/>
                {this.loadProductList()}
            </>
        );
    }
}


const ProductDescription = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductDescriptionView);
  
  
  export default ProductDescription;