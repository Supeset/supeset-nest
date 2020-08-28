export type ResponseObject<K extends string, T> = {
  [P in K]: T;
};

export class R<T> {
  constructor(message = 'success', code = 0, data: T = null) {
    this.message = message;
    this.code = code;
    this.data = data;
  }
  private message: string;
  private code: number;
  private data: T;
  success(data: T) {
    return new R('success', 0, data);
  }
}

export class Page<T> {
  constructor(size, current, counts, records: T[]) {
    this.size = size;
    this.current = current;
    this.records = records;
    this.total = counts;
    this.pages = Math.ceil(counts / size);
  }
  private size: number;
  private current: number;
  private pages: number;
  private total: number;
  private records: T[];
}
