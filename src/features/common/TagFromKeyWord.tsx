import React, { Component } from "react";
import { Tag } from "antd";

export interface IOwnProps {
  keywords?: string;
}
export interface IStateProps {}

export type TagFromKeyWordProps = IOwnProps & IStateProps;

export class TagFromKeyWord extends Component<TagFromKeyWordProps, {}> {
  public render() {
    const { keywords } = this.props;
    const keywordArray = keywords != null ? keywords.split(" , ") : [];

    return keywordArray.map((element: string, index: number) => (
      <Tag key={index}>{element}</Tag>
    ));
  }
}

export default TagFromKeyWord;
