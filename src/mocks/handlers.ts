// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

interface User {
  id: string;
  nickname: string;
  image: string;
}

const users: User[] = [
  { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' },
  { id: 'zerohch0', nickname: '제로초', image: '/5Udwvqim.jpg' },
  { id: 'leoturtle', nickname: '레오', image: faker.image.avatar() },
];

const products = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  image: faker.image.url(),
}));

const baseUrl = process.env.REACT_APP_BASE_URL;

export const handlers = [
  // 로그인 핸들러
  http.post(`${baseUrl}/api/login`, (req, res, ctx) => {
    const { username, password } = req.body as { username: string; password: string };

    const user = users.find(u => u.id === username);

    if (user && password === 'password') { // 간단한 비밀번호 검증
      return res(
        ctx.status(200),
        ctx.json(user),
        ctx.cookie('connect.sid', 'msw-cookie', { httpOnly: true, path: '/' })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Invalid credentials' })
      );
    }
  }),

  // 로그아웃 핸들러
  http.post('/api/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Logged out successfully' }),
      ctx.cookie('connect.sid', '', { httpOnly: true, path: '/', maxAge: 0 })
    );
  }),

  // 회원가입 핸들러
  http.post('/api/users', (req, res, ctx) => {
    const { username, password, nickname } = req.body as { username: string; password: string; nickname: string };

    const existingUser = users.find(u => u.id === username);

    if (existingUser) {
      return res(
        ctx.status(403),
        ctx.json({ message: 'User already exists' })
      );
    }

    const newUser: User = {
      id: username,
      nickname,
      image: faker.image.avatar(),
    };

    users.push(newUser);

    return res(
      ctx.status(201),
      ctx.json(newUser),
      ctx.cookie('connect.sid', 'msw-cookie', { httpOnly: true, path: '/' })
    );
  }),

  // 상품 목록 핸들러
  http.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(products)
    );
  }),
];
