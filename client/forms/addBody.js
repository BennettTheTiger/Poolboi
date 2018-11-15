class AddBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           water:'Pool',
           isCirlce: true,
           shape: <this.CircleForm/>,
        };
       this.makeWaterBody = this.makeWaterBody.bind(this);
      }

    //form for circle shaped water bodies
    CircleForm(){
        return(
            <div className="form-group">
                <label for="diameter">Diameter:</label>
                <input type="number" name="diameter" min="0" max="100" id="diameter"/>
                <label for="depth">Depth:</label>
                <input type="number" name="depth" max="50" min="0" id="depth"/>
                <label>In feet</label>
            </div>
        );
    };
    //form for rect shape water bodies
    RectForm(){
        return(
        <div className="form-group">
                <label for="width">Width:</label>
                <input type="number" name="width" min="0" max="1000" id="width"/>
                <label for="length">Length:</label>
                <input type="number" name="length" max="1000" min="0" id="length"/>
                <label for="depth">Avg Depth:</label>
                <input type="number" name="depth" max="100" min="0" id="depth"/>
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

    //calculate area in ft squared and volume gallons for cicle and square pools
    calcArea(){
        if(document.querySelector('#type').value === 'circle'){
            const rad = $('#diameter').val()/2;
            //diameter error out
            if(rad == ""){
                window.alert('Please enter a diameter');
                $('#diameter').focus();
                return false;
            }  
            const depth = $('#depth').val();
            //rad error out
            if(depth == ""){
                window.alert('Please enter a radius');
                $('#depth').focus();
                return false;
            }  
            const area = Math.round(Math.PI * (rad * rad));
            let volume = area * depth;
            volume = Math.ceil(volume * 7.48052);//convert ft3 to gallons
            return({area:area,volume:volume});
        }
        else{
            //validate inputs
            if($('#width').val() == ""){
                window.alert('Please enter a width');
                $('#width').focus();
                return false;
            } 
            if($('#length').val() == ""){
                window.alert('Please enter a length');
                $('#length').focus();
                return false;
            }  
            if($('#depth').val() == ""){
                window.alert('Please enter a depth');
                $('#depth').focus();
                return false;
            }  
            //do calcs
            const area = $('#width').val() * $('#length').val();
            let volume = Math.round(area * $('#depth').val());
            volume = Math.ceil(volume * 7.48052);//convert ft3 to gallons
            console.log('area:' + area, 'volume:' + volume);
            return({area:area,volume:volume});
        }
    }

    makeWaterBody(e){
        e.preventDefault();
        //get form values as a json object
        let clientData = {};
        clientData.isPool = $('#waterType').val();
        clientData.name = $('#waterName').val();
        clientData.zip = $('#zipCode').val();
        clientData.notes = $('#bodyNotes').val();
        clientData.inSun = $('#sun').is(':checked');
        clientData.owner = this.props.user._id;
        //validate data
        if(clientData.name == ""){
            window.alert('Please give your ' + this.state.water + ' a name.');
            $('#waterName').focus(); 
            return;
        }
        
        const fluidData = this.calcArea();
        if(fluidData === false){
            window.alert('Please check your ' + this.state.water + 's size values.');
            return; //if a field was not in fluid data abort submiting 
        }      
        clientData.gallons = fluidData.volume;
        clientData.area = fluidData.area;
        console.log(JSON.stringify(clientData));
   
       $.ajax({
        url: '/addWaterBody',
        type: 'POST',
        headers:{'X-CSRF-Token': this.props.csrf},
        dataType: 'json',
        success: (success) =>{
            console.dir(success);
            window.location.href = '/dashboard'; 
        },
        data: clientData
    });
        
    }

    render(){
    return(
        <div className="container-fluid">
            <h2>Add a new body of water</h2>
            <form id="waterBody" 
                 onSubmit={this.makeWaterBody}
                 name="waterBodyForm"
                 action="/newBody"
                 method="POST"
                 className="waterBodyForm"
            >
            <div className="form-group">
                <label for="type">Water Type:</label>
                    <select className="form-control" id="waterType" onChange={(e) => this.changeType(e)}>
                        <option selected value="true">Pool</option>
                        <option value="false">Spa</option>
                    </select>
            </div>
            <div className="form-group" >
                <label for="waterName">Name:</label>
                <input className="form-control" type="text" id="waterName" defaultValue={this.props.user.username + 's-' + this.state.water}/>
            </div>
            <div className="form-group" >
                <label for="zipCode">Water zip code:</label>
                <input className="form-control" type="number" min="0" max="99999" id="zipCode" defaultValue={this.props.user.zip} />
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

                    
            <div className="form-group">
                <label for="covered">Is the the {this.state.water} exposed to direct sun?</label>
                <input className="form-control" type="checkbox" name="covered" id="sun" defaultValue="false"/>
            </div>

            <div className="form-group">
                <label for="notes">Notes:</label>
                <textarea className="form-control" id="bodyNotes" rows="3" defaultValue=""></textarea>
            </div>
            <input id="csrfToken" type="hidden" name="_csrf" value={this.props.csrf}></input>
            <input type="submit" value={'Add New ' + this.state.water}></input>
            </form>
        </div>
    );  
    } 
};


const createPage = (token,user) =>{
    ReactDOM.render(
        <AddBody csrf={token} user={user}/>,document.getElementById('newWaterBody')
      );
}

const getAccount = (token) =>{
    sendAjax('GET','/accountInfo',null, (result)=>{
        createPage(token,result);
      });
}

const getToken = () =>{
    sendAjax('GET','/getToken',null, (result)=>{
      getAccount(result.csrfToken);
    });
};
//get token > get account > pass as props in createPage
window.onload = getToken;
