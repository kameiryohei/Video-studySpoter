'use client'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import React from "react";

// Firebaseの初期化を行うためfirebaseAppをインポート
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase_config';

const page = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // ユーザーがログインボタンを押したときにdoLogin関数が実行される
  const doLogin = () => {
    initializeApp(firebaseConfig);
    const auth = getAuth();

    // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // ログインができたかどうかをわかりやすくするためのアラート
        alert('ログインOK!');
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <h1>ログイン</h1>
      <div>
        <form action="" method="get" className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-2/3">
              <label className="form-label" htmlFor="email">メールアドレス：</label>
            </div>
            <div className="md:w-2/3">
              <input className="form-input" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-2/3">
              <label className="form-label" htmlFor="password">パスワード：</label>
            </div>
            <div className="md:w-2/3">
              <input className="form-input" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-2/3"></div>
            <div className="md:w-2/3">
              <button className="btn-primary" type="button" onClick={() => doLogin()}>ログイン</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default page;