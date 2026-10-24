// HMB client build (ng build --configuration hmb), deployed to Firebase Hosting site hmb-vyapari
export const environment = {
  production: true,
  // HMB's mandi-lambda-core stage (replaces the HIS Spring server)
  apiUrl: 'https://fkli4fih7l.execute-api.ap-south-1.amazonaws.com',
  // mandi-vyapari-lambda, stage hmb (subscriptions in HMB's Supabase)
  lambdaUrl: 'https://i9iv6ybzx9.execute-api.ap-southeast-1.amazonaws.com/hmb',
  mandiPhone: '+91 99774 26390',
};
