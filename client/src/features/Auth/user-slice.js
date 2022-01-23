import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from 'utils/common';
import { notify } from 'utils/toastify';
import { login, logout, register, unsetAvatar, updateAvatar, updateInfo } from './user-thunk';

const initialState = {
  profile: getLocalStorage('user') || null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.profile = null;
    //   state.token = null;
    //   localStorage.removeItem('user');
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('refreshToken');
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.user;
        state.token = action.payload.token;
        // localStorage.setItem('profile', JSON.stringify(action.payload));
        setLocalStorage('user', action.payload.user);
        setLocalStorage('token', action.payload.token);
        setLocalStorage('refreshToken', action.payload.refreshToken);

        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.profile = null;
        state.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.profile = action.payload?.user;
        state.token = action.payload?.token;

        setLocalStorage('user', action.payload.user);
        setLocalStorage('token', action.payload.token);
        setLocalStorage('refreshToken', action.payload.refreshToken);

        notify.success('register account successfully!');
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(updateInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.profile = action.payload.user;

        setLocalStorage('user', action.payload.user);
        notify.success('update info successfully!');

        state.loading = false;
      })
      .addCase(updateInfo.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(unsetAvatar.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(unsetAvatar.fulfilled, (state, action) => {
        state.profile = action.payload.user;

        setLocalStorage('user', action.payload.user);
        notify.success('unset avatar!');

        state.loading = false;
      })
      .addCase(unsetAvatar.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(updateAvatar.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.profile = action.payload.user;
        setLocalStorage('user', action.payload.user);
        notify.success('update avatar successfully!');

        state.loading = false;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      });
  },
});

const { reducer, actions } = userSlice;
// export const { logout } = actions;

export default reducer;
