import React,{Component} from 'react';
import DatePicker from 'react-date-picker';
import Cookies from 'universal-cookie';
import urls from './../../properties'

export default class TopBar extends Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount=()=>{
        this.getNumberData();
    }

    state={
        selectedDate:new Date(),
        accepted:0,
        rejected:0,
        delivered:0,
        arrived:0,
        server:urls.node_server_url+"/"
    }

    dateChanged=(e)=>{
        let dat = new Date(e);
        dat.setDate(parseInt(e.getDate()+"") + 1);
        this.setState({selectedDate:e});

        const cookies = new Cookies();
        const token = cookies.get("token");

        let date = dat.toISOString().slice(0,dat.toISOString().indexOf("T"));
        
        fetch(this.state.server+"admin/order/getNumbers?token="+token+"&date="+date,{
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
                    accepted:res.accepted,
                    rejeted:res.rejeted,
                    delivered:res.delivered,
                    arrived:res.arrived
                }
            );
        }).catch(e=>{
            console.log(e);
        })
    }
    getNumberData=()=>{
        const cookies = new Cookies();
        const token = cookies.get("token");
        let date = this.state.selectedDate.toISOString().slice(0,this.state.selectedDate.toISOString().indexOf("T"));
        fetch(this.state.server+"admin/order/getNumbers?token="+token+"&date="+date,{
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
                    accepted:res.accepted,
                    rejeted:res.rejeted,
                    delivered:res.delivered,
                    arrived:res.arrived
                }
            );
        }).catch(e=>{
            console.log(e);
        })
    }

    render(){
        return(
        <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body dashboard-tabs p-0">
                  
                  <ul class="nav nav-tabs px-4" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                    </li>
                  </ul>
                  
                  <div class="tab-content py-0 px-0">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                      <div class="d-flex flex-wrap justify-content-xl-between">
                        <div class="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          
                          
                          <i class="mdi mdi-calendar-heart icon-lg mr-3 text-primary"></i>
                          <div class="d-flex flex-column justify-content-around">
                            
                            <small class="mb-1 text-muted">Select date</small>
                            <DatePicker value={this.state.selectedDate} onChange={this.dateChanged}/>

                          </div>


                        </div>
                        <div class="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class=" mdi mdi-check mr-3 icon-lg text-primary"></i>
                          <div class="d-flex flex-column justify-content-around">
                            <small class="mb-1 text-muted">Accepted Orders</small>
                            <h5 class="mr-2 mb-0">{this.state.accepted}</h5>
                          </div>
                        </div>
                        <div class="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class="mdi mdi-close mr-3 icon-lg text-danger"></i>
                          <div class="d-flex flex-column justify-content-around">
                            <small class="mb-1 text-muted">Rejected Orders</small>
                            <h5 class="mr-2 mb-0">{this.state.rejected}</h5>
                          </div>
                        </div>
                        <div class="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class=" mdi mdi-check-all mr-3 icon-lg text-success"></i>
                          <div class="d-flex flex-column justify-content-around">
                            <small class="mb-1 text-muted">Delivered</small>
                            <h5 class="mr-2 mb-0">{this.state.delivered}</h5>
                          </div>
                        </div>
                        <div class="d-flex py-3 border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                          <i class=" mdi mdi-arrow-down mr-3 icon-lg text-info"></i>
                          <div class="d-flex flex-column justify-content-around">
                            <small class="mb-1 text-muted">Arrived</small>
                            <h5 class="mr-2 mb-0">{this.state.arrived}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
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