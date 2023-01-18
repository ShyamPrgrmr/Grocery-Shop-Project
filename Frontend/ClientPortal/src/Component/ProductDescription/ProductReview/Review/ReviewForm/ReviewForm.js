import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReturningUser from './../../../../Auth/ReturningUser/ReturningUser';

function mapStateToProps(state){
    return { name: state.fname + state.lname,email:state.email,isLoggedIn : state.isLoggedIn,token:state.token,server:state.server }
}


class ReviewFormView extends Component {
    constructor(props) {
        super(props);
        this.state = { rating:"1",name:"",email:"",review:"",isLoggedIn:false };
    }

    componentDidMount=()=>{
        this.setState({name:this.props.name,email:this.props.email});
    }

    componentDidUpdate=()=>{
        if(this.props.isLoggedIn !== this.state.isLoggedIn ){
            this.setState({isLoggedIn:this.props.isLoggedIn});
        }
    }

    onChange=(e)=>{
       this.setState({[e.target.name] : e.target.value})
    }

    onSubmit=(e)=>{
        e.preventDefault();

        let rating = parseFloat(this.state.rating);
        let review = this.state.review;
        let id = this.props.id;
        
        let json = JSON.stringify({
            token : this.props.token,
            productid:id,
            review:rating,
            reviewtext:review
        });

        fetch(this.props.server+"shop/putreview",{
            method:"PUT",
            body:json,
            headers:{
                "Content-type":"Application/json",
                "Accept":"Application/json"
            }
        }).then(
            data=>{ if(data.status === 200) return data.json(); }
        ).then(
            data=>{
                this.props.reviewAdded();
                this.setState({review:"",rating:"1"});
            }
        ).catch(e=>{
            let err = new Error(e);
            alert(err.stack);
        })
        
    }

    render() {

        if(!this.state.isLoggedIn){
            return <ReturningUser />
        }else{

            return (
                <>
                
                    <div class="u-s-m-b-30">
                        <div class="pd-tab__rev-f2">
                            <h2 class="u-s-m-b-15">Add a Review</h2>
    
                            <span class="gl-text u-s-m-b-15">Your email address will not be published. Required fields are marked *</span>
                            <div class="u-s-m-b-30">
                                <div class="rev-f2__table-wrap gl-scroll">
                                    <table class="rev-f2__table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i>
    
                                                        <span>(1)</span></div>
                                                </th>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
    
                                                        <span>(1.5)</span></div>
                                                </th>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i><i class="fas fa-star"></i>
    
                                                        <span>(2)</span></div>
                                                </th>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
    
                                                        <span>(2.5)</span></div>
                                                </th>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
    
                                                        <span>(3)</span></div>
                                                </th>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
    
                                                        <span>(3.5)</span></div>
                                                </th>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
    
                                                        <span>(4)</span></div>
                                                </th>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
    
                                                        <span>(4.5)</span></div>
                                                </th>
                                                <th>
                                                    <div class="gl-rating-style-2"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
    
                                                        <span>(5)</span></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-1" name="rating" value="1" onClick={this.onChange} checked={this.state.rating==="1"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-1"></label></div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-1.5" name="rating" value="1.5" onClick={this.onChange} checked={this.state.rating==="1.5"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-1.5"></label></div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-2" name="rating" value="2" onClick={this.onChange} checked={this.state.rating==="2"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-2"></label></div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-2.5" name="rating" value="2.5" onClick={this.onChange} checked={this.state.rating==="2.5"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-2.5"></label></div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-3" name="rating" value="3" onClick={this.onChange} checked={this.state.rating==="3"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-3"></label></div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-3.5" name="rating" value="3.5" onClick={this.onChange} checked={this.state.rating==="3.5"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-3.5"></label></div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-4" name="rating" value="4" onClick={this.onChange} checked={this.state.rating==="4"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-4"></label></div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-4.5" name="rating" value="4.5" onClick={this.onChange} checked={this.state.rating==="4.5"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-4.5"></label></div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                    <div class="radio-box">
    
                                                        <input type="radio" id="star-5" name="rating" value="5" onClick={this.onChange} checked={this.state.rating==="5"}/>
                                                        <div class="radio-box__state radio-box__state--primary">
    
                                                            <label class="radio-box__label" for="star-5"></label></div>
                                                    </div>
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            
                            <form class="rev-f2__group" style={{flexDirection:"column"}} onSubmit={this.onSubmit}>
                               
                                
                                <div>
                                    
                                    <p class="u-s-m-b-30">
                                        <label class="gl-label" for="reviewer-name" >NAME *</label>
                                        <input class="input-text input-text--primary-style" name="name" required type="text" onChange={this.onChange} value={this.state.name}/>
                                    </p>
                                    
                                    <p class="u-s-m-b-30">
                                        <label class="gl-label" for="reviewer-email">EMAIL *</label>
                                        <input class="input-text input-text--primary-style" required type="text" name="email" onChange={this.onChange} value={this.state.email}/>
                                    </p>
    
                                </div>
    
                                <div class="u-s-m-b-15">
                                    <label class="gl-label" for="reviewer-text">YOUR REVIEW *</label>
                                    <textarea class="text-area text-area--primary-style" required name="review" onChange={this.onChange} value={this.state.review}></textarea>
                                </div>
    
                                <div>
                                    <button class="btn btn--e-brand-shadow" type="submit">SUBMIT</button>
                                </div>
    
                            </form>
    
    
                            
                            
                        </div>
                    </div>
                </>
            );


        }


        
    }
}


const ReviewForm = connect(mapStateToProps)(ReviewFormView);
export default ReviewForm;