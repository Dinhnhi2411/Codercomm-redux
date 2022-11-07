import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { POSTS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getCurrentUserProfile } from "../user/userSlice";


const initialState = {
    isLoading : false,
    error: null,
    postsById: {},
    currentPagePosts: [],
    totalPosts: 0,
}


const slice = createSlice({
    name: "post",
    initialState,
    reducers: {
        
        startLoading(state) {
            state.isLoading = true;
          },

       
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },

        createPostSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const newPost = action.payload;
            if (state.currentPagePosts.length % POSTS_PER_PAGE === 0)
               state.currentPagePosts.pop();
            state.postsById[newPost._id] = newPost;
            state.currentPagePosts.unshift(newPost._id);
            // if (state.currentPagePosts.length < POSTS_PER_PAGE) {
            //   state.postsById[newPost._id] = newPost;
            //   state.currentPagePosts.unshift(newPost._id);
            // }
           
          },
         
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { count, posts } = action.payload;
            posts.forEach((post) => {
                state.postsById[post._id] = post;
                if (!state.currentPagePosts.includes(post._id))
                  state.currentPagePosts.push(post._id);
              });
            state.totalPosts = count; 
                   
          },
    
      
        sendPostReactionSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { postId, reactions } = action.payload;
            state.postsById[postId].reactions = reactions;
        },
        resetPosts(state, action) {
          state.postsById = {};
          state.currentPagePosts = [];
        },
        
    
        deletePostSuccess(state, action) {
          state.isLoading = false;
          state.error = null;
          state.currentPagePosts = state.currentPagePosts.filter(
            (postId) => postId !== action.payload
          );
          delete state.postsById[action.payload];
          state.totalPosts -= 1;
        },
       

        editPostSuccess(state, action) {
          state.isLoading = false;
          state.error = null;
          const editedPost = action.payload;
          state.postsById[editedPost._id].content = editedPost.content;
          state.postsById[editedPost._id].image = editedPost.image;
        },
    },
});

export const editPost = ({ postId, content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.put(`/posts/${postId}`, {
        content,
        image: imageUrl,
      });
      dispatch(slice.actions.editPostSuccess(response.data.data));
      toast.success("Edit post success");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deletePost = (postId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const reponses = await apiService.delete(`/posts/${postId}`);
    dispatch(slice.actions.deletePostSuccess(reponses.data.data._id));
    toast.success("Delete post successfully");
    dispatch(getCurrentUserProfile());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createPost = ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //  upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/posts", {
            content,
            image: imageUrl,
        });
        dispatch(slice.actions.createPostSuccess(response.data.data));
        toast.success("Post successfully");
        dispatch(getCurrentUserProfile());
    } catch(error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }

}

export const getPosts = ({ userId, page, limit = POSTS_PER_PAGE }) =>
async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const params = { page, limit };
        const response = await apiService.get(`/posts/user/${userId}`, {
          params,
        });
        if (page === 1) dispatch(slice.actions.resetPosts());
        dispatch(slice.actions.getPostsSuccess(response.data.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
}

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
       
      });
      // console.log("targetId send post reaction", postId)
      dispatch(
        slice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.data.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export default slice.reducer