import React,{Component} from 'react';
import Item from './Item/Item';

class List extends Component{
  constructor(props){
    super(props);
  }

  state={
    products:[],
  }

  componentDidMount=()=>{
    this.setState({products:this.props.products})
  }

  componentDidUpdate=()=>{
    if(this.state.products != this.props.products){
        this.setState({products:this.props.products});
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


export default List;