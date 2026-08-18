import type { ISize } from "./index";
import type { Readable } from "node:stream";

export declare function imageSizeFromFile(filePath: string): Promise<ISize>;
export declare function imageSizeFromStream(stream: Readable): Promise<ISize>;
export declare function setConcurrency(concurrency: number): void;
