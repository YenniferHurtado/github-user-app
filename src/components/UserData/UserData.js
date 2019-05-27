
import React, { Component } from 'react';
import './styles.css'
import github from '../../images/github.png'

class UserData extends Component {

    constructor() {
        super();
        this.state = {
            username: null,
            id: null,
            avatar: null,
            url: null,
            location: null,
            repos: null,
            followers: null,
            following: null,
        }
    }

    getUser = (username) => {
        return fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(response => {
            return response;
        })
    }    

    async handleSubmit(e) {
        e.preventDefault();
        let user = await this.getUser(this.refs.username.value);
        this.setState({
            username: user.login, 
            id: user.id, 
            avatar: user.avatar_url,
            url: user.html_url,
            repos: user.repos_url,
            followers: user.followers,
            following: user.following,
        })
    }

    render() {
        let user;
        if (this.state.username) {
            user = 
            <div className="user_results">
                <img src={this.state.avatar} width='128' height='128' alt="avatar-profile"/>
                <div className="box_results"> 
                    User: {this.state.username} 
                    <br/>
                    Id: {this.state.id} 
                    <br/>
                    Url: {this.state.url}
                    <br/>
                    Repositorios: {this.state.repos}
                    <br/>
                    Seguidores: {this.state.followers}     
                    <br/>
                    Seguidos: {this.state.following}
                </div>
            </div>
        }
        return(
            <div className="userDataCont">
                <img className='tittle_userData' src={github} alt="img-tittle"/>
                <form>
                    <input className="form_userData" ref="username" type="text" placeholder="Ingresa el nombre de usuario..."/>
                </form>
                <button className="btn_userData" onClick={e => this.handleSubmit(e)}> SEARCH </button>
                <div>
                    { user }
                </div>
            </div>
        )
    }
};

export default UserData;
