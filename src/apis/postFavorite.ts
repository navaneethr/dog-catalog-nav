import genericPost from "./genericPost";

const postFavorites = (imageId: any) => genericPost( 'https://api.thedogapi.com/v1/favourites', imageId );

export default postFavorites;