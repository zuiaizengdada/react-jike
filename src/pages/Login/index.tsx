import logo from '@/asstes/logo.png';
import { fetchLogin } from '@/store/modules/user';
import { Button, Card, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import './index.scss';
import { useNavigate } from 'react-router-dom';

export interface LoginForm {
  mobile: number;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigete = useNavigate();

  const onFinish = async (values: LoginForm) => {
    await dispatch<any>(fetchLogin(values));

    // 跳转到首页
    navigete('/');

    // 提示用户
    message.success('登录成功');
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish}>
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3456789]\d{9}$/,
                message: '手机号格式不正确'
              }
            ]}
            validateTrigger="onBlur"
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
            validateTrigger="onBlur"
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
