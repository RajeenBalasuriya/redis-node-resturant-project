export function getKeyName(...args: string[] ) {
  return `bites:${args.join(":")}`;
}

export function getRestaurantKey(restaurantId: string) {
  return getKeyName("restaurant", restaurantId);
}

