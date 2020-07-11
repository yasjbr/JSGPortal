export class Search<T> {

    constructor(pageSize: number) {
        this.pageSize = pageSize;
        this.pageNumber = 0;
    }

    pageNumber: number;
    pageSize: number;
    sort: string;
    filter: T;
}
