interface HttpModel {
  url: string;
  httpOptions?: any;
  headers?: any;
  body?: FormData | object;
  success?: Function;
  error?: Function;
}

export type { HttpModel };
