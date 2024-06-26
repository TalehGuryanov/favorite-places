import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  places: [],
  location: {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlaces(state, action) {
      state.places = action.payload;
    },
    removePlace(state, action) {
      const index = state.places.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.places.splice(index, 1);
      }
    },
    addLocation(state, action) {
      state.location = {...state.location, ...action.payload}
    },
  }
})

export const {addPlaces, removePlace, addLocation} = placesSlice.actions;
export default placesSlice.reducer;