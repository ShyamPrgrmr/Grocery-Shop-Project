import React,{Component} from 'react';
import Review from './Review/Review';

class ProductReview extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
                <div class="u-s-p-y-90 paddingTopBottomZero">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="pd-tab">
                                <div class="u-s-m-b-30">
                                    <ul class="nav pd-tab__list">
                                        <li class="nav-item">
                                            <a class="nav-link">
                                                REVIEWS
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <Review
                                name={this.props.name}
                                review={this.props.review}
                                id={this.props.id}
                            />
                        </div>
                    </div>
                </div>
                </div>
            </>
        );
    }
}

export default ProductReview;