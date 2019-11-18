import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import * as actions from "./redux/actions";
import { axiosErrorHelper } from "../../utils/axiosErrorHelper";

import UserListView from "./UserListView";

export interface IOwnProps {}
export interface IStateProps {
  immutablePaginatedList: any;
  getAllPending: any;
  location?: any;
}
export interface IDispatchProps {
  actions?: any;
}

export interface IMatchParams {
  page: string;
}

export type UserListProps = IOwnProps &
  IStateProps &
  IDispatchProps &
  RouteComponentProps<IMatchParams>;

export class UserList extends Component<UserListProps, {}> {
  constructor(props: any, context?: any) {
    super(props, context);
    this.inactiveUser = this.inactiveUser.bind(this);
  }
  public async componentDidMount() {
    const { match } = this.props;
    const { page } = match.params;

    const { getAll } = this.props.actions;
    try {
      await getAll({ page });
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public async inactiveUser(userId: any) {
    const { inactive } = this.props.actions;
    try {
      await inactive({ id: userId });
      window.location.reload();
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public render() {
    const { immutablePaginatedList, getAllPending } = this.props;

    return (
      <UserListView
        getAllPending={getAllPending}
        immutablePaginatedList={immutablePaginatedList}
        inactiveUser={this.inactiveUser}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    immutablePaginatedList: state.getIn(["user", "paginatedList"]),
    getAllPending: state.getIn(["user", "getAllPending"])
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserList));
