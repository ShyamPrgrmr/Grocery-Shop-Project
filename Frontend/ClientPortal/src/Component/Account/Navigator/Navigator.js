import React,{Component} from 'react';
import CountOrders from '../CountOrders/CountOrders';

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigator:[
                {name:"Manage My Account",active:true,id:"account"},
                {name:"My Profile",active:false,id:"profile"},
            ]
         };
    }

    onClick=(e)=>{
        e.preventDefault();
        let name = e.target.name;
        this.props.menuItemClicked(name);
        let newdata = this.state.navigator.map(
            data=>{
                if(data.id === name){
                    data.active = true;
                }
                else{
                    data.active = false;
                }
                return data;
            }
        );

        this.setState({navigator:newdata});
    }

    loadNavigatorMenu=()=>{
        let data = this.state.navigator.map(
            nav=>{
                return !nav.active ? 
                <li key={nav.id}>
                    <a name={nav.id} onClick={this.onClick}>{nav.name}</a>
                </li>:
                <li key={nav.id}>
                    <a name={nav.id} className="dash-active" onClick={this.onClick}>{nav.name}</a>
                </li>
            }
        );

        return data;
    }

    render() {
        return (
            <>
                <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                    <div class="dash__pad-1">
                        <span class="dash__text u-s-m-b-16">Hello, {this.props.username}</span>
                        <ul class="dash__f-list">
                            {this.loadNavigatorMenu()}
                        </ul>
                    </div>
                </div>
                <CountOrders/>
            </>
        );
    }
}

export default Navigator;
