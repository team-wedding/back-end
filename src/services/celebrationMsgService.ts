import * as celebrationMsgRepository from "../repositories/celebrationMsgRepository";
import { celebrationMsgData } from "../interfaces/celebrationMsg.interface";

// 1. 전체 축하메세지 정보 조회 + get
export const getAllCelebrationMsgs = async (
  userId: number,
  page: number,
  size: number
) => {
  try {
    // 시작 위치 계산
    const offset = (page - 1) * size;
    const limit = size;

    // repo 호출
    const allCelebrationMsgs =
      await celebrationMsgRepository.findAllcelebrationMsgs(
        userId,
        offset,
        limit
      );

    // 전체 데이터 개수 및 총 페이지 계산
    const totalItems = await celebrationMsgRepository.countCelebrationMsgs(
      userId
    );
    const totalPages = Math.ceil(totalItems / size);

    return {
      allCelebrationMsgs,
      totalItems,
      totalPages,
    };

    // return await celebrationMsgRepository.findAllcelebrationMsgs(userId);
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
// 2. 개인이 작성한 축하메세지 조회 + get
export const getMyCelebrationMsg = async (
  id: number,
  name: string,
  password: string
) => {
  try {
    return await celebrationMsgRepository.findMyCelebrationMsgByPassword(
      id,
      name,
      password
    );
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

// 3. 개인이 작성한 축하메세지 등록 + post
export const postMyCelebrationMsg = async (
  celebrationMsgData: celebrationMsgData
) => {
  try {
    return await celebrationMsgRepository.createMyCelebrationMsg(
      celebrationMsgData
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(`축하메세지 정보 등록에 실패했습니다. : ${errorMessage}`);
  }
};

// 4. 개인이 작성한 축하메세지 수정 + put
export const putMyCelebrationMsg = async (
  id: number,
  name: string,
  password: string,
  newMessage: string
) => {
  try {
    return await celebrationMsgRepository.updateCelebrationMsgByPassword(
      id,
      name,
      password,
      newMessage
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(`축하메세지 정보 수정에 실패했습니다. : ${errorMessage}`);
  }
};

// 5. 개인이 작성한 축하메세지 삭제 + delete
export const deleteMyCelebrationMsg = async (
  id: number,
  name: string,
  password: string
) => {
  try {
    return await celebrationMsgRepository.removeMyCelebrationMsgByPassword(
      id,
      name,
      password
    );
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
