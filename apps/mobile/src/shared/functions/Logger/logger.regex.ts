export const logEventNameVerificationRegex = {
  regex: /[^a-zA-Z0-9_]/g,
  errorMessage:
    'Event name should contain 1 to 40 alphanumeric characters or underscores.',
};
