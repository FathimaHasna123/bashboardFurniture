import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getCart } from '../../utils/cart/cartApi'
import { getProduct } from '../../utils/product/productApi'
import { getUser } from '../../utils/user/userApi'
import { useCreateCart, useDeleteCart, useUpdateCart } from '../../utils/cart/cartHook'

function Cart  () {
   const { data,isLoading,refetch } = useQuery('getCart',getCart)
   const { data:ProductData} = useQuery('getProduct',getProduct)
   const { data:UserData } = useQuery('getUser',getUser)
   const [AddModal,setAddModal] = useState(false)
   const [updateModal, setUpdateModal] = useState(false)
   const [updateId, setUpdateId] = useState()
   const [form] = Form.useForm()
   const [updateForm] = Form.useForm()
   const { mutate: Create } = useCreateCart()
   const { mutate: Update } = useUpdateCart()
   const { mutate:Delete } = useDeleteCart()
   

   const columns = [
    {
        title:"Id",
        key:'id',
        dataIndex:'id'
    },
    {
        title:"Product Name",
        key:'productName',
        dataIndex:['productName','productName']
    },
    {
        title:"UserId",
        key:'userId',
        dataIndex:['userId','name']
    },
    {
        title:"Quantity",
        key:'quantity',
        dataIndex:'quantity '
    },
    {
        title:"Action",
        key:'action',
        render:(record) => (
            <div className="flex items-center space-x-[20px]">
          <button className='text-white bg-blue-500 px-[10px] py-[5px] rounded-md' onClick={() => onOpenUpdateModal(record)} >Edit</button>
         <button className='text-white bg-blue-900 px-[10px] py-[5px] rounded-md'onClick={() => handleDelete(record.id)}>Delete</button>
                </div>
        )

    }
   ]

      const onFinish = (values) => {
        Create(values, {
            onSuccess:()=>{
                message.success('Created successfully')
                setAddModal(false)
                form.resetFields()
                refetch()
            },
            onError:()=>{
                message.error('Failed to create')
            }
        })
    }

       const onOpenUpdateModal = (record) => {
        updateForm.setFieldsValue({
            productName: record.product?.id,
            userId: record.user?.id,
           
        })
        setUpdateId(record.id)
        setUpdateModal(true)
    }


        const updateFinish = (values) => {
        Update({ id: updateId, data: values }, {
            onSuccess: () => {
                message.success('Updated successfully')
                setUpdateModal(false)
                refetch()
            },
            onError: () => {
                message.error('Failed to update')
            }
        })
    }

 
    const handleDelete = (id) => {
        Delete(id, {
            onSuccess() {
                message.success('Deleted successfully')
                refetch()
            },
            onError() {
                message.error('Failed to delete')
            }
        })
    }

  return (
    <div>
<div className="flex items-center justify-end mb-4">
    <Button className="px-[13px] py-[7px] rounded-md text-white bg-blue-900" onClick={() => setAddModal(true)}>Add</Button>
</div>
 <Table loading={isLoading} columns={columns} dataSource={data?.data} />
<Modal
open={AddModal}
onCancel={()=>setAddModal(false)}
footer={null}
title="Create Cart">

    <Form layout='vertical' onFinish={onFinish} form={form}>

        <Form.Item name="productName" label="ProductName" rules={[{ required: true, message: 'Please enter Product Name' }]}>
           <Select className="w-full sm:w-[20%]">
             {ProductData?.data?.map(item => (
            <Select.Option value={item.id} key={item.id}>{item.productName}</Select.Option>
                 ))}
           </Select>
        </Form.Item>

         <Form.Item name="userId" label="UserId" rules={[{ required: true, message: 'Please enter User Name' }]}>
           <Select className="w-full sm:w-[20%]">
             {UserData?.data?.map(item => (
            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
              ))}
           </Select>
        </Form.Item>

        <Form.Item name="quqntity" label="Quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
            <Input placeholder="Quantity"/>
        </Form.Item>

        <Form.Item>
             <Button type="primary" htmlType="submit">Submit </Button>
        </Form.Item>
    </Form>
</Modal>

<Modal
open={updateModal}
onCancel={()=>setUpdateModal(false)}
footer={null}
title="Update Cart">

    <Form layout='vertical' onFinish={updateFinish} form={updateForm}>

        <Form.Item name="productName" label="ProductName" rules={[{ required: true, message: 'Please enter Product Name' }]}>
           <Select className="w-full sm:w-[20%]">
             {ProductData?.data?.map(item => (
             <Select.Option value={item.id} key={item.id}>{item.productName}</Select.Option>
               ))}
           </Select>
        </Form.Item>

         <Form.Item name="userId" label="UserId" rules={[{ required: true, message: 'Please enter User Name' }]}>
           <Select className="w-full sm:w-[20%]">
            {UserData?.data?.map(item => (
            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                 ))}
           </Select>
        </Form.Item>

        <Form.Item name="quqntity" label="Quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
            <Input placeholder="Quantity"/>
        </Form.Item>

        <Form.Item>
             <Button type="primary" htmlType="submit">Submit </Button>
        </Form.Item>
    </Form>
</Modal>
    </div>
  )
}

export default Cart