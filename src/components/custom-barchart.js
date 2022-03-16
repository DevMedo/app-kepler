import React, { Component, useState, setState, useEffect } from "react";
import { BarChart, LinePlot } from "d3plus-react";
import styled from "styled-components";
import sampleData, { config } from "../data/sample-data";
import { useSelector } from "react-redux";

const LineplotContainerDiv = styled.div`
    position: "relative",
    width: "100%",
    height: "250px",
    backgroundColor: "#29323c",
    zIndex: "3",
    color: "#fff",
    fontFamily: "ff-clan-web-pro"
  `;

function CustomSidePanelsFactory() {
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

  componentDidMount() {
    if (this.props.show) {
      if (this.state.clickedLayer == null) {
        this.setState({
          clickedLayer: this.props.clickedLayer,
        });
      }
    }
  }

  componentDidUpdate() {
    console.log("*******************************************");
    console.log(this.state.clickedLayerRow);
    console.log("*******************************************");
    let clickedLayerRow = useSelector(state => state.clickedLayerRow);
    
    clickedLayerRow = clickedLayerRow.split(",");
    const new_changedData = {
      Age: clickedLayerRow[8],
      DHB: clickedLayerRow[9],
    };
    //console.log(this.props);

    if (this.props.show) {
      if (
        JSON.stringify(this.state.changedData) !==
        JSON.stringify(new_changedData)
      ) {
        // console.log(this.props.clickedLayer.object);
        // console.log(this.props);
        this.setState({
          clickedLayer: this.props.clickedLayer,
          changedData: new_changedData,
        });
        // console.log(this.props.clickedLayer.object.data[1]);

        const clr_index = this.state.clickedLayerRowIndex;
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
  }

  render() {
    if (!this.props.show) {
      return <div />;
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
                      y: this.state.changedData.Age,
                    },
                    {
                      id: "",
                      x: "DHB",
                      y: this.state.changedData.DHB,
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
}

export default CustomBarchart;
