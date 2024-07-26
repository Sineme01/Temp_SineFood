import { swiggyData } from "../components/swiggy";
export function filterData(searchText, restaurants) {
  const filterdata = restaurants?.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterdata;
}

//function to sort items.

export function sortByDeliveryTime(filteredRestaurants) {
  const Data = filteredRestaurants;
  Data.sort((a, b) => { return (a?.info?.sla?.deliveryTime - b?.info?.sla?.deliveryTime); });
  console.log(filteredRestaurants);
  return Data;

}

export function sortByRating(filteredRestaurants) {
  // const sortedData =
  filteredRestaurants.sort((a, b) => { return (b?.info?.avgRating - a?.info?.avgRating); });
  // console.log(sortedData);
}

export function sortByPrice(filteredRestaurants) {
  // const sortedData
  filteredRestaurants.sort((a, b) => {
    let fa = a?.info?.costForTwo.toLowerCase(),
      fb = b?.info?.costForTwo.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  // console.log(sortedData);
}

//async
export function getRestaurants() {
  //If I am working at night Swiggy API has not any restaurants so I am using this dummy data.
  return (swiggyData?.data?.cards[2]?.card?.card?.gridElements.infoWithStyle.restaurants);
}