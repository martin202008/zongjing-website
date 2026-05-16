'use client';

import { useEffect, useState } from 'react';
import { Card, Input, Tag, Typography, message, Row, Col, Badge, Statistic } from 'antd';
import { SearchOutlined, ShopOutlined, GlobalOutlined, AimOutlined } from '@ant-design/icons';
import { customerApi, Customer } from '@/lib/api';

const LEVEL_COLORS: Record<string, string> = {
  A: '#ff4d4f',
  B: '#faad14',
  C: '#d9d9d9',
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await customerApi.list();
      setCustomers(data);
    } catch (err: any) {
      message.error(err.message || '获取客户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c =>
    !search ||
    c.brandName?.toLowerCase().includes(search.toLowerCase()) ||
    c.contactName?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  // 统计数据
  const stats = {
    total: customers.length,
    levelA: customers.filter(c => c.level === 'A').length,
    levelB: customers.filter(c => c.level === 'B').length,
    totalStores: customers.reduce((sum, c) => sum + (c.storeCount || 0), 0),
  };

  return (
    <div>
      <div className="mb-6">
        <Typography.Title level={4} className="mb-1">客户管理</Typography.Title>
        <p className="text-sm" style={{ color: '#7A8F8D' }}>管理所有品牌客户信息</p>
      </div>

      {/* Stats */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title={<span style={{ color: '#7A8F8D' }}>客户总数</span>}
              value={stats.total}
              valueStyle={{ color: '#2D5553', fontSize: 28 }}
              prefix={<span>👥</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title={<span style={{ color: '#7A8F8D' }}>A级客户</span>}
              value={stats.levelA}
              valueStyle={{ color: '#ff4d4f', fontSize: 28 }}
              prefix={<span>⭐</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title={<span style={{ color: '#7A8F8D' }}>B级客户</span>}
              value={stats.levelB}
              valueStyle={{ color: '#faad14', fontSize: 28 }}
              prefix={<span>🌟</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title={<span style={{ color: '#7A8F8D' }}>门店总数</span>}
              value={stats.totalStores}
              valueStyle={{ color: '#2D5553', fontSize: 28 }}
              prefix={<span>🏪</span>}
            />
          </Card>
        </Col>
      </Row>

      {/* Search */}
      <Card loading={loading} className="mb-6" styles={{ body: { padding: '16px 20px' } }}>
        <Input
          placeholder="搜索品牌名/联系人/电话..."
          prefix={<SearchOutlined style={{ color: '#7A8F8D' }} />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
          allowClear
        />
      </Card>

      {/* Customer Grid */}
      {filteredCustomers.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredCustomers.map(customer => (
            <Col key={customer.id} xs={24} sm={12} lg={8}>
              <Card
                className="h-full hover:shadow-lg transition-shadow cursor-pointer"
                styles={{ body: { padding: '20px' } }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${LEVEL_COLORS[customer.level || 'C']}, ${LEVEL_COLORS[customer.level || 'C']}99)` }}
                    >
                      {customer.brandName?.charAt(0) || '?'}
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: '#1A2E2C' }}>{customer.brandName || '-'}</div>
                      <Tag
                        color={LEVEL_COLORS[customer.level || 'C']}
                        className="text-xs mt-0.5"
                        style={{ borderRadius: 20 }}
                      >
                        {customer.level || 'C'}级
                      </Tag>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg" style={{ background: '#F4F7F6' }}>
                    <div className="text-xs mb-1" style={{ color: '#7A8F8D' }}>联系人</div>
                    <div className="text-sm font-medium" style={{ color: '#1A2E2C' }}>{customer.contactName || '-'}</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: '#F4F7F6' }}>
                    <div className="text-xs mb-1" style={{ color: '#7A8F8D' }}>电话</div>
                    <div className="text-sm font-medium" style={{ color: '#1A2E2C' }}>{customer.phone || '-'}</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: '#F4F7F6' }}>
                    <div className="text-xs mb-1 flex items-center gap-1">
                      <ShopOutlined /> 门店数
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#1A2E2C' }}>{customer.storeCount || 0} 家</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: '#F4F7F6' }}>
                    <div className="text-xs mb-1 flex items-center gap-1">
                      <AimOutlined /> 意向面积
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#1A2E2C' }}>{customer.intentionArea ? `${customer.intentionArea}㎡` : '-'}</div>
                  </div>
                </div>

                {/* Footer */}
                {customer.brandType && (
                  <div className="mt-4 pt-3 border-t flex items-center gap-2" style={{ borderColor: '#E8EDEC' }}>
                    <GlobalOutlined style={{ color: '#7A8F8D', fontSize: 12 }} />
                    <span className="text-xs" style={{ color: '#7A8F8D' }}>{customer.brandType}</span>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-base font-medium mb-1" style={{ color: '#1A2E2C' }}>没有找到客户</p>
            <p className="text-sm" style={{ color: '#7A8F8D' }}>{search ? '尝试更换搜索关键词' : '暂无客户数据'}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
