import config from "../config";
import axios from "axios";

const apiUrl = config.backendUrl;

export const addPost = async (post_header, post_text) => {
    try {
        const data = {post_header: post_header, post_text:post_text}
        console.log(data)
        const response = await axios.post(`${apiUrl}/post/add-post`, data, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true  // for sending credentials (cookies)
        });
        console.log('good')
        return response.data.user;
      } catch (error) {
        console.error('Error:', error);
      }
}

export const fetchPosts = async () => {
    try {
        const offset = 10;
        const response = await axios.post(`${apiUrl}/post/get-posts/${offset}`, null, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true  // for sending credentials (cookies)
        });

        return response.data;
        
      } catch (error) {
        console.error('Error:', error);
      }
}