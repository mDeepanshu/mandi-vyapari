// HMB client build (ng build --configuration hmb), deployed to Firebase Hosting site hmb-vyapari
export const environment = {
  production: true,
  // HMB's API on API Gateway (ap-south-1), served at the root (no /mandi prefix).
  // validatePartyCode returns a list of snake_case rows; login and sidebar handle both shapes.
  apiUrl: 'https://fkli4fih7l.execute-api.ap-south-1.amazonaws.com',
  // apiUrl: 'https://fmhpfpetcz.ap-south-1.awsapprunner.com/mandi', // previous: HMB's Spring server
  // mandi-vyapari-lambda, stage hmb (subscriptions in HMB's Supabase)
  lambdaUrl: 'https://i9iv6ybzx9.execute-api.ap-southeast-1.amazonaws.com/hmb',
  mandiPhone: '+91 99774 26390',
  // QTY column and coloured AMOUNT (credit green, debit red) on the ledger screen, like mandi-application's ledger
  hmbLedger: true,
};
