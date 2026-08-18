export interface ISize {
  width: number;
  height: number;
  type?: string;
  orientation?: number;
  images?: Array<{ width: number; height: number }>;
}

export declare function imageSize(input: Uint8Array): ISize;
export declare function disableTypes(types: string[]): void;
