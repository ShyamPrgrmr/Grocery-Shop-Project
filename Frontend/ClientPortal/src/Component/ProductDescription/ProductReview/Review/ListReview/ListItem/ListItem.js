import React,{Component} from 'react';
import Stars from './../../../../../../Home/ProductList/List/Item/Stars/Stars';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    loadStar=()=>{
        let review = { 
            rating: this.props.rating,
            count:0
        }

        return <Stars review={review} nocount="yes"/>
    }

    render() {
        return (
            <>
                <div class="review-o u-s-m-b-15">
                    <div class="review-o__info u-s-m-b-8">

                        <span class="review-o__name">{this.props.name}</span>

                        <span class="review-o__date">{this.props.date}</span></div>
                    
                        <div class="review-o__rating gl-rating-style u-s-m-b-8">
                        
                            { this.loadStar()  }

                        </div>
                    <p class="review-o__text">{this.props.text}</p>
                </div>

            </>
        );
    }
}

export default ListItem;