import genericPost from "./genericPost";
import {IDType} from "../utils/types";

const postFavorites = (imageId: IDType): Promise<any> => genericPost('https://api.thedogapi.com/v1/favourites', imageId);

export default postFavorites;