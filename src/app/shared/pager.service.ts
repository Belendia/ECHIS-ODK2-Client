export class PagerService {
    getPage(length: number, pageIndex: number, pageSize: number, data: any[]) {
        if(data === undefined || data === null) return null;
        let start = pageIndex * pageSize;
        let end = start + pageSize;
        if(end > length)  end = length;
        
        return data.slice(start, end);
    }
}