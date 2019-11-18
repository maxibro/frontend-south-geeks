/* tslint:disable:max-classes-per-file */
declare module "redux-form-material-ui" {
  import { CheckboxProps } from "@material-ui/core/Checkbox";
  import { SelectProps } from "@material-ui/core/Select";
  import { SwitchProps } from "@material-ui/core/Switch";
  import { TextFieldProps } from "@material-ui/core/TextField";

  // import { WrappedFieldProps } from "redux-form";
  import { WrappedFieldProps } from "redux-form/immutable";
  import { Component, InputHTMLAttributes } from "react";

  export class Checkbox extends Component<
    CheckboxProps & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>,
    any
  > {}
  export class RadioGroup extends Component<
    RadioGroup & WrappedFieldProps,
    any
  > {}
  export class Select extends Component<SelectProps & WrappedFieldProps, any> {}
  export class Switch extends Component<
    SwitchProps & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>,
    any
  > {}
  // export class TextField extends MaterialTextField {}
  // declare const TextField: React.ComponentType<TextFieldProps>;

  // export { TextField} ;
  export class TextField extends Component<
    TextFieldProps & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>,
    any
  > {}
}
