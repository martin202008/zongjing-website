import { NextResponse } from 'next/server';

const validUsers = [
  { username: 'zs001', password: 'Zx2024!', role: 'staff' },
  { username: 'zs002', password: 'Zx2024!', role: 'staff' },
  { username: 'zs003', password: 'Zx2024!', role: 'staff' },
  { username: 'zs004', password: 'Zx2024!', role: 'staff' },
  { username: 'zs005', password: 'Zx2024!', role: 'staff' },
  { username: 'zs006', password: 'Zx2024!', role: 'staff' },
  { username: 'zs007', password: 'Zx2024!', role: 'staff' },
  { username: 'zs008', password: 'Zx2024!', role: 'staff' },
  { username: 'zs009', password: 'Zx2024!', role: 'staff' },
  { username: 'zs010', password: 'Zx2024!', role: 'staff' },
  { username: 'admin', password: 'admin123', role: 'admin' },
];

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = validUsers.find(u => u.username === username && u.password === password);

    if (!user) {
      return NextResponse.json(
        { code: 401, message: '用户名或密码错误', data: null },
        { status: 401 }
      );
    }

    // Generate a mock JWT token
    const token = Buffer.from(JSON.stringify({
      username: user.username,
      role: user.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    })).toString('base64');

    return NextResponse.json({
      code: 0,
      message: '登录成功',
      data: {
        access_token: token,
        user: {
          id: 1,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}