import "./App.css";

// Copyright (c) 2018 Uber Technologies, Inc.
// import "dotenv/config";
// import express from "express";
import React, { Component, useState, setState, useEffect } from "react";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
// import KeplerGl from "kepler.gl";
import nycTripsSubset from "./data/nyc-subset.csv";
import nycConfig from "./data/nyc-config.json";
import sampleData, { config } from "./data/sample-data";
// Kepler.gl actions
import { addDataToMap } from "kepler.gl/actions";
// Kepler.gl Data processing APIs
import Processors from "kepler.gl/processors";
// Kepler.gl Schema APIs
import KeplerGlSchema from "kepler.gl/schemas";

import {
  SidebarFactory,
  PanelHeaderFactory,
  PanelToggleFactory,
  CustomPanelsFactory,
  MapPopoverFactory,
  injectComponents,
} from "kepler.gl/components";

import CustomSidebarFactory from "./components/side-bar";
import CustomPanelHeaderFactory from "./components/panel-header";
import CustomPanelToggleFactory from "./components/panel-toggle";
import CustomSidePanelsFactory from "./components/custom-panel";
import CustomMapPopoverFactory from "./components/custom-map-popover";
import CustomBarchart from "./components/custom-barchart";
import store from "./store";
// Inject custom components
const KeplerGl = injectComponents([
  [SidebarFactory, CustomSidebarFactory],
  [PanelHeaderFactory, CustomPanelHeaderFactory],
  [PanelToggleFactory, CustomPanelToggleFactory],
  [CustomPanelsFactory, CustomSidePanelsFactory],
  [MapPopoverFactory, CustomMapPopoverFactory],
]);

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; // eslint-disable-line
class App extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = store.getState().app;
  }

  
  componentDidMount() {
    this.setState(this.props.app);
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    // const data = Processors.processCsvData(nycTripsSubset);
    // // Create dataset structure
    // const dataset = {
    //   data,
    //   info: {
    //     // `info` property are optional, adding an `id` associate with this dataset makes it easier
    //     // to replace it later
    //     id: "my_data",
    //   },
    // };
    // console.log(dataset);
    // addDataToMap action to inject dataset into kepler.gl instance
    this.props.dispatch(addDataToMap({ datasets: sampleData, config: config }));
    console.log("PROPS");
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log("this.props.app.clickedLayer :");
    console.log(this.props.app.clickedLayer);

    console.log("------------------------------");
    if (this.props.app.clickedLayer !== null) {
      if (this.state.clickedLayer !== this.props.app.clickedLayer) {
        console.log("Done, is Layer Clicked");
        console.log(this.state.isLayerClicked);
        console.log("So what is the Clicked Layer");
        console.log(this.state.clickedLayer);

        const cl_y_value = this.props.app.clickedLayer.position[1];
        const found = sampleData.data.rows.find(
          (element) => element[10] === cl_y_value
        );

        this.setState({
          isLayerClicked: this.props.app.isLayerClicked,
          clickedLayer: this.props.app.clickedLayer,
          clickedLayerRow: found,
          clickedLayerRowIndex: this.props.app.clickedLayer.index,
        });
        
      }
    } else {
      console.log("Props is NULL BOYYYYYYYYYYYYYY");
      return null;
    }

    console.log("THIS . STATE")
    console.log(this.state)
  }

  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  getMapConfig() {
    // retrieve kepler.gl store
    const { keplerGl } = this.props;
    // retrieve current kepler.gl instance store
    const { map } = keplerGl;

    // create the config object
    return KeplerGlSchema.getConfigToSave(map);
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          minHeight: "70vh",
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

// export default App;

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
