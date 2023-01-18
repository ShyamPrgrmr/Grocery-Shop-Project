import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { setlogout } from './../../redux/action/index';
import Cookies from 'universal-cookie';

function mapStateToProps(state){
  return {isLoggedIn : state.isLoggedIn };
}

function mapDispatchToProps(dispatch){
  return { setlogout : data => { dispatch(setlogout(data)) } }
}


class UserView extends Component{
  
  constructor(props){
    super(props);
  }
  
  state={
      toggle:false,
      isLoggedIn:false
  };

  onToggle=(e)=>{
    e.preventDefault();
    this.setState({toggle:!this.state.toggle});
  }

  openCloseClass=()=>{
    return this.state.toggle ? "open-menu" : "close-menu" ; 
  }

  componentDidMount(){
    this.setState({isLoggedIn:this.props.isLoggedIn});
  }

  componentDidUpdate(){
    if(this.state.isLoggedIn !== this.props.isLoggedIn){
      this.setState({isLoggedIn:this.props.isLoggedIn})
    }
  }

  getAccountContent=()=>{


    return this.state.isLoggedIn ? <>
      <li>
        <Link to="/my-account">
          <i class="fas fa-user-circle u-s-m-r-6"></i>
          <span>Account</span>
        </Link>
      </li>

      <li>
        <a onClick={(e)=>{e.preventDefault();
          this.props.setlogout("logout"); 
          let cookies = new Cookies();
          cookies.remove("tokencustomer");
          }}>
          <i class="fas fa-lock-open u-s-m-r-6"></i>
          <span>Signout</span>
        </a>
      </li>
    
    </> : <>
    <li>
        <Link to="/signup">
          <i class="fas fa-user-plus u-s-m-r-6"></i>
          <span>Signup</span>
        </Link>
    </li>
    <li>
        <Link to="/signin">
          <i class="fas fa-lock u-s-m-r-6"></i>
          <span>Signin</span>
        </Link>
    </li>

    </>;
  }

  render(){
    return(<>
    
        <li class="has-dropdown" data-tooltip="tooltip" data-placement="left" title="Account">
            <a onClick={this.onToggle} ><i class="far fa-user-circle"></i></a>
            <span class="js-menu-toggle" onClick={this.onToggle}></span>
            <ul className={this.openCloseClass()}>
                {this.getAccountContent()}      
            </ul>
        </li>
        
    </>);
  }
}

const User = connect(mapStateToProps,mapDispatchToProps)(UserView);
export default User;
