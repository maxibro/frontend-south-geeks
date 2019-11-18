import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import * as actions from "./redux/actions";
import * as orderActions from "./../order/redux/actions";
import { axiosErrorHelper } from "../../utils/axiosErrorHelper";
import CartListView from "./CartListView";
import { toastr } from "../../utils";

export interface IOwnProps {}

export interface IStateProps {
  immutableShoppingCardItems: any;
  totalPrice: number;
}
export interface IDispatchProps {
  actions: any;
  orderActions: any;
}

export interface IMatchParams {
  // page: string;
}

export type CartListProps = IOwnProps &
  IStateProps &
  IDispatchProps &
  RouteComponentProps<IMatchParams>;

export class CartList extends Component<CartListProps, {}> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.confirmOrder = this.confirmOrder.bind(this);
    this.removeCart = this.removeCart.bind(this);
  }
  public async componentDidMount() {
    const { retrieveCart } = this.props.actions;
    try {
      retrieveCart();
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public async confirmOrder() {
    const { confirmOrder } = this.props.orderActions;
    try {
      await confirmOrder();
      await this.removeCart();
      toastr.showToast("Order created with success", undefined, "success");
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public async removeCart() {
    const { removeCart } = this.props.actions;
    try {
      await removeCart();
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public render() {
    const { immutableShoppingCardItems, totalPrice } = this.props;

    return (
      <CartListView
        immutableShoppingCardItems={immutableShoppingCardItems}
        confirmOrder={this.confirmOrder}
        removeCart={this.removeCart}
        totalPrice={totalPrice}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    immutableShoppingCardItems: state.getIn(["cart", "shoppingCardItems"]),
    totalPrice: state.getIn(["cart", "totalPrice"])
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    orderActions: bindActionCreators({ ...orderActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartList));
