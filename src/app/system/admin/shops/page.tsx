'use client';

import { useEffect, useState } from 'react';
import { Card, Table, Button, Tag, Typography, message, Modal, Form, Input, Select, Popconfirm, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { shopApi, Shop, Project, API_BASE, projectApi } from '@/lib/api';

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [shopImage, setShopImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchShops();
    fetchProjects();
  }, []);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const data = await shopApi.list();
      setShops(data);
    } catch (err: any) {
      message.error(err.message || '获取铺位列表失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await projectApi.list(1, 100);
      setProjects(data.data || data);
    } catch {
      setProjects([]);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_BASE}/upload/image`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setShopImage(data.url);
      message.success('图片上传成功');
    } catch {
      message.error('图片上传失败');
    } finally {
      setUploading(false);
    }
    return false;
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingShop) {
        await shopApi.update(editingShop.id, { ...values, image: shopImage });
        message.success('编辑成功');
      } else {
        await shopApi.create({ ...values, image: shopImage });
        message.success('添加成功');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingShop(null);
      setShopImage('');
      fetchShops();
    } catch (err: any) {
      message.error(err.message || (editingShop ? '编辑失败' : '添加失败'));
    }
  };

  const handleEdit = (shop: Shop) => {
    setEditingShop(shop);
    setShopImage(shop.image || '');
    form.setFieldsValue(shop);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await shopApi.delete(id);
      message.success('删除成功');
      fetchShops();
    } catch {
      message.error('删除失败');
    }
  };

  const columns = [
    { title: '图片', dataIndex: 'image', key: 'image', width: 80, render: (v: string) => v ? (
      <Image src={`${API_BASE}${v}`} alt="图片" width={60} height={60} style={{ objectFit: 'cover', borderRadius: 8 }} />
    ) : <div style={{ width: 60, height: 60, background: '#f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</div> },
    { title: '铺位编号', dataIndex: 'shopCode', key: 'shopCode' },
    { title: '所属项目', dataIndex: 'projectId', key: 'projectId', render: (v: number) => {
      const project = projects.find(p => p.id === v);
      return project ? project.name : `项目${v}`;
    }},
    { title: '楼层', dataIndex: 'floor', key: 'floor' },
    { title: '面积(㎡)', dataIndex: 'area', key: 'area' },
    { title: '租金(元/月)', dataIndex: 'rent', key: 'rent', render: (v: number) => v || '-' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'available' ? 'green' : status === 'occupied' ? 'red' : 'default'}>
          {status === 'available' ? '可入驻' : status === 'occupied' ? '已占用' : status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Shop) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除该铺位吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" danger>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={4}>铺位管理</Typography.Title>

      <Card
        title="铺位列表"
        extra={<Button type="primary" onClick={() => { fetchProjects(); setEditingShop(null); setShopImage(''); form.resetFields(); setModalVisible(true); }}>+ 新增铺位</Button>}
      >
        <Table
          columns={columns}
          dataSource={shops}
          rowKey="id"
          loading={loading}
          locale={{ emptyText: '暂无铺位' }}
        />
      </Card>

      <Modal
        title={editingShop ? '编辑铺位' : '新增铺位'}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); setEditingShop(null); setShopImage(''); form.resetFields(); }}
        footer={null}
        width={500}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={editingShop || {}}>
          <Form.Item label="铺位图片">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Upload beforeUpload={handleImageUpload} showUploadList={false} accept="image/*">
                <Button icon={<UploadOutlined />} loading={uploading}>上传图片</Button>
              </Upload>
              {shopImage && (
                <Image src={`${API_BASE}${shopImage}`} alt="图片预览" width={100} height={100} style={{ objectFit: 'cover', borderRadius: 8 }} />
              )}
            </div>
          </Form.Item>
          <Form.Item name="projectId" label="所属项目" rules={[{ required: true }]}>
            <Select placeholder="请选择所属项目">
              {projects.map(p => (
                <Select.Option key={p.id} value={p.id}>{p.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="shopCode" label="铺位编号" rules={[{ required: true }]}>
            <Input placeholder="如: A-101" />
          </Form.Item>
          <Form.Item name="floor" label="楼层" rules={[{ required: true }]}>
            <Input placeholder="如: 1F、2F、B1" />
          </Form.Item>
          <Form.Item name="area" label="面积(㎡)" rules={[{ required: true }]}>
            <Input type="number" placeholder="请输入面积" />
          </Form.Item>
          <Form.Item name="rent" label="租金(元/月)">
            <Input type="number" placeholder="请输入月租金" />
          </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true }]} initialValue="available">
            <Select>
              <Select.Option value="available">可入驻</Select.Option>
              <Select.Option value="occupied">已占用</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>提交</Button>
        </Form>
      </Modal>
    </div>
  );
}