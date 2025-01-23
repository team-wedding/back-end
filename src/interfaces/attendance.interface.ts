export interface attendanceData {
  id?: number;
  userId: number;
  invitationId: number;
  name: string;
  contact: string;
  isDining: "예정" | "안함" | "미정";
  attendance: boolean;
  isGroomSide: boolean;
  isBrideSide: boolean;
  companions: number;
}

// User 타입 정의
export interface UserInfo {
  id: number;
}

// optional (선택) 속성 정의 - id
export interface AttendanceCreationAttributes extends Partial<attendanceData> {
  id?: number;
}
