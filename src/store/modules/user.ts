import { LoginForm } from '@/pages/Login';
import { setToken as _setToken, getToken, removeToken, request } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = '';
      state.userInfo = {};
      removeToken();
    }
  }
});

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

export const userReducer = userStore.reducer;

// 登录
const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: any) => {
    const res = await request.post('/authorizations', loginForm);

    dispatch(setToken(res.data.token));
  };
};

// 获取个人用户信息
const fetchUserInfo = () => {
  return async (dispatch: any) => {
    const res = await request.get('/user/profile');

    dispatch(setUserInfo(res.data));
  };
};

export { setToken, fetchLogin, fetchUserInfo, setUserInfo, clearUserInfo };

export default userReducer;
