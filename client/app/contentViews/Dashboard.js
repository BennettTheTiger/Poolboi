

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {username:'UserName'},//placeholder replaced on page load
            mainContent: <MainView weather={props.weather}/>,
        };

        this.changeContent = this.changeContent.bind(this);

      }
      componentWillMount(){
        //load account info
        sendAjax('GET','/accountInfo',null,(data) => {
          this.setState({userData: data});
        });
        
      }
      changeContent(newElement){
        this.setState({mainContent: newElement});
      };


      render() {
        return (
          <div className="container-fluid">
            <DashNav account={this.state.userData} weather={this.props.weather} newContent={this.changeContent}/>
            <section>{this.state.mainContent}</section>
          </div>
        );
      }
}



const init = (data) => {    
    ReactDOM.render(
      <Dashboard weather={data}/>,document.getElementById('dashboard')
    );
  };
  
  window.onload = () =>{
    sendAjax('GET','/weather',null, (result) => {
      console.dir(result);
      init(result);
    });   
  };
