import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "./base"; // 导入Firebase的auth和db对象
import { signOut } from "firebase/auth"; // 导入Firebase的signOut函数
import { AuthContext } from "./AuthProvider"; // 导入AuthProvider组件提供的context
import "./Home.css"; // 导入样式文件
import { useNavigate } from "react-router-dom"; // 导入react-router-dom的useNavigate钩子
import { ref, onValue } from "firebase/database"; // 导入Firebase的ref和onValue函数

function Home() {
  const { currentUser } = useContext(AuthContext); // 从AuthProvider的context中获取当前用户
  const [username, setUsername] = useState(""); // 创建一个状态变量来存储用户名
  const navigate = useNavigate(); // 创建一个navigate函数来进行页面跳转

  // 使用useEffect钩子在组件挂载或currentUser变化时执行
  useEffect(() => {
    if (currentUser) { // 如果当前用户存在
      const starCountRef = ref(db, "users/" + currentUser.uid); // 创建一个引用到用户数据的引用
      onValue(starCountRef, (snapshot) => { // 监听该引用的值的变化
        if (snapshot.exists()) { // 如果快照存在
          var data = snapshot.val(); // 获取快照的值
          setUsername(data.firstName + " " + data.lastName); // 设置用户名为用户的名和姓
        }
      });
    }
  }, [currentUser]); // 当currentUser变化时重新执行

  const clickLogin = () => { // 创建一个处理登录/登出按钮点击的函数
    if (currentUser) { // 如果当前用户存在
      signOut(auth); // 登出
    } else { // 如果当前用户不存在
      navigate("/login"); // 跳转到登录页面
    }
  };

  const clickSignup = () => { // 创建一个处理注册按钮点击的函数
    navigate("/signup"); // 跳转到注册页面
  };

  // 返回JSX
  return (
    <div className="mainContainer">
      <h1>Home</h1>
      {currentUser && <p>Welcome, {username}</p>} {/* 如果当前用户存在，显示欢迎信息 */}
      <div className="buttons">
        <button onClick={clickLogin}>
          {currentUser ? "Log Out" : "Login"} {/* 如果当前用户存在，显示登出按钮，否则显示登录按钮 */}
        </button>
        {!currentUser && <button onClick={clickSignup}>Sign Up</button>} {/* 如果当前用户不存在，显示注册按钮 */}
      </div>
    </div>
  );
}

export default Home; // 导出Home组件
