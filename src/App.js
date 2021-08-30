import React from 'react';
import './style/custom.css'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AliwangwangOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListPokemon from './Pages/ListPokemon';
import MyPokemonList from './Pages/MyPokemonList';
import DetailPokemon from './Pages/DetailPokemon';
import { PokemonContext } from "./Utility/PokemonContext";



const { Header, Sider, Content } = Layout;




export default function App (props) {

  const  [collapsed,setCollapsed] = React.useState(true);
  const  [MyPokemon, setMyPokemon] = React.useState([]);
  const value = React.useMemo(() => ({ MyPokemon, setMyPokemon }), [MyPokemon, setMyPokemon]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };


    return (
       <Router>
      <Layout  style={{ minHeight: '100vh' }}>
        <Sider 
            breakpoint="md"
            collapsedWidth="0"
            trigger={null} 
            collapsible 
            collapsed={collapsed}>

          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<AliwangwangOutlined />}>
             <span> List Pokemon</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <span> My Pokemon List</span>
              <Link to="/mypokemon" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
              style:{padding: 24,}
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
          <PokemonContext.Provider value={value}>
              <Route exact path="/" component={ListPokemon} />
              <Route path="/mypokemon" component={MyPokemonList} />
          </ PokemonContext.Provider>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
  }

