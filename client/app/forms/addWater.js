class AddBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
       
      }
    
    ComponentDidMount(){
        console.log('component loaded');
    }

    
    GetWaterBodies(){
        console.log('Getting water bodies');
        //Get Water bodies so we know what water to the test was on
    }

    SubmitData(){
        console.log('adding water test data')
    }

    //reloads the page if they want to clear the data
    ClearData(e){
       if(!window.confirm('Are you sure you want to CLEAR this data?'))  e.preventDefault();
    }
    
    //makes form text dynamic for pool or spa NOTE false is a string not a bool
    changeType(e){
        if(e.target.value === 'false') this.setState({water:'Spa'});
        else this.setState({water:'Pool'});
    }

    render(){
    return(
        <div className="container-fluid">
            <h2>Add Water Test Results</h2>
            <form>
            <div className="form-group">
                <label for="type">Water Type:</label>
                    <select className="form-control" id="type" onChange={(e) => this.changeType(e)}>
                        <option selected value="true">Pool</option>
                        <option value="false">Spa</option>
                    </select>
            </div>
            <WaterSlider name="Hardness" min="0" max="1000" step="1" default="500"/>
            <WaterSlider name="Chlorine" min="0" max="10" step=".1" default="5"/>
            <WaterSlider name="Free Chlorine" min="0" max="10" step=".1" default="5"/>
            <WaterSlider name="PH" min="6.2" max="8.4" step=".1" default="7.3"/>
            <WaterSlider name="Alkalinity" min="0" max="240" step="1" default="120"/>
            <WaterSlider name="C Acid" min="0" max="300" step="1" default="150"/>
            
            <div className="form-group">
                <label for="notes">Notes:</label>
                <textarea className="form-control" id="notes" rows="3"></textarea>
            </div>
            <button onClick={(e) => this.ClearData(e)}>Clear Test Results</button>
            <button onClick={(e) => this.SubmitData(e)}>Save Test Results</button>
            </form>
        </div>
    );  
    } 
};



const init = () => {    
    ReactDOM.render(
      <AddBody/>,document.getElementById('addWater')
    );
  };
  
  window.onload = init;
