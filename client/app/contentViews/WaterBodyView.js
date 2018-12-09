class WaterBodyView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            health:'Unknown',
            type: 'Pool',
            notes:'None',
            score:'No Score'
        };
    }
    componentDidMount(){
        if(!this.props.body.isPool) this.setState({type:'Spa'});
        this.getHealth();
    }
    delteBody(){
        const remove = window.confirm('Are you sure you want to delete ' + props.body.name + ' \nThis will also delete all water samples for ' + props.body.name);
        if(remove){
            console.log('deleted water body id and all samples for ' + props.body.name);
        }
    }
    getHealth(){
        sendAjax('GET','/healthCheck',{bodyID:this.props.body._id},(success) =>{
        //console.dir(success);
        this.setState({health:success.health,notes:success.notes,score: success.score});
        });
    }

    render(){
        return(
            <div className="col-sm-6">
                <p>Name:{this.props.body.name}</p>
                <p>Location:{this.props.body.zipCode}</p>
                <p>Type:{this.state.type}</p>
                <p>Water Health:{this.state.health}</p>
                <p>Water Score:{this.state.score}</p>
                <p>Notes:{this.state.notes}</p>
                <hr/>
                {/*
                <p className="small">Api-ID:{props.body._id}</p>
                <button onClick={delteBody}>Delete</button>
                */}
            </div>
        );
    }
}