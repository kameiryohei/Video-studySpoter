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
        alert( 'ログインOK!' );
        console.log( user );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <h1>ログイン</h1>
      <div>
      <form action="" method="get" className="form-example">
					<div>
						<label htmlFor="email">メールアドレス：</label>
						<input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div>
						<label htmlFor="password">パスワード：</label>
						<input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div>
						<button type="button" onClick={() => doLogin()}>ログイン</button>
					</div>
        </form>
      </div>
    </>
  );
}

export default page;