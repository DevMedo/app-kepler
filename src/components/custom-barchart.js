import React, { Component, useState, setState, useEffect } from "react";
import { BarChart, LinePlot } from "d3plus-react";
import styled from "styled-components";
import sampleData, { config } from "../data/sample-data";
import { useSelector } from "react-redux";
import store from "../store";
const LineplotContainerDiv = styled.div`
    position: "relative",
    width: "100%",
    height: "250px",
    backgroundColor: "#29323c",
    zIndex: "3",
    color: "#fff",
    fontFamily: "ff-clan-web-pro"
  `;

function CustomBarchart() {
  // class CustomBarchart extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     clickedLayer: null,
  //     changedData: {
  //       Age: "0",
  //       DBH: "0",
  //     },
  //     row1: {},
  //     row2: {},
  //     row3: {},
  //   };
  // }

  // componentDidMount() {

  const [show, setShow] = useState(false);
  const [clickedLayer, setClickedLayer] = useState(null);

  useEffect(() => {
    //console.log(store.getState().app);
    const state = store.getState().app;
    setShow(state.show);
    setClickedLayer(state.clickedLayer);
    console.log(
      "%%%%%%%%%%%%%%%%%%%%%%% STATE CHANGES - useEffect Fired %%%%%%%%%%%%%%%%%%%%%%%"
    );
    console.log(state.show);
    console.log(state.clickedLayer);
    console.log(
      "%%%%%%%%%%%%%%%%%%%%%%% STATE CHANGES - useEffect Fired %%%%%%%%%%%%%%%%%%%%%%%"
    );

    if (show) {
      if (state.clickedLayer == null) {
        this.setState({
          clickedLayer: clickedLayer,
        });
      }
    }
    // }

    //componentDidUpdate() {
    console.log("*******************************************");
    console.log(state.clickedLayerRow);
    console.log("*******************************************");
    // let clickedLayerRow = useSelector((state) => state.clickedLayerRow);
    let clickedLayerRow = state.clickedLayerRow;

    let new_changedData = {
      Age: 0,
      DHB: 0,
    };

    if (clickedLayerRow) {
      clickedLayerRow = clickedLayerRow.split(",");

      new_changedData = {
        Age: clickedLayerRow[8],
        DHB: clickedLayerRow[9],
      };
    }

    if (show) {
      console.log("SHOW IS TRUEEEEEEEEE !!! SHOW IS TRUEEEEEEEEE !!!");
      if (
        JSON.stringify(this.state.changedData) !==
        JSON.stringify(new_changedData)
      ) {
        this.setState({
          clickedLayer: clickedLayer,
          changedData: new_changedData,
        });

        const clr_index = state.clickedLayerRowIndex;
        // console.log(sampleData.data.rows[clr_index][8]);

        this.setState({
          row1: {
            x: sampleData.data.rows[clr_index][8],
            y: sampleData.data.rows[clr_index][9],
          },
          row2: {
            x: sampleData.data.rows[clr_index - 1][8],
            y: sampleData.data.rows[clr_index - 1][9],
          },
        });
      }
    }

    // console.log(this.state.row1.x);
    // console.log(this.state.row1.y);

    // console.log(this.state.row2.x);
    // console.log(this.state.row2.y);
  }, [show, clickedLayer]);

  if (!show) {
    return <div>N</div>;
  } else {
    // console.log(this.state.row1.x);
    // console.log(this.state.row1.y);

    // console.log(this.state.row2.x);
    // console.log(this.state.row2.y);

    return (
      <div>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "250px",
            backgroundColor: "#29323c",
            zIndex: "3",
            color: "#fff",
            fontFamily: "ff-clan-web-pro",
          }}
          // this.state.changedData.Age,
          // this.state.changedData.DHB,
        >
          <div
            style={{
              textAlign: "center",
              width: "100%",
              height: "250px",
            }}
          >
            <BarChart
              config={{
                data: [
                  {
                    id: "",
                    x: "Age",
                    y: 15,
                  },
                  {
                    id: "",
                    x: "DHB",
                    y: 10,
                  },
                ],
                groupBy: "id",
              }}
            />
          </div>
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "250px",
            backgroundColor: "#29323c",
            zIndex: "3",
            color: "#fff",
            fontFamily: "ff-clan-web-pro",
            marginTop: "10px",
          }}
        >
          <LineplotContainerDiv>
            <LinePlot
              style={{ textAlign: "center", width: "100%", height: "250px" }}
              config={{
                data: [
                  {
                    id: "",
                    x: 2,
                    y: 12,
                  },
                  {
                    id: "",
                    x: 3,
                    y: 10,
                  },
                  {
                    id: "",
                    x: 5,
                    y: 3,
                  },
                ],
              }}
            ></LinePlot>
          </LineplotContainerDiv>
        </div>
      </div>
    );
  }
}
//}

// function mapStateToProps(state) {
//   return {
//     show: getShow(state),
//     clickedLayer: getClickedLayer(state),
//   };
// }
export default CustomBarchart;
