import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import {postInvitation, getInvitation, putInvitation, deleteInvitation, getInvitations} from "../controllers/invitationController"
import {authToken} from "../middlewares/authToken";

// params에 사용될 id 타입 정의
interface Params {
    id: string;
    [key: string]: string;
};

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
