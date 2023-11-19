import { LoginForm } from '@/pages/Login';
import { setToken as _setToken, getToken, request } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    }
  }
});

const { setToken } = userStore.actions;

export const userReducer = userStore.reducer;

// 编写异步方法
const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: any) => {
    const res = await request.post('/authorizations', loginForm);

    dispatch(setToken(res.data.token));
  };
};

export { setToken, fetchLogin };

export default userReducer;
