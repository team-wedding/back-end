import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import {postInvitation, getInvitation, putInvitation, deleteInvitation, getInvitations} from "../controllers/invitationController"
import {authToken} from "../middlewares/authToken";

// params에 사용될 id 타입 정의
interface Params {
    id: string;
    [key: string]: string;
};

/**
 * @openapi
 * /api/invitations:
 *   get:
 *     summary: 청첩장 조회(청첩장을 만든 사람 관점)
 *     tags : [Invitations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 특정 유저의 전체 청첩장 정보 반환
 *       404:
 *         description: 특정 유저의 전체 청첩장 찾을 수 없음
 *       500:
 *         description: 서버 에러
 *   post:
 *     summary: 청첩장 등록
 *     tags : [Invitations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "청첩장 제목"
 *               groomName:
 *                 type: string
 *                 example: "홍길동"
 *               brideName:
 *                 type: string
 *                 example: "김영희"
 *               groomFatherName:
 *                 type: string
 *               groomMotherName:
 *                 type: string
 *               brideFatherName:
 *                 type: string
 *               brideMotherName:
 *                 type: string
 *               date:
 *                 type: array
 *                 items:
 *                   types: string
 *                   example: ["2025", "05", "24"]
 *               location:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["서울시 강남구", "사랑홀", "2층"]
 *               imgUrl:
 *                 type: string
 *               greetingTitle:
 *                 type: string
 *               greetingContent:
 *                 type: string
 *               weddingTime:
 *                 type: array
 *                 items:
 *                   types: string
 *                   example: ["10", "30"]
 *               groomFatherAlive:
 *                 type: boolean
 *               groomMotherAlive:
 *                 type: boolean
 *               brideFatherAlive:
 *                 type: boolean
 *               brideMotherAlive:
 *                 type: boolean
 *               backgroundColor:
 *                 type: string
 *               attendanceTitle:
 *                 type: string
 *               attendanceContent:
 *                 type: string
 *               attendanceIsDining:
 *                 type: boolean
 *               attendance:
 *                 type: boolean
 *               fontSize:
 *                 type: boolean
 *               font:
 *                 type: string
 *               audio:
 *                 type: integer
 *               calendars:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     calendar:
 *                       type: boolean
 *                     dDay:
 *                       type: boolean
 *                     countdown:
 *                       type: boolean
 *               maps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     tMap:
 *                       type: boolean
 *                     naverMap:
 *                       type: boolean
 *                     kakaoMap:
 *                       type: boolean
 *                     personalCar:
 *                       type: boolean
 *                     subway:
 *                       type: boolean
 *                     bus:
 *                       type: boolean
 *                     personalCarContent:
 *                       type: string
 *                     subwayContent:
 *                       type: string
 *                     busContent:
 *                       type: string
 *               galleries:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     grid:
 *                       type: boolean
 *               accounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     accountHolderName:
 *                       type: string
 *                     bankName:
 *                       type: string
 *                     accountNumber:
 *                       type: string
 *                     kakaoUrl:
 *                       type: string
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     groomContact:
 *                       type: string
 *                     brideContact:
 *                       type: string
 *                     groomFatherContact:
 *                       type: string
 *                     groomMotherContact:
 *                       type: string
 *                     brideFatherContact:
 *                       type: string
 *                     brideMotherContact:
 *                       type: string
 *               notices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *     responses:
 *       201:
 *         description: 청첩장 생성 성공
 *       400:
 *         description: 청첩장 생성 실패
 *       500:
 *         description: 서버 에러
 *
 * /api/invitations/{id}:
 *   get:
 *     summary: 청첩장 조회(받은 사람 관점)
 *     tags : [Invitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: 청첩장 ID
 *     responses:
 *       200:
 *         description: 청첩장 반환
 *       404:
 *         description: 청첩장 찾을 수 없음
 *       500:
 *         description: 서버 에러
 *
 *   delete:
 *     summary: 청첩장 삭제
 *     tags : [Invitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: 청첩장 ID
 *     responses:
 *       200:
 *         description: 청첩장 삭제 성공
 *       401:
 *         description: 청첩장 삭제 실패
 *       500:
 *         description: 서버 에러
 *   put:
 *     summary: 청첩장 수정
 *     tags : [Invitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: 청첩장 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "청첩장 제목"
 *               groomName:
 *                 type: string
 *                 example: "홍길동"
 *               brideName:
 *                 type: string
 *                 example: "김영희"
 *               groomFatherName:
 *                 type: string
 *               groomMotherName:
 *                 type: string
 *               brideFatherName:
 *                 type: string
 *               brideMotherName:
 *                 type: string
 *               date:
 *                 type: array
 *                 items:
 *                   types: string
 *                   example: ["2025", "05", "24"]
 *               location:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["서울시 강남구", "사랑홀", "2층"]
 *               imgUrl:
 *                 type: string
 *               greetingTitle:
 *                 type: string
 *               greetingContent:
 *                 type: string
 *               weddingTime:
 *                 type: array
 *                 items:
 *                   types: string
 *                   example: ["10", "30"]
 *               groomFatherAlive:
 *                 type: boolean
 *               groomMotherAlive:
 *                 type: boolean
 *               brideFatherAlive:
 *                 type: boolean
 *               brideMotherAlive:
 *                 type: boolean
 *               backgroundColor:
 *                 type: string
 *               attendanceTitle:
 *                 type: string
 *               attendanceContent:
 *                 type: string
 *               attendanceIsDining:
 *                 type: boolean
 *               attendance:
 *                 type: boolean
 *               fontSize:
 *                 type: boolean
 *               font:
 *                 type: string
 *               audio:
 *                 type: integer
 *               calendars:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     calendar:
 *                       type: boolean
 *                     dDay:
 *                       type: boolean
 *                     countdown:
 *                       type: boolean
 *               maps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     tMap:
 *                       type: boolean
 *                     naverMap:
 *                       type: boolean
 *                     kakaoMap:
 *                       type: boolean
 *                     personalCar:
 *                       type: boolean
 *                     subway:
 *                       type: boolean
 *                     bus:
 *                       type: boolean
 *                     personalCarContent:
 *                       type: string
 *                     subwayContent:
 *                       type: string
 *                     busContent:
 *                       type: string
 *               galleries:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     grid:
 *                       type: boolean
 *               accounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     accountHolderName:
 *                       type: string
 *                     bankName:
 *                       type: string
 *                     accountNumber:
 *                       type: string
 *                     kakaoUrl:
 *                       type: string
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     groomContact:
 *                       type: string
 *                     brideContact:
 *                       type: string
 *                     groomFatherContact:
 *                       type: string
 *                     groomMotherContact:
 *                       type: string
 *                     brideFatherContact:
 *                       type: string
 *                     brideMotherContact:
 *                       type: string
 *               notices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     isActive:
 *                       type: boolean
 *                     order:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *     responses:
 *       201:
 *         description: 청첩장 수정 성공
 *       400:
 *         description: 청첩장 수정 실패
 *       500:
 *         description: 서버 에러
 */

router.post('/', authToken, postInvitation);
router.get('/', authToken, getInvitations);

// params로 id를 받아오는 router들은 타입을 지정해줘야 함
router.get('/:id', (req: Request<Params>, res: Response, next: NextFunction) => {
    getInvitation(req, res, next);
});
router.put('/:id', authToken, (req: Request<Params>, res: Response, next: NextFunction) => {
    putInvitation(req, res, next);
});
router.delete('/:id', authToken, (req: Request<Params>, res: Response, next: NextFunction) => {
    deleteInvitation(req, res, next);
});

export default router;
