// Shows the "पैसे भेजें" option in the sidebar. Hidden until the payee UPI ID is confirmed.
export const SHOW_UPI_PAYMENT = false;

// UPI apps refuse upi://pay links to personal UPI IDs (NPCI circular OC 76A, in force since 1 Apr 2024,
// blocks P2P "intent" payments) and to offline non-verified merchant IDs. So traders copy this ID and
// pay from inside their own UPI app instead. One-tap payment needs a payment gateway (server-created order).
export const PAYEE_UPI_ID = '9826306406@okbizaxis';
// Name the UPI app shows for this ID, so traders can check it before paying. Empty hides the name check.
export const PAYEE_NAME = '';
