import { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import './App.css'
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, Outlet } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaProductHunt } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,

} from '@ant-design/icons';

function App() {
    const [collapsed, setCollapsed] = useState(false);

  return (
    <>
    <Layout className="m-0 h-screen w-full">
<Sider trigger={null} collapsible collapsed={collapsed}>

  <div className="demo-logo-vertical h-[100px]"/>
  <Menu 
  theme="dark"
  mode="inline"
  defaultSelectedKeys={['1']}>

    <Menu.Item ket={'1'} icon={<LuLayoutDashboard />}>
    <Link to={'/dashboard'}>Dashboard</Link>
    </Menu.Item>

    <Menu.Item key={'2'} icon={<FaProductHunt />}>
    <Link to={'/product'}>Product</Link>
    </Menu.Item>

    <Menu.Item key={'3'} icon={<FaUserAlt />}>
    <Link to={'/user'}>User</Link>
    </Menu.Item>

    <Menu.Item key={'4'} icon={<BsCartFill />}>
    <Link to={'/Cart'}>Cart</Link>
    </Menu.Item>

  </Menu>
</Sider>


<Layout className="h-full w-full">
  <Header
  style={{
    padding:0,
  }}>
    <Button type="text" icon={collapsed ?<MenuUnfoldOutlined/> :<MenuFoldOutlined  /> }
    onClick={() =>setCollapsed(!collapsed)}
    style={{
      fontSize:'20px',
      width:64,
      height:64,
    }}/>
  </Header>

  <Content style={{
    margin:'24px 16px',
    padding:74,
    minHeight:813,
  }}>
    <Outlet/>
  </Content>
</Layout>
    </Layout>
    </>
  )
}

export default App
