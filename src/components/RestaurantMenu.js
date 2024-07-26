import { useParams } from "react-router-dom";
import Menu_button from "../utils/Menu_button"
import Shimmer from "./shimmerResMenu";
import { IMG_CND_URL } from "./config";
import useRestaurant from "../utils/useRestaurant";
import veg_icon from "../assets/img/veg_icon.png"
import non_veg_icon from "../assets/img/non_veg_icon.png"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
// import filterbutton from "./filterButton";
// import page from "../assets/img/page_not_found.png";
import Modal from "./modal.js";

const RestaurantMenu = () => {


  const [cntRecommended, setCntRecommended] = useState(0);


  //Reading dynamic URL params.
  const restaurantId = useParams(); //It returns an object -> {id:"#$@^%&&**^"}

  const [restaurantInfo, resMenu] = useRestaurant(restaurantId); //Self Created hook that lets you to fetch restaurantInfo and resMenu from swiggy's API.
  const [vegFilteredItem, setVegFilteredItem] = useState(null);
  useEffect(() => {
    setVegFilteredItem(resMenu);
  }, [resMenu]);
  const [filterVeg, setFilterVeg] = useState(false);
  const handleChange = (event) => {
    setFilterVeg(event.target.checked);
  };
  function filter_veg_item(resMenu) {
    const filterData = resMenu?.filter((item) => item?.isVeg === 1);
    return filterData;
  };

  useEffect(() => {
    if (filterVeg === false) {
      setVegFilteredItem(resMenu);
    }
    else {
      const filterData = filter_veg_item(resMenu);
      setVegFilteredItem(filterData);
    }
  }, [filterVeg]);
  // console.log(filterVeg);
  // console.log(vegFilteredItem);




  return vegFilteredItem === null ? (
    <Shimmer />
  ) : (
    <div className="">
      <div className="bg-black text-white flex p-10">
        {/* <h1>
          Restaurant ID{" : "} {restaurantId?.id}
        </h1> */}
        <img
          // 
          className="rounded-xl pl-72 w-[450]"
          src={IMG_CND_URL + restaurantInfo?.cloudinaryImageId}
          alt="Restaurant Image"
        />
        <div className="ml-24">
          <h2 className=" text-4xl mt-10">{restaurantInfo?.name}</h2>
          {/* <h3>{restaurantInfo?.area}</h3> */}
          <div className="flex mt-8">
            {/* <h3>{restaurantInfo?.city}</h3> */}
            {restaurantInfo?.avgRating < 3.5 ? (
              <div className="flex flex-wrap ">
                <h1 className="bg-red-500 rounded-md text-white px-1 py-1 m-1 font-bold font-xs ">
                  ★ {restaurantInfo?.avgRating}
                </h1></div>
            ) : (
              <div className="flex flex-wrap ">
                <h1 className="bg-green-500 rounded-md text-white px-1 py-1 m-1 font-bold font-xs ">
                  ★ {restaurantInfo?.avgRating}
                </h1></div>
            )}
            <h3 className="mx-5 mt-2">|</h3>
            <h3 className=" mt-2 font-semibold">{restaurantInfo?.costForTwoMessage}</h3>
          </div>
        </div>
      </div>
      <div className="mt-20 mx-80">
        <div>
          <h1 className="font-bold text-2xl">Recommended = {cntRecommended}</h1>
          {/* switch */}
          <Switch
            checked={filterVeg}
            onChange={handleChange}
            // inputProps={{ 'aria-label': 'controlled' }}
            color="success"
          />
        </div>
        <h1 className="text-gray-500 mt-2">{vegFilteredItem?.length} Items</h1>
        {vegFilteredItem?.length === 0 ? (<h1 className="italic font-semibold bg-slate-300 rounded-md ml-10 mt-5 text-orange-500   p-2">
          Uh-oh! The outlet is not accepting orders at the moment. We're working to get them back online
        </h1>) : (null)}
        <ul>
          {vegFilteredItem.map((item) => (
            <li key={item.id} className="border-b-2">
              <div className="mt-5">
                {item.isVeg === 1 ? (<img src={veg_icon}></img>) : (<img src={non_veg_icon}></img>)}
                <h1 className="font-bold">{item?.name}</h1>
                {/* <h1 className="text-sm text-gray-400 mt-5">{item?.description}</h1> */}
                {/* <h1>{item?.ratings?.aggregatedRating?.rating}    Votes {item?.ratings?.aggregatedRating?.ratingCount}</h1> */}
                <Rating
                  name="rating"
                  value={parseFloat(item?.ratings?.aggregatedRating?.rating)}
                  precision={0.1} // Customize precision as needed
                  emptyIcon={<StarIcon style={{ opacity: 0.4 }} />}
                  icon={<StarIcon />}
                  readOnly // Make the rating read-only
                />
                <h1 className="font-semibold mt-2"> {"\u20B9"} {item.price / 100}</h1>
              </div>
              <div className="flex justify-end items-end">
                <img src={IMG_CND_URL + item?.imageId} alt="" className=" w-36 h-32 rounded-lg shadow-md mb-1"></img>
              </div>
              <div className="flex justify-end items-end mb-2">
                <Menu_button
                  onAdd={() => setCntRecommended(cntRecommended + 1)}
                  onRemove={() => setCntRecommended(cntRecommended - 1)}
                />
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
