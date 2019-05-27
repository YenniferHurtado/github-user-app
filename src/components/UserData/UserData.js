
import React, { Component, Fragment } from 'react';
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
        let { username, id, avatar, url ,repos, followers, following } = this.state 
        console.log(username)
        return(
            <div className="userDataCont">
                <img className='tittle_userData' src={github} alt="img-tittle"/>
                { (username === null) ?
                (<Fragment>
                    <form>
                        <input className="form_userData" ref="username" type="text" placeholder="Ingresa el nombre de usuario..."/>
                    </form>
                <button className="btn_userData" onClick={e => this.handleSubmit(e)}> SEARCH </button>
                </Fragment>)
                : 
                (<Fragment>
                <div className="user_results">
                <img src={avatar} width='128' height='128' alt="avatar-profile"/>
                <div className="box_results"> 
                    User: {username} 
                    <br/>
                    Id: {id} 
                    <br/>
                    Url: {url}
                    <br/>
                    Repositorios: {repos}
                    <br/>
                    Seguidores: {followers}     
                    <br/>
                    Seguidos: {following}
                </div>
                </div> 
                </Fragment>)
              }
            </div>
        )
    }
};

export default UserData;
