import React,{Component} from 'react';
import ListItem from './ListItem/ListItem';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {server:state.server};
}

class ListReviewView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            review:[],
            changed:0
         };
    }

    componentDidMount=()=>{
        this.loadReviews();
    }

    componentDidUpdate=()=>{
        if(this.props.changed != this.state.changed){
            this.loadReviews();
        }
    }

    loadReviews=()=>{
        fetch(this.props.server + "shop/getproductreview?id="+this.props.id).
        then(data=>{
            if(data.status===200) return data.json();
        }).
        then(reviews=>{ 
            this.setState({review : reviews.data,changed:this.props.changed});
        }).catch(e=>{
            let err = new Error(e);
            alert(err.stack);
        });
    }


    loadList=()=>{
        if(this.state.review.length === 0 ){
            return <>
                <h4 style={{color:"#ff4500"}}>No review(s) are/is available.</h4>
            </>
        }else{
            let rev = this.state.review.map(data=>{
                return <ListItem name={data.name} text={data.reviewText} rating={data.review_v} date={data.date}></ListItem>
            })
            return rev;
        }
    }


    render() {
        return (
            <>
                <div class="u-s-m-b-30">
                    <form class="pd-tab__rev-f1">
                        <div class="rev-f1__group">
                            <div class="u-s-m-b-15">
                                <h2>{this.props.review.count} Review(s) for {this.props.name}</h2>
                            </div>
                        </div>
                        <div class="rev-f1__review">
                            {this.loadList()}
                        </div>
                    </form>
                </div>
            </>
        );
    }
}


const ListReview = connect(mapStateToProps)(ListReviewView);
export default ListReview;