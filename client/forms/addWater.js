class AddBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hardness: 500,
          chlorine: 5,
          freeChlorine: 5,
          ph: 7.3,
          alkalinity: 120,
          cAcid: 150,
        };
       this.FormChange = this.FormChange.bind(this);
      }
    FormChange(e){
        const name = e.currentTarget.attributes.name.value;
        console.log(name,e.target.value);
        let data = new Object;
        data[name] = e.target.value;
        console.dir(data);
        this.setState(data);
        
      };
    SubmitData(e){
        e.preventDefault();
        console.log($('form').serialize());
    }

    //reloads the page if they want to clear the data
    ClearData(e){
       if(!window.confirm('Are you sure you want to CLEAR this data?'))  e.preventDefault();
    }
    
    render(){
        //make a bunch of list options from the accounts bodies of water
        let allOptions = this.props.options.map((body) => {
            return  <option value={body._id}>{body.name}</option>
        })

    return(
        <div className="container-fluid">
            <h2>Add Water Test Results</h2>
            <form id="waterResult">
            <div className="form-group">
                <label for="type">Water Type:</label>
                    <select name="body" className="form-control" id="type">
                        {allOptions}
                    </select>
            </div>
            <WaterSlider title="Hardness" min="0" max="1000" step="1" default={this.state.hardness} dataId="hardness" updateParent={this.FormChange}/>
            <WaterSlider title="Chlorine" min="0" max="10" step=".1" default={this.state.chlorine}  dataId="chlorine" updateParent={this.FormChange}/>
            <WaterSlider title="Free Chlorine" min="0" max="10" step=".1" default={this.state.freeChlorine}  dataId="freeChlorine" updateParent={this.FormChange}/>
            <WaterSlider title="PH" min="6.2" max="8.4" step=".1" default={this.state.ph}  dataId="ph" updateParent={this.FormChange}/>
            <WaterSlider title="Alkalinity" min="0" max="240" step="1" default={this.state.alkalinity}  dataId="alkalinity" updateParent={this.FormChange}/>
            <WaterSlider title="C Acid" min="0" max="300" step="1" default={this.state.cAcid} dataId="cAcid" updateParent={this.FormChange}/>
            
            <div className="form-group">
                <label for="notes">Notes:</label>
                <textarea name="notes" className="form-control" id="notes" rows="3" placeholder="Add Notes Here"></textarea>
            </div>
            <button onClick={this.ClearData}>Clear Test Results</button>
            <button onClick={this.SubmitData}>Save Test Results</button>
            </form>
        </div>
    );  
    } 
};



const buildPage = (water) => {    
    
    ReactDOM.render(
      <AddBody options={water}/>,document.getElementById('addWater')
    );
  };
  
  window.onload = () =>{
    $.getJSON( "/waterBodies", (data) =>{
        if(data.bodies.length > 0) buildPage(data.bodies);
        else{
            console.log('Please add a pool or spa to add a water sample')
        }
    });
  };
