import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Direct call to NestJS backend API
    const response = await fetch(`http://localhost:3002/projects?_=${Date.now()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    const backendData = await response.json();
    return NextResponse.json({
      code: 0,
      message: 'success',
      data: backendData.data || [],
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({
      code: 1,
      message: '获取项目列表失败',
      data: [],
    }, { status: 500 });
  }
}