'use client';

import { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Typography, Popconfirm, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { projectApi, Project, API_BASE } from '@/lib/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [coverImage, setCoverImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const result = await projectApi.list(1, 100);
      setProjects(result.data || result);
    } catch (err: any) {
      message.error(err.message || '获取项目列表失败');
    } finally {
      setLoading(false);
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
      setCoverImage(data.url);
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
      if (editingProject) {
        await projectApi.update(editingProject.id, { ...values, coverImage });
        message.success('编辑成功');
      } else {
        await projectApi.create({ ...values, coverImage });
        message.success('新增成功');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingProject(null);
      setCoverImage('');
      fetchProjects();
    } catch (err: any) {
      message.error(err.message || (editingProject ? '编辑失败' : '新增失败'));
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setCoverImage(project.coverImage || '');
    form.setFieldsValue(project);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await projectApi.delete(id);
      message.success('删除成功');
      fetchProjects();
    } catch {
      message.error('删除失败');
    }
  };

  const columns = [
    { title: '封面', dataIndex: 'coverImage', key: 'coverImage', width: 80, render: (v: string) => v ? (
      <Image src={`${API_BASE}${v}`} alt="封面" width={60} height={60} style={{ objectFit: 'cover', borderRadius: 8 }} />
    ) : <div style={{ width: 60, height: 60, background: '#f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</div> },
    { title: '项目名称', dataIndex: 'name', key: 'name' },
    { title: '城市', dataIndex: 'city', key: 'city' },
    { title: '总面积', dataIndex: 'totalArea', key: 'totalArea', render: (v: number) => `${v}㎡` },
    { title: '业态', dataIndex: 'businessType', key: 'businessType' },
    { title: '最低租金', dataIndex: 'minRent', key: 'minRent', render: (v: number) => v ? `¥${v}/月` : '-' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Project) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm
            title="确认删除"
            description="删除后无法恢复，确定要删除吗？"
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
      <Typography.Title level={4}>项目管理</Typography.Title>

      <Card
        title="项目列表"
        extra={<Button type="primary" onClick={() => { setEditingProject(null); setCoverImage(''); form.resetFields(); setModalVisible(true); }}>+ 新增项目</Button>}
      >
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="id"
          loading={loading}
          locale={{ emptyText: '暂无项目' }}
        />
      </Card>

      <Modal
        title={editingProject ? '编辑项目' : '新增项目'}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); setEditingProject(null); setCoverImage(''); form.resetFields(); }}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={editingProject || {}}>
          <Form.Item label="项目封面图">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Upload beforeUpload={handleImageUpload} showUploadList={false} accept="image/*">
                <Button icon={<UploadOutlined />} loading={uploading}>上传图片</Button>
              </Upload>
              {coverImage && (
                <Image src={`${API_BASE}${coverImage}`} alt="封面预览" width={100} height={100} style={{ objectFit: 'cover', borderRadius: 8 }} />
              )}
            </div>
          </Form.Item>
          <Form.Item name="name" label="项目名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="城市" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="totalArea" label="总面积">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="businessType" label="业态">
            <Input />
          </Form.Item>
          <Form.Item name="minRent" label="最低租金">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>提交</Button>
        </Form>
      </Modal>
    </div>
  );
}