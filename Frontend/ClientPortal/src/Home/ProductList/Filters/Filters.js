import React,{Component} from 'react';

export default class Filters extends Component{
  constructor(props){
    super(props);
    this.state = this.props;
  }


  componentDidMount=()=>{
    
  }

  componentDidUpdate=()=>{
  }

  checkedOrNot=()=>{
    return this.state.data.checked?
        <button class="btn filter__btn filter__btn--style-1 js-checked" type="button">{this.props.data.name}</button>
    :
        <button class="btn filter__btn filter__btn--style-1" type="button" onClick={
            e=>{
                e.preventDefault();
                this.props.filterChanged(this.state.data.name);
            }        
        }>{this.props.data.name}</button>
    ;
  }
  
  render(){
    return(<>

        <div class="filter__category-wrapper">
            {this.checkedOrNot()}
        </div>
    
    </>);
  }
}
