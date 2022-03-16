import React from "react";
import styled from "styled-components";
import CustomBarchart from "./custom-barchart";
import { LinePlot } from "d3plus-react";
import store from "../store";
const StyledCustomdiv = styled.div`
  font-size: 33px;
  position: relative;
  color: red;
`;

function CustomSidePanelsFactory() {
  const CustomPanels = (props) => {
    if (props.activeSidePanel === "rocket") {
      return <div className="rocket-panel">Rocket</div>;
    } else if (props.activeSidePanel === "chart") {
      return <div className="rocket-panel">Charts?</div>;
    } else {
      return (
        <StyledCustomdiv>
          <CustomBarchart
            show={true}
            // clickedLayer={this.props.clickedLayer}
          />
        </StyledCustomdiv>
      );
    }

    //return null;
  };

  CustomPanels.defaultProps = {
    panels: [
      {
        id: "rocket",
        label: "Rocket",
      },
      {
        id: "chart",
        label: "Chart",
      },
    ],
    getProps: (props) => ({
      layers: props.layers,
      //data: props,
    }),
  };

  return CustomPanels;
}

export default CustomSidePanelsFactory;
