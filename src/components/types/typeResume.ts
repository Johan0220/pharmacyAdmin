type ResumeSlice = {
   id: string;
   fullname: string;
   email: string;
   number: string;
   university: string;
   status: string;
   isAccepted: string;
}

type ResumeDetail = {
   id: string;
   fullname: string;
   age: number;
   dateOfBirth: string;
   gender: string;
   address: string;
   number: string;
   email: string;
   thumbnail: string;
   fileCv: string;
   skills: string;
   universityOrCollege: string;
   major: string;
   issuedDate: string;
   expiryDate: string;
   scientificAchievements: string;
   workExperiences: string;
   reference: string;
   status: string;
   createdAt: string;
   updateAt: string;
   isAccepted: string;
}
type  ResumeHandler = {
   idProfileDetail: string;
   isQualified: number;
   body: {
      to: string;
      interviewAddress: string;
      appointment: string;
      content: string
   }
}

export type { ResumeSlice, ResumeDetail, ResumeHandler} 