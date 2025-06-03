import { Button, Form, Input, message, Modal, Table, Upload } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getBlog } from '../../utils/blog/BlogApi'
import { UploadOutlined } from '@ant-design/icons'
import { useCreateBlog, useDeleteBlog, useUpdateBlog } from '../../utils/blog/blogHook'

function Blog  ()  {
    const {data,isLoading,refetch} = useQuery('getBlog',getBlog)
    const [AddModal,setAddModal] = useState(false)
    const [updateModal,setUpdateModal] = useState(false)
    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()
    const { mutate:Create } = useCreateBlog()
    const { mutate:Update } = useUpdateBlog()
    const { mutate:Delete } = useDeleteBlog()

    const columns = [
        {
            title:"Id",
            key:'id',
            dataIndex: 'id',
        },
        {
            title:"Image",
            key:'image',
            dataIndex:'image',
            render:(text)=>(
                <img src={`http://127.0.0.1:8000${text}`} alt=""  className="w-[50px]"/>
            )
        },
        {
            title:"Header",
            key:'header',
            dataIndex:'header',
        },
        {
            title:"Description ",
            key:'description ',
            dataIndex:'description ',
        },
        {
            title:"Paragraphs",
            key:' Paragraphs',
            dataIndex:' Paragraphs',
        },
        {
            title:"Action",
            key:'action',
            render:(record) =>(
                <div className="flex items-center space-x-[20px]">
          <button className='text-white bg-blue-500 px-[10px] py-[5px] rounded-md' onClick={() => onOpenUpdateModal(record)} > Update </button>
         <button className='text-white bg-blue-900 px-[10px] py-[5px] rounded-md'onClick={() => handleDelete(record.id)}>Delete</button>
                </div>
            )
        }
    ]

     const onFinish = (values) => {
        const FormData = new FormData()
        FormData.append('image',values.image.file.orignfileobj)
         Create(FormData, {
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
            image: record.image[{
                uid: record.id, 
                name: 'image.jpg',
                status: 'done',
                url: `http://127.0.0.1:8000${record.image}`,
            }]
        });

        setUpdateId(record.id)
        setUpdateModal(true)
    }

   
    const updateFinish = (values) => {
        const val = { id: updateId, data: values }
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        
        Update(val, {
            onSuccess() {
                message.success('Updated successfully')
                setUpdateModal(false)
                refetch()
            },
            onError() {
                message.error('Failed to update')
            }
        })

        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbb");
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
            <Button className="px-[13px] py-[7px] rounded-md text-white bg-black" onClick={() => setAddModal(true)}> Add </Button>
        </div>
        <Table loading={isLoading} columns={columns} dataSource={data?.data}/>
        <Modal
        open={AddModal}
        onCancel={() =>setAddModal(false)}
        footer={null}
        title="Create Blog">
            <Form layout="vertical" onFinish={onFinish} form={form}>

         <Form.Item name={'image'} label='Image'>
            <Upload  name="image" listType="picture">
             <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

            <Form.Item name="header" label="Header" rules={[{ required: true, message: 'Please enter Header' }]}>
                <Input placeholder="Header"/>
            </Form.Item>

            <Form.Item name="description " label="Description " rules={[{ required: true, message: 'Please enter Description ' }]}>
                <Input placeholder="description "/>
            </Form.Item>

            <Form.Item name=" Paragraphs" label=" Paragraphs" rules={[{ required: true, message: 'Please enter  Paragraphs' }]}>
                <Input placeholder=" Paragraphs"/>
            </Form.Item>

               <Form.Item>
                <Button type="primary" className="w-full" htmlType="submit"> Submit </Button>
                    </Form.Item>
                
            </Form>
        </Modal> 

        <Modal
        open={updateModal}
        onCancel={() =>setUpdateModal(false)}
        footer={null}
        title="Update Blog">
            <Form layout="vertical" onFinish={updateFinish} form={updateForm}>

         <Form.Item name={'image'} label='Image'>
            <Upload  name="image" listType="picture">
             <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

            <Form.Item name="header" label="Header" rules={[{ required: true, message: 'Please enter Header' }]}>
                <Input placeholder="Header"/>
            </Form.Item>

            <Form.Item name="description " label="Description " rules={[{ required: true, message: 'Please enter Description ' }]}>
                <Input placeholder="description "/>
            </Form.Item>

            <Form.Item name=" Paragraphs" label=" Paragraphs" rules={[{ required: true, message: 'Please enter  Paragraphs' }]}>
                <Input placeholder=" Paragraphs"/>
            </Form.Item>
            
               <Form.Item>
                <Button type="primary" className="w-full" htmlType="submit"> Submit </Button>
                    </Form.Item>
                
            </Form>
        </Modal> 

    </div>
  )
}

export default Blog