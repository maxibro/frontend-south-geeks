import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { UserType } from "./../../models";
import { AuthStack } from "./../../features/AuthStack";
import { AdminStack } from "./../../features/AdminStack";
import { CustomerStack } from "./../../features/CustomerStack";

export interface IOwnProps {}

export interface IStateProps {
  auth: Map<"token" | "role", any>;
}
export interface IDispatchProps {
  actions?: any;
}

export type Props = IOwnProps & IStateProps;

class UiAuthenticationChecker extends Component<Props, {}> {
  public render() {
    const { auth } = this.props;

    if (auth.get("token") !== null) {
      if (auth.get("role") === UserType.admin) {
        return <AdminStack />;
      } else if (auth.get("role") === UserType.regular) {
        return <CustomerStack />;
      }
    }
    return <AuthStack />;
  }
}

function mapStateToProps(state: any): IStateProps {
  return {
    auth: state.get("auth")
  };
}

export default connect<IStateProps>(mapStateToProps)(UiAuthenticationChecker);
