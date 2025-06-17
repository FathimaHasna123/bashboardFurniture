import { Button, Form, Input, Modal, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { getProduct } from '../../utils/product/productApi';
import { useCreateProduct, useDeleteProduct, useUpdateProduct } from '../../utils/product/productHook';

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
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Rates',
      dataIndex: 'rates',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => {
        const imageUrl = text?.startsWith('http') ? text : `http://127.0.0.1:8000/${text}`
        return text ? (
          <img
            src={imageUrl}
            alt="Product"
            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/60')} />
        ) : (
          <span>No image</span>
        );
      },
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex items-center space-x-4">
          <button className="text-white bg-blue-500 px-[10px] py-[5px] rounded-md"
            onClick={() => onOpenUpdateModal(record)}>Edit</button>

          <button className="text-white bg-blue-900 px-[10px] py-[5px] rounded-md"
            onClick={() => handleDelete(record.id)}> Delete</button>
        </div>
      ),
    },
  ]

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('price', values.price);
    formData.append('rates', values.rates);
    formData.append('image', values.image[0].originFileObj);

    Create(formData, {
      onSuccess: () => {
        message.success('Product created successfully');
        setAddModal(false);
        form.resetFields();
        refetch();
      },
      onError: () => {
        message.error('Failed to create product');
      },
    })
  }

  const onOpenUpdateModal = (record) => {
    updateForm.setFieldsValue({
      productName: record.productName,
      price: record.price,
      rates: record.rates,
      image: [
        {
          uid: record.id,
          name: 'Image.jpg',
          status: 'done',
          url: `http://127.0.0.1:8000/${record.image}`,
        },
      ],
    })
    setUpdateId(record.id);
    setUpdateModal(true);
  };

  const updateFinish = (values) => {
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('price', values.price);
    formData.append('rates', values.rates);

    if (values.image && values.image[0]?.originFileObj) {
      formData.append('image', values.image[0].originFileObj);
    }

    Update(
      { id: updateId, data: formData },
      {
        onSuccess: () => {
          message.success('Product updated successfully');
          setUpdateModal(false);
          refetch();
        },
        onError: () => {
          message.error('Failed to update product');
        },
      }
    )
  }

  const handleDelete = (id) => {
    Delete(id, {
      onSuccess: () => {
        message.success('Product deleted successfully');
        refetch()
      },
      onError: () => {
        message.error('Failed to delete product');
      },
    })
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <Button className="px-[13px] py-[7px] rounded-md text-white bg-black" onClick={() => setAddModal(true)}> Add</Button>
      </div>

      <Table loading={isLoading} columns={columns} dataSource={data?.data} rowKey="id" />

      
      <Modal open={addModal} onCancel={() => setAddModal(false)} footer={null} title="Create Product">
        <Form layout="vertical" onFinish={onFinish} form={form}>

          <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="rates" label="Rates" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}>

            <Upload name="image" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">Submit </Button>
          </Form.Item>

        </Form>
      </Modal>

    
      <Modal open={updateModal} onCancel={() => setUpdateModal(false)} footer={null} title="Update Product">
        <Form layout="vertical" onFinish={updateFinish} form={updateForm}>
          <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="rates" label="Rates" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}>

            <Upload name="image" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
           <Button type="primary" htmlType="submit" className="w-full">Submit</Button>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}

export default Product
