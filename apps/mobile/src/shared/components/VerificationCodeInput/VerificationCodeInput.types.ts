export type VerificationCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
};
