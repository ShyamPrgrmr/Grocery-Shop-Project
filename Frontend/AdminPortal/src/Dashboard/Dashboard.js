import React,{Component} from 'react';
import './Dashboard.css';
import Overview from './Overview/Overview';
import TopBar from './TopBar/TopBar';

export default class Dashboard extends Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount=()=>{
    }

    render(){
        return(
            <>
                <div className="col-12 grid-margin">
                    <TopBar/>
                    <Overview/>
                </div>
            </>
        );
    }
}

/*
import React,{Component} from 'react';

export default class TopBar extends Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount=()=>{

    }

    render(){
        return(
            <>
            </>
        );
    }
}

*/