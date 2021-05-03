import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import axios from 'axios';

// function App() {
//   var data;
//   axios.get("http://localhost:8000/api/products").then((res) => {
//     console.log(res);
//     data = res.data;
//   });

//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { products: "" };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/products").then((res) => {
      console.log(res.data);
      this.setState({ products: res.data });
    })
  }

  render() {
    return (
      <div>
        {this.state.products && this.state.products.map(element => {
          return (<div key={element.id} >
            <h2>{element.productName}</h2>
            <p>{element.unitPrice}</p>
          </div>)
        })}
      </div>
    );
  }
}

export default App;
