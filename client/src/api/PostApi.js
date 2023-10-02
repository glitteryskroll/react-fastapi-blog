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
        return response.data.user;
      } catch (error) {
        console.error('Error:', error);
      }
}


export const addComment = async (comment_text, post_id) => {
  try {
      const data = {comment_text: comment_text, post_id: post_id}
      const response = await axios.post(`${apiUrl}/post/set-comment`, data, {
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

export const loadComments = async (post_id) => {
  try {
      const data = {post_id: post_id}
      const response = await axios.post(`${apiUrl}/post/load-comments`, data, {
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

export const fetchPosts = async (offset) => {
    try {
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

export const fetchPost = async (post_id) => {
  try {
      const response = await axios.get(`${apiUrl}/post/get-post/${post_id}`, null, {
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

export const deletePost = async (post_id) => {
  try {
      const response = await axios.post(`${apiUrl}/post/delete/${post_id}`, null, {
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

export const editPost = async (post_id, post_header, post_text) => {
  try {
      const data = {
        post_header: post_header,
        post_text: post_text
      }
      const response = await axios.put(`${apiUrl}/post/update/${post_id}`, data, {
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