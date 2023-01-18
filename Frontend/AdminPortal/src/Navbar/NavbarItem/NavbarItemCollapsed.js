import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';

import SubMenuItem from './SubMenuItem/SubMenuItem';

export default class NavbarItemCollapsed extends Component{
    state={submenus:[]};
    
    constructor(props){
        super(props);
    }

    componentDidMount=()=>{
        this.setState({submenus:this.props.submenus});
    }


    getSubMenu=()=>{
        const submenu = this.state.submenus;
        let list = submenu.map(
            (item)=>{
                return(
                    <SubMenuItem name={item.name} 
                                 path={item.path}
                                 key={item.id} 
                                 id={item.id} 
                                 selected={item.selected}
                                 isSelected={this.selectedSubMenu}
                                 ></SubMenuItem>
                );
            }
        ) ;
        return list;
    }

    selectedClassname=()=>{
        return this.props.selected ? "nav-item active" : "nav-item";
    }

    selectedSubMenu=(submenu)=>{
        const oldsubmenu = this.state.submenus;

        let newSubMenu = oldsubmenu.map(
            (item)=>{
                if(item.id===submenu){
                    item.selected = true;
                    return item;
                } else{
                    item.selected = false;
                    return item;
                }
            }
        ) ;
        
        this.setState({submenus:newSubMenu});
    }

    click=()=>{
        let id = this.props.id;
        this.props.isSelected(id);
    }

    

    render(){
        return(
            <>

            <li className={this.selectedClassname()} onClick={this.click}>
                  <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                    <i className={this.props.menuicon}></i>
                    <span className="menu-title">{this.props.menutitle}</span>
                    <i className="menu-arrow"></i>
                  </a>

                  <div className="collapse" id="ui-basic">
                    <ul className="nav flex-column sub-menu">
                        {this.getSubMenu()}
                    </ul>
                  </div>
            </li>
            </>
        );
    }
}