import { useState, useEffect, useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData, getRestaurants, sortByDeliveryTime, sortByPrice, sortByRating } from "../utils/helper";
import { useOnline } from "../utils/useOnline";
import Offline from "./offline"
import { Swiggy_API } from "../components/config";
import FilterButton from "./filterButton";
import { useFilterContext } from "../utils/filterContext";
const Body = () => {
  //In React the below variables are known as state variables.
  const [searchText, setsearchText] = useState(""); //It returns the searchText and setsearchText
  //-> IT will got updated once we write something inside our search box.
  //If we want some bidefault value then we should use like that useState("some_value");

  useEffect(() => {
    if (searchText === "") {
      setFilteredRestaurants(getAllRestaurants);
    } else {
      const Data = filterData(searchText, getAllRestaurants);
      setFilteredRestaurants(Data);
    }
  }, [searchText]);

  //State Variables
  const [getAllRestaurants, setGetAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  useEffect(() => {
    //API Call.
    const data = getRestaurants();
    setGetAllRestaurants(data);
    setFilteredRestaurants(data);
    // getLiveRestaurants();
  }, []);
  // const [varialbe, setVarialbe] = useState(true);

  async function getLiveRestaurants() {
    const data = await fetch(Swiggy_API);
    const json = await data.json();
    //   //replace swiggyData with json once you uncomment above two lines.
    setGetAllRestaurants(json?.data?.cards[2]?.card?.card?.gridElements.infoWithStyle.restaurants);
    setFilteredRestaurants(json?.data?.cards[2]?.card?.card?.gridElements.infoWithStyle.restaurants);
  }

  // This piece of code will be excuted when we don't have internet access.
  const isOnline = useOnline();//This custom hook will return true if it is online else false.

  //This piece of code is written to sort items.

  const { selectedFilter } = useFilterContext();
  // console.log(selectedFilter);
  // useEffect(() => {

  // }, [selectedFilter])
  if (selectedFilter === 'deliveryTime') {
    const deliverySortedData = sortByDeliveryTime(filteredRestaurants);
    if (deliverySortedData !== filteredRestaurants)
      setFilteredRestaurants(deliverySortedData);
    // console.log("all");
    // console.log(getAllRestaurants);
  }
  else if (selectedFilter === 'rating') {
    sortByRating(filteredRestaurants);
  }
  else if (selectedFilter === 'price') {
    sortByPrice(filteredRestaurants);
  }
  // else {
  //   if (filteredRestaurants !== getAllRestaurants) {
  //     setFilteredRestaurants(getAllRestaurants);
  //   }
  // }
  if (!isOnline) {
    return (
      <>
        <Offline />
      </>
    );
  }
  //Conditional Rendering
  // If our data is not fetched from API yet then the Shimmer UI will be loaded.
  return getAllRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="p-5 bg-white-100 my-2 mx-96 flex flex-wrap">
        <input
          type="text"
          className="px-2 w-[600] py-1 italic border-2"
          placeholder="Search for restaurant....."
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
        ></input>
        {/* It is two way binding in React.*/}
        {/* <h1>{searchText}</h1> */}
        {/* <button
          className="px-3 py-[5.5] bg-purple-500 hover:bg-green-600 text-white rounded-r-lg"
          onClick={() => {
            if (searchText === "") {
              setFilteredRestaurants(getAllRestaurants);
            } else {
              const Data = filterData(searchText, getAllRestaurants);
              setFilteredRestaurants(Data);
            }
          }}
        >
          Search
        </button> */}
        <div className="px-3 bg-purple-500 hover:bg-green-600 rounded-r-xl">
          <FilterButton ></FilterButton>

        </div>
      </div>
      <div className="flex flex-wrap mx-24">
        {filteredRestaurants?.map((restaurant) => {
          return (
            <>
              {restaurant.info.isOpen === true ? (<Link
                to={"restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>) : (<Link
                to={'#'}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>)}

            </>
          );
        })}
      </div>
    </>
  );
};

export default Body;