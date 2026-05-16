'use client';

import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Typography, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  ProjectOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { tokenStorage } from '@/lib/api';

const { Sider, Content, Header } = Layout;

const menuItems = [
  { key: '/system/admin', icon: <DashboardOutlined />, label: '工作台' },
  { key: '/system/admin/applications', icon: <FileTextOutlined />, label: '入驻申请' },
  { key: '/system/admin/leads', icon: <UserOutlined />, label: '线索管理' },
  { key: '/system/admin/customers', icon: <ShopOutlined />, label: '客户管理' },
  { key: '/system/admin/projects', icon: <ProjectOutlined />, label: '项目管理' },
  { key: '/system/admin/shops', icon: <AppstoreOutlined />, label: '铺位管理' },
];

const userMenuItems = [
  { key: 'settings', icon: <SettingOutlined />, label: '设置' },
  { type: 'divider' as const },
  { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      tokenStorage.remove();
      message.success('已退出登录');
      router.push('/system/login');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        theme="dark"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto',
          background: 'linear-gradient(180deg, #2D5553 0%, #1E3D3A 100%)',
        }}
        width={220}
      >
        {/* Logo */}
        <div
          style={{
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? 0 : '0 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            className="flex items-center gap-3"
            style={{ color: 'white' }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              Z
            </div>
            {!collapsed && (
              <div>
                <div className="font-semibold text-sm" style={{ color: 'white' }}>宗靖招赢</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>管理后台</div>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{
            background: 'transparent',
            border: 'none',
            marginTop: 8,
          }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: 'margin-left 0.2s' }}>
        {/* Header */}
        <Header
          style={{
            padding: '0 24px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              onClick={() => setCollapsed(!collapsed)}
              className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div>
              <Typography.Text strong style={{ color: '#1A2E2C', fontSize: 16 }}>
                {menuItems.find(m => pathname.startsWith(m.key))?.label || '工作台'}
              </Typography.Text>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Dropdown menu={{ items: userMenuItems, onClick: ({ key }) => handleMenuClick(key) }} placement="bottomRight">
              <div className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition-colors hover:bg-gray-50">
                <Avatar
                  size={36}
                  style={{ background: '#2D5553', fontWeight: 600 }}
                >
                  A
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium" style={{ color: '#1A2E2C' }}>管理员</div>
                  <div className="text-xs" style={{ color: '#7A8F8D' }}>Administrator</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ padding: 24, background: '#F4F7F6', minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
