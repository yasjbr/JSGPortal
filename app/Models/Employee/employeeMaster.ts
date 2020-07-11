export class employeeMaster {
    id: number;
    insertUser: string;
    insertDate: Date;
    updateUser: string;
    updateDate: Date;
    employeeId: number;
    yearId: number;
    schoolId: number;
    employeeDeatil: employeeDtl[];

}
export class employeeDtl {
    id: number;
    insertUser: string;
    insertDate: Date;
    updateUser: string;
    updateDate: Date;
    masterId: number;
    bookId: number;
    statusId: number;
    qty: number;
    empName:string;
    itemName:string;
    name:string;
    statusIdUniq:any;
    isActive:any;
}