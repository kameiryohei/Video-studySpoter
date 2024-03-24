'use client'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import React from "react";

// Firebaseの初期化を行うためfirebaseAppをインポート
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase_config';

const page = () => {
  // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
  const doRegister = () => {
		initializeApp(firebaseConfig);
		const auth = getAuth();

    // Firebaseで用意されているユーザー登録の関数
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
        const user = userCredential.user;
        // ユーザー登録ができたかどうかをわかりやすくするためのアラート
        alert( '登録完了！' );
        console.log( user );
			})
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <h1>新規登録</h1>
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
						<button type="button" onClick={() => doRegister()}>登録</button>
					</div>
        </form>
      </div>
    </>
  )
}

export default page;