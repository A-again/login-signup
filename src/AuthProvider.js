import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth" // 导入Firebase的onAuthStateChanged函数
import { auth } from "./base" // 导入Firebase的auth对象

export const AuthContext = React.createContext() // 创建一个新的React Context

// 创建一个AuthProvider组件，它将包裹在你的应用的其他部分周围，以便它们可以访问auth状态
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null) // 创建一个状态变量来存储当前用户

  // 使用useEffect钩子在组件挂载时执行
  useEffect(() => {
    // 使用Firebase的onAuthStateChanged函数监听auth状态的变化
    onAuthStateChanged(auth, (user) => {
      if (user) { // 如果用户已登录
        setCurrentUser(user) // 设置当前用户为登录的用户
      } else { // 如果用户已登出
        setCurrentUser(null) // 设置当前用户为null
      }
    })
    // console.log(currentUser);
  }, [currentUser]) // 当currentUser变化时重新执行

  // 返回一个AuthContext.Provider组件，它的value包含了当前用户
  // 这样，你的应用的其他部分就可以通过React Context访问到当前用户
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children} {/* 渲染AuthProvider的子组件 */}
    </AuthContext.Provider>
  )
}
