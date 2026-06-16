export interface SkipContext {
  trigger: "start" | "build" | "watch";
  filePath?: string;
}

export type SkipFn = (context: SkipContext) => boolean | Promise<boolean>;
