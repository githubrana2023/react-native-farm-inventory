import { ErrorCode, FailureResponse, SuccessResponse } from "@/types/response";

export function successResponse<T>(
  data: T,
  message = "Success",
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function failureResponse(
  message: string,
  errorCode?: ErrorCode,
): FailureResponse {
  return {
    success: false,
    message,
    data: null,
    errorCode,
  };
}
