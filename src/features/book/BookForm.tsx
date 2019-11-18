import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { InjectedFormProps } from "redux-form";
import { reduxForm, Field } from "redux-form/immutable";
import { FormComponentProps } from "antd/lib/form";
import { Button, Row, Col } from "antd";
import { TextField } from "redux-form-antd";

import * as actions from "./redux/actions";
import { axiosErrorHelper } from "./../../utils/axiosErrorHelper";
import { toastr } from "./../../utils/toastr";
import FieldFileInput from "./FieldFileInput";
import { required, number } from "../common/FormValidations";

export interface IOwnProps {}

export interface IStateProps {
  createPending: boolean;
}
export interface IDispatchProps {
  actions?: any;
}
interface IBookProps extends FormComponentProps {
  form: any;
  id: string;
  value: string;
}
export interface IMatchParams {
  id: string;
}

export type BookFormProps = IOwnProps &
  IStateProps &
  IDispatchProps &
  RouteComponentProps<IMatchParams> &
  InjectedFormProps<IBookProps>;

class BookForm extends Component<BookFormProps, {}> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  public handleChange = (e: any) => {
    console.log("e", e);
  };

  public submit = async (values: any) => {
    const book = values.toJS();

    const { history } = this.props;

    const { create } = this.props.actions;
    try {
      await create({ data: book });
      toastr.showToast("Book created with success", undefined, "success");
      history.push("/books");
    } catch (error) {
      console.log(error);
      axiosErrorHelper(error);
    }
  };

  public goBack = () => {
    const { history } = this.props;
    history.push("/books");
  };

  public render() {
    const { handleSubmit, createPending } = this.props;

    return (
      <form
        noValidate={true}
        autoComplete="off"
        onSubmit={handleSubmit(this.submit)}
      >
        <Field
          name="name"
          component={TextField}
          placeholder="Book"
          validate={[required]}
        />
        <Field
          name="author"
          component={TextField}
          placeholder="Author"
          validate={[required]}
        />
        <Field
          name="price"
          component={TextField}
          placeholder="Price"
          validate={[required, number]}
        />

        <Field
          name="txtFile"
          component={FieldFileInput}
          type="file"
          validate={[required]}
        />
        <Row type="flex" justify="space-between" align="middle">
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 11 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="form-button"
              loading={createPending}
            >
              Save
            </Button>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 11 }}>
            <Button
              type="default"
              className="form-button"
              onClick={this.goBack}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: any, ownProps: any) {
  return {
    createPending: state.getIn(["book", "createPending"])
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default reduxForm({
  form: "BookForm"
})(connect(mapStateToProps, mapDispatchToProps)(withRouter(BookForm)));
