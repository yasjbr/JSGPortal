import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AuthGuard } from './auth/auth-guard.service';
import { StudMarkModule } from './pages/Marks/stud-mark/stud-mark.module';


StudMarkModule 
export const routes: Routes = [
    // { path: '', loadChildren: './pages/login/login.module#LoginModule' },
    {
        path: '',
        component: PagesComponent, children: [
            // { path: 'login', loadChildren: './pages/login/login.module#LoginModule', data: { breadcrumb: 'Login' } },
            {
                path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
                data: { breadcrumb: 'الصفحة الرئيسية' }, canActivate: [AuthGuard]
            },
 
            {
                path: 'users', loadChildren: './pages/users/users.module#UsersModule',
                data: { breadcrumb: 'Users' }, canActivate: [AuthGuard]
            },
            {
                path: 'lookups', loadChildren: './pages/lookups/lookups.module#LookupsModule',
                data: { breadcrumb: 'System lookups' }, canActivate: [AuthGuard]
            },
            {
                path: 'schools', loadChildren: './pages/addLookups/schools/schools.module#SchoolsModule',
                data: { breadcrumb: 'Schools' }, canActivate: [AuthGuard]
            },
            //ClassDivisions
            {
                path: 'classdivisions', loadChildren: './pages/addLookups/divisions/divisions.module#DivisionsModule',
                data: { breadcrumb: 'Division' }, canActivate: [AuthGuard]
            },
            //CorsesDivisionsTeachers
            {
                path: 'corsesTeacher', loadChildren: './pages/corses-teachers/corses-teachers.module#CorsesTeachersModule',
                data: { breadcrumb: 'CorsesTeachers' }, canActivate: [AuthGuard]
            },
            {
                path: 'sections', loadChildren: './pages/addLookups/sections/section.module#SectionModule',
                data: { breadcrumb: 'Departments' }, canActivate: [AuthGuard]
            },
            {
                path: 'buses', loadChildren: './pages/addLookups/Buses/bus.module#BusModule',
                data: { breadcrumb: 'Buses' }, canActivate: [AuthGuard]
            },
            {
                path: 'tours', loadChildren: './pages/addLookups/tours/tour.module#TourModule',
                data: { breadcrumb: 'Schools tours' }, canActivate: [AuthGuard]
            },
            {
                path: 'classes', loadChildren: './pages/addLookups/classes/class.module#ClassModule',
                data: { breadcrumb: 'Schools classes' }, canActivate: [AuthGuard]
            },

            // Registration Menu
            // tslint:disable-next-line: max-line-length

            {
                path: 'parents', loadChildren: './pages/Reg/parents/reg-parent.module#RegParentModule',
                data: { breadcrumb: 'Parent registration' }, canActivate: [AuthGuard]
            },
            {
                path: 'students', loadChildren: './pages/Reg/student/student.module#StudentModule',
                data: { breadcrumb: 'Student registration' }, canActivate: [AuthGuard]
            },
            {
                path: 'regStuds', loadChildren: './pages/Reg/registration/reg-stud.module#RegStudModule',
                data: { breadcrumb: 'Student registration' }, canActivate: [AuthGuard]
            },
            {
                path: 'Change-division', loadChildren: './pages/Reg/cha-division/cha-division.module#ChaDivisionModule',
                data: { breadcrumb: 'division registration' }, canActivate: [AuthGuard]
            },
            {
                path: 'regStuds', loadChildren: './pages/Reg/Employee/employee.module#EmployeeModule',
                data: { breadcrumb: 'Registration Employee' }, canActivate: [AuthGuard]
            },
            {
                path: 'UpdateTour', loadChildren: './pages/Reg/update-tour/update-tour.module#UpdateTourModule',
                data: { breadcrumb: 'UpdateToure' }, canActivate: [AuthGuard]
            },
            // Admission
            {
                path: 'admissions', loadChildren: './pages/Admission/adm.module#AdmModule',
                data: { breadcrumb: 'Admission' }, canActivate: [AuthGuard]
            },

            // // Financial
            {
                path: 'financial/finItem', loadChildren: './pages/financial/fin-item/fin-item.module#FinItemModule',
                data: { breadcrumb: 'Finance items' }, canActivate: [AuthGuard]
            },
            {
                path: 'financial/schoolFee', loadChildren: './pages/financial/school-fee/school-fee.module#SchoolFeeModule',
                data: { breadcrumb: 'School finance' }, canActivate: [AuthGuard]
            },
            {
                path: 'financial/classFee', loadChildren: './pages/financial/class-fee/class-fee.module#ClassFeeModule',
                data: { breadcrumb: 'Classes finance' }, canActivate: [AuthGuard]
            },
            {
                path: 'financial/studentFee', loadChildren: './pages/financial/student-fee/student-fee.module#StudentFeeModule',
                data: { breadcrumb: 'Student finance' }, canActivate: [AuthGuard]
            },
            {
                path: 'financial/payment', loadChildren: './pages/financial/payment/payment.module#PaymentModule',
                data: { breadcrumb: 'Payments' }, canActivate: [AuthGuard]
            },

            {
                path: 'financial/receipt', loadChildren: './pages/financial/debentures/debentures.module#DebenturesModule',
                data: { breadcrumb: 'Receipt finance' }, canActivate: [AuthGuard]
            },
            {
                path: 'financial/debts', loadChildren: './pages/financial/previousdebts/previousdebts.module#PreviousdebtsModule',
                data: { breadcrumb: 'Financial Debts' }, canActivate: [AuthGuard]
            },

            // Reports
            {
                path: 'reports', loadChildren: './pages/reports/rep.module#RepModule',
                data: { breadcrumb: 'Reports' }, canActivate: [AuthGuard]
            },
            //Stock
            {
                path: 'Stock', loadChildren: './pages/stock/stock.module#StockModule',
                data: { breadcrumb: 'Stock' }, canActivate: [AuthGuard]
            },
            //Supplier
            {
                path: 'Supplier', loadChildren: './pages/supplier/supplier.module#SupplierModule',
                data: { breadcrumb: 'Supplier' }, canActivate: [AuthGuard]
            },
            //Marks

            
            {
                path: 'marks/studMark', loadChildren: './pages/Marks/stud-mark/stud-mark.module#StudMarkModule',
                data: { breadcrumb: 'Stud marks' }, canActivate: [AuthGuard]
            },

            {
                path: 'marks/Course', loadChildren: './pages/Marks/course/course.module#CourseModule',
                data: { breacrumb: 'Course' }, canActivate: [AuthGuard]
            },
   
            {
                path:'marks/YearlyCourse',loadChildren: './pages/Marks/yearly-course/yearly-course.module#YearlyCourseModule',
                data:{breadcrumb:'YearlyCourse'},canActivate:[AuthGuard]
            },

            {

                path:'marks/YearlyCourseExam',loadChildren: './pages/Marks/yearly-course-exam/yearly-course-exam.module#YearlyCourseExamModule',
                data:{breadcrumb:'YearlyCourseExam'},canActivate:[AuthGuard]
            },

            {
                path:'marks/StudCourseMark',loadChildren:'./pages/Marks/stud-course-mark/stud-course-mark.module#StudCourseMarkModule',
                data:{breadcrumb:'StudCourseMark'},canActivate:[AuthGuard]
            },

            {
                path:'marks/StudCourseExam',loadChildren:'./pages/Marks/stud-course-exam/stud-course-exam.module#StudCourseExamModule',
                data:{breadcrumb:'StudCourseExam'},canActivate:[AuthGuard]
            }
        


]
    },
{ path: 'landing', loadChildren: './pages/landing/landing.module#LandingModule' },
{ path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
{ path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
{ path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
{ path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
    // useHash: true
});