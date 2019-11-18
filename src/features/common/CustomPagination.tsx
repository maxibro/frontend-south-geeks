import React, { Component } from "react";
import { Icon, Button } from "antd";

export interface IOwnProps {
  pageCount: number;
  currentPage: number;
  next: string | undefined;
  previous: string | undefined;
  path: string;
  searchString?: string;
}
export interface IStateProps {}

export type TagFromKeyWordProps = IOwnProps & IStateProps;

export class CustomPagination extends Component<TagFromKeyWordProps, {}> {
  public render() {
    const {
      pageCount,
      currentPage,
      next,
      previous,
      path,
      searchString
    } = this.props;
    const urlSearchParam = searchString !== undefined ? `/${searchString}` : "";
    return (
      <div className={"ant-table-pagination ant-pagination"}>
        <Button
          href={`${path}1${urlSearchParam} `}
          disabled={currentPage === 1}
        >
          <Icon type="left" />
          <Icon type="left" />
        </Button>
        <Button
          href={`${previous}${urlSearchParam}`}
          disabled={currentPage === 1}
        >
          <Icon type="left" />
        </Button>
        <Button href={next} type="primary">
          {currentPage}
        </Button>
        <Button
          href={`${next}${urlSearchParam}`}
          disabled={currentPage === pageCount}
        >
          <Icon type="right" />
        </Button>
        <Button
          href={`${path}${pageCount}${urlSearchParam}`}
          disabled={currentPage === pageCount}
        >
          <Icon type="right" />
          <Icon type="right" />
        </Button>
      </div>
    );
  }
}

export default CustomPagination;
