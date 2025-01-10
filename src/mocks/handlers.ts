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
  http.post(`${baseUrl}/api/login`, () => {
    console.log('로그인');
    return HttpResponse.json(users[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      },
    })
  }),
  http.post(`${baseUrl}/api/logout`, () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    })
  }),
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    console.log('회원가입');
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      },
    });
  })

  // 회원가입 핸들러
  // http.post('/api/users', (req, res, ctx) => {
  //   const { username, password, nickname } = req.body as { username: string; password: string; nickname: string };

  //   const existingUser = users.find(u => u.id === username);

  //   if (existingUser) {
  //     return res(
  //       ctx.status(403),
  //       ctx.json({ message: 'User already exists' })
  //     );
  //   }

  //   const newUser: User = {
  //     id: username,
  //     nickname,
  //     image: faker.image.avatar(),
  //   };

  //   users.push(newUser);

  //   return res(
  //     ctx.status(201),
  //     ctx.json(newUser),
  //     ctx.cookie('connect.sid', 'msw-cookie', { httpOnly: true, path: '/' })
  //   );
  // }),

  // 상품 목록 핸들러
  // http.get('/api/products', (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json(products)
  //   );
  // }),
];
