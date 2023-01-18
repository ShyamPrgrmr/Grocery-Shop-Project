import React,{Component} from 'react';
import OrderItem from './OrderItem/OrderItem';
import Timeline from './Timeline/Timeline';
import Total from './Total/Total';

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            order:{}
        };
    }

    loadList=()=>{
        if(!this.state.order.products) return <></>;
        let data = this.state.order.products.map(
            product=>{
                return <OrderItem data={product} key={product.productid}></OrderItem>
            }
        );

        return data;
    }

    componentDidMount(){
        this.setState({order:this.props.data});
    }

    render() {
        return (
            <>
                <div class="col-lg-9 col-md-12">
                    <h1 class="dash__h1 u-s-m-b-30">Order Details</h1>
                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                        <div class="dash__pad-2">
                            <div class="dash-l-r">
                                <div>
                                    <div class="manage-o__text-2 u-c-secondary">ID: { new String(this.state.order._id).toUpperCase().toString() }</div>
                                    <div class="manage-o__text u-c-silver">Placed on {this.state.order.date}</div>
                                </div>
                                <div>
                                    <div class="manage-o__text-2 u-c-silver">Total:
                                        <span class="manage-o__text-2 u-c-secondary">{this.state.order.totalprice} Rs.</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                        <div class="dash__pad-2">
                            <div class="manage-o">
                                <div class="manage-o__header u-s-m-b-30">
                                    <div class="manage-o__icon"><i class="fas fa-box u-s-m-r-5"></i>

                                        <span class="manage-o__text">Order</span></div>
                                </div>
                                <div class="dash-l-r"></div>
                                
                                <Timeline orderstatus={this.state.order.status}/>
                                {this.loadList()}
                            </div>
                        </div>
                    </div>

                    <Total deliverytype={this.state.order.ordertype} subtotal={this.state.order.totalprice} />

                </div>
            </>
        );
    }
}

export default OrderDetails;