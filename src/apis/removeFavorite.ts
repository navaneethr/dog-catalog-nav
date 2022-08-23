import genericDelete from "./genericDelete";
import {IDType} from "../utils/types";

const removeFavorite = (id: IDType): Promise<any> => genericDelete(`https://api.thedogapi.com/v1/favourites/${id}`);

export default removeFavorite;