import React, { useState } from 'react';
import { Table } from 'antd';
import { useQuery } from "react-query";
import { getCart } from '../../utils/cart/cartApi';
import { getProduct } from '../../utils/product/productApi'; 
import { getUser } from '../../utils/user/userApi';           

function Cart() {
  const { data, isLoading } = useQuery('getCart', getCart);
  const { data: ProductData } = useQuery('getProduct', getProduct);
  const { data: UserData } = useQuery('getUser', getUser);

  const columns = [
    {
      title:'Id',
      key:'id',
      dataIndex:'id',
    },
    {
      title: 'Product Name',
      key: 'productName',
      dataIndex: ['productName', 'productName'],
    },
    {
      title: 'User Id',
      key: 'userId',
      dataIndex: ['userId', 'name'],
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
  ]

  return (
    <div>
      <Table loading={isLoading} columns={columns} dataSource={data?.data} />
    </div>
  )
}

export default Cart
