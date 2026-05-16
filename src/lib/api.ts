import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Token management
export const tokenStorage = {
  get: () => typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  set: (token: string) => typeof window !== 'undefined' && localStorage.setItem('token', token),
  remove: () => typeof window !== 'undefined' && localStorage.removeItem('token'),
};

// Add token to requests
api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const fetcher = (url: string) => api.get(url).then(r => r.data);

export interface Project {
  id: number;
  name: string;
  city: string;
  address: string;
  totalArea: number;
  description?: string;
  coverImage?: string;
  minRent?: number;
  businessType?: string;
}

export interface Shop {
  id: number;
  projectId: number;
  shopCode: string;
  floor: string;
  area: number;
  rent?: number;
  status: string;
  image?: string;
}

export interface Application {
  id?: number;
  projectId: number;
  projectName?: string;
  brandName: string;
  contactName: string;
  phone: string;
  intentionArea?: string;
  intentionCity?: string;
  status?: string;
  remark?: string;
  createdAt?: string;
}

export interface Lead {
  id: number;
  customerId: number;
  status: string;
  level: string;
  stage: string;
  nextFollowTime?: string;
  lastFollowTime?: string;
  customer?: any;
  projectId?: number;
  project?: Project;
}

export interface FollowRecord {
  id: number;
  leadId: number;
  content: string;
  followTime: string;
  nextFollowTime?: string;
}

export interface Customer {
  id: number;
  brandName: string;
  contactName: string;
  phone: string;
  brandType?: string;
  storeCount?: number;
  intentionArea?: number;
  intentionCity?: string;
  level?: string;
  status?: string;
}

export interface User {
  id: number;
  username: string;
  role?: string;
}

export interface LoginResponse {
  code: number;
  data?: {
    access_token: string;
    user: User;
  };
  message: string;
}

// Auth API
export const authApi = {
  login: (username: string, password: string) => api.post<LoginResponse>('/auth/login', { username, password }).then(r => r.data),
  register: (username: string, password: string) => api.post<User>('/auth/register', { username, password }).then(r => r.data),
};

// API methods
export const projectApi = {
  list: (page = 1, limit = 20) => api.get(`/projects?page=${page}&limit=${limit}`).then(r => r.data),
  detail: (id: number) => api.get<Project>(`/projects/${id}`).then(r => r.data),
  create: (data: Partial<Project>) => api.post('/projects', data).then(r => r.data),
  update: (id: number, data: Partial<Project>) => api.put(`/projects/${id}`, data).then(r => r.data),
  delete: (id: number) => api.delete(`/projects/${id}`).then(r => r.data),
};

export const shopApi = {
  list: (projectId?: number) => api.get<Shop[]>(`/shops${projectId ? `?project_id=${projectId}` : ''}`).then(r => r.data),
  create: (data: Partial<Shop>) => api.post('/shops', data).then(r => r.data),
  update: (id: number, data: Partial<Shop>) => api.put(`/shops/${id}`, data).then(r => r.data),
  delete: (id: number) => api.delete(`/shops/${id}`).then(r => r.data),
};

export const leadApi = {
  list: () => api.get<Lead[]>('/leads').then(r => r.data),
  stats: () => api.get('/leads/stats').then(r => r.data),
  create: (data: Partial<Lead>) => api.post('/leads', data).then(r => r.data),
  updateStage: (id: number, data: { stage: string; next_follow_time?: string }) => api.put(`/leads/${id}/stage`, data).then(r => r.data),
  update: (id: number, data: Partial<Lead>) => api.put(`/leads/${id}`, data).then(r => r.data),
};

export const followApi = {
  list: (leadId: number) => api.get(`/follow?lead_id=${leadId}`).then(r => r.data),
  create: (data: { lead_id: number; content: string; next_follow_time: string }) => api.post('/follow', data).then(r => r.data),
};

export const customerApi = {
  list: () => api.get<Customer[]>('/customers').then(r => r.data),
  create: (data: Partial<Customer>) => api.post('/customers', data).then(r => r.data),
  update: (id: number, data: Partial<Customer>) => api.post('/customers/update', { id, ...data }).then(r => r.data),
};

export const applicationApi = {
  list: () => api.get<Application[]>('/applications').then(r => r.data),
  create: (data: Application) => api.post('/applications', data).then(r => r.data),
  update: (id: number, data: Partial<Application>) => api.put(`/applications/${id}`, data).then(r => r.data),
};

// SWR Hooks for auto-refresh
const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
};

// 处理分页响应
const paginatedFetcher = (url: string) => api.get(url).then(r => {
  const data = r.data;
  // 如果是分页格式 { data: [], total: number }，返回 data 数组
  if (data && Array.isArray(data.data)) {
    return data.data;
  }
  // 否则直接返回
  return data;
});

export function useProjects() {
  return useSWR<Project[]>('/projects', paginatedFetcher, swrConfig);
}

export function useProject(id: number) {
  return useSWR<Project>(`/projects/${id}`, fetcher, swrConfig);
}

export function useShops(projectId: number) {
  return useSWR<Shop[]>(`/shops?project_id=${projectId}`, fetcher, swrConfig);
}

export default api;
