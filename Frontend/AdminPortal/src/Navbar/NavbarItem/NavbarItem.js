import React,{Component} from 'react';
import { Link } from 'react-router-dom';

export default class NavbarItem extends Component{
    constructor(props){
        super(props);
    }

    click=()=>{
        let id = this.props.id;
        this.props.isSelected(id);
    }

    selectedClassname=()=>{
        return this.props.selected ? "nav-item active" : "nav-item";
    }

    render(){
        return(
            <li className={this.selectedClassname()} onClick={this.click}>
                    <Link className="nav-link" to={this.props.path}>
                        <i className={this.props.menuicon}></i> 
                        <span className="menu-title">{this.props.menutitle}</span>
                    </Link>
            </li>
        );
    }
}