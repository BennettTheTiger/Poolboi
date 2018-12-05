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
        //pool test strip gradient array passed to water sliders
        const gradient = [
        '-webkit-linear-gradient(left, #062193 0%,#2d3cac 26%,#4a33a0 50%,#79328e 72%,#79328e 100%)',
        '-webkit-linear-gradient(left, #fdfeaf 0%,#fdfeaf 20%,#b8d78d 50%,#91c378 72%,#3bab5b 100%)',
        '-webkit-linear-gradient(left, #fdfeaf 0%,#79328e 100%)',
        '-webkit-linear-gradient(left, #FAAE2A 0%,#D80823 100%)',
        '-webkit-linear-gradient(left, #E1C32F 0%,#1F525B 100%)',
        '-webkit-linear-gradient(left, #E38223 0%,#79328e 100%)',
        ];
    return(
        <div className="container-fluid" style={{padding: '20px',position:'relative'}}>
            <h2 className="text-center">Add Water Test Results</h2>
            <form id="waterResult">
            <div className="form-group">
                <label for="type">Water Body:</label>
                    <select name="body" className="form-control" id="type">
                        {allOptions}
                    </select>
            </div>
            
            <WaterSlider title="Hardness" min="0" max="1000" step="1" default={this.state.hardness} dataId="hardness" updateParent={this.FormChange} gradient={gradient[0]}/>
            <WaterSlider title="Chlorine" min="0" max="10" step=".1" default={this.state.chlorine}  dataId="chlorine" updateParent={this.FormChange} gradient={gradient[1]}/>
            <WaterSlider title="Free Chlorine" min="0" max="10" step=".1" default={this.state.freeChlorine}  dataId="freeChlorine" updateParent={this.FormChange} gradient={gradient[2]}/>
            <WaterSlider title="PH" min="6.2" max="8.4" step=".01" default={this.state.ph}  dataId="ph" updateParent={this.FormChange} gradient={gradient[3]}/>
            <WaterSlider title="Alkalinity" min="0" max="240" step="1" default={this.state.alkalinity}  dataId="alkalinity" updateParent={this.FormChange} gradient={gradient[4]}/>
            <WaterSlider title="C Acid" min="0" max="300" step="1" default={this.state.cAcid} dataId="cAcid" updateParent={this.FormChange} gradient={gradient[5]}/>
            <input id="csrfToken" type="hidden" name="_csrf" value={this.props.csrf}></input>
            <div className="form-group">
                <label for="notes">Notes:</label>
                <textarea name="notes" className="form-control" id="notes" rows="3" placeholder="Add Notes Here"></textarea>
            </div>
            <button onClick={this.ClearData} className="btn btn-danger">Clear</button>
            <button onClick={this.SubmitData} className="float-right btn-success btn">Save Test Results</button>
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
