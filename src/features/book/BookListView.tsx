import React, { FunctionComponent } from "react";
import { IBook, IPagination, UserType } from "./../../models";

import { Table, Button, Skeleton, Row, Col } from "antd";

import TagFromKeyWord from "../common/TagFromKeyWord";
import { CustomPagination } from "../common/CustomPagination";
import Search from "antd/lib/input/Search";

export interface IOwnProps {
  getAllPending: boolean;
  immutablePaginatedList: any;
  inactiveBook: any;
  searchByCriteria: any;
  addToCart: any;
  role?: UserType;
  searchString?: string;
}

export type BookListViewProps = IOwnProps;

const BookListView: FunctionComponent<BookListViewProps> = ({
  getAllPending,
  immutablePaginatedList,
  inactiveBook,
  addToCart,
  searchByCriteria,
  role,
  searchString
}) => {
  const onClickInactiveBook = (bookId: number) => (event: any) => {
    inactiveBook(bookId);
  };

  const onClickAddToCart = (book: IBook) => (event: any) => {
    addToCart(book);
  };

  const onSearch = () => (searchValue: string) => {
    searchByCriteria(searchValue);
  };

  const columns =
    role === UserType.admin
      ? [
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
          },
          {
            title: "Keywords",
            key: "keywords",
            render: (text: string, record: IBook) => (
              <TagFromKeyWord keywords={record.keywords} />
            )
          },
          {
            title: "Txt File",
            key: "txtFile",
            render: (text: string, record: IBook) => (
              <span>
                <a href={record.txtFileUrl}> {record.txtFileName}</a>
              </span>
            )
          },
          {
            title: "Action",
            key: "action",
            render: (text: any, record: IBook) => {
              if (!record.isActive) {
                return "Inactive";
              }
              return (
                <span>
                  <Button
                    type="default"
                    onClick={onClickInactiveBook(record.id)}
                  >
                    Inactive
                  </Button>
                </span>
              );
            }
          }
        ]
      : [
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
            title: "Keywords",
            key: "keywords",
            render: (text: string, record: IBook) => (
              <TagFromKeyWord keywords={record.keywords} />
            )
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "3"
          },
          {
            title: "Action",
            key: "action",
            render: (text: any, record: IBook) => {
              if (!record.isActive) {
                return "Inactive";
              }
              return (
                <span>
                  <Button type="default" onClick={onClickAddToCart(record)}>
                    Add to Cart
                  </Button>
                </span>
              );
            }
          }
        ];

  const paginatedList: IPagination<IBook> = immutablePaginatedList.toJS();

  const items: IBook[] = paginatedList.items;
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
      {role !== UserType.admin && (
        <Row type="flex" justify="start" align="middle">
          <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }}>
            <Search
              placeholder="Book name, author or tags"
              onSearch={onSearch()}
              style={{ width: 250 }}
              defaultValue={searchString}
            />
          </Col>
        </Row>
      )}

      <br />

      <Table
        dataSource={items}
        rowKey="id"
        columns={columns}
        pagination={false}
      />
      <CustomPagination
        pageCount={pageCount}
        currentPage={currentPage}
        searchString={searchString}
        next={next}
        previous={previous}
        path={"/books/"}
      />
    </Skeleton>
  );
};

export default BookListView;
