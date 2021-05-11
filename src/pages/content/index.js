import React, {Component} from 'react'
import Tabs from './tabs'
import './style.css'

class Content extends Component {
  render() {
    return (
      <div className='content'>
        here is content
        <Tabs/>
      </div>
    )
  }
}

export default Content
