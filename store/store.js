import {combineReducers, configureStore}  from "@reduxjs/toolkit";
import placesReducer from "./placesReducer";

const rootReducer = combineReducers({
  places: placesReducer
});

export const store = configureStore({
  reducer: rootReducer
})