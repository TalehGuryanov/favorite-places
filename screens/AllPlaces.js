import {PlacesList} from "../components/Places/PlacesList";
import {useEffect} from "react";
import {getPlaces} from "../util/database";
import {useDispatch} from "react-redux";
import {addPlaces} from "../store/placesReducer";

export const AllPlaces = () => {
 const dispatch = useDispatch();
 
 useEffect(() => {
  getPlaces()
     .then((resolve) => {
       dispatch(addPlaces(resolve.rows._array));
     })
     .catch((err) => console.log(err));
 }, []);
 
 return <PlacesList />
}