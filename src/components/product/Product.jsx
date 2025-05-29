import { Button, Form, Input, Modal, Table, message } from 'antd'
import { getProduct } from '../../utils/product/productApi'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { useCreateProduct, useDeleteProduct, useUpdateProduct } from '../../utils/product/productHook'

function Product() {
  const { data, isLoading, refetch } = useQuery('getProduct', getProduct)
  const [addModal, setAddModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [form] = Form.useForm()
  const [updateForm] = Form.useForm()
  const { mutate: Create } = useCreateProduct()
  const { mutate: Update } = useUpdateProduct()
  const { mutate: Delete } = useDeleteProduct()

  const columns = [
    {
      title: "Id",
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: "Product Name",
      key: 'productName',
      dataIndex: 'productName'
    },
    {
      title: "Price",
      key: 'price',
      dataIndex: 'price'
    },
    {
      title: "Rates",
      key: 'rates',
      dataIndex: 'rates'
    },
    {
      title: "Action",
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center space-x-4">
          <button
            className='text-white bg-blue-500 px-[10px] py-[5px] rounded-md'
            onClick={() => onOpenUpdateModal(record)}
          >
            Edit
          </button>
          <button
            className='text-white bg-blue-900 px-[10px] py-[5px] rounded-md'
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </button>
        </div>
      )
    }
  ]

  const onFinish = (values) => {
    Create(values, {
      onSuccess: () => {
        message.success('Product created successfully')
        setAddModal(false)
        form.resetFields()
        refetch()
      },
      onError: () => {
        message.error('Failed to create product')
      },
    })
  }

  const onOpenUpdateModal = (record) => {
    updateForm.setFieldsValue({
      productName: record.productName,
      price: record.price,
      rates: record.rates,
    })
    setUpdateId(record.id)
    setUpdateModal(true)
  }

  const updateFinish = (values) => {
    const val = { id: updateId, data: values }

    Update(val, {
      onSuccess: () => {
        message.success('Product updated successfully')
        setUpdateModal(false)
        refetch()
      },
      onError: () => {
        message.error('Failed to update product')
      },
    })
  }

  const handleDelete = (id) => {
    Delete(id, {
      onSuccess: () => {
        message.success('Product deleted successfully')
        refetch()
      },
      onError: () => {
        message.error('Failed to delete product')
      },
    })
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <Button className="px-[13px] py-[7px] rounded-md text-white bg-black" onClick={() => setAddModal(true)}>Add</Button>
      </div>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        rowKey="id"
      />

    
      <Modal
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        title="Create Product">
        <Form layout='vertical' onFinish={onFinish} form={form}>

          <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: 'Please enter product name' }]}>
            <Input placeholder='Enter product name' />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
            <Input placeholder='Enter Price' />
          </Form.Item>

          <Form.Item name="rates" label="Rates" rules={[{ required: true, message: 'Please enter rates' }]}>
            <Input placeholder='Enter Rates' />
          </Form.Item>

          <Form.Item className="m-0">
            <Button type="primary" className="w-full" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>

    
      <Modal
        open={updateModal}
        onCancel={() => setUpdateModal(false)}
        footer={null}
        title="Update Product">

        <Form layout='vertical' onFinish={updateFinish} form={updateForm}>
          
          <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: 'Please enter product name' }]}>
            <Input placeholder='Enter product name' />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
            <Input placeholder='Enter Price' />
          </Form.Item>

          <Form.Item name="rates" label="Rates" rules={[{ required: true, message: 'Please enter rates' }]}>
            <Input placeholder='Enter Rates' />
          </Form.Item>

          <Form.Item className="m-0">
            <Button type="primary" className="w-full" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Product
