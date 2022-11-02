import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { POSTS_PER_PAGE } from "../../app/config";


const initialState = {
    isLoading : false,
    error: null,
    postsById: {},
    currentPagePosts: [],
}

const slice = createSlice({
    name: "post",
    initialState,
    reducers: {
        // start Loading
        startLoading(state) {
            state.isLoading = true;
          },

        //   has Error
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },

        //   
        // resetPosts(state, action) {
        //     state.postsById = {};
        //     state.currentPagePosts = [];
        //   },
        // 
        createPostSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const newPost = action.payload;
            if (state.currentPagePosts.length % POSTS_PER_PAGE === 0)
        state.currentPagePosts.pop();
            state.postsById[newPost._id] = newPost;
            state.currentPagePosts.unshift(newPost._id);
            
          
          },
        //  
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
        // 
        sendPostReactionSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { postId, reactions } = action.payload;
            state.postsById[postId].reactions = reactions;
        },
    },
});

export const createPost = ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post("/posts", {
            content,
            image,
        });
        dispatch(slice.actions.createPostSuccess(response.data.data));
        toast.success("Post successfully");
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
        // if (page === 1) dispatch(slice.actions.resetPosts());
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