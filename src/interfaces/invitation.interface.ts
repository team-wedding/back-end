export interface InvitationData {
    userId: number;
    groomName: string;
    brideName: string;
    groomContact: string;
    brideContact: string;
    date: Date;
    location: string;
    imgUrl: string;
    contentType: '제목' | '인삿말';
    content: string;
    groomFatherName: string;
    groomMotherName: string;
    brideFatherName: string;
    brideMotherName: string;
    groomFatherContact: string;
    groomMotherContact: string;
    brideFatherContact: string;
    brideMotherContact: string;
    weddingTime: string;
    groomFatherAlive: boolean;
    groomMotherAlive: boolean;
    brideFatherAlive: boolean;
    brideMotherAlive: boolean;
    font: string;
    weight: string;
    backgroundColor: string;
  }
  