import React,{Component} from 'react';
import DoughnutChart from '../../Component/Chart/DoughnutChart';
import LineChart from '../../Component/Chart/LineChart';
import Cookies from 'universal-cookie';
import urls from './../../properties'

export default class Overview extends Component{
    constructor(props){
        super(props);

        let date = new Date();
        let now = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

        this.state={
            line:{
            },
            doughnut:{},
            date:now,
            server:urls.node_server_url,
            todaysdata:[],
            label:["","","","",""],
            qty:[0,0,0,0,0]
        }
    }

    state={}
    
    componentDidMount=()=>{
        this.loadPie()
        this.getLineChartData();
        this.loadTodaysData()
    }

    loadPie=()=>{

        let label=[];
        let qty=[];
        const cookies = new Cookies();
        const token = cookies.get("token");

        fetch(urls.node_server_url+"/admin/getpeichartdata?token="+token).then(
            data=>{
                if(data.status===200) return data.json();
            }
        ).then(data=>{
            data.forEach(element => {
                label.push(element.name);
                qty.push(element.qty);
            });
        })

        
    }

    getDoughnutChart=()=>{

        let label = [] ;
        let qty = [] ;
        const cookies = new Cookies();
        const token = cookies.get("token");

        fetch(urls.node_server_url+"/admin/getpeichartdata?token="+token).then(
            data=>{
                if(data.status===200) return data.json();
            }
        ).then(data=>{
            data.forEach(element => {
                label.push(element.name);
                qty.push(element.qty);
            });
        })
        
        let doughnut = { //Top 5 products sold.
            data:{
                labels:label,
                datasets: [
                    {
                    label: 'Top 5 Sold Products of This Week.',
                    backgroundColor: [
                        '#B21F00',
                        '#C9DE00',
                        '#2FDE00',
                        '#00A6B4',
                        '#6800B4'
                    ],
                    hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                    ],
                    data:qty
                    }
                ]
            },

            options:{

                title:{
                    display:true,
                    text:'Top 5 Sold Products of This Week.',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                }
                    
            }      
        }

        return <DoughnutChart data={doughnut.data} options={doughnut.options} />
        
    
    
    }

    getLineChartData=()=>{
        let line = {
            //shows data of last 7 days...

            options : {
                title:{
                  display:true,
                  text:'Orders Summary of last 7 days.',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                },
                
            },

            data:{
    
                labels: ['March 01', 'March 02', 'March 03','March 04', 'March 05' , 'March 06' , 'March 07'], // test Dates 
                
                datasets: [
                    {
                        label: 'Accepted Orders',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: ['#4d83ff'],
                        borderWidth: 2,
                        fill: false,
                        pointBackgroundColor: "#fff",
                        data: [65, 59, 80, 81, 56, 56, 34]
                    },

                    {
                        label: 'Rejected Orders',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: ['#ff4747'],
                        borderWidth: 2,
                        fill: false,
                        pointBackgroundColor: "#fff",
                        data: [5, 9, 2, 3, 2, 1, 7]
                    },

                    {
                        label: 'Delivered Orders',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: ['#ffc100'],
                        borderWidth: 2,
                        fill: false,
                        pointBackgroundColor: "#fff",
                        data: [45, 60, 60, 41, 36, 26, 74]
                    },

                ]

            },

        }

        this.setState({line:line});
    }

    showLineChart=()=>{
        if(this.state.line.data){
            return <LineChart data={this.state.line.data} options={this.state.line.options}/>
        }
        else <></>
    }

    showDoughnutChart=()=>{
        if(this.state.doughnut.data){
            return <></>
        }
        else <></>
    }

    getTodaysTotalTable=()=>{
        let index = 0;
        let data = this.state.todaysdata.map(item=>{
            return(<tr>
                    <td>{++index}</td>
                    <td>{item.name}</td>
                    <td>{item.price} / pcs.</td>
                    <td>{item.soldquantity} pcs.</td>
                    <td>{item.stock} pcs</td>
                    <td>{parseFloat(item.price)*parseFloat(item.soldquantity)} Rs.</td>
                </tr>
            );
        });

        return data;
    }

    loadTodaysData=(date_p)=>{
        let date = date_p || new String(this.state.date);
        let arr_date = date.split("-");
        let year = parseInt(arr_date[0]);
        let month = parseInt(arr_date[1]);
        let dat = parseInt(arr_date[2]);
        let now = `${year}/${month}/${dat}`;
        
        const cookies = new Cookies();
        const token = cookies.get("token");


        fetch(urls.node_server_url+"/admin/getitemsold?token="+token+"&date="+now,{
            method:"GET",
            headers:{
                "Accept":"application/json"
            },
        }).then(data=>{
            if(data.status===200) return data.json();
            else alert("Error!");
        }).then(res=>{
            this.setState(
                {
                    todaysdata : res
                }
            );
        }).catch(e=>{
            console.log(e);
        })
    }

    render(){
        return(
        <div class="row">
            <div class="col-md-12 grid-margin">
              
                <div class="row">
                

                    <div class="col-md-12 grid-margin">
                        <div className="row" style={{backgroundColor:"white"}}>
                            <div className="col-md-3"/>
                                <div className="col-md-6">
                                    <div className="card card-body">
                                    {this.getDoughnutChart()}
                                </div>
                                <div className="col-md-3"/>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">    
                            
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div class="card-title">Today's Stock Report</div>
                                 
                            </div>
    

                            <table id="recent-purchases-listing" class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name of product</th>
                                        <th>Price</th>
                                        <th>Item Sold</th>
                                        <th>Remaining</th>
                                        <th>Total Sell</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.getTodaysTotalTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                  </div>
                </div>
            </div>  
        </div>            
        );
    }
}