import { Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../../utils/user/userApi'

function User () {
    const {data,isLoading} = useQuery('getUser',getUser)


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
            title:"Password",
            key:'password',
            dataIndex:'password'
        },
        {
            title:"Address",
            key:'address',
            dataIndex:'address'
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

export default User