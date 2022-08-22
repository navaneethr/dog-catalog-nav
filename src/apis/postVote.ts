import genericPost from "./genericPost";

const postVote = (data: any) => genericPost( 'https://api.thedogapi.com/v1/votes', data);

export default postVote;