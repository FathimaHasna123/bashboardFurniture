import { Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { getContact } from '../../utils/contact/contactApi'



function Contact  ()  {
    const { data,isLoading} = useQuery('getContact',getContact)

    const columns = [
        {
            title:"Id",
            key:'id',
            dataIndex:'id'
        },
        {
            title:"Name",
            key:'name',
            dataIndex:'name'
        },
        {
            title:"Email",
            key:'email',
            dataIndex:'email'
        },
        {
            title:"Message",
            key:'message',
            dataIndex:'message'
        },
    ]

  return (
    <div>

        <div className="">
            <Table loading={isLoading} columns={columns} dataSource={data?.data}/>
        </div>
    </div>
  )
}

export default Contact