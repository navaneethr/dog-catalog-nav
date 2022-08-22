import genericPost from "./genericPost";

const postFavorites = (data: any) => genericPost( 'https://api.thedogapi.com/v1/favourites', data );

export default postFavorites;