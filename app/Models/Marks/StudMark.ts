import { StudCourseMark } from './StudCourseMark';
import { StudCardData } from '../Reg/Reports/StudCardData';

export class StudMark{
    id:number;
    yearId:string;
    termId:string;
    termName:string;
    studentId:string;
    studentName:string;
    mark:string;
    formTeacherNote: string;
    principalNote: string;
    cleanliness: string;
    rulesRespect: string;
    attendanceDays: number;
    coursesMarks :StudCourseMark [];
    studData :StudCardData;

}