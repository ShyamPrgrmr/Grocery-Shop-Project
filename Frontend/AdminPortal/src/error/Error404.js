import './Error404.css';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Error404 extends Component{
  
  state={};

  constructor(props) {
    super(props);
  }

  componentDidMount=()=>{

  }


  render(){
    return(
        <div class="col-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title"><pre>Eror 404! requested page is not found!</pre></h4>
                    <Link to='/dashboard'>Go to homepage</Link>
                </div>
            </div>
        </div>
    );
  }

}