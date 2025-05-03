# 💍 team-wedding back-End

## 🔧 설치 및 실행 방법
1. 의존성 설치
```js
npm install
```
2. 서버 실행
```js
npm run dev
```
3. 프로덕션 빌드 및 실행
```js
npm run build
npm start
```
- 개발 시에는 npm run dev를 통해 dist 파일 생성을 생략하고 바로 실행이 가능합니다.
- 배포 및 운영 시에는 npm run build를 통해 js/dist 파일 생성 후 npm start를 해주시면 됩니다.

---

## 📦 디렉토리 구조
```js
src/
├── controllers/ # API 요청 처리 및 응답
├── interfaces/ # 도메인 별 type 인터페이스
├── middlewares/ # 인증, 유효성 검사
├── models/ # Sequelize 모델
├── repositories/ # DB 접근 로직
├── routes/ # API 앤드포인트 라우터
├── services/ # 비즈니스 로직
├── types/ # Request 모듈 타입 확장
├── utils/ # S3, 토큰 처리, 에러 처리 함수
├── app.ts/ # 서버 설정 및 실행
```

---

## 🔐 env
```js
PORT = 
DATABASE_URL = 
JWT_SECRET = 
DATABASE_USER = 
DATABASE_PASSWORD = 
DATABASE_NAME = 
DATABASE_HOST = 
DATABASE_PORT = 
TOKEN_SECRET_KEY = 
KAKAO_ID = 
KAKAO_REDIRECT_URI = 
NAVER_ID = 
NAVER_SECRET = 
NAVER_REDIRECT_URI = 
NODEMAILER_HOST = 
NODEMAILER_AUTH_USER = 
NODEMAILER_AUTH_PASS = 
NODEMAILER_PORT = 
AWS_ACCESS_KEY_ID = 
AWS_SECRET_ACCESS_KEY = 
AWS_BUCKET_NAME = 
AWS_REGION = 
```
- env 파일에는 위와 같은 정보가 포함되어야 합니다.

---

## 🗺️ 기능 라우팅
```js
/api/users/# // 회원 관련 기능
/api/invitations/# // 청첩장 관련 기능
/api/attendances/# // 통계 관련 기능
/api/celebrationMsgs/# // 포토톡 관련 기능
/api/s3/# // s3 이미지 관련 기능
```

---

## 📄 API 명세서
- swagger: https://app.swaggerhub.com/apis-docs/GHOONGHOON_1/wedding/1.0.0
- notion: https://motley-sundae-448.notion.site/API-19e9673ec7978153a9b7ef2992ff606c

---

## 🧑‍💻 개발자 정보
- 💂🏻‍♂️ [이종훈](https://github.com/jonghoon-L)
- 🦸🏻‍♂️ [송희범](https://github.com/heebeom-song)
- 👮🏻‍♀️ [오지현](https://github.com/wlqgkrry)