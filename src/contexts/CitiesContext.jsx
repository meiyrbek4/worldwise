import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

import { auth, db } from "../config/Firebase";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
  isLoadingDelete: false,
  deleteId: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "loadingDelete":
      return {
        ...state,
        isLoadingDelete: true,
        deleteId: action.payload,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "currentCity/get":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoadingDelete: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        deleteId: "",
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Action is unknown");
  }
}

function CitiesProvider({ children }) {
  const citiesCollectionRef = collection(db, "cities");

  const [
    { cities, isLoading, currentCity, deleteId, isLoadingDelete },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function fetchCities() {
    dispatch({ type: "loading" });
    try {
      const data = await getDocs(citiesCollectionRef);
      const fetchedData = data.docs?.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredData = fetchedData?.filter(
        (city) => city.sId === auth.currentUser.uid
      );

      dispatch({ type: "cities/loaded", payload: [...filteredData] });
    } catch {
      dispatch({ type: "rejected", payload: "Data loading failed" });
    }
  }

  useEffect(function () {
    fetchCities();
  }, []);

  useEffect(function () {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCities();
      } else {
        return;
      }
    });
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const cityRef = doc(db, "cities", id);
        const citySnap = await getDoc(cityRef);

        dispatch({
          type: "currentCity/get",
          payload: { ...citySnap.data(), id: citySnap.id },
        });
      } catch {
        dispatch({ type: "error", payload: "Data loading failed" });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const newCityRef = doc(collection(db, "cities"));
      await setDoc(newCityRef, { ...newCity });

      dispatch({ type: "cities/created", payload: { ...newCity } });
      fetchCities();
    } catch {
      dispatch({ type: "error", payload: "City creating failed" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loadingDelete", payload: id });
    try {
      const cityDoc = doc(db, "cities", id);
      await deleteDoc(cityDoc);
      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({ type: "error", payload: "City deleting failed" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        deleteId,
        isLoadingDelete,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context used outside by Cities Provider");
  return context;
}

export { useCities, CitiesProvider };
