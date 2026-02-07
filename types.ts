
export interface DebugSession {
  id: string;
  timestamp: number;
  input: string;
  result: DebugResult;
}

export interface DebugResult {
  problem: string;
  explanation: string;
  fixedCode: string;
  tips: string[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
