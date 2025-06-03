declare module 'esbuild-wasm' {
  export function initialize(options: {
    wasmURL: string;
    worker: boolean;
  }): Promise<void>;

  export function transform(code: string, options: {
    loader: string;
    format: string;
    target: string[];
  }): Promise<{
    code: string;
  }>;
} 