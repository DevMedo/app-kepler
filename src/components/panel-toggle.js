import React from "react";
import styled from "styled-components";

import { PanelToggleFactory, withState } from "kepler.gl/components";
import { visStateLens } from "kepler.gl/reducers";

import { setMapConfig } from "../reducers";

const StyledPanelToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  background-color: ${(props) => props.theme.sidePanelHeaderBg};
`;

const CustomPanelToggleFactory = (...deps) => {
  const PanelToggle = PanelToggleFactory(...deps);
  const PanelToggleWrapper = (props) => (
    <StyledPanelToggleWrapper>
      <PanelToggle {...props} />
    </StyledPanelToggleWrapper>
  );

  return withState(
    // lenses
    [visStateLens],
    // mapStateToProps
    (state) => ({ mapState: state.keplerGl.map1 }),
    {
      onClickSaveConfig: setMapConfig,
    }
  )(PanelToggleWrapper);
};
CustomPanelToggleFactory.deps = PanelToggleFactory.deps;
export default CustomPanelToggleFactory;
