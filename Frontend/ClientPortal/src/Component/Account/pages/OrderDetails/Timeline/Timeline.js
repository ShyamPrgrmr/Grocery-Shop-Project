import React,{Component} from 'react';
import "./Timeline.css";

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            status:-1
         };
    }

    componentDidMount=()=>{
        let orderStatus = parseInt(this.props.orderstatus); 
        this.setState({status:orderStatus});
    }

    componentDidUpdate=()=>{
        if(this.state.status !== this.props.orderstatus){
            this.setState({status:this.props.orderstatus});
        }
    }


    loadTimeline=()=>{

        if(this.state.status === -1){
            return(
                <>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i timeline-l-i--finish">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Waiting</span>
                    </div>
                </div>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Processing</span>
                    </div>
                </div>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Delivered</span>
                    </div>
                </div>
                </>
            );
        }
        else  if(this.state.status === 0){
            return(
                <>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i timeline-l-i--finish timeline-circle-color-reject">

                            <span class="timeline-circle timeline-circle-color-reject"></span></div>

                        <span class="timeline-text">Rejected</span>
                    </div>
                </div>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Processing</span>
                    </div>
                </div>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Delivered</span>
                    </div>
                </div>
                </>
            )
        }
        else  if(this.state.status === 1 || this.state.status === 2){
            return(
                <>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i timeline-l-i--finish">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Accepted</span>
                    </div>
                </div>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i timeline-l-i--finish">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Processing</span>
                    </div>
                </div>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Delivered</span>
                    </div>
                </div>
                </>
            )
        }
        else  if(this.state.status === 3){
            return(
                <>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i timeline-l-i--finish">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Accepted</span>
                    </div>
                </div>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i timeline-l-i--finish">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Processing</span>
                    </div>
                </div>
                <div class="col-lg-4 u-s-m-b-30">
                    <div class="timeline-step">
                        <div class="timeline-l-i timeline-l-i--finish">

                            <span class="timeline-circle"></span></div>

                        <span class="timeline-text">Delivered</span>
                    </div>
                </div>
                </>
            )
        }
        
        
    }
    
    render() {
        return (
            <>
            
            <div class="manage-o__timeline">
                <div class="timeline-row">
                    {this.loadTimeline()}
                </div>
            </div>
            
            </>
        );
    }
}

export default Timeline;

/*
    Order status scale :
    -1 : waiting     
    0 :  Rejected                   
    1 : processing                        
    2 : processing                
    3 : delivered                       
*/