'use client'

import React, { useEffect } from "react";

import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase_config';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { rankingData } from "./ranking_data";

const page = () => {
  const [ranking, setRanking] = React.useState<rankingData[]>([]);

  // 読み込み時にランキングを作成
  useEffect(() => {
    const fetchData = async () => {
      initializeApp(firebaseConfig);
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "users"));

      var rankings: rankingData[] = [];
      querySnapshot.forEach((doc) => {
        rankings.push({
          uid: doc.id,
          email: doc.data().email,
          points: doc.data().points,
        }
        );
      });
      rankings.sort((a, b) => a.points + b.points);
      console.log(rankings);
      setRanking(rankings);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>ランキング</h1>
      <table>
        <thead>
          <tr>
            <th>順位</th>
            <th>メールアドレス</th>
            <th>ポイント</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.email}</td>
              <td>{data.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
