import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import * as actions from "./redux/actions";
import * as cartActions from "./../cart/redux/actions";
import { axiosErrorHelper } from "../../utils/axiosErrorHelper";
import BookListView from "./BookListView";
import { UserType, IBook } from "../../models";
import { toastr } from "../../utils";

export interface IOwnProps {
  role?: UserType;
}
export interface IStateProps {
  immutablePaginatedList: any;
  getAllPending: any;
  location?: any;
  route?: any;
  shoppingCardItems: any;
  searchString: string;
}
export interface IDispatchProps {
  actions?: any;
  cartActions?: any;
}

export interface IMatchParams {
  page: string;
  search: string;
}

export type BookListProps = IOwnProps &
  IStateProps &
  IDispatchProps &
  RouteComponentProps<IMatchParams>;

export class BookList extends Component<BookListProps, {}> {
  constructor(props: any, context?: any) {
    super(props, context);
    this.inactiveBook = this.inactiveBook.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.searchByCriteria = this.searchByCriteria.bind(this);
  }
  public async componentDidMount() {
    const { match } = this.props;
    const { page, search } = match.params;
    const { getAll } = this.props.actions;
    try {
      await getAll({ page, searchString: search });
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public async searchByCriteria(searchString: string) {
    const { getAll } = this.props.actions;

    try {
      await getAll({ page: 1, searchString: searchString });
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public async inactiveBook(bookId: any) {
    const { inactive } = this.props.actions;
    try {
      await inactive({ id: bookId });
      window.location.reload();
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public async addToCart(book: IBook) {
    const { addToCart } = this.props.cartActions;
    try {
      await addToCart(book);
      toastr.showToast("Book added to the shopping card", undefined, "success");
    } catch (error) {
      axiosErrorHelper(error);
    }
  }

  public render() {
    const {
      immutablePaginatedList,
      getAllPending,
      role,
      searchString
    } = this.props;

    return (
      <BookListView
        getAllPending={getAllPending}
        immutablePaginatedList={immutablePaginatedList}
        inactiveBook={this.inactiveBook}
        addToCart={this.addToCart}
        searchByCriteria={this.searchByCriteria}
        role={role}
        searchString={searchString}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    immutablePaginatedList: state.getIn(["book", "paginatedList"]),
    shoppingCardItems: state.getIn(["book", "shoppingCardItems"]),
    getAllPending: state.getIn(["book", "getAllPending"]),
    searchString: state.getIn(["book", "searchString"])
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    cartActions: bindActionCreators({ ...cartActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookList));
