import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';

export default class LineChart extends Component {
    constructor(props) {
      super(props);
      this.state = props;
    }
  
    componentDidMount() {
            
    }
  
    componentDidUpdate(){
    }
  
    render(){
      return(
        <Line
          data={this.state.data}
          options={this.state.options}
        />
      );
    }    

}
  