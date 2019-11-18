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

interface ISignInProps extends FormComponentProps {
  form: any;
  userName: string;
}

export type ISignInFormProps = IOwnProps & IDispatchProps & ISignInProps;

class SignInForm extends Component<ISignInFormProps, any> {
  public handleSubmit = async (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (error: any, values: any) => {
      if (!error) {
        try {
          await this.props.actions.signIn({
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
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The email is invalid!"
              },
              { required: true, message: "Please input your email!" }
            ],
            initialValue: "admin@gmail.com"
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
            rules: [{ required: true, message: "Please input your Password!" }],
            initialValue: "admin"
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
            Sign in
          </Button>
          Or <a href="/signUp">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: any, ownProps: any) {
  return {
    initialValues: state.getIn(["auth", "regular"])
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(SignInForm));
