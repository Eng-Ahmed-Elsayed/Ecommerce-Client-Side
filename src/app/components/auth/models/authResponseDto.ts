export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  email: string;
  errorMessage: string;
  token: string;
  is2StepVerificationRequired: boolean;
  provider: string;
}
