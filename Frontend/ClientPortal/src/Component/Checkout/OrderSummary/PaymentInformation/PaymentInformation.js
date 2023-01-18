import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {clearCart} from './../../../../redux/action/index';

function mapStateToProps(state){
    return {cart : state.cart,deliveryAction:state.deliveryAction,token:state.token,server:state.server }
}

function mapDispatchToProps(dispatch){
    return { clearCart : () => dispatch(clearCart()) }
}

class PaymentInformationView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cart:[],
            deliveryAction:"Delivery",
            status:0
         };
    }

    componentDidMount=()=>{
        this.setState({cart:this.props.cart,deliveryAction:this.props.deliveryAction});
    }


    componentDidUpdate=()=>{
        if(this.state.cart !== this.props.cart || this.state.deliveryAction !=this.props.deliveryAction){
            this.setState({cart:this.props.cart,deliveryAction:this.props.deliveryAction});
        }
    }

    onSubmit=(e)=>{
        e.preventDefault();
        //productid   quantity
        let products = this.state.cart.map( data=>{
            return( { quantity:data.quantity,productid:data.id } );
        } );
        let json = JSON.stringify({
            token:this.props.token,
            products:products,
            ordertype:this.state.deliveryAction
        });

        if(this.state.cart.length !==0){
            fetch(this.props.server+"shop/addorder",{
                headers:{"Content-type":"Application/json","Accept":"Application/json"},
                method:"POST",
                body:json
            }).then(
                data=> { if(data.status===200){  this.setState({status:1}); this.props.clearCart(); } }
            ).catch(e=>{ let err = new Error(e);})
        }else { alert("Your cart is empaty!")}
        
        //API POST
    }

    loadInfo=()=>{
        if(this.state.status === 0 ) return <></>;
        else if(this.state.status===1) return <pre> Order palced Successfully, for more info <span className="dash__link dash__link--brand"> <Link to="/my-account">click here</Link> </span></pre>
    }

    render() {
        return (
            <>
                <div class="o-summary__box">
                    <h1 class="checkout-f__h1">PAYMENT INFORMATION</h1>

                    {this.loadInfo()}

                    <form onSubmit={this.onSubmit}>
                        <button class="btn btn--e-brand-b-2" type="submit">PLACE ORDER</button>
                    </form>
                </div>  
            </>
        );
    }
}


const PaymentInformation = connect(mapStateToProps,mapDispatchToProps)(PaymentInformationView);
export default PaymentInformation;