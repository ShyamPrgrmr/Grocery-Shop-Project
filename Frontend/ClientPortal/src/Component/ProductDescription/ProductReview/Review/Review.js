import React,{Component} from 'react';
import Stars from '../../../../Home/ProductList/List/Item/Stars/Stars';
import ListReview from './ListReview/ListReview';
import ReviewForm from './ReviewForm/ReviewForm';


class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { count:0 };
    }

    loadListReview=()=>{
        return <ListReview id={this.props.id} name={this.props.name} review={this.props.review} changed={this.state.count}/>
    }

    reviewAdded=()=>{
        this.setState({count:this.state.count+1});
    }

    render() {
        return (
            <>
            
            <div class="tab-pane" id="pd-rev">
                <div class="pd-tab__rev">
                    <div class="u-s-m-b-30">
                        <div class="pd-tab__rev-score">
                            <div class="u-s-m-b-8">
                                <h2>{this.props.review.count} Reviews</h2>
                            </div>
                            <div class="gl-rating-style-2 u-s-m-b-8">

                                <Stars review={this.props.review} nocount="yes"/>

                            </div>
                            <div class="u-s-m-b-8">
                                <h4>We want to hear from you!</h4>
                            </div>

                            <span class="gl-text">Tell us what you think about this product.</span>
                        </div>
                    </div>

                    {this.loadListReview()}
                    <ReviewForm id={this.props.id} name={this.props.name} reviewAdded={this.reviewAdded}/>
                </div>
            </div>            
            </>
        );
    }
}

export default Review;