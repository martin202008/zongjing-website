'use client';

import { useEffect, useState } from 'react';
import { Card, Table, Tag, Typography, Space, Button, Modal, Form, Select, Input, message, DatePicker, Row, Col, Statistic } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { applicationApi, Application, projectApi, Project } from '@/lib/api';

const STATUS_OPTIONS = [
  { value: 'pending', label: '待处理', color: 'orange' },
  { value: 'processing', label: '处理中', color: 'blue' },
  { value: 'completed', label: '已完成', color: 'green' },
  { value: 'rejected', label: '已拒绝', color: 'red' },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [processingApp, setProcessingApp] = useState<Application | null>(null);
  const [form] = Form.useForm();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appsData, projectsData] = await Promise.all([
        applicationApi.list().catch(() => []),
        projectApi.list(1, 100).then(r => r.data || r).catch(() => []),
      ]);
      setApplications(appsData);
      setProjects(projectsData);
    } catch (err: any) {
      message.error(err.message || '获取申请列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = (app: Application) => {
    setProcessingApp(app);
    form.setFieldsValue({
      status: app.status || 'pending',
      remark: '',
    });
    setModalVisible(true);
  };

  const handleSubmit = async (values: { status: string; remark: string }) => {
    if (!processingApp?.id) return;
    try {
      await applicationApi.update(processingApp.id, {
        status: values.status,
        remark: values.remark,
      });
      message.success('处理成功');
      setModalVisible(false);
      fetchData();
    } catch (err: any) {
      message.error(err.message || '处理失败');
    }
  };

  const getStatusInfo = (status: string) => STATUS_OPTIONS.find(s => s.value === status) || { label: status, color: 'default' };

  // 筛选
  const filteredApps = applications.filter(app =>
    filterStatus === 'all' || app.status === filterStatus
  );

  // 统计
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    processing: applications.filter(a => a.status === 'processing').length,
    completed: applications.filter(a => a.status === 'completed').length,
  };

  const columns = [
    {
      title: '申请信息',
      key: 'info',
      render: (_: any, record: Application) => (
        <div>
          <div className="font-medium" style={{ color: '#1A2E2C' }}>{record.brandName}</div>
          <div className="text-xs mt-1" style={{ color: '#7A8F8D' }}>
            {record.contactName} · {record.phone}
          </div>
        </div>
      ),
    },
    {
      title: '意向信息',
      key: 'intention',
      render: (_: any, record: Application) => (
        <div className="text-sm">
          {record.intentionCity && <div>城市: {record.intentionCity}</div>}
          {record.intentionArea && <div>面积: {record.intentionArea}</div>}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const info = getStatusInfo(status);
        return <Tag color={info.color}>{info.label}</Tag>;
      },
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (v: string) => v ? new Date(v).toLocaleString() : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: Application) => (
        <Button
          size="small"
          type="primary"
          onClick={() => handleProcess(record)}
          disabled={record.status === 'completed' || record.status === 'rejected'}
        >
          处理
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <Typography.Title level={4} className="mb-1">入驻申请管理</Typography.Title>
        <p className="text-sm" style={{ color: '#7A8F8D' }}>查看和处理品牌方提交的入驻申请</p>
      </div>

      {/* Stats */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title={<span style={{ color: '#7A8F8D' }}>申请总数</span>}
              value={stats.total}
              valueStyle={{ color: '#2D5553', fontSize: 28 }}
              prefix={<span>📋</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title={<span style={{ color: '#7A8F8D' }}>待处理</span>}
              value={stats.pending}
              valueStyle={{ color: '#faad14', fontSize: 28 }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title={<span style={{ color: '#7A8F8D' }}>处理中</span>}
              value={stats.processing}
              valueStyle={{ color: '#1890ff', fontSize: 28 }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title={<span style={{ color: '#7A8F8D' }}>已完成</span>}
              value={stats.completed}
              valueStyle={{ color: '#52c41a', fontSize: 28 }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filter */}
      <Card loading={loading} className="mb-4" styles={{ body: { padding: '16px 20px' } }}>
        <Space>
          <span className="text-sm" style={{ color: '#7A8F8D' }}>筛选状态:</span>
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 120 }}
            options={[
              { value: 'all', label: '全部' },
              ...STATUS_OPTIONS.map(s => ({ value: s.value, label: s.label })),
            ]}
          />
        </Space>
      </Card>

      {/* Table */}
      <Card loading={loading}>
        <Table
          columns={columns}
          dataSource={filteredApps}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: '暂无申请' }}
        />
      </Card>

      {/* Process Modal */}
      <Modal
        title={
          <Space>
            <span>处理申请</span>
            <Tag color="blue">{processingApp?.brandName}</Tag>
          </Space>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical" className="mt-4">
          <div className="mb-4 p-4 rounded-lg" style={{ background: '#F4F7F6' }}>
            <Row gutter={16}>
              <Col span={12}>
                <div className="text-xs" style={{ color: '#7A8F8D' }}>品牌名称</div>
                <div className="font-medium">{processingApp?.brandName}</div>
              </Col>
              <Col span={12}>
                <div className="text-xs" style={{ color: '#7A8F8D' }}>联系电话</div>
                <div className="font-medium">{processingApp?.phone}</div>
              </Col>
              <Col span={12} className="mt-3">
                <div className="text-xs" style={{ color: '#7A8F8D' }}>联系人</div>
                <div className="font-medium">{processingApp?.contactName}</div>
              </Col>
              <Col span={12} className="mt-3">
                <div className="text-xs" style={{ color: '#7A8F8D' }}>意向城市</div>
                <div className="font-medium">{processingApp?.intentionCity || '-'}</div>
              </Col>
            </Row>
          </div>

          <Form.Item name="status" label="处理状态" rules={[{ required: true }]}>
            <Select>
              {STATUS_OPTIONS.map(s => (
                <Select.Option key={s.value} value={s.value}>{s.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="remark" label="处理备注">
            <Input.TextArea rows={3} placeholder="请输入处理备注..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>确认处理</Button>
        </Form>
      </Modal>
    </div>
  );
}
