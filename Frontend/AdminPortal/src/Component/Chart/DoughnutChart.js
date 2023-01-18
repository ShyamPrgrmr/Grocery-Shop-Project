import React from 'react';
import {Doughnut} from 'react-chartjs-2';

export default class DoughnutChart extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      data:{},
      options:{}
    }
  }

  componentDidMount() {      
    this.setState({...this.props})
  }

  componentDidUpdate(){
    
  }

  render(){
    return(
      <Doughnut
        data={this.state.data}
        options={this.state.options}
      />
    );
  }    
}