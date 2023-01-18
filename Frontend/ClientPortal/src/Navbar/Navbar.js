import React,{Component} from 'react';
import logo from './../logo.svg';
import MenuItem from './MenuItem/MenuItem';
import './Navbar.css';
import User from './User/User';
import Cart from './Cart/Cart';

export default class Navbar extends Component{
  constructor(props){
    super(props);
  }

  state={
    toggleButton:false
  };

  componentDidMount=()=>{

  }
  
  componentDidUpdate=()=>{
   
  }

  toggleClass=()=>{
    return this.state.toggleButton ? "ah-lg-mode menu-init js-open open" : "ah-lg-mode";
  }

  onOpen=(e)=>{
    e.preventDefault();
    this.setState({toggleButton:true});
  }
  
  onClose=(e)=>{
    e.preventDefault();
    this.setState({toggleButton:false});
  }


  render(){
    return(
    <>
    
        <header class="header--style-1">
            <nav class="primary-nav primary-nav-wrapper--border">
                <div class="container">
                    <div class="primary-nav">
                        <a class="main-logo"><img className="logo-svg" src={logo} alt=""/></a>
                        <div class="menu-init" id="navigation">
                        <button class="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs" type="button" onClick={this.onOpen}></button>
                            
                            <div class={this.toggleClass()}>
                                <span class="ah-close" onClick={this.onClose}>✕ Close</span>
                                <ul class="ah-list ah-list--design1 ah-list--link-color-secondary">
                                    
                                   
                                    <MenuItem title="Home" icon="fas fa-home" path="/"/>
                                    <Cart path="/cart"/>
                                    <User path={ { path: [ "/signup","/signin","/account" ] } }/>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>

        </header>
    
    </>);
  }
}
