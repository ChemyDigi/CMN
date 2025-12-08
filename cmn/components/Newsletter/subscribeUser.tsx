import { db } from "../../lib/firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export interface SubscriptionFormData {
  username: string;
  email: string;
  phone: string;
}

export async function subscribeUser(data: SubscriptionFormData) {
  const docRef = doc(db, "subscribers", data.email);
  const docSnap = await getDoc(docRef);

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    if (docSnap.exists()) {
      const user = docSnap.data();

      if (user.verified) {
        // Already verified
        return { status: "verified" };
      } else {
        // User exists but not verified → resend verification code
        await setDoc(
          docRef,
          {
            ...user,
            verificationCode,
            updatedAt: Timestamp.now(),
          },
          { merge: true }
        );

        await emailjs.send(
          "service_qwovqxs",
          "template_d9xt3yd",
          {
            to_email: data.email,
            username: data.username,
            verification_code: verificationCode,
          },
          "8s5AEL-_pTND9Vn2q"
        );

        return { status: "pending" };
      }
    }

    // New user → create and send verification code
    await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      verified: false,
      verificationCode,
    });

    await emailjs.send(
      "service_qwovqxs",
      "template_d9xt3yd",
      {
        to_email: data.email,
        username: data.username,
        verification_code: verificationCode,
      },
      "8s5AEL-_pTND9Vn2q"
    );

    return { status: "pending" };
  } catch (error: any) {
    console.error("Subscription Error:", error);
    throw new Error("Failed to subscribe. Please try again.");
  }
}
