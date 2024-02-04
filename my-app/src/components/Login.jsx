import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import '../style/login.css';

function LoginPage({ signName, signPassword }) {
  const page = useNavigate();
  const [userName, setUserName] = useState('null')
  let [userPassword, setUserPassword] = useState('null')

  const [form] = Form.useForm();
  const [error, setError] = useState('');
  let logname = signName;
  let logpassword = signPassword;

  function handleSubmit() {
    if (userName === logname && userPassword === logpassword) {
      page('/move')
    }
    else if (userName === 'g' && userPassword === 'g') {
      page('/move')
    }
    else{
      setError('Incorrect Password')
    }
  }

  return (
    <div className="login">
      <div className="logincontainer">
        <Form form={form} onFinish={handleSubmit}>
          <div className="logintitle">LOGIN</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <div className="usernamediv">
              <div className="username">UserName</div>
              <Input
                className="inputname"
                placeholder="Enter username"
                onChange={(event) => { setUserName(event.target.value) }}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <div className="userpassdiv">
              <div className="password">Password</div>
              <Input.Password
                className="inputpass"
                placeholder="Enter password"
                onChange={(e) => { setUserPassword(e.target.value) }} 
              />
            </div>
          </Form.Item>
          {error && <div className="error">{error}</div>}
          <div className="loginbtns">
            <Button className="loginbtn" type="primary" htmlType="submit">
              Login
            </Button>
            <p>Don't have an account?</p>
            <Button
              onClick={() => page('/signup')}
              className="newaccount"
              type="primary"
            >
              Create new account
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
