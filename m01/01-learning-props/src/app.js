'use strinct'

import React, { Component } from 'react'
import Title from './title'
import Square from './square'
import Button from './button'
import LikeButton from './like-button'
import SearchButton from './search-button'

class App extends Component {

  constructor () {
      super()
      this.state = {
        text: 'Guilherme'
      }
    }
    
  render () {
    return (
      <div className='container' onClick={() => this.setState({
          text: 'Outro texto'
        })}>
          {this.state.text}
      </div>
    )
  }
}

/* const App = React.createClass({
  render: function () {
    return (
      <div className='container'>
        <Title name='Guilherme' lastname='Palma' />
      </div>
    )
  }
}) */
export default App
