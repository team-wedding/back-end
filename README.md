# 💍 team-wedding back-End

## 📁 주요 기능

#### 1️⃣ 청첩장 관리
<div align="center">
  <img src="https://github.com/user-attachments/assets/3e05b0f8-df40-4933-9ee2-d2e12c93d0ee" width="300px" />
</div>

- 나만의 청첩장을 생성, 수정, 조회, 삭제할 수 있습니다.

<br/>

#### 2️⃣ 청첩장 만들기: 3단계 입력과 8가지 선택 기능
<div align="center">
  <img src="https://github.com/user-attachments/assets/0e6f3273-e371-4ff1-9b5d-6353bba5a41e" width="500px" />
</div>

- 1단계에서는 이름, 일시, 장소와 같은 필수 기본 정보를 입력할 수 있습니다.

<br/>

<div align="center">
  <img src="https://github.com/user-attachments/assets/14e37802-1e34-4b0b-abb3-4b3cf5ed8195" width="500px" />
</div>

- 2단계에서는 캘린더, 지도/교통수단, 갤러리, 축의금, 연락하기, 공지사항, 글꼴, 배경음악 8가지의 선택 정보 중 원하는 기능을 골라 청첩장에 포함시킬 수 있습니다.

<br/>

<div align="center">
  <img src="https://github.com/user-attachments/assets/aed2b60b-e009-417e-9c5e-e802f94a0906" width="500px" />
</div>

- 3단계에서는 청첩장의 글꼴, 음악과 같은 테마를 설정할 수 있습니다.

<br/>

#### 3️⃣ 청첩장 공유
<div align="center">
  <img src="https://github.com/user-attachments/assets/41e47434-79ef-4967-b59b-0db338c020b5" width="500px" />
</div>

- 제작한 청첩장을 하객들에게 공유할 수 있습니다.
- 이때 URL 복사, 카카오, QR 코드 3가지의 방법을 통해 공유할 수 있습니다.

<br/>

#### 4️⃣ RSVP: 참석여부 관리
<div align="center">
  <img src="https://github.com/user-attachments/assets/b961289e-38d9-49be-bb1a-826d81f850e6" width="300px" />
</div>

- 하객들로부터 참석여부 데이터를 받고 이를 관리할 수 있습니다. 
- 총 통계 데이터 및 상세 목록을 확인할 수 있으며, 해당 정보를 엑셀 파일로 다운로드할 수 있습니다.

<br/>

#### 5️⃣ 포토톡: 실시간 포토월
<div align="center">
  <img src="https://github.com/user-attachments/assets/053ffbf3-bf3c-4d68-970b-1320d9d4dc00" width="300px" />
</div>

- 하객들로부터 실시간 포토월 데이터를 받을 수 있습니다.
- 하객들은 사진과 축하메세지를 입력하여 포토월을 등록할 수 있고, 청첩장 제작자는 갤러리를 통해 이미지들을 다운로드하고 삭제할 수 있습니다.

<br/>

#### 6️⃣ 다크 모드
<div align="center">
  <img src="https://github.com/user-attachments/assets/fcb98a59-3ca9-449f-9b7d-895c1b2530e1" width="300px" />
</div>

- 다크 모드를 통해 청첩장의 색감 반전을 경험할 수 있습니다. 

---

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
- swagger: https://app.swaggerhub.com/apis-docs/GHOONGHOON_1/wedding/1.0.0 or 서버 실행 후 http://localhost:${PORT}/api-docs
- notion: https://motley-sundae-448.notion.site/API-19e9673ec7978153a9b7ef2992ff606c

---

## 🧑‍💻 개발자 정보
<table>
  <tr>
    <td>
      <img src="https://avatars.githubusercontent.com/u/120161508?v=4" width="120px" height="120px"/>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/55120757?v=4" width="120px" height="120px"/>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/121949750?v=4" width="120px" height="120px"/>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/jonghoon-L">
        이종훈
      </a>
    </td>
    <td>
      <a href="https://github.com/heebeom-song">
        송희범
      </a>
    </td>
    <td>
      <a href="https://github.com/wlqgkrry">
        오지현
      </a>
    </td>
  </tr>
</table>