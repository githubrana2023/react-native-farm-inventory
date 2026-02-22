export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};
export type FailureResponse = {
  success: false;
  message: string;
  data: null;
  errorCode?: string;
};

export type ActionResponse<T> = SuccessResponse<T> | FailureResponse;
export type ErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "DUPLICATE"
  | "DB_ERROR"
  | "UNKNOWN";
