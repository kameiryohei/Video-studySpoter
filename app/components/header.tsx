import Link from "next/link";

import { useAuth } from "../auth_context";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const currentUser = useAuth();

  // ログアウトの処理を追記
  const doLogout = () => {
    const auth = getAuth();

    signOut(auth)
    .then(() => {
      // ログアウトされたことをわかりやすくするためのアラート
      alert( 'ログアウト完了！' );
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div style={{ padding: "1rem 0" }} >
      { currentUser ? (
        // useAuth()で取得した現在ログインしているユーザーのメールアドレスをcurrentUser.emailで表示
        <div suppressHydrationWarning={true}>
          <div style={{ paddingBottom: "1rem" }}>{ currentUser.email } でログインしています。</div>
          <div>
            <button className="btn-primary" onClick={()=>{
              doLogout();
            }} >
              ログアウト
            </button>
          </div>
        </div>
      ):(
        <div suppressHydrationWarning={true}>
          ログインしていません。
          <div>
            <Link className="btn-primary" href="/login">ログイン</Link>
            <Link className="btn-primary" href="/register">新規登録</Link>
          </div>
        </div>  
      )}
    </div>
  );
}

export default Header;