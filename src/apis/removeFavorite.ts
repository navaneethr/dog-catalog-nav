import genericDelete from "./genericDelete";
import {IDType} from "../utils/types";

const removeFavorite = (data: any, id: IDType) => genericDelete( `https://api.thedogapi.com/v1/favourites/${id}`, data );

export default removeFavorite;