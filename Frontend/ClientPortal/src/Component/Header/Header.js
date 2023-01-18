import React,{Component} from 'react';

export default class SectionIntro extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
                <div class="section__intro u-s-m-b-60">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section__text-wrap">
                                    <h1 class="section__heading u-c-secondary">{this.props.title}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}