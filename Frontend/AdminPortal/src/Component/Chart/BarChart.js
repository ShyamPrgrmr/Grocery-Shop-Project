import React from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = props;
    }

    componentDidMount() {
      this.setState(
        {
          data:this.props.data,
          options:this.props.options
        }
      );        
    }

    componentDidUpdate(){
    }
  
    render() {
      return (
        <Bar
          data={this.state.data}
          options={this.state.options}
        />
      );
    }
  }