// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { combineReducers } from "redux";
import { createAction, handleActions } from "redux-actions";
import { ActionTypes } from "kepler.gl/actions";
import { routerReducer } from "react-router-redux";
import keplerGlReducer from "kepler.gl/reducers";
import KeplerGlSchema from "kepler.gl/schemas";

const customKeplerReducer = keplerGlReducer
  .plugin({
    // 1. as reducer map
    HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        readOnly: !state.uiState.readOnly,
      },
    }),
  })
  .plugin(
    handleActions(
      {
        // 2. as reducer
        HIDE_MAP_CONTROLS: (state, action) => ({
          ...state,
          uiState: {
            ...state.uiState,
            //  mapControls: hiddenMapControl
          },
        }),
      },
      {}
    )
  );

// INITIAL_APP_STATE
const initialAppState = {
  appName: "example",
  loaded: false,
  isLayerClicked: false,
  clickedLayer: null,
  clickedLayerRow: null,
  clickedLayerRowIndex: null,
  show: false,
};

// CONSTANTS
export const INIT = "INIT";
export const SET_MAP_CONFIG = "SET_MAP_CONFIG";

// ACTIONS
export const appInit = createAction(INIT);
export const setMapConfig = createAction(SET_MAP_CONFIG);

const reducers = combineReducers({
  keplerGl: customKeplerReducer,
  app: handleActions(
    {
      //   you can put your app reducer here
      [ActionTypes.LAYER_CLICK]: (state, action) => ({
        ...state,
        isLayerClicked: action.payload.info.object ? true : false,
        clickedLayer: action.payload.info.object,
        //show: true,
      }),
      [INIT]: (state, action) => ({
        ...state,
        loaded: true,
      }),
      [SET_MAP_CONFIG]: (state, action) => ({
        ...state,
        mapConfig: KeplerGlSchema.getConfigToSave(action.payload),
      }),
    },
    initialAppState
  ),
  routing: routerReducer,
});

export default reducers;

// Copyright (c) 2022 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
