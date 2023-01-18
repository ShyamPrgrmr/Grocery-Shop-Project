import React,{Component} from 'react';
import AddInventoryProducts from './AddInventoryProducts/AddInventoryProduct';
import ListProduct from './ListofInventoryProducts/ListofInventoryProducts';
import './Inventory.css';

export default class Inventory extends Component{
    constructor(props){
        super(props);
    }

    state={
        products:[]
        
    };

    componentDidMount=()=>{
        //fetching inventory products...
        let data=[
            {
                id:200,
                price:300,
                name:"Gemini oil 200",
                measurement:"gram",
                quantity:500
            },
            {
                id:201,
                price:200,
                name:"Gemini oil 500 ml",
                measurement:"litre",
                quantity:300
            },
            {
                id:202,
                price:200,
                name:"Gemini oil 500 ml",
                measurement:"litre",
                quantity:300
            },
            {
                id:203,
                price:200,
                name:"Gemini oil 500 ml",
                measurement:"litre",
                quantity:300
            }
        ];
        //end

        this.setState({products:data});
    }

    

    render(){
        return(
            <div class="col-sm-12">
                <AddInventoryProducts products={this.state.products}/>
                <ListProduct products={this.state.products}/>
            </div>
        );
    }
}