import React,{Component} from 'react';
import {connect} from 'react-redux';
import {clearCart} from './../../../redux/action/index';
import {Link} from 'react-router-dom';

function mapDispatchToProps(dispatch){
    return { clearCart : () => dispatch(clearCart()) }
}

class RouteBoxView extends Component {
    constructor(props) {
        super(props);
        this.state = { isCartUpdated : false  };
    }

    onClearCart=(e)=>{    
        e.preventDefault();
        this.props.clearCart();
    }

    componentDidMount=()=>{
        this.setState({isCartUpdated:this.props.isCartUpdated});
    }

    componentDidUpdate=()=>{
        if(this.state.isCartUpdated !== this.props.isCartUpdated){
            this.setState({isCartUpdated:this.props.isCartUpdated});
        }
    }

    onUpdateCart=(e)=>{
        e.preventDefault();
        if(this.state.isCartUpdated) 
            this.props.updateCart();
    }

    render() {
        return (
            <>
                <div class="col-lg-12" style={{marginBottom:"1.875rem"}}>
                    <div class="route-box">
                        <div class="route-box__g1">
                            <Link class="route-box__link" to="/">
                                <i class="fas fa-long-arrow-alt-left"></i>
                                <span>CONTINUE SHOPPING</span>
                            </Link>
                        </div>
                        <div class="route-box__g2">
                            
                            <a class="route-box__link" onClick={this.onClearCart}>
                                <i class="fas fa-trash"></i>
                                <span>CLEAR CART</span>
                            </a>

                            <a class="route-box__link" onClick={this.onUpdateCart}>
                                <i class="fas fa-sync"></i>
                                <span>UPDATE CART</span>
                            </a>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const RouteBox = connect(null,mapDispatchToProps)(RouteBoxView);
export default RouteBox;