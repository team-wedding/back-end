export interface InvitationData {
    id?: number;
    userId?: number;
    title?: string;
    groomName?: string;
    brideName?: string;
    date?: string;
    location?: string[];
    imgUrl?: string;
    contentType?: string;
    content?: Text;
    groomFatherName?: string;
    groomMotherName?: string;
    brideFatherName?: string;
    brideMotherName?: string;
    weddingTime?: string;
    groomFatherAlive?: boolean;
    groomMotherAlive?: boolean;
    brideFatherAlive?: boolean;
    brideMotherAlive?: boolean;
    backgroundColor?: string;
    attendanceTitle?: string;
    attendanceContent?: Text;
    attendanceIsDining?: boolean;
    attendance?: boolean;
    fontSize?: boolean;
    font?: string;
    audio?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  