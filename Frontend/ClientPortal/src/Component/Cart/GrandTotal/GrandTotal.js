import React,{Component} from 'react'
import { Link } from 'react-router-dom';

class GrandTotal extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
            <div class="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                <form class="f-cart">
                    <div class="row">
                    <div class="col-lg-12 col-md-12 u-s-m-b-30">
                            <div class="f-cart__pad-box">
                                <div class="u-s-m-b-30">
                                    <table class="f-cart__table">
                                        <tbody>
                                            <tr>
                                                <td>GRAND TOTAL</td>
                                                <td>{this.props.total} Rs.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <Link class="btn btn--e-brand-b-2" to="/checkout"> PROCEED TO CHECKOUT</Link></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </>
        );
    }
}

export default GrandTotal;