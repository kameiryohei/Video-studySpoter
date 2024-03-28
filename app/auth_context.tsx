'use client';

import React from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase_config';

const AuthContext = React.createContext<User | null>(null);
initializeApp(firebaseConfig);
let auth = getAuth();

const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = React.useState<User | null>(null)
    const [loading, setLoading] = React.useState(true)

    // 第2引数に[]を指定して、初回レンダリングのみ関数を実行させる
    React.useEffect(() => {
      // onAuthStateChangedでログインの状態を監視する
      const unsubscribe = onAuthStateChanged(auth, async user => {
        // ユーザー情報をcurrentUserに格納する
        setCurrentUser(user)
        setLoading(false)
      })
      return unsubscribe
    }, [])

    return (
      <AuthContext.Provider value={ currentUser }>
        {!loading && children}
      </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth };