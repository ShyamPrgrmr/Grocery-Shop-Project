import React,{Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return({cart:state.cart,orders:state.orders});
}

class CountOrders extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orderPlaced:0,
            orderCancelled:0,
            inCart:0,
            orders:[]
        };

        this.state.orders = this.props.orders;
    }

    componentDidMount=()=>{
        let orders = this.props.orders;
        let orderPlaced=0;
        let orderCancelled=0;
        for(let order of orders){
            if(order.status === -1 || order.status === 1 || order.status === 2 || order.status === 3) orderPlaced++;
            if(order.status === 0) orderCancelled++;
        }

        this.setState({orderPlaced,orderCancelled,orders:this.props.orders});
    }

    componentDidUpdate=()=>{
        if(this.state.orders !== this.state.orders){
            let orders = this.props.orders;
            let orderPlaced=0;
            let orderCancelled=0;
            for(let order of orders){
                if(order.status === -1 || order.status === 1 || order.status === 2) orderPlaced++;
                if(order.status === 0) orderCancelled++;
            }

            this.setState({orderPlaced,orderCancelled,orders:this.props.orders});
        }
    }

    render() {
        return (
            <>
            
            <div class="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                <div class="dash__pad-1">
                    <ul class="dash__w-list">
                        <li>
                            <div class="dash__w-wrap">
                                <span class="dash__w-icon dash__w-icon-style-1"><i class="fas fa-cart-arrow-down"></i></span>
                                <span class="dash__w-text">{this.state.orderPlaced}</span>
                                <span class="dash__w-name">Orders Placed</span></div>
                        </li>
                        <li>
                            <div class="dash__w-wrap">
                                <span class="dash__w-icon dash__w-icon-style-2"><i class="fas fa-times"></i></span>
                                <span class="dash__w-text">{this.state.orderCancelled}</span>
                                <span class="dash__w-name">Cancel Orders</span></div>
                        </li>
                        <li>
                            <div class="dash__w-wrap">
                                <span class="dash__w-icon dash__w-icon-style-3"><i class="far fa-heart"></i></span>
                                <span class="dash__w-text">{this.props.cart.length}</span>
                                <span class="dash__w-name">Cart</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
            </>
        );
    }
}

export default connect(mapStateToProps)(CountOrders);