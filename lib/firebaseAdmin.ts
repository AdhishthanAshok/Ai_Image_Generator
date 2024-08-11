// utils/firebaseAdmin.ts
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);

initializeApp({
  credential: cert(serviceAccount),
});

export { getAuth };
