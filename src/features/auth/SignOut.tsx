import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import { RouteComponentProps } from "react-router";

export interface IDispatchProps {
  actions?: any;
}
export interface IStateProps {}

export type Props = IDispatchProps;
export type SignOutPageProps = RouteComponentProps<any> & IDispatchProps;


class SignOut extends Component<SignOutPageProps, {}> {
  public componentDidMount() {
    this.props.actions.signOut();
  }

  public render() {
    return <div />;
  }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect<IDispatchProps>(
  null,
  mapDispatchToProps
)(SignOut);
