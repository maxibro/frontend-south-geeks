import React, { Component } from "react";

export interface IOwnProps {
  input: any;
  label: string;
  required: boolean;
  meta: any;
}
export type BookFormProps = IOwnProps;

export default class FieldFileInput extends Component<BookFormProps, {}> {
  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  public onChange(e: any) {
    const {
      input: { onChange }
    } = this.props;
    onChange(e.target.files[0]);
  }

  public render() {
    const {
      meta: { touched, error }
    } = this.props;
    const { label } = this.props;
    return (
      <div className="ant-form-item">
        <div className="ant-upload ant-upload-select ant-upload-select-text ant-form-item-control has-feedback has-error">
          <label>{label}</label>
          <div>
            <input type="file" accept=".txt" onChange={this.onChange} />
          </div>
          {touched && error && (
            <div className="has-error ant-form-explain">{error}</div>
          )}
        </div>
      </div>
    );
  }
}
