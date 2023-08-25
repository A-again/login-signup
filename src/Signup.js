import React, { useState } from 'react'
import { auth, db } from './base' // 导入Firebase的auth和db对象
import "./Signup.css" // 导入样式文件
import { createUserWithEmailAndPassword } from "firebase/auth" // 导入Firebase的createUserWithEmailAndPassword函数
import { useNavigate } from "react-router-dom" // 导入react-router-dom的useNavigate钩子
import { ref, set } from "firebase/database" // 导入Firebase的ref和set函数

const SignUp = () => {
  const [firstName, setFirstName] = useState("") // 创建一个状态变量来存储名
  const [lastName, setLastName] = useState("") // 创建一个状态变量来存储姓
  const [email, setEmail] = useState("") // 创建一个状态变量来存储电子邮件
  const [password, setPassword] = useState("") // 创建一个状态变量来存储密码
  const navigate = useNavigate() // 创建一个navigate函数来进行页面跳转

  const handleSubmit = (e) => { // 创建一个处理表单提交的函数
    e.preventDefault() // 阻止表单的默认提交行为
    function onRegister () { // 创建一个注册函数
      // 使用Firebase的createUserWithEmailAndPassword函数创建一个新用户
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { // 如果创建成功
          // 使用Firebase的set函数将用户的名、姓和电子邮件存储到数据库中
          set(ref(db, "users/" + userCredential.user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
          })
        })
        .catch((error) => console.log(error)) // 如果创建失败，打印错误信息
      navigate("/") // 跳转到首页
    }
    onRegister() // 调用注册函数
  }

  // 返回JSX
  return (
    <div>
      <form className="signupForm" onSubmit={handleSubmit}>
        <input
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)} // 当输入值变化时，更新名
          required
        ></input>
        <input
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)} // 当输入值变化时，更新姓
          required
        ></input>
        <input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)} // 当输入值变化时，更新电子邮件
          required
          type="email"
        ></input>
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)} // 当输入值变化时，更新密码
          required
          type="password"
        ></input>
        <button>Sign Up</button> {/* 注册按钮 */}
      </form>
    </div>
  )
}

export default SignUp // 导出SignUp组件
