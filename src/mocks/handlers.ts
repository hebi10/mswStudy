// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

interface User {
  id: string;
  nickname: string;
  image: string;
}

const users: User[] = [
  { id: 'elonmusk', nickname: 'Elon Musk', image: faker.image.avatar() },
  { id: 'zerohch0', nickname: '제로초', image: faker.image.avatar() },
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
  http.post(`${baseUrl}/api/login`, async ({ request }) => {
    const { username, password } = (await request.json()) as { username: string; password: string };

    const user = users.find(u => u.id === username);

    if (user && password === '1234') { // 간단한 비밀번호 검증
      return HttpResponse.json(
        JSON.stringify(user),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'connect.sid=msw-cookie; HttpOnly; Path=/',
          }
        }, // 헤더
      );
    } else {
      return HttpResponse.json(
        { message: 'Invalid credentials' }, // body를 첫 번째 인수로 전달
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json', // headers 객체 내에 설정
          },
        }
      )
    }
  }),

  // 로그아웃 핸들러
  http.post(`${baseUrl}/api/logout`, () => {
    return new HttpResponse(
      JSON.stringify({ message: 'Logged out successfully' }), // body
      {
        status: 200, // 상태 코드
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'connect.sid=; HttpOnly; Path=/; Max-Age=0',
        }, // 헤더
      }
    );
  }),

  // 회원가입 핸들러
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    const { username, password, nickname } = await (request.json()) as { username: string; password: string; nickname: string };

    const existingUser = users.find(u => u.id === username);

    if (existingUser) {
      return new HttpResponse(
        JSON.stringify({ message: 'User already exists' }), // body
        {
          status: 403, // 상태 코드
          headers: {
            'Content-Type': 'application/json',
          }, // 헤더
        }
      );
    }

    const newUser: User = {
      id: username,
      nickname,
      image: 'https://example.com/avatar/default.png', // faker 사용 예시
    };

    users.push(newUser);

    return new HttpResponse(
      JSON.stringify(newUser), // body
      {
        status: 201, // 상태 코드
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'connect.sid=msw-cookie; HttpOnly; Path=/',
        }, // 헤더
      }
    );
  }),

  // 상품 목록 핸들러
  http.get(`${baseUrl}/api/products`, () => {
    return new HttpResponse(
      JSON.stringify(products), // body
      {
        status: 200, // 상태 코드
        headers: {
          'Content-Type': 'application/json',
        }, // 헤더
      }
    );
  }),
];
