# Stripe PaymentIntent Statuses

This document details the possible statuses of a Stripe PaymentIntent as defined in the `StripePaymentIntentStatus` enum.

## Canceled

- The PaymentIntent has been canceled.
- This typically occurs when the payment is explicitly canceled by the merchant or when it's automatically canceled due to expiration.
- No further action can be taken on a canceled PaymentIntent.

## Processing

- The payment is in the process of being completed.
- For most payment methods, this status is typically brief and transitions quickly to `Succeeded`.
- For some payment methods (e.g., ACH credit transfers), this status may persist for several days.

## RequiresAction

- Additional action is required to complete the payment.
- This usually means the customer needs to provide additional authentication (e.g., 3D Secure).
- The specific action required is detailed in the `next_action` property of the PaymentIntent.

## RequiresCapture

- The funds have been authorized but not yet captured.
- This status is used for payments that have been authorized but require an explicit capture action.
- Common for credit card payments where you want to authorize now and capture later (holds).

## RequiresConfirmation

- The PaymentIntent is ready to be confirmed.
- This status occurs when a PaymentIntent is created without automatic confirmation.
- Confirmation can be done either on the server or the client side.

## RequiresPaymentMethod

- A payment method is required to proceed with the payment.
- This status occurs when a PaymentIntent is created without a payment method.
- A valid payment method needs to be attached before the payment can be processed.

## Succeeded

- The payment has been successfully completed.
- This is the final status for a successful payment.
- No further actions are required for this PaymentIntent.

These statuses represent the lifecycle of a PaymentIntent in Stripe, from creation to completion or cancellation. Understanding these statuses is crucial for properly handling payments in your application.

## Errors

type: 'StripeInvalidRequestError',
raw: {
code: 'balance_insufficient',
doc_url: 'https://stripe.com/docs/error-codes/balance-insufficient',
message: 'You have insufficient available funds in your Stripe account. Try adding funds directly to your available balance by creating Charges using the 4000000000000077 test card. See: https://stripe.com/docs/testing#available-balance',

# Stripe Test Card Numbers

## Basic Test Cards

### Credit Cards - Always Successful Charges

- Visa Credit: 4242 4242 4242 4242
- Mastercard Credit: 5555 5555 5555 4444
- American Express Credit: 3782 822463 10005
- Discover Credit: 6011 1111 1111 1117

### Debit Cards - Always Successful Charges

- Visa Debit: 4000 0566 5566 5556
- Mastercard Debit: 5200 8282 8282 8210

### International Cards

- UK (GBP) Credit: 4000 0082 6000 0000
- UK (GBP) Debit: 4000 0015 6000 0008
- European (EUR) Credit: 4000 0000 0000 0002
- European (EUR) Debit: 4000 0000 0000 0010
- Canada (CAD) Credit: 4000 0100 0000 0019
- Canada (CAD) Debit: 4000 0100 0000 0027
- Australia (AUD) Credit: 4000 0050 0000 0009
- Australia (AUD) Debit: 4000 0050 0000 0017

## Authentication Test Cards

### 3D Secure Authentication

- Credit Required: 4000 0000 0000 3220
- Credit Required (3DS 2): 4000 0000 0000 3063
- Credit Optional: 4000 0000 0000 3063
- Debit Required: 4000 0000 0000 3238
- Debit Optional: 4000 0000 0000 3246

## Error Scenario Cards

### Credit Card Decline Errors

- Generic Decline: 4000 0000 0000 0002
- Insufficient Funds: 4000 0000 0000 9995
- Lost Card: 4000 0000 0000 9987
- Stolen Card: 4000 0000 0000 9979
- Expired Card: 4000 0000 0000 0069
- Incorrect CVC: 4000 0000 0000 0127
- Processing Error: 4000 0000 0000 0119

### Debit Card Decline Errors

- Generic Decline: 4000 0000 0000 0028
- Insufficient Funds: 4000 0000 0000 9987
- Lost Card: 4000 0000 0000 9995
- Processing Error: 4000 0000 0000 0135

### Special Cases

- Credit Card Fraudulent: 4100 0000 0000 0019
- Credit Card Disputed: 4000 0000 0000 0259
- Incorrect Number: 4242 4242 4242 4241

## Balance & Payment Scenarios

### Available Balance Testing

- Credit Card Add Funds: 4000 0000 0000 0077
- Debit Card Add Funds: 4000 0000 0000 0085
- Zero Balance Decline: 4000 0000 0000 9995

### Specific Payment Flows

- Credit Card Requires Capture: 4000 0000 0000 0341
- Debit Card Requires Capture: 4000 0000 0000 0359
- Credit Card Refund Success: 4000 0000 0000 4220
- Debit Card Refund Success: 4000 0000 0000 4238
- Credit Card Partial Refund: 4000 0000 0000 4238
- Debit Card Partial Refund: 4000 0000 0000 4246

## Usage Notes

1. For all test cards:

   - Use any future expiration date
   - Use any 3-digit CVC (4 digits for Amex)
   - Use any postal code

2. Testing Guidelines:

   - Always test both successful and failure scenarios
   - Test both credit and debit card flows
   - Verify error handling for each decline case
   - Test authentication flows where applicable
   - Validate refund and dispute handling

3. Testing Environment:
   - These cards only work in test mode
   - Real card numbers will fail in test mode
   - Test mode is indicated by keys starting with 'pk*test*' and 'sk*test*'

For comprehensive testing, cycle through relevant test cards based on your payment scenarios and ensure your application handles each case appropriately.
