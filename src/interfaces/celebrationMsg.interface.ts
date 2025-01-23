export interface celebrationMsgData {
  id?: number;
  userId: number;
  invitationId: number;
  name: string;
  password: string;
  imageUrl: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
