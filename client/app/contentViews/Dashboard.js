class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {username:'UserName'},//placeholder replaced on page load
            mainContent: <MainView weather={props.weather} bodies={props.bodies}/>,
        };

        this.changeContent = this.changeContent.bind(this);

      }
     
      changeContent(newElement){
        this.setState({mainContent: newElement});
      };


      render() {
        return (
          <div className="container-fluid">
            <DashNav account={this.props.account} weather={this.props.weather} bodies={this.props.bodies} newContent={this.changeContent}/>
            <section>{this.state.mainContent}</section>
          </div>
        );
      }
}

const init = (data) => {  
  //get water bodies too  
  let waterBodies;
  
    ReactDOM.render(
      <Dashboard weather={data.weather} account={data.account} bodies={data.body}/>,document.getElementById('dashboard')
    );
  };

  const getWaterBodies = (account,weather) =>{
    sendAjax('GET','/waterBodies',null,(bodyData) => {
      let data = {};
      data.body = bodyData.bodies;
      data.weather = weather;
      data.account = account;
      init(data)
    });
  }

  //want to make this use take a json 
  const getWeather = (account) =>{
    sendAjax('GET','/weather',null,(weatherData) => {
      getWaterBodies(account,weatherData)
    });
};

  const getAccount = () =>{
    sendAjax('GET','/accountInfo',null,(accountData) => {
      getWeather(accountData);
    });
  
  }

 //get an account > get water bodies > get weather give this to the dashboard as props
  window.onload = () =>{
   getAccount();
  };
