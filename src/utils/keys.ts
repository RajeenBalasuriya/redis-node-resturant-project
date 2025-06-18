export function getKeyName(...args: string[] ) {
  return `bites:${args.join(":")}`;
}

export function getRestaurantKey(restaurantId: string) {
  return getKeyName("restaurant", restaurantId);
}

export const reviewKeyById=(id:string)=>getKeyName("reviews",id)
export const reviewDetailsById=(id:string)=>getKeyName("review_details",id)

