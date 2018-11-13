class WaterSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value : this.props.default,
        }; 
        
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount(){
        
    }

    updateData(event){
        this.setState({value:event.target.value});
    };
    
    render(){
        return(
            <div className="form-group" >
                    <label for="waterName">{this.props.name}:{this.state.value}</label>
                    <input type="range" 
                        min={this.props.min} 
                        max={this.props.max} 
                        step={this.props.step}  
                        className="form-control" 
                        onChange={this.updateData} 
                        defaultValue={this.props.default}
                    />
            </div>
        );
    };
}