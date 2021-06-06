import axios from "axios";
const KEY = `${process.env.REACT_APP_YOUTUBE_KEY}`;
export default axios.create({
  baseURL: `${process.env.REACT_APP_YOUTUBE_URL}`,
  params: {
    part: "snippet",
    maxResults: 10,
    key: KEY,
  },
  headers: {},
});
