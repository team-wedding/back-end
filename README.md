# Back-end 기본 템플릿 공유
## 사용법
- local 원하는 폴더에 pull 땡겨오기
- vscode 등 사용하고 있는 ide로 프로젝트 열기
- 터미널 열어서 npm install 입력 
    -> node_modules 폴더를 gitignore 파일에 명시해 두었기 때문에
    -> 위 과정을 통해 꼭 프로젝트에 사용하고 있는 모듈을 설치해야함!!
- 터미널 창에 npm start 입력하여 nodemon을 통해 프로젝트 실행!
--- 
## user 기능으로 알아보는 기본 워크플로우
- app.js에서 시작!
- userRouter.js에서 경로별 길안내 받음!
- userController.js -> userService.js(여기서 userRepository.js가 쓰이는데 이 안에세 sequalize를 활용해 DB에 대한 CRUD 수행)
---
## sequelize setting
- sequelize 관련 파일 : app.js, config.js, repositories 폴더 내 파일