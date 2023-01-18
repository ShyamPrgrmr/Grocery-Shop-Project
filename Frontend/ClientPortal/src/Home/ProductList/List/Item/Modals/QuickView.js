import React,{Component} from 'react';
import Stars from '../Stars/Stars';
import './style.css';

export default class QuickView extends Component{
  constructor(props){
    super(props);
  }
  
  state={
      counter:1,
      counterIncrement:1
  };

  componentDidMount=()=>{
    document.getElementById("quick-look").focus();

  }

  counterIncrement=(e)=>{
    e.preventDefault();
    this.setState({counter:this.state.counter+this.state.counterIncrement});
  }

  counterDecrement=(e)=>{
    e.preventDefault();
    if(this.state.counter-this.state.counterIncrement <= 0)
    this.setState({counter:this.state.counter-this.state.counterIncrement});
    else
    this.setState({counter:this.state.counter-this.state.counterIncrement});
  }

  addToCart=(e)=>{
      e.preventDefault();
      this.props.addToCart(this.state.counter);
      this.props.onCloseAllModal();
  }
  

  render(){
    return(
    <>
    <div class="modal fade show" id="quick-look" style={{display: "block", paddingRight: 17,backgroundColor:"#000000a8"}} aria-modal="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content modal--shadow">
                <button class="btn dismiss-button fas fa-times" onClick={this.props.onCloseAllModal} type="button" data-dismiss="modal"></button>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-5">
                            <div className="img-container">
                                <img class="u-img-fluid" src={this.props.server+this.props.data.imgsrc} alt="image"/>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="pd-detail">
                                <div>
                                    <span class="pd-detail__name">{this.props.data.name}</span>
                                </div>
                                
                                
                                
                                <div>
                                    <div class="pd-detail__inline">
                                        <span class="pd-detail__price">{this.props.data.price} Rs.</span>
                                    </div>
                                </div>
                                <div class="u-s-m-b-15">
                                    <div class="pd-detail__inline">
                                        <span class="pd-detail__stock">In stock</span>
                                     </div>
                                </div>
                                
                                <div>
                                    <Stars review = {this.props.data.review}></Stars>
                                </div>

                                <div class="u-s-m-b-15">
                                    <span class="pd-detail__preview-desc">    
                                       {this.props.data.description}
                                    </span>
                                </div>
                                
                                <div class="u-s-m-b-15">
                                    <div class="pd-detail__form">
                                        <div class="pd-detail-inline-2">
                                            <div class="u-s-m-b-15">
                                                <div class="input-counter">
                                                    <span class="input-counter__minus fas fa-minus" onClick={this.counterDecrement}></span>
                                                    <input class="input-counter__text input-counter--text-primary-style" type="text" value={this.state.counter}/>
                                                    <span class="input-counter__plus fas fa-plus" onClick={this.counterIncrement}></span></div>
                                            </div>
                                            <div class="u-s-m-b-15">
                                                <button class="btn btn--e-brand-b-2" onClick={this.addToCart}>Add to Cart</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>)
  }
}
