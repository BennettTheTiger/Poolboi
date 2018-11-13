class AddBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           water:'pool',
           isCirlce: true,
           shape: <this.CircleForm/>,
        };
       
      }
    //form for circle shaped water bodies
    CircleForm(){
        return(
            <div className="form-group">
                <label for="diameter">Diameter:</label>
                <input type="number" name="diameter" min="0" max="100" />
                <label for="depth">Depth:</label>
                <input type="number" name="depth" max="50" min="0"/>
            </div>
        );
    };
    //form for rect shape water bodies
    RectForm(){
        return(
        <div className="form-group">
                <label for="width">Width:</label>
                <input type="number" name="width" min="0" max="1000" />
                <label for="length">Length:</label>
                <input type="number" name="length" max="50" min="0"/>
                <label for="depth">Avg Depth:</label>
                <input type="number" name="depth" max="50" min="0"/>
            </div>
        );
    };

    
    //makes form text dynamic for pool or spa NOTE false is a string not a bool
    changeType(e){
        if(e.target.value === 'false') this.setState({water:'Spa'});
        else this.setState({water:'Pool'});
    }

    changeShape(shape){
            shape = shape.target.value;
           if(shape === 'circle') this.setState({shape:<this.CircleForm/>}); 
           if(shape === 'rect') this.setState({shape:<this.RectForm/>}); 
    }

    render(){
    return(
        <div className="container-fluid">
            <h2>Add a new body of water</h2>
            <form>
            <div className="form-group">
                <label for="type">Water Type:</label>
                    <select className="form-control" id="type" onChange={(e) => this.changeType(e)}>
                        <option selected value="true">Pool</option>
                        <option value="false">Spa</option>
                    </select>
            </div>
            <div className="form-group" >
                <label for="waterName">Name:</label>
                <input className="form-control" type="text" id="waterName"/>
            </div>
            <div className="form-group" >
                <label for="zipCode">Water zip code:</label>
                <input className="form-control" type="number" min="0" max="99999" id="zipCode"/>
            </div>
            <div className="form-group" >
                <label for="shape">Shape:</label>
                <select className="form-control" id="type" onChange={(e) => this.changeShape(e)}>
                        <option selected value="circle">Circle</option>
                        <option value="rect">Rectangle</option>
                    </select>
            </div>
            
            {//Dynamicly build in either a circle or rect form
            }
            {this.state.shape}

            <div className="form-group" >
                <label for="gallons"># of Gallons:</label>
                <input className="form-control" type="number" min="0" max="200000" id="gallons"/>
            </div>            

            <div className="form-group">
                <label for="covered">Is the the {this.state.water} exposed to direct sun?</label>
                <input className="form-control" id="notes" type="checkbox" name="covered"/>
            </div>

            <div className="form-group">
                <label for="notes">Notes:</label>
                <textarea className="form-control" id="notes" rows="3"></textarea>
            </div>
            <button>Add New {this.state.water}</button>
            </form>
        </div>
    );  
    } 
};



const init = () => {    
    ReactDOM.render(
      <AddBody/>,document.getElementById('newWaterBody')
    );
  };
  
  window.onload = init;
