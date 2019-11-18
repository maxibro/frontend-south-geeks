import React, { FunctionComponent } from "react";
import { IOrder, IPagination, UserType } from "../../models";
import { Table, Skeleton } from "antd";
import { formatDate } from "../../utils/formatDate";
import { CustomPagination } from "../common/CustomPagination";

// const dataSource: IConversation[] = conversationsData.conversations;
export interface IOwnProps {
  getAllPending: boolean;
  immutablePaginatedList: any;
  role?: UserType;
}

export type OrderListViewProps = IOwnProps;

const OrderListView: FunctionComponent<OrderListViewProps> = ({
  getAllPending,
  immutablePaginatedList,
  role
}) => {
  const columns =
    role === UserType.admin
      ? [
          {
            title: "Order ID",
            dataIndex: "id",
            key: "0"
          },
          {
            title: "Order Date",
            key: "1",
            render: (text: string, record: IOrder) =>
              formatDate(record.orderDate, "MM/DD/YYYY")
          },
          {
            title: "Email",
            key: "email",
            render: (text: string, record: IOrder) =>
              record.user != null ? record.user.email : ""
          },
          {
            title: "Books",
            key: "action",
            render: (text: any, record: IOrder) => {
              if (record.books == null) {
                return "";
              }
              return record.books.map((book, index) => {
                return (
                  <div key={index.toString()}>
                    <span key={index.toString()}>
                      {book.name} - {book.author}
                    </span>
                    <br />
                  </div>
                );
              });
            }
          }
        ]
      : [
          {
            title: "Order ID",
            dataIndex: "id",
            key: "0"
          },
          {
            title: "Order Date",
            key: "1",
            render: (text: string, record: IOrder) =>
              formatDate(record.orderDate, "MM/DD/YYYY")
          },
          {
            title: "Books",
            key: "2",
            render: (text: any, record: IOrder) => {
              if (record.books == null) {
                return "";
              }
              return record.books.map((book, index) => {
                return (
                  <div key={index.toString()}>
                    <span key={index.toString()}>
                      {book.name} - {book.author}
                    </span>
                    <br />
                  </div>
                );
              });
            }
          },
          {
            title: "Total Price",
            key: "3",
            dataIndex: "amount"
          }
        ];

  const paginatedList: IPagination<IOrder> = immutablePaginatedList.toJS();

  const items: IOrder[] = paginatedList.items;
  const pageCount = paginatedList.pageCount;
  const currentPage = paginatedList.currentPage;
  const next = paginatedList.next;
  const previous = paginatedList.previous;

  return (
    <Skeleton
      loading={getAllPending}
      active={true}
      avatar={false}
      paragraph={{ rows: 10, width: "100%" }}
    >
      <Table
        dataSource={items}
        rowKey="id"
        columns={columns}
        pagination={false}
      />
      <CustomPagination
        pageCount={pageCount}
        currentPage={currentPage}
        next={next}
        previous={previous}
        path={"/my-orders/"}
      />
    </Skeleton>
  );
};

export default OrderListView;
