import React,{Component} from 'react';
import './OrderItem.css';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {server:state.server}
}

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:"",
            name:"",
            quantity:0,
            price:0,
            imgsrc:""
         };
    }

    componentDidMount=()=>{

        let id = new String(this.props.data.productid).toUpperCase().toString();
        let quantity = this.props.data.quantity;
        let price = this.props.data.price;
        let imgsrc = this.props.server + this.props.data.imgsrc[0];
        let name = this.props.data.name;
        this.setState({name,imgsrc,price,quantity,id});
    }


    render() {
        return (
            <>
                <div class="manage-o__description margin-top margin-1rem-top">
                    <div class="description__container">
                        <div class="description__img-wrap" style={{display:"flex"}}>

                            <img class="u-img-fluid" src={this.state.imgsrc} alt="image"/></div>
                        <div class="description-title">{this.state.name}</div>
                    </div>
                    <div class="description__info-wrap">

                        
                        <div>
                            <span class="manage-o__text-2 u-c-silver">Quantity: {"  "} 
                                <span class="manage-o__text-2 u-c-secondary">{this.state.quantity}</span>
                            </span>
                        </div>
                        <div>
                            <span class="manage-o__text-2 u-c-silver">Price: {"  "}
                                <span class="manage-o__text-2 u-c-secondary">{ parseFloat(this.state.price)} Rs.</span>
                            </span>
                        </div>

                    </div>
                </div>
            
            
            </>
        );
    }
}

export default connect(mapStateToProps)(OrderItem);