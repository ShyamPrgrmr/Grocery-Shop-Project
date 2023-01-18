import React,{Component} from 'react';
import './style.css';

class ImageScroller extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            images:[],
            tempImg:[]
         };
         
    }

    componentWillReceiveProps=(props)=>{
        this.setState({tempImg:props.images});
    }

    componentDidMount=()=>{
        
        let temp = this.state.tempImg;
        let id = 0;
        let images = temp.map(img=>{ return id===0 ? { src:img,active:true,id:++id } : { src:img,active:false,id:++id }; });
        
        this.setState({images:images});
    }

    componentDidUpdate=()=>{
        if(this.props.images != this.state.tempImg){
            this.setState({tempImg:this.props.images});
        }
    }

    

    getBigImage=()=>{
        let active = "";
        this.state.images.forEach(img=>{ if(img.active) active = this.props.server+img.src; });
        return <img src={active}/>
    }

    getSmallImages=()=>{
        let inactive = [];
        inactive = this.state.images.map(img=>{
            if(!img.active) return (<div className="col-lg-4">
                                        <img src={this.props.server+img.src}/>
                                    </div>)
        });
        return inactive;
    }

    render() {
        return (
            <>
                <div className="img-container row">
                    <div className="img-container_1 col-lg-12">
                        {this.getBigImage()}
                    </div>
                    <div className="img-container_2 col-lg-12">
                        <div className="row img-scroll">
                            {this.getSmallImages()}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ImageScroller;