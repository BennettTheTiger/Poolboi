

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {username:'UserName'},//placeholder replaced on page load
            mainContent: <MainView/>,
        };

        this.changeContent = this.changeContent.bind(this);

      }
      componentDidMount(){
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
            <DashNav csrf='test' account={this.state.userData} newContent={this.changeContent}/>
            {this.state.mainContent}
          </div>
        );
      }
}



const init = () => {    
    ReactDOM.render(
      <Dashboard/>,document.getElementById('dashboard')
    );
  };
  
  window.onload = init;
