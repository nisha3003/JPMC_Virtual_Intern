import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,//added showGraph property with boolean type in the interface
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,//This property of the App state is set to false as we want the graph to show when the user clicks the button
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph){//To ensure that the graph doesn't render until a user clicks the button
      return (<Graph data={this.state.data}/>)//Adding a condition to render the graph when the showGraph property is true 
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  //Modified to contact the server and get data from it continuously instead of just getting data from it once you click the button
  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {//To get continuous data from the server in a certain interval
      DataStreamer.getData((serverResponds: ServerRespond[]) => {//Get data from the server when the process is complete
        // Update the state by creating a new array of data that consists of
        // Previous data in the state and the new data from server
        //Call back function to be implemented after the process
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    },100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
