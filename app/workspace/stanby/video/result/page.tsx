"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/firebase_config";
import { useAuth } from "@/app/auth_context";

const page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const currentUser = useAuth();
  const [time, setTime] = useState<string | null>(params.get("time"));

  useEffect(() => {
    console.log(currentUser);
    const updateUser = async () => {
      if (time) {
        initializeApp(firebaseConfig);
        const db = getFirestore();
        await addDoc(collection(db, `users/${currentUser!.uid}/history`), {
          resultTime: parseInt(time),
        });

        const querySnapshot = await getDocs(
          collection(db, `users/${currentUser!.uid}/history`)
        );
        var totalPoint = 0;
        await querySnapshot.forEach((doc) => {
          totalPoint += doc.data().resultTime ?? 0;
        });
        await updateDoc(doc(db, "users", currentUser!.uid), {
          points: totalPoint + parseInt(time),
        });
      }
    };

    updateUser();
  }, []);

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <p className="text-center text-3xl font-bold text-blue-400">
        お疲れ様でした！
      </p>
      <p className="mt-10">
        {time ? (
          <span className="text-3xl">経過時間: {time} 秒</span>
        ) : (
          <span className="text-3xl">経過時間が見つかりませんでした</span>
        )}
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Home
      </button>
    </div>
  );
};

export default page;
