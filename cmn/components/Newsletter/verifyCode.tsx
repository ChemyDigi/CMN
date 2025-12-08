import { db } from "../../lib/firebase";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";

export async function verifySubscription(email: string, code: string) {
  const userRef = doc(db, "subscribers", email);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    throw new Error("User not found.");
  }

  const data = snapshot.data();

  if (data.verificationCode !== code) {
    throw new Error("Invalid verification code.");
  }

  // Update user as verified
  await updateDoc(userRef, {
    verified: true,
    verifiedAt: Timestamp.now(),
    verificationCode: "", // Clear the code after verification
  });

  return true;
}
