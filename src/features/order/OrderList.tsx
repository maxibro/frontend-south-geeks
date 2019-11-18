import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import * as actions from "./redux/actions";
import { axiosErrorHelper } from "../../utils/axiosErrorHelper";

import OrderListView from "./OrderListView";
import { UserType } from "../../models";

export interface IOwnProps {
  role?: UserType;
}
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

export type OrderListProps = IOwnProps &
  IStateProps &
  IDispatchProps &
  RouteComponentProps<IMatchParams>;

export class OrderList extends Component<OrderListProps, {}> {
  public async componentDidMount() {
    const { match, role } = this.props;
    const { page } = match.params;

    if (role === UserType.admin) {
      const { getAll } = this.props.actions;
      try {
        await getAll({ page });
      } catch (error) {
        axiosErrorHelper(error);
      }
    } else {
      const { getMyOrders } = this.props.actions;
      try {
        await getMyOrders({ page });
      } catch (error) {
        axiosErrorHelper(error);
      }
    }
  }

  public render() {
    const { immutablePaginatedList, getAllPending, role } = this.props;

    return (
      <OrderListView
        getAllPending={getAllPending}
        immutablePaginatedList={immutablePaginatedList}
        role={role}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    immutablePaginatedList: state.getIn(["order", "paginatedList"]),
    getAllPending: state.getIn(["order", "getAllPending"])
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
)(withRouter(OrderList));
