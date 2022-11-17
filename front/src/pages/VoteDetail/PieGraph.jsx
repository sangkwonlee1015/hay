import React, { useState } from "react";
import ReactDOM from "react-dom";
import C3Chart from "react-c3js";
import "c3/c3.css";
import axios from 'axios';
import api from '../../api/api'
import './PieGraph.css'
import { useEffect } from "react";

// import "./styles.css";

// function randomNR(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const donut = {
//   legend: {
//     show: false
//   },
//   size: {
//     height: 200
//   },
//   data: {
//     columns: [
//       ["data1", 30], 
//       ["data2", 120],
//     ],
//     type: "donut",
//     order: null
//   },
//   tooltip: {
//     format: {
//       value: function(value, ratio, id, index) {}
//     }
//   },
//   donut: {
//     title: `testing%`,
//     label: {
//       show: false
//     }
//   },
// };

function PieGraph(props) {
  let { isOpen } = props;
  // const [loading, setLoading] = useState(true);
  // const [toggle, setToggle] = useState(true);
  const [data, setData] = useState([]);
  // const changeData = () => {
  // };
  // const isLoaded = () => {
  //   if (loading) setLoading(false);
  // };

  // useEffect(() => {
  //   console.log("open: ", open);
  // }, [open])

  useEffect(() => {
    propGraphValue();
  }, []);
  
  const propGraphValue = () => {
    axios.get(api.getVotesResult(props.voteId))
    .then(({data}) => {
      let voteResultItems = data.response.voteResultItems;
      voteResultItems.map((item) => {
        if (item.id === props.selection.id) {
          setData([["남", item.statisticsGender[0]], ["여", item.statisticsGender[1]]]);
        }
      });
    })
    .catch((Error) => {
      console.log(Error);
    });
  }



  return (
    <div className='openModal modal' style={{ display: isOpen&&(props.modalItemId===props.selection.id) ? 'block' : 'none'}}>
      {data.length > 0 && <Graph
        data={data}
        tooltip={{
          data1: data[0][0] + ":" + data[0][1],
          data2: data[1][0] + ":" + data[1][1]
        }}
        title={{ title: props.selection.content }}
      />}
      <div className="chartCloseButton">
        <div onClick={props.close}>닫기</div>
      </div>
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