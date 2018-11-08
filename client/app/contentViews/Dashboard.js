

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Username',
            mainContent: <AccountView/>,
        };
        this.changeContent = this.changeContent.bind(this);

      }

      changeContent(newElement){
        this.setState({mainContent: newElement});
      };


      render() {

        

        return (
          <div>
            <h1>Hello {this.state.name}</h1>
            <DashNav csrf='test' newContent={this.changeContent}/>
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
