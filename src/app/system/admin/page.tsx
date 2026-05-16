'use client';

import { useEffect, useState } from 'react';
import { Card, Table, Tag, Typography, Space, Button, Modal, Form, Input, DatePicker, message, Progress } from 'antd';
import { WarningOutlined, CheckCircleOutlined, FireOutlined, RiseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { leadApi, followApi, Lead } from '@/lib/api';

interface FunnelStats {
  new: number;
  contacted: number;
  visit: number;
  negotiation: number;
  signed: number;
  lost: number;
  total: number;
}

const STAGE_MAP: Record<string, { label: string; color: string }> = {
  new: { label: '新线索', color: 'blue' },
  contacted: { label: '已联系', color: 'cyan' },
  visit: { label: '已带看', color: 'purple' },
  negotiation: { label: '谈判中', color: 'orange' },
  signed: { label: '已成交', color: 'green' },
  lost: { label: '已流失', color: 'red' },
};

const STATS_CONFIG = [
  { key: 'new', label: '新线索', color: '#1890ff', bg: 'rgba(24,144,255,0.1)', icon: '🆕' },
  { key: 'contacted', label: '已联系', color: '#13c2c2', bg: 'rgba(19,194,194,0.1)', icon: '📞' },
  { key: 'visit', label: '已带看', color: '#722ed1', bg: 'rgba(114,46,209,0.1)', icon: '👁️' },
  { key: 'negotiation', label: '谈判中', color: '#faad14', bg: 'rgba(250,173,20,0.1)', icon: '🤝' },
  { key: 'signed', label: '已成交', color: '#52c41a', bg: 'rgba(82,196,26,0.1)', icon: '✅' },
  { key: 'lost', label: '已流失', color: '#ff4d4f', bg: 'rgba(255,77,79,0.1)', icon: '❌' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<FunnelStats>({ new: 0, contacted: 0, visit: 0, negotiation: 0, signed: 0, lost: 0, total: 0 });
  const [overdueLeads, setOverdueLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, leadsData] = await Promise.all([
        leadApi.stats().catch(() => ({ new: 0, contacted: 0, visit: 0, negotiation: 0, signed: 0, lost: 0, total: 0 })),
        leadApi.list().catch(() => []),
      ]);

      setStats(statsData);

      const now = new Date();
      const overdue = (leadsData as Lead[]).filter((l: Lead) => {
        if (!l.nextFollowTime) return false;
        return new Date(l.nextFollowTime) < now;
      });
      setOverdueLeads(overdue);
    } catch (err: any) {
      message.error(err.message || '获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFollow = (lead: Lead) => {
    setSelectedLead(lead);
    setModalVisible(true);
  };

  const handleSubmitFollow = async (values: { content: string; next_follow_time: dayjs.Dayjs }) => {
    if (!selectedLead) return;
    try {
      await followApi.create({
        lead_id: selectedLead.id,
        content: values.content,
        next_follow_time: values.next_follow_time.format('YYYY-MM-DD HH:mm:ss'),
      });
      message.success('跟进成功');
      setModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (err: any) {
      message.error(err.message || '跟进失败');
    }
  };

  // 计算转化率
  const getConversionRate = (from: string, to: string) => {
    const fromVal = stats[from as keyof FunnelStats] || 0;
    const toVal = stats[to as keyof FunnelStats] || 0;
    if (fromVal === 0) return 0;
    return Math.round((toVal / stats.total) * 100);
  };

  const overdueColumns = [
    {
      title: '客户名称',
      dataIndex: ['customer', 'brandName'],
      key: 'brandName',
      render: (v: string, record: Lead) => (
        <Space>
          <span className="font-medium">{v || `客户${record.id}`}</span>
          <Tag color={record.level === 'A' ? 'red' : record.level === 'B' ? 'orange' : 'default'}>
            {record.level}级
          </Tag>
        </Space>
      ),
    },
    { title: '电话', dataIndex: ['customer', 'phone'], key: 'phone' },
    {
      title: '阶段',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => {
        const info = STAGE_MAP[stage] || { label: stage, color: 'default' };
        return <Tag color={info.color}>{info.label}</Tag>;
      },
    },
    {
      title: '下次跟进时间',
      dataIndex: 'nextFollowTime',
      key: 'nextFollowTime',
      render: (v: string) => v ? (
        <span style={{ color: '#ff4d4f', fontWeight: 500 }}>
          {new Date(v).toLocaleString()}
        </span>
      ) : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: Lead) => (
        <Button size="small" type="primary" onClick={() => handleQuickFollow(record)}>
          快速跟进
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <Typography.Title level={4} className="mb-1">招商工作台</Typography.Title>
        <p className="text-sm" style={{ color: '#7A8F8D' }}>实时监控线索状态，及时跟进潜在客户</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {STATS_CONFIG.map((item) => (
          <Card
            key={item.key}
            loading={loading}
            className="text-center hover:shadow-md transition-shadow"
            styles={{ body: { padding: '16px 12px' } }}
          >
            <div
              className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-lg"
              style={{ background: item.bg }}
            >
              {item.icon}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: item.color, lineHeight: 1.2 }}>
              {stats[item.key as keyof FunnelStats]}
            </div>
            <div className="text-xs mt-1" style={{ color: '#7A8F8D' }}>{item.label}</div>
          </Card>
        ))}
      </div>

      {/* Conversion Funnel */}
      <Card loading={loading} className="mb-6" styles={{ body: { padding: '20px' } }}>
        <div className="flex items-center gap-2 mb-4">
          <FireOutlined style={{ color: '#2D5553' }} />
          <span className="font-medium" style={{ color: '#1A2E2C' }}>转化漏斗</span>
          <Tag color="green" className="ml-2">{stats.total} 总线索</Tag>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-20 text-xs text-right" style={{ color: '#7A8F8D' }}>新线索</div>
            <Progress
              percent={100}
              showInfo={false}
              strokeColor="#1890ff"
              trailColor="#e6f7ff"
              size="small"
            />
            <div className="w-16 text-xs font-medium" style={{ color: '#1890ff' }}>{stats.total}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 text-xs text-right" style={{ color: '#7A8F8D' }}>已联系</div>
            <Progress
              percent={getConversionRate('total', 'contacted')}
              showInfo={false}
              strokeColor="#13c2c2"
              trailColor="#e6f7ff"
              size="small"
            />
            <div className="w-16 text-xs font-medium" style={{ color: '#13c2c2' }}>{getConversionRate('total', 'contacted')}%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 text-xs text-right" style={{ color: '#7A8F8D' }}>已带看</div>
            <Progress
              percent={getConversionRate('total', 'visit')}
              showInfo={false}
              strokeColor="#722ed1"
              trailColor="#f3e8ff"
              size="small"
            />
            <div className="w-16 text-xs font-medium" style={{ color: '#722ed1' }}>{getConversionRate('total', 'visit')}%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 text-xs text-right" style={{ color: '#7A8F8D' }}>谈判中</div>
            <Progress
              percent={getConversionRate('total', 'negotiation')}
              showInfo={false}
              strokeColor="#faad14"
              trailColor="#fff7e6"
              size="small"
            />
            <div className="w-16 text-xs font-medium" style={{ color: '#faad14' }}>{getConversionRate('total', 'negotiation')}%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 text-xs text-right" style={{ color: '#7A8F8D' }}>已成交</div>
            <Progress
              percent={getConversionRate('total', 'signed')}
              showInfo={false}
              strokeColor="#52c41a"
              trailColor="#f6ffed"
              size="small"
            />
            <div className="w-16 text-xs font-medium" style={{ color: '#52c41a' }}>{getConversionRate('total', 'signed')}%</div>
          </div>
        </div>
      </Card>

      {/* Overdue Leads */}
      <Card loading={loading}>
        <div className="flex items-center justify-between mb-4">
          <Space>
            <WarningOutlined style={{ color: '#ff4d4f' }} />
            <span className="font-medium" style={{ color: '#1A2E2C' }}>超时未跟进</span>
            {overdueLeads.length > 0 && (
              <Tag color="red" className="ml-1">{overdueLeads.length}</Tag>
            )}
          </Space>
          {overdueLeads.length > 0 && (
            <div className="text-xs flex items-center gap-1" style={{ color: '#7A8F8D' }}>
              <RiseOutlined />
              需要及时处理这些线索
            </div>
          )}
        </div>

        {overdueLeads.length > 0 ? (
          <Table
            columns={overdueColumns}
            dataSource={overdueLeads}
            rowKey="id"
            pagination={false}
            size="small"
          />
        ) : (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
            <p className="text-base font-medium mb-1" style={{ color: '#1A2E2C' }}>太棒了！</p>
            <p className="text-sm" style={{ color: '#7A8F8D' }}>暂无超时未跟进的线索</p>
          </div>
        )}
      </Card>

      {/* Quick Follow Modal */}
      <Modal
        title={
          <Space>
            <span>快速跟进</span>
            <Tag color="blue">{selectedLead?.customer?.brandName || ''}</Tag>
          </Space>
        }
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmitFollow} layout="vertical" className="mt-4">
          <Form.Item name="content" label="跟进内容" rules={[{ required: true, message: '请输入跟进内容' }]}>
            <Input.TextArea rows={4} placeholder="请输入本次跟进内容，如：电话沟通客户需求..." />
          </Form.Item>
          <Form.Item name="next_follow_time" label="下次跟进时间" rules={[{ required: true, message: '请选择下次跟进时间' }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>提交跟进</Button>
        </Form>
      </Modal>
    </div>
  );
}
