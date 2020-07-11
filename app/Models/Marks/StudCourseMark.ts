import { StudCourseExam } from './StudCourseExam';

export class StudCourseMark {
    id: number;
    studentId: number;
    studentName: string;
    yearlyCourseId: number;
    courseName: string;
    termId: string;
    mark: number;
    note: string;
    maxMark: number;
    minMark: number;
    coursesExams : StudCourseExam [];
}