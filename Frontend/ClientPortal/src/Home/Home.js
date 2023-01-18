import React,{Component} from 'react';
import ProductList from './ProductList/ProductList';

export default class Home extends Component{
  constructor(props){
    super(props);
  }

  
  render(){
    return(<>
    
        <div className="u-s-p-b-60">
            <div className="section__intro u-s-m-b-16">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section__text-wrap">
                                <span className="section__span u-c-silver">CHOOSE CATEGORY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductList/>
        </div>
   
     
    </>);
  }
}
