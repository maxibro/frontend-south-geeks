import React, { FunctionComponent } from "react";
import { IUser, IPagination } from "../../models";
import { Table, Button, Skeleton } from "antd";

import { CustomPagination } from "../common/CustomPagination";

// const dataSource: IConversation[] = conversationsData.conversations;
export interface IOwnProps {
  getAllPending: boolean;
  immutablePaginatedList: any;
  inactiveUser: any;
}

export type UserListViewProps = IOwnProps;

const UserListView: FunctionComponent<UserListViewProps> = ({
  getAllPending,
  immutablePaginatedList,
  inactiveUser
}) => {
  const onClickInactiveUser = (userId: number) => (event: any) => {
    inactiveUser(userId);
  };

  const onRow = () => (r: IUser) => ({
    onClick: () => {
      console.log("TODO", r);
    }
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "0"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "1"
    },
    {
      title: "# Orders",
      key: "orders",
      render: (text: string, record: IUser) =>
        record.orders != null ? record.orders.length : 0
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: IUser) => {
        if (!record.isActive) {
          return "Inactive";
        }
        return (
          <span>
            <Button type="default" onClick={onClickInactiveUser(record.id)}>
              Inactive
            </Button>
          </span>
        );
      }
    }
  ];

  const paginatedList: IPagination<IUser> = immutablePaginatedList.toJS();

  const items: IUser[] = paginatedList.items;
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
        onRow={onRow()}
      />
      <CustomPagination
        pageCount={pageCount}
        currentPage={currentPage}
        next={next}
        previous={previous}
        path={"/users/"}
      />
    </Skeleton>
  );
};

export default UserListView;
