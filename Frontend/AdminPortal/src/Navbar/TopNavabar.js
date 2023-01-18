import React,{Component} from 'react';
import logo from './../logo.svg';

export default class TopNavbar extends Component{
    constructor(props){
        super(props);

    }

    state={
      toggleNav:true,
      toggleMenu:true
    };

    IconOnlyNavbar=(e)=>{
      e.preventDefault();
      if(this.state.toggleNav){
        document.getElementById("body").className = "sidebar-icon-only";
        }
      
      else{
        document.getElementById("body").className = "sidebar-fixed";
        
      }
      this.setState({toggleNav:!this.state.toggleNav});  
    }

    navbarToggle=(e)=>{
      e.preventDefault();
      if(this.state.toggleMenu){
        document.getElementById("sidebar").className = "sidebar sidebar-offcanvas active";
      }else{
        document.getElementById("sidebar").className = "sidebar sidebar-offcanvas";
      }

      this.setState({toggleMenu:!this.state.toggleMenu});  
    }

    render(){
        return(
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex justify-content-center">
            <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">  
              <a className="navbar-brand brand-logo" href="#"><img src={logo} alt="logo"/></a>
              <button className="navbar-toggler navbar-toggler align-self-center" onClick={this.IconOnlyNavbar} type="button" data-toggle="minimize">
                <span className="mdi mdi-sort-variant"></span>
              </button>
            </div>  
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul className="navbar-nav">
              <a class="nav-link" >
                  <div class="d-flex">
                  </div>
              </a>
            </ul>

            <ul className="navbar-nav navbar-nav-right"> 
              <li className="nav-item nav-profile dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                  <span className="nav-profile-name">Admin</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                  <a className="dropdown-item" onClick={e=>{
                        e.preventDefault();
                        this.props.logout();
                      }
                      }>
                    <i className="mdi mdi-logout text-primary"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
            <button onClick={this.navbarToggle} className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>
        );
    }
}