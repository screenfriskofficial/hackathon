import React, { useContext } from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

import { AuthContext } from "../../app/providers/auth-provider/AuthProvider.jsx";

const LoginPage = () => {
  const { login, isLoading, error } = useContext(AuthContext);
  const onFinish = async (values) => {
    const { email, password } = values;

    login(email, password);
  };

  const onFinishFailed = async (errorInfo) => {
    await message.error(errorInfo, 1);
  };

  return (
    <div className="container m-auto">
      {error && error}
      <div className="h-screen flex items-center justify-center flex-col">
        <h3 className="uppercase font-bold text-xl">Вход в аккаунт</h3>
        <Form
          className="w-full shadow-md p-5"
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Почта"
            name="email"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите почту!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите пароль!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button loading={isLoading} htmlType="submit">
              Войти
            </Button>
            <Link to={"/register"} className="text-sm ml-2">
              зарегестрироваться
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;
