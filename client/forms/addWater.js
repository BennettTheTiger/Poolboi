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
          csrf:'default'
        };
       this.FormChange = this.FormChange.bind(this);
      }
   
    //when child sliders change they update the state and rerender
    FormChange(e){
        const name = e.currentTarget.attributes.name.value;
        let data = new Object;
        data[name] = e.target.value;
        this.setState(data);
      };
      //submits the water sample
    SubmitData(e){
        e.preventDefault();
        console.log($('form').serialize());

        sendAjax('POST','/addWater',$('form').serialize(), (result) =>{
            console.dir(result);
            window.location.href = '/dashboard';
        });
    };

    //reloads the page if users want to clear the form
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
            <WaterSlider title="PH" min="6.2" max="8.4" step=".01" default={this.state.ph}  dataId="ph" updateParent={this.FormChange}/>
            <WaterSlider title="Alkalinity" min="0" max="240" step="1" default={this.state.alkalinity}  dataId="alkalinity" updateParent={this.FormChange}/>
            <WaterSlider title="C Acid" min="0" max="300" step="1" default={this.state.cAcid} dataId="cAcid" updateParent={this.FormChange}/>
            <input id="csrfToken" type="hidden" name="_csrf" value={this.props.csrf}></input>
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



const buildPage = (water,token) => {    
    
    ReactDOM.render(
      <AddBody options={water} csrf={token}/>,document.getElementById('addWater')
    );
  };
  
const getToken = (water) =>{
    sendAjax('GET','/getToken',null, (result) =>{
        buildPage(water,result.csrfToken);
    });
}

// Get water bodies for the form > get a token > make the component
  window.onload = () =>{
    $.getJSON( "/waterBodies", (data) =>{
        if(data.bodies.length > 0) getToken(data.bodies);
        else{
            window.location.href = '/error'
        }
    });
  };
