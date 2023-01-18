import React,{Component} from 'react';
import { Link } from 'react-router-dom';

export default class MenuItem extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(<>
        <li data-tooltip="tooltip" data-placement="left" title={this.props.title}>
            <Link to={this.props.path}>
                <i class={this.props.icon}></i>
            </Link>
        </li>
    </>);
  }
}
