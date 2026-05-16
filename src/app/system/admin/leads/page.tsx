'use client';

import { useEffect, useState } from 'react';
import { Card, List, Button, Timeline, Modal, Form, Input, Select, DatePicker, message, Tag, Typography, Space, Badge } from 'antd';
import { PlusOutlined, SearchOutlined, PhoneOutlined, ClockCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { leadApi, followApi, Lead, FollowRecord, projectApi, Project, customerApi } from '@/lib/api';

const STAGE_OPTIONS = [
  { value: 'new', label: '新线索', color: 'blue', bg: 'rgba(24,144,255,0.1)' },
  { value: 'contacted', label: '已联系', color: 'cyan', bg: 'rgba(19,194,194,0.1)' },
  { value: 'visit', label: '已带看', color: 'purple', bg: 'rgba(114,46,209,0.1)' },
  { value: 'negotiation', label: '谈判中', color: 'orange', bg: 'rgba(250,173,20,0.1)' },
  { value: 'signed', label: '已成交', color: 'green', bg: 'rgba(82,196,26,0.1)' },
  { value: 'lost', label: '已流失', color: 'red', bg: 'rgba(255,77,79,0.1)' },
];

const LEVEL_OPTIONS = [
  { value: 'A', label: 'A级', color: 'red' },
  { value: 'B', label: 'B级', color: 'orange' },
  { value: 'C', label: 'C级', color: 'default' },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [follows, setFollows] = useState<FollowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [form] = Form.useForm();
  const [stageForm] = Form.useForm();
  const [createForm] = Form.useForm();

  useEffect(() => {
    fetchLeads();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedLead) {
      fetchFollows(selectedLead.id);
    }
  }, [selectedLead]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await leadApi.list();
      setLeads(data);
      if (data.length > 0 && !selectedLead) {
        setSelectedLead(data[0]);
      } else if (data.length > 0 && selectedLead) {
        const updated = data.find((l: Lead) => l.id === selectedLead.id);
        if (updated) setSelectedLead(updated);
      }
    } catch (err: any) {
      message.error(err.message || '获取线索列表失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchFollows = async (leadId: number) => {
    try {
      const data = await followApi.list(leadId);
      setFollows(data);
    } catch {
      setFollows([]);
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

  const handleCreateLead = async (values: { brandName: string; contactName: string; phone: string; brandType?: string; projectId?: number; level?: string }) => {
    try {
      // 先创建客户
      const customer = await customerApi.create({
        brandName: values.brandName,
        contactName: values.contactName,
        phone: values.phone,
        brandType: values.brandType,
        level: values.level || 'C',
        status: 'new',
      });

      // 再创建线索
      await leadApi.create({
        customerId: customer.id,
        projectId: values.projectId,
        level: values.level || 'C',
        stage: 'new',
      });

      message.success('创建成功');
      setCreateModalVisible(false);
      createForm.resetFields();
      fetchLeads();
    } catch (err: any) {
      message.error(err.message || '创建失败');
    }
  };

  const handleAddFollow = async (values: { content: string; next_follow_time: dayjs.Dayjs }) => {
    if (!selectedLead) return;
    try {
      await followApi.create({
        lead_id: selectedLead.id,
        content: values.content,
        next_follow_time: values.next_follow_time.format('YYYY-MM-DD HH:mm:ss'),
      });
      message.success('添加成功');
      setModalVisible(false);
      form.resetFields();
      fetchFollows(selectedLead.id);
      fetchLeads();
    } catch (err: any) {
      message.error(err.message || '添加失败');
    }
  };

  const handleUpdateStage = async (values: { stage: string; next_follow_time?: dayjs.Dayjs }) => {
    if (!selectedLead) return;
    try {
      await leadApi.updateStage(selectedLead.id, {
        stage: values.stage,
        next_follow_time: values.next_follow_time?.format('YYYY-MM-DD HH:mm:ss'),
      });
      message.success('阶段更新成功');
      setStageModalVisible(false);
      stageForm.resetFields();
      fetchLeads();
    } catch (err: any) {
      message.error(err.message || '更新失败');
    }
  };

  const getStageInfo = (stage: string) => STAGE_OPTIONS.find(s => s.value === stage) || { label: stage, color: 'default', bg: 'rgba(0,0,0,0.05)' };
  const getLevelInfo = (level: string) => LEVEL_OPTIONS.find(l => l.value === level) || { label: level || 'C', color: 'default' };

  const isOverdue = (lead: Lead) => {
    if (!lead.nextFollowTime) return false;
    return new Date(lead.nextFollowTime) < new Date();
  };

  const isSilent = (lead: Lead) => {
    if (!lead.lastFollowTime) return false;
    const daysSinceLastFollow = Math.floor((Date.now() - new Date(lead.lastFollowTime).getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceLastFollow > 7;
  };

  // 筛选线索
  const filteredLeads = leads.filter(lead => {
    const searchMatch = !searchText ||
      lead.customer?.brandName?.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.customer?.phone?.includes(searchText);
    const stageMatch = filterStage === 'all' || lead.stage === filterStage;
    return searchMatch && stageMatch;
  });

  // 统计数据
  const stats = {
    total: leads.length,
    overdue: leads.filter(l => isOverdue(l)).length,
    silent: leads.filter(l => isSilent(l)).length,
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography.Title level={4} className="mb-1">线索管理</Typography.Title>
            <div className="flex items-center gap-4 text-sm" style={{ color: '#7A8F8D' }}>
              <span>共 <strong style={{ color: '#1A2E2C' }}>{stats.total}</strong> 条线索</span>
              {stats.overdue > 0 && <span><Badge status="error" /> <strong style={{ color: '#ff4d4f' }}>{stats.overdue}</strong> 超时未跟进</span>}
              {stats.silent > 0 && <span><Badge status="warning" /> <strong style={{ color: '#faad14' }}>{stats.silent}</strong> 沉默客户</span>}
            </div>
          </div>
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => setCreateModalVisible(true)}>
            新建线索
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Lead List */}
        <div className="lg:col-span-1">
          <Card
            loading={loading}
            className="h-full"
            styles={{ body: { padding: 0 } }}
          >
            {/* Search & Filter */}
            <div className="p-4 border-b" style={{ borderColor: '#E8EDEC' }}>
              <Input
                placeholder="搜索客户/电话..."
                prefix={<SearchOutlined style={{ color: '#7A8F8D' }} />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="mb-3"
                allowClear
              />
              <Select
                value={filterStage}
                onChange={setFilterStage}
                style={{ width: '100%' }}
                options={[
                  { value: 'all', label: '全部阶段' },
                  ...STAGE_OPTIONS.map(s => ({ value: s.value, label: s.label })),
                ]}
              />
            </div>

            {/* Lead List */}
            <List
              dataSource={filteredLeads}
              rowKey="id"
              locale={{ emptyText: '暂无线索' }}
              renderItem={lead => {
                const overdue = isOverdue(lead);
                const silent = isSilent(lead);
                const stageInfo = getStageInfo(lead.stage);
                const isSelected = selectedLead?.id === lead.id;

                return (
                  <List.Item
                    onClick={() => setSelectedLead(lead)}
                    className={`px-4 py-3 cursor-pointer transition-all ${isSelected ? 'bg-[#f0f9f8]' : ''}`}
                    style={{
                      borderLeft: isSelected ? '3px solid #2D5553' : silent ? '3px solid #ff4d4f' : '3px solid transparent',
                      background: silent && !isSelected ? 'rgba(255,77,79,0.03)' : 'transparent',
                    }}
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-medium text-sm" style={{ color: '#1A2E2C' }}>
                          {lead.customer?.brandName || `客户${lead.id}`}
                        </span>
                        <Tag color={getLevelInfo(lead.level).color} className="text-xs">{lead.level}级</Tag>
                      </div>

                      <div className="flex items-center gap-3 text-xs mb-2" style={{ color: '#7A8F8D' }}>
                        <span className="flex items-center gap-1"><PhoneOutlined /> {lead.customer?.phone || '-'}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Tag color={stageInfo.color} className="text-xs" style={{ background: stageInfo.bg, border: 'none' }}>
                          {stageInfo.label}
                        </Tag>
                        {overdue && (
                          <span className="text-xs flex items-center gap-1" style={{ color: '#ff4d4f' }}>
                            <ClockCircleOutlined /> 超时
                          </span>
                        )}
                        {silent && !overdue && (
                          <span className="text-xs flex items-center gap-1" style={{ color: '#faad14' }}>
                            7天未跟进
                          </span>
                        )}
                      </div>

                      {lead.nextFollowTime && (
                        <div className="text-xs mt-2 pt-2 border-t" style={{ borderColor: '#E8EDEC', color: overdue ? '#ff4d4f' : '#7A8F8D' }}>
                          下次跟进: {new Date(lead.nextFollowTime).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </List.Item>
                );
              }}
            />
          </Card>
        </div>

        {/* Right: Lead Detail */}
        <div className="lg:col-span-2">
          {selectedLead ? (
            <div className="space-y-4">
              {/* Customer Info Card */}
              <Card
                loading={loading}
                title={
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#2D5553' }}>
                      <span className="text-white font-bold">{selectedLead.customer?.brandName?.charAt(0) || '?'}</span>
                    </div>
                    <div>
                      <span className="font-medium" style={{ color: '#1A2E2C' }}>{selectedLead.customer?.brandName || `客户${selectedLead.id}`}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Tag color={getLevelInfo(selectedLead.level).color} className="text-xs">{selectedLead.level}级客户</Tag>
                        <Tag color={getStageInfo(selectedLead.stage).color} className="text-xs">{getStageInfo(selectedLead.stage).label}</Tag>
                      </div>
                    </div>
                  </div>
                }
                extra={
                  <Button type="primary" onClick={() => {
                    stageForm.setFieldsValue({
                      stage: selectedLead.stage,
                      next_follow_time: selectedLead.nextFollowTime ? dayjs(selectedLead.nextFollowTime) : undefined,
                    });
                    setStageModalVisible(true);
                  }}>
                    更新阶段
                  </Button>
                }
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg" style={{ background: '#F4F7F6' }}>
                    <div className="text-xs mb-1" style={{ color: '#7A8F8D' }}>联系人</div>
                    <div className="font-medium text-sm" style={{ color: '#1A2E2C' }}>{selectedLead.customer?.contactName || '-'}</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: '#F4F7F6' }}>
                    <div className="text-xs mb-1" style={{ color: '#7A8F8D' }}>联系电话</div>
                    <div className="font-medium text-sm" style={{ color: '#1A2E2C' }}>{selectedLead.customer?.phone || '-'}</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: '#F4F7F6' }}>
                    <div className="text-xs mb-1" style={{ color: '#7A8F8D' }}>业态</div>
                    <div className="font-medium text-sm" style={{ color: '#1A2E2C' }}>{selectedLead.customer?.brandType || '-'}</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: '#F4F7F6' }}>
                    <div className="text-xs mb-1" style={{ color: '#7A8F8D' }}>下次跟进</div>
                    <div className="font-medium text-sm" style={{ color: isOverdue(selectedLead) ? '#ff4d4f' : '#1A2E2C' }}>
                      {selectedLead.nextFollowTime ? new Date(selectedLead.nextFollowTime).toLocaleString() : '-'}
                    </div>
                  </div>
                </div>

                {/* Stage Progress */}
                <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E8EDEC' }}>
                  <div className="text-xs mb-3" style={{ color: '#7A8F8D' }}>跟进阶段</div>
                  <div className="flex items-center gap-1">
                    {STAGE_OPTIONS.filter(s => s.value !== 'lost').map((stage, i, arr) => {
                      const currentIndex = STAGE_OPTIONS.findIndex(s => s.value === selectedLead.stage);
                      const isActive = i <= currentIndex;
                      return (
                        <div key={stage.value} className="flex-1 flex items-center">
                          <div
                            className="flex-1 h-2 rounded-full transition-all"
                            style={{ background: isActive ? stage.color : '#E8EDEC' }}
                          />
                          {i < arr.length - 1 && <div className="w-2" />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2">
                    {STAGE_OPTIONS.filter(s => s.value !== 'lost').map(stage => (
                      <span key={stage.value} className="text-xs" style={{ color: selectedLead.stage === stage.value ? stage.color : '#7A8F8D' }}>
                        {stage.label}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Follow Records Card */}
              <Card
                title={
                  <Space>
                    <span>跟进记录</span>
                    <Badge count={follows.length} style={{ backgroundColor: '#2D5553' }} />
                  </Space>
                }
                extra={
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                    添加跟进
                  </Button>
                }
              >
                {follows.length > 0 ? (
                  <Timeline
                    items={follows.map(f => ({
                      color: f.nextFollowTime && new Date(f.nextFollowTime) < new Date() ? 'red' : 'blue',
                      children: (
                        <div className="pb-2">
                          <p className="text-sm mb-1" style={{ color: '#1A2E2C' }}>{f.content}</p>
                          <div className="flex items-center gap-3 text-xs" style={{ color: '#7A8F8D' }}>
                            <span>📅 {new Date(f.followTime).toLocaleString()}</span>
                            {f.nextFollowTime && (
                              <span style={{ color: new Date(f.nextFollowTime) < new Date() ? '#ff4d4f' : '#7A8F8D' }}>
                                ⏰ 下次: {new Date(f.nextFollowTime).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      ),
                    }))}
                  />
                ) : (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-sm" style={{ color: '#7A8F8D' }}>暂无跟进记录</p>
                    <p className="text-xs mt-1" style={{ color: '#B0B8B7' }}>点击右上角按钮添加第一条跟进记录</p>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <Card>
              <div className="text-center py-16">
                <div className="text-5xl mb-4">👈</div>
                <p className="text-base font-medium mb-1" style={{ color: '#1A2E2C' }}>请选择一条线索</p>
                <p className="text-sm" style={{ color: '#7A8F8D' }}>从左侧列表中选择要查看的线索</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Add Follow Modal */}
      <Modal
        title="添加跟进记录"
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddFollow} layout="vertical" className="mt-4">
          <Form.Item name="content" label="跟进内容" rules={[{ required: true, message: '请输入跟进内容' }]}>
            <Input.TextArea rows={4} placeholder="描述本次跟进内容，如：电话沟通需求，约定看场时间..." />
          </Form.Item>
          <Form.Item name="next_follow_time" label="下次跟进时间" rules={[{ required: true, message: '请选择下次跟进时间' }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>提交</Button>
        </Form>
      </Modal>

      {/* Update Stage Modal */}
      <Modal
        title="更新跟进阶段"
        open={stageModalVisible}
        onCancel={() => { setStageModalVisible(false); stageForm.resetFields(); }}
        footer={null}
      >
        <Form form={stageForm} onFinish={handleUpdateStage} layout="vertical" className="mt-4">
          <Form.Item name="stage" label="阶段" rules={[{ required: true }]}>
            <Select>
              {STAGE_OPTIONS.map(s => (
                <Select.Option key={s.value} value={s.value}>{s.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="next_follow_time" label="下次跟进时间">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>提交</Button>
        </Form>
      </Modal>

      {/* Create Lead Modal */}
      <Modal
        title="新建线索"
        open={createModalVisible}
        onCancel={() => { setCreateModalVisible(false); createForm.resetFields(); }}
        footer={null}
        width={500}
      >
        <Form form={createForm} onFinish={handleCreateLead} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="brandName" label="品牌名称" rules={[{ required: true, message: '请输入品牌名称' }]} className="col-span-2">
              <Input placeholder="请输入品牌名称" />
            </Form.Item>
            <Form.Item name="contactName" label="联系人" rules={[{ required: true, message: '请输入联系人' }]}>
              <Input placeholder="请输入联系人" />
            </Form.Item>
            <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入电话' }]}>
              <Input placeholder="请输入联系电话" />
            </Form.Item>
            <Form.Item name="brandType" label="业态">
              <Input placeholder="如: 餐饮、零售" />
            </Form.Item>
            <Form.Item name="level" label="客户等级" initialValue="C">
              <Select>
                {LEVEL_OPTIONS.map(l => (
                  <Select.Option key={l.value} value={l.value}>{l.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="projectId" label="意向项目" className="col-span-2">
              <Select placeholder="请选择意向项目" allowClear>
                {projects.map(p => (
                  <Select.Option key={p.id} value={p.id}>{p.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Button type="primary" htmlType="submit" block className="mt-4">创建线索</Button>
        </Form>
      </Modal>
    </div>
  );
}
