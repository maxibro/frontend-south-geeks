import React, { FunctionComponent } from "react";

import { Table, Button, Row, Col } from "antd";

export interface IOwnProps {
  immutableShoppingCardItems: any;
  confirmOrder: any;
  removeCart: any;
  totalPrice: number;
}

export type CartListViewProps = IOwnProps;

const CartListView: FunctionComponent<CartListViewProps> = ({
  immutableShoppingCardItems,
  confirmOrder,
  removeCart,
  totalPrice
}) => {
  const onClickConfirmOrder = () => (event: any) => {
    confirmOrder();
  };

  const onClickRemoveCart = () => (event: any) => {
    removeCart();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "1"
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "2"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "3"
    }
  ];

  const tableIndex = () => Math.floor(Math.random() * 10000).toString();
  const shoppingCardItems = immutableShoppingCardItems.toJS();
  return (
    <div>
      <Table
        dataSource={shoppingCardItems}
        rowKey={tableIndex}
        columns={columns}
        pagination={false}
      />
      {shoppingCardItems.length > 0 && (
        <div>
          <Row type="flex" justify="end">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
              <h3>Total Price: ${totalPrice}</h3>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" align="middle">
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 11 }}>
              <Button
                type="primary"
                className="form-button"
                onClick={onClickConfirmOrder()}
              >
                Confirm Order
              </Button>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 11 }}>
              <Button
                type="default"
                className="form-button"
                onClick={onClickRemoveCart()}
              >
                Clear Cart
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default CartListView;
