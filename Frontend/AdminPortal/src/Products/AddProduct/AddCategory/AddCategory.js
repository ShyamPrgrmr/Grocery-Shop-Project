import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import urls from "./../../../properties"

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { name:"" };
    }

    onChange=(e)=>{
        this.setState({name : e.target.value});
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get("token");

        let json = JSON.stringify({
            token:token,
            filter:{name:this.state.name}
        });

        fetch(urls.node_server_url+"/admin/addfilter",{
            headers:{
                "Content-type":"Application/json",
                "Accept":"Application/json"
            },
            body:json,
            method:"POST"
        }).then(
            data=>{if(data.status===200) { this.props.addCategory(this.state.name) } }
        );
    }

    render() {
        return (
        <div class="col-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div className="card-title">Add Category</div>
                    <form class="forms-sample" onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label>Name of Category</label>
                            <input name="name" required={true} autoFocus onChange={this.onChange} value={ this.state.name} type="text" class="form-control" placeholder="Name of Category"/>
                        </div>

                        <button  type="submit" class="btn btn-primary mr-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default AddCategory;