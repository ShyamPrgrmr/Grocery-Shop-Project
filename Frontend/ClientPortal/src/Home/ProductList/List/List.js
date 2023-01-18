import React,{Component} from 'react';
import Item from './Item/Item';
import {connect} from 'react-redux';

function mapStateToProps(state){
  return {products:state.products,server:state.server};
}

class ListProducts extends Component{
  constructor(props){
    super(props);
  }

  state={
    products:[],
    filter:"",
    page:1
  }

  fetchProduct=()=>{
    let page = this.state.page;
    this.props.fetchNew(page);
  }

  componentDidMount=()=>{
    this.setState({filter:this.props.filter,products:this.props.products})
  }

  componentDidUpdate=()=>{
    if(this.state.filter !== this.props.filter || this.state.products != this.props.products){
      
      this.setState({filter:this.props.filter,products:this.props.products,page:1});
    }
  }

  loadListOfProducts=()=>{
    let data = this.state.products.map(product=>{
      return <Item key={product.id} {...product}/>
    });
    return data;
  }

  

  render(){
    return(<>

        <div class="filter__grid-wrapper u-s-m-t-30">
            <div class="row">
              {this.loadListOfProducts()}
            </div>
            
        </div>
    
    </>);
  }
}

const List = connect(mapStateToProps)(ListProducts)

export default List;