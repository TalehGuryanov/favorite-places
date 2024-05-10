import {PlacesList} from "../components/Places/PlacesList";
import {useEffect} from "react";
import {getPlaces, initDatabase} from "../util/database";
import {useDispatch} from "react-redux";
import {addPlaces} from "../store/placesReducer";
import {useSQLiteContext} from "expo-sqlite";

export const AllPlaces = () => {
 const dispatch = useDispatch();
  const db = useSQLiteContext();
 
 useEffect(() => {
   const createTable = async () => {
     try {
       await initDatabase(db);
       const places = await getPlaces(db);
       dispatch(addPlaces(places));
     } catch (err) {
       console.log(err)
     }
   };
   
   
   createTable();
 }, []);
 
 return <PlacesList />
}