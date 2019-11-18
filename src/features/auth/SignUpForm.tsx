import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Form, Icon, Input, Button } from "antd";

import { FormComponentProps } from "antd/lib/form";

import * as actions from "./redux/actions";
import { axiosErrorHelper } from "./../../utils/axiosErrorHelper";



export interface IOwnProps {}

export interface IDispatchProps {
  actions?: any;
}

interface ISignUpProps extends FormComponentProps {
  form: any;
}

export type ISignInFormProps = IOwnProps &
  IDispatchProps &
  ISignUpProps;

class SignUpForm extends Component<ISignInFormProps, any> {
  
  public handleSubmit = async (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (error:any, values:any) => {
      if (!error) {
        try {
          await this.props.actions.signUp({
            data: values
          });
        } catch (error) {
          axiosErrorHelper(error);
        }
      }
    });
    
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="signin-form">
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your name!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Name"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{
              type: 'email', message: 'The email is invalid!',
            },
            { required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              autoComplete="username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up
          </Button>
          Or <a href="/">Login now!</a> 
        </Form.Item>
      </Form>
    );

  }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  null, mapDispatchToProps
)(Form.create()(SignUpForm));
