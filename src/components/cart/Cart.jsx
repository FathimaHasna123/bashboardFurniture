import React from 'react'
import { Table } from 'antd';
import { useQuery } from 'react-query';
import { getCart } from '../../utils/cart/cartApi';
import { getProduct } from '../../utils/product/productApi';
import { getUser } from '../../utils/user/userApi';

function Cart() {
  const { data, isLoading } = useQuery('getCart', getCart)
  const { data: ProductData } = useQuery('getProduct', getProduct)
  const { data: UserData } = useQuery('getUser', getUser)

  const columns = [
    {
      title: 'Cart ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      key: 'productName',
      render: (text, record) =>
        typeof record.productName === 'object'
          ? record.productName.productName
          : record.productName,
    },
    {
      title: 'User Name',
      key: 'userId',
      render: (text, record) =>
        typeof record.userId === 'object' ? record.userId.name : record.userId,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <div className="p-4">
    
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data?.data || []}
        rowKey="id"
      />
    </div>
  )
}

export default Cart
