import React,{Component} from 'react';

class Stars extends Component {
    constructor(props) {
        super(props);
        this.state = {  review : {}  };
    }

    componentDidMount=()=>{
        this.setState({review:this.props.review});
    }

    loadCount=()=>{
        if(this.props.nocount==="yes"){
            return <></>
        } else{
            return <span class="product-o__review">({this.state.review.count})</span>
        }
    }

    calculateStars=()=>{
        let rating = Math.round(parseInt(this.state.review.rating));
        let arr = [];
        let index = 0;
        while(rating>0){
            arr.push(<i class="fas fa-star"></i>);
            index++;
            rating--;
        }
        while(index<5){
            arr.push(<i class="far fa-star"></i>);
            index++;
        }

        return arr;
    }


    render() {
        return (
            <>
                <div class="product-o__rating gl-rating-style">
                    
                    {this.calculateStars()}
                    {this.loadCount()}
                    
                </div>


            </>
        );
    }
}

export default Stars;