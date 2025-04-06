import db from "../models";
import { celebrationMsgData } from "../interfaces/celebrationMsg.interface";
import CelebrationMsg from "../models/celebrationMsg";

// 1. 전체 축하메세지 정보 조회
export const findAllcelebrationMsgs = async (
  userId: number,
  offset: number,
  limit: number
): Promise<CelebrationMsg[]> => {
  try {
    console.log("모든 축하메세지 기록을 불러오는 중입니다...");
    const celebrationMsg = await db.CelebrationMsg.findAll({
      where: { userId },
      offset,
      limit,
      order: [["id", "DESC"]],
    });
    if (!celebrationMsg) {
      console.log("전체 축하메세지 정보가 없습니다.");
    }
    console.log("모든 축하메세지 기록이 불러와졌습니다. : ", celebrationMsg);
    return celebrationMsg;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(
      `모든 축하메세지 정보 기록을 불러오는 것에 실패했습니다. : ${errorMessage}`
    );
  }
};

// 개수 세기
export const countCelebrationMsgs = async (userId: number) => {
  return await CelebrationMsg.count({
    where: { userId },
  });
};

// 2. 개인이 작성한 축하메세지 조회
export const findMyCelebrationMsgByPassword = async (
  id: number,
  name: string,
  password: string
): Promise<CelebrationMsg | null> => {
  try {
    console.log(
      `아이디 ${id}, 이름 ${name}, 비밀번호 ${password}에 해당하는 개인 축하메세지 정보를 불러오는 중입니다..`
    );
    const celebrationMsg = await db.CelebrationMsg.findOne({
      where: { id, name, password },
    });
    if (!celebrationMsg) {
      console.warn(
        `아이디 ${id}, 이름 ${name}, 비밀번호 ${password}에 해당하는 축하메세지 정보가 없습니다.`
      );
    }
    return celebrationMsg;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(
      `아이디 ${id}, 이름 ${name}, 비밀번호 ${password}의 축하메세지 정보를 불러오는 것에 실패했습니다. : ${errorMessage}`
    );
  }
};

// 3. 개인이 작성한 축하메세지 생성
export const createMyCelebrationMsg = async (
  celebrationMsgData: celebrationMsgData
): Promise<CelebrationMsg> => {
  try {
    const celebrationMsg = await db.CelebrationMsg.create({
      userId: celebrationMsgData.userId,
      invitationId: celebrationMsgData.invitationId,
      name: celebrationMsgData.name,
      password: celebrationMsgData.password,
      imageUrl: celebrationMsgData.imageUrl,
      message: celebrationMsgData.message,
      createdAt: celebrationMsgData.createdAt,
      updatedAt: celebrationMsgData.updatedAt,
    });
    if (!celebrationMsg) {
      console.log("축하메세지 정보 등록에 필요한 정보를 생성하지 못했습니다.");
    }
    return celebrationMsg;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(`축하메세지 정보 등록에 실패했습니다. : ${errorMessage}`);
  }
};

// 4. 개인이 작성한 축하메세지 수정 + put
export const updateCelebrationMsgByPassword = async (
  id: number,
  name: string,
  password: string,
  newMessage: string
): Promise<CelebrationMsg | null> => {
  try {
    console.log(
      `다음 이름과 비밀번호를 통해 축하메세지 수정 시도중입니다.. name : ${name}, password : ${password}`
    );

    const celebrationMsg = await db.CelebrationMsg.findOne({
      where: { id, name, password },
    });

    if (celebrationMsg) {
      celebrationMsg.message = newMessage;
      const updatedCelebrationMsg = await celebrationMsg.save();

      console.log(
        `다음 이름과 비밀번호로 기록된 축하메세지 정보가 성공적으로 수정되었습니다. id : ${id}, name : ${name}, password : ${password}.`
      );

      return updatedCelebrationMsg;
    } else {
      console.log(
        `입력된 아이디, 이름, 비밀번호에 만족하는 축하메세지가 존재하지 않습니다. id : ${id} name : ${name}, passoword : ${password}`
      );
      return null;
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(`축하메세지 정보 수정에 실패했습니다. : ${errorMessage}`);
  }
};

// 5. 개인이 작성한 축하메세지 삭제 + delete
export const removeMyCelebrationMsgByPassword = async (
  id: number,
  name: string,
  password: string
): Promise<boolean> => {
  try {
    console.log(
      `다음 이름과 비밀번호를 통해 축하메세지 정보 삭제 시도중입니다.. name : ${name}, password : ${password}`
    );
    const celebrationMsg = await db.CelebrationMsg.findOne({
      where: { id, name, password },
    });

    if (!celebrationMsg) {
      console.warn(
        `다음 이름과 비밀번호로 기록된 축하메세지 정보가 없습니다. name : ${name}, password : ${password}`
      );
      return false;
    }

    await db.CelebrationMsg.destroy({ where: { id, name, password } });
    console.log(
      `다음 이름과 비밀번호로 기록된 축하메세지 정보가 성공적으로 삭제되었습니다. name : ${name}, password : ${password}.`
    );
    return true;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(
      `다음 이름과 비밀번호로 기록된 축하메세지 정보 삭제에 실패했습니다. name : ${name}, password : ${password} : ${errorMessage}`
    );
  }
};

// 6. 관리자 모드 포토톡 삭제 기능 + delete
export const removeCelebrationMsgByAdmin = async (
  id: number
): Promise<boolean> => {
  try {
    const celebrationMsg = await db.CelebrationMsg.findOne({
      where: { id },
    });

    if (!celebrationMsg) {
      console.log(
        `다음 관리자 아이디로 삭제할 축하메세지 정보가 없습니다. id : ${id}`
      );
      return false;
    }

    await db.CelebrationMsg.destroy({ where: { id } });
    console.log(
      `다음 관리자 아이디로 해당 축하메세지 정보를 성공적으로 삭제했습니다. id : ${id}`
    );
    return true;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(
      `다음 관리자 아이디로 해당 축하메세지 정보 삭제에 실패했습니다. (id : ${id}) : ${errorMessage}`
    );
  }
};
