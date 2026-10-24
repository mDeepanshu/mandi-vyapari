// HMB client build (ng build --configuration hmb), deployed to Firebase Hosting site hmb-vyapari
export const environment = {
  production: true,
  // HMB's Spring server (same API as HIS; also used by mandi-hmb.make73.com). Not mandi-lambda-core's
  // hmb stage, whose Supabase data differs from HMB's live data (e.g. other trader IDs).
  apiUrl: 'https://fmhpfpetcz.ap-south-1.awsapprunner.com/mandi',
  // mandi-vyapari-lambda, stage hmb (subscriptions in HMB's Supabase)
  lambdaUrl: 'https://i9iv6ybzx9.execute-api.ap-southeast-1.amazonaws.com/hmb',
  mandiPhone: '+91 99774 26390',
};
