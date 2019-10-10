'use strinct'

import React, { Component } from 'react'
import AppContent from './components/app-content'
import ajax from '@fdaciuk/ajax'

class App extends Component {
  constructor () {
    super()
    this.state = {
      userinfo: null,
      repos: [],
      starred: [],
      isFetching: false
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13

    if (keyCode === ENTER) {
      this.setState({ isFetching: true })
      ajax().get(this.getGitHubApiUrl(value))
        .then((result) => {
          this.setState({
            userinfo: {
              username: result.name,
              photo: result.avatar_url,
              login: result.login,
              repos: result.public_repos,
              followers: result.followers,
              following: result.following
            },
            repos: [],
            starred: []
          })
        })
        .always(() => this.setState({ isFetching: false }))
    }
  }

  getGitHubApiUrl (userlogin, type) {
    const internalUser = userlogin ? `/${userlogin}` : ''
    const internalType = type ? `/${type}` : ''
    return `https://api.github.com/users${internalUser}${internalType}`
  }

  getRepos (type) {
    return (e) => {
      const userlogin = this.state.userinfo.login
      ajax().get(this.getGitHubApiUrl(userlogin, type))
        .then((result) => {
          this.setState({
            [type]: result.map((repo) => ({
              name: repo.name,
              link: repo.html_url
            }))
          })
        })
    }
  }

  render () {
    return (
      <AppContent
        userinfo={this.state.userinfo}
        repos={this.state.repos}
        starred={this.state.starred}
        isFetching={this.state.isFetching}
        handleSearch={this.handleSearch}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
      />
    )
  }
}
export default App
