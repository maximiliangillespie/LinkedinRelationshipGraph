//The frontend react app to display the graph data from the 
//express backend using react-d3-graph library.

import React, { Component } from 'react';
import './App.css';
import { Graph } from "react-d3-graph";
import axios from 'axios';

// specifications of the graph. This can be customised to whatever you want. Eg. colour/size of nodes.
// refer to react-d3-graph.js documentation for more info.
const myConfig = {
    nodeHighlightBehavior: true,
    directed: true,
    node: {
        color: "#236fff",
        size: 120,
        highlightStrokeColor: "#236fff",
        fontSize: 16,
        highlightFontSize: 24,
    },
    link: {
        highlightColor: "lightblue",
    },
    
};

// graph event callbacks
// These functions are currently blank but can be modified for many
// purposes such as showing info about the node when it is clicked.
const onClickGraph = function() {
    //when graph is clicked 
};

const onClickNode = function(nodeId) {
    //when a node is clicked
};

const onDoubleClickNode = function(nodeId) {
    //when a node is double clicked
};

const onRightClickNode = function(event, nodeId) {
    //when a node is right clicked
};

const onMouseOverNode = function(nodeId) {
    //when mouse is over node
};

const onMouseOutNode = function(nodeId) {
    //when mouse out node
};

const onClickLink = function(source, target) {
    //when link is clicked
};

const onRightClickLink = function(event, source, target) {
    //when link is right clicked
};

const onMouseOverLink = function(source, target) {
    //when mouse is over link
};

const onMouseOutLink = function(source, target) {
    //when mouse out link bwn source and target
};

const onNodePositionChange = function(nodeId, x, y) {
    //when node is moved to new position (x, y)
};

class App extends Component {
    state = {
        // For some reason i had to initialise the data value to something otherwise it was giving error (data value was null even though it had loaded in). 
        // PRs to fix this are welcome.
        data: JSON.parse('{"nodes":[{"id":"X"},{"id":"Y"}],"links":[{"source":"X","target":"Y"}]}'),
        tagged: false, 
        input1: 'http://localhost:5000/backend', // URL FOR BACKEND
        input2: 'MATCH (p:person)-[:visited]->(c:country) RETURN p,c',
    };
  
    handleClick(e) {
        // access input values in the state
        
        this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
        
        this.setState({tagged: true});

        e.preventDefault();
    }

    handleInputChange = (e, name) => {
      this.setState({
       [name]: e.target.value
     })
    }


    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js)
    callBackendAPI = async () => {
        axios.post(
            this.state.input1,
            {
                message: this.state.input2
            },
            {
                headers: {  
                    "Content-type": "application/json",
                },                    
            }
        );
        const response = await fetch(this.state.input1);
        const body = await response.json();
        if (response.status !== 200 && body.message.express !== undefined) {
            throw Error(body.message);
        }
        return body;
    };

    render() {
    
        return (
            <div className="App">
                <input style={{width: "50%"}} placeholder="MATCH (p:person)-[:visited]->(c:country) RETURN p,c" type="text" onChange={(e) => this.handleInputChange(e, 'input2')}></input><br></br>
                <button onClick={(e) => this.handleClick(e)}>send</button>
                {
                this.state.data 
                ?
                <Graph
                    id="graph-id" 
                    data={this.state.data}
                    config={myConfig}
                    onClickNode={onClickNode}
                    onDoubleClickNode={onDoubleClickNode}
                    onRightClickNode={onRightClickNode}
                    onClickGraph={onClickGraph}
                    onClickLink={onClickLink}
                    onRightClickLink={onRightClickLink}
                    onMouseOverNode={onMouseOverNode}
                    onMouseOutNode={onMouseOutNode}
                    onMouseOverLink={onMouseOverLink}
                    onMouseOutLink={onMouseOutLink}
                    onNodePositionChange={onNodePositionChange}
                    />
                    :
                    <text>no graph data found</text>
                }
            </div>
        );
    }
}

export default App;