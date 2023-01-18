import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import NavbarItem from './NavbarItem/NavbarItem';
import NavbarItemCollapsed from './NavbarItem/NavbarItemCollapsed';

export default class Navbar extends Component{
    
    state={
        routes : [],
        route:"/dashboard"
    };

    constructor(props){
        super(props);  
    }

    getAllRoutes = () =>{
        return [
            
            {name:"Dashboard",path:"/dashboard",type:0,menuicon:"mdi mdi-home menu-icon",selected:false,id:"dashboard"},
            {
                type:1,
                name:"Product",
                id:"product",
                submenu:[
                    {name:"Add new product",path:"/products/addproduct",selected:false,id:"product-add"},
                    {name:"List of products",path:"/products/listproducts",selected:false,id:"product-list"},
                ],
                menuicon:"mdi mdi-package-variant menu-icon",
                selected:false,
                path:"/products/addproduct"
            },
            {name:"Order",path:"/orders",type:0,menuicon:"mdi mdi-shopping menu-icon",selected:false,id:"order"},
            {name:"Inventory",path:"/inventory",type:0,menuicon:"mdi mdi-store  menu-icon",selected:false,id:"inventory"},
            {name:"Deleveries",path:"/deliveries",type:0,menuicon:"mdi mdi-truck-delivery menu-icon",selected:false,id:"delevery"},
        ];
    }

    componentDidMount=()=>{
        let rou = this.getAllRoutes();
        let pathname = this.props.location.pathname;
        let data = rou.map(item=>{
            if(pathname === item.path){
                item.selected=true;
            }
            else{
                item.selected = false;
            }
            return item;
        });
      this.setState({routes:data})
    }

    componentDidUpdate=()=>{
        if(this.state.route !== this.props.location.pathname){
            this.setState({route:this.props.location.pathname});
        }
    }

    navItemActive=(selectedNav)=>{
        const routes = this.state.routes;
        let navItems = routes.map(
            item=>{
                if(item.id===selectedNav){
                    item.selected=true;
                    return item;
                }else{
                    item.selected=false;
                    return item;
                }
            }   
        );

        this.setState({routes:navItems});
    }


    navs=()=>{
        const routes = this.state.routes;

        let navItems = routes.map(
            item=>{

                

                if(item.type===1){
                    return(
                      <NavbarItemCollapsed isSelected={this.navItemActive} id={item.id} menutitle={item.name} selected={item.selected} submenus={item.submenu} menuicon={item.menuicon}></NavbarItemCollapsed>  
                    );
                }else{
                    return(
                      <NavbarItem menutitle={item.name} isSelected={this.navItemActive} id={item.id} selected={item.selected} path={item.path} menuicon={item.menuicon}></NavbarItem>
                    );
                }
            }
        );

        return navItems;
    }

    render(){

        return(

            <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                {this.navs()}
            </ul>
          </nav>
    
        );
    }
}