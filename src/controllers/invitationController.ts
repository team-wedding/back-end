import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as invitationService from "../services/invitationService";
import { InvitationData } from "../interfaces/invitation.interface";
import { User as IUser } from '../interfaces/user.interface';

const validateIdParam = (param: string): number => {
    const id = Number(param);
    if (isNaN(id)) {
        throw new Error('유효하지 않은 ID입니다.');
    }
    return id;
};

export const postInvitation: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const invitationData: InvitationData = req.body; // 요청 본문에서 청첩장 데이터를 추출
        const userInfo: IUser = req.userInfo; // 토큰에서 사용자 정보 추출
        invitationData.userId = userInfo.id as number; // invitationData에 userId 설정

        const { calendars, maps, galleries, accounts, contacts, notices } = req.body; // 선택 정보 데이터 추출

        const result = await invitationService.createInvitation(userInfo.id as number, 
            invitationData, calendars, maps, galleries, accounts, contacts, notices);

        if (result) {
            res.status(StatusCodes.CREATED).json({ 
                message: '청첩장이 생성되었습니다.'
            });
            return;
        }
        res.status(StatusCodes.BAD_REQUEST).json({ 
            message: '청첩장 생성 실패.' 
        });
        
    } catch (err) {
        next(err);
    }
};

export const getInvitation: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const invitationId: number = validateIdParam(req.params.id);
        const invitation = await invitationService.getInvitationById(invitationId);

        if (invitation) {
            res.status(StatusCodes.OK).json(invitation);
            return;
        }
        res.status(StatusCodes.OK).json([]);
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: '해당 청첩장이 없습니다' });
        next(err);
    }
};

export const putInvitation: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const invitationId: number = validateIdParam(req.params.id);
        const userInfo: IUser = req.userInfo; // 토큰에서 가져온 userInfo
        const updatedData: InvitationData = req.body;
        const { calendars, maps, galleries, accounts, contacts, notices } = req.body; // 선택 정보 데이터 추출

        if (!userInfo || !userInfo.id) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: '토큰이 없습니다.' });
            return;
        }

        const isUpdated = await invitationService.updateInvitation(userInfo.id, invitationId, updatedData, calendars, maps, galleries, accounts, contacts, notices);

        if (isUpdated) {
            res.status(StatusCodes.OK).json({ message: '청첩장이 수정되었습니다.' });
            return;
        }
        res.status(StatusCodes.BAD_REQUEST).json({ message: '변경된 내용이 없습니다.' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: '해당 청첩장이 없습니다' });
        next(err);
    }
};

export const deleteInvitation: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const invitationId: number = validateIdParam(req.params.id);
        const userInfo: IUser = req.userInfo;

        if (!userInfo || !userInfo.id) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: '토큰이 없습니다.' });
            return;
        }

        const isDeleted = await invitationService.deleteInvitation(userInfo.id, invitationId);

        if (isDeleted) {
            res.status(StatusCodes.OK).json({ message: '청첩장이 삭제되었습니다.' });
            return;
        }
        res.status(StatusCodes.BAD_REQUEST).json({ message: '청첩장 삭제 실패.' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: '해당 청첩장이 없습니다' });
        next(err);
    }
};

export const getInvitations: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userInfo: IUser = req.userInfo;
        const invitations = await invitationService.getInvitationsByUserId(userInfo.id as number);

        if (invitations && invitations.length > 0) {
            res.status(StatusCodes.OK).json(invitations);
            return;
        }
        res.status(StatusCodes.OK).json([]);
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: '해당 청첩장이 없습니다' });
        next(err);
    }
};
