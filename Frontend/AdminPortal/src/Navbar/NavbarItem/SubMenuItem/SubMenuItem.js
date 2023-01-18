import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class SubMenuItem extends Component{

    state={
        selected:false,
        id:""
    };

    constructor(props){
        super(props);
    }

    componentDidMount =()=>{
        this.setState({selected:this.props.selected,id:this.props.id});
    }


    itemClick=(e)=>{
        e.preventDefault();
        this.props.isSelected(this.state.id);
    }

    selectedClass=()=>{
        return this.props.selected ? "nav-link active" : "nav-link";
    }

    render(){
        return(
            <li className="nav-item" onClick={this.itemClick}>
                <Link  className={this.selectedClass()} to={this.props.path}>{this.props.name}</Link>
            </li>
        );

    }
}