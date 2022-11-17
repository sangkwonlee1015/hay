import React, { useState } from "react";
import ReactDOM from "react-dom";
import C3Chart from "react-c3js";
import "c3/c3.css";
import axios from 'axios';
import api from '../../api/api';

// import "./styles.css";

// function randomNR(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

const donut = {
  legend: {
    show: false
  },
  size: {
    height: 200
  },
  data: {
    columns: [
      ["data1", 30], 
      ["data2", 120],
    ],
    type: "donut",
    order: null
  },
  tooltip: {
    format: {
      value: function(value, ratio, id, index) {}
    }
  },
  donut: {
    title: `testing%`,
    label: {
      show: false
    }
  },
};

function PieGraph(props) {
  // const [loading, setLoading] = useState(true);
  // const [toggle, setToggle] = useState(true);
  const [data, setData] = useState([["data1", 30], ["data2", 120]]);
  // const changeData = () => {
  // };
  // const isLoaded = () => {
  //   if (loading) setLoading(false);
  // };
  
  const propGraphValue = () => {
    axios.get(api.getVotesResult(props.voteId))
    .then(({data}) => {setData(data.response.voteResultItems)})
  }



  return (
    <div>
      {/* <button onClick={changeData}>change data</button> */}
      <Graph
        data={data}
        tooltip={{
          data1: data[0][0] + ":" + data[0][1],
          data2: data[1][0] + ":" + data[1][1]
        }}
        title={{ title: donut.donut.title }}
      />
    </div>
  );
}

class Graph extends React.Component {
  generateTitle = () => this.props.title;

  generateGraph = () => ({
    data: {
      columns: this.props.data,
      type: "donut",
      order: null
    },
    tooltip: {
      format: {
        value: (value, ratio, id, index) => {
          return this.props.tooltip[id];
        }
      }
    },
    donut: this.props.title
  });

  render() {
    const data = this.generateGraph();
    return <C3Chart {...data} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<PieGraph />, rootElement);

export default PieGraph;