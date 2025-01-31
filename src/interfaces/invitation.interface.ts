export interface InvitationData {
    id?: number;
    userId?: number;
    title?: string;
    groomName?: string;
    brideName?: string;
    date?: number[];
    location?: string[];
    imgUrl?: string;
    greetingTitle?: string;
    greetingContent?: Text;
    groomFatherName?: string;
    groomMotherName?: string;
    brideFatherName?: string;
    brideMotherName?: string;
    weddingTime?: number[];
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
  