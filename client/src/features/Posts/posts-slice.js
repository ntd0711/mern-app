import { createSlice } from '@reduxjs/toolkit';
import { notify } from 'utils/toastify';
import {
  commentPost,
  createPost,
  deletePost,
  fetchPostById,
  fetchPostByUserId,
  fetchPosts,
  fetchTagsPost,
  likePost,
  updatePost,
} from './posts-thunk';

const initialState = {
  postList: [],
  postDetail: {},
  postTags: [],
  loading: false,
  loadingAction: false,
};

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(fetchPostByUserId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPostByUserId.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostByUserId.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(fetchPostById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.postDetail = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(fetchTagsPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTagsPost.fulfilled, (state, action) => {
        state.postTags = action.payload;
        state.loading = false;
      })
      .addCase(fetchTagsPost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postList.push(action.payload.newPost);
        state.postTags = action.payload.allTagsPost;
        notify.success('Create post successfully!');

        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(deletePost.pending, (state, action) => {
        state.loadingAction = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postDeletedId = action.payload;
        state.postList = state.postList.filter((post) => post._id !== postDeletedId);

        state.loadingAction = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loadingAction = false;
      })

      .addCase(likePost.pending, (state, action) => {
        state.loadingAction = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { _id } = action.payload;
        const index = state.postList.findIndex((post) => post._id === _id);
        state.postList.splice(index, 1, action.payload);

        state.loadingAction = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loadingAction = false;
      })

      .addCase(updatePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { _id } = action.payload;
        const index = state.postList.findIndex((post) => post._id === _id);
        state.postList.splice(index, 1, action.payload);
        notify.success('Update post successfully!');

        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(commentPost.pending, (state, action) => {})
      .addCase(commentPost.fulfilled, (state, action) => {
        state.postDetail.comments = action.payload;
      })
      .addCase(commentPost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
      });
  },
});

const { reducer } = postsSlice;

export default reducer;
