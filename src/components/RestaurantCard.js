//Named Import
// import { Link } from "react-router-dom";
// import image from "../assets/img/burger.jpg";
import { IMG_CND_URL } from "./config";
// import {Link} from "react-router-dom"
const RestaurantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  avgRatingString,
  costForTwo,
  sla,
}) => {
  // const image = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ee5f8e06b300efc07c9fe3f4df40dfc4";
  return (
    <div className="w-72  mx-5 my-5 bg-white-100 rounded-xl hover:border-2 p-2">
      {/* <Link to={"/"}> */}
      <img
        className="object-fill  w-72 h-60   rounded-xl"
        src={IMG_CND_URL + cloudinaryImageId}
        alt="Restaurant"
      ></img>
      {/* </Link> */}
      <h2 className="font-bold text-lg">{name}</h2>
      <h3 className="text-xs flex flex-wrap">{cuisines.join(", ")}</h3>
      {/* <h3 className="text-xs">{area}</h3> */}
      <div className="flex flex-wrap">
        {avgRatingString < "3.5" ? (
          <button className="bg-red-500 rounded-md text-white px-1 py-1 m-1 font-bold font-xs">
            ★ {avgRatingString}
          </button>
        ) : (
          <button className="bg-green-500 rounded-md text-white px-1 py-1 m-1 font-bold font-xs">
            ★ {avgRatingString}
          </button>
        )}
        <h1 className="text-xs font-bold  pt-4">
          {" "}
          ● {sla?.slaString} ● {costForTwo}
        </h1>
      </div>
    </div>
  );
};
export default RestaurantCard;
