/**
 * 项目入口
 * @authors huangweiduo (huangweiduo@corp.netease.com)
 */
import React from 'react'
import ReactDom from 'react-dom'

// 全局样式
import './style.css'
import App from './pages/app'

ReactDom.render(
  <App/>,
  document.getElementById('app')
)