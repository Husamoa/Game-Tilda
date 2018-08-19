import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

import {setUserSessionID} from './UserSession';
import {getUserSessionID} from './UserSession';
import {updateSession} from "./UserSession";
import {createNewSession} from './UserSession'
import {loadOrCreateNewSession} from './UserSession'
import Cookie from "js-cookie";

getUserSessionID('SessionID');


export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: '',
            alert: '',
            alertClass: '',
            sessionId: null
        };
    }

    componentDidMount() {
        loadOrCreateNewSession().then(session => {
            this.setState({
                name: session.name,
                sessionId: session.id,
                visible: !!session.name
            })
        })
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    };

    onSubmit = () => {
        if (!this.state.name.length) {
            this.setState({
                alert: 'Pole imię musi być wypełnione',
                alertClass: 'alert alert-danger'
            });
        } else {
            this.setState({
                visible: true
            });
            // updateSession(this.state.name);

        }

    };

    render() {
        const hello = this.state.visible ?
            <div className='m-4'><h1 className='h1'>Cześć {this.state.name}! Bedziesz grał w gre! </h1><Link to='/levels-progress'
            ><button className="btn btn-lg btn-success my-btn-success m-5" type="button">Zaczynamy!</button></Link></div> :
            <div className={this.state.alertClass}>{this.state.alert}</div>;
        return (

            <Fragment>
                <div className='jumbotron text-center'>
                    <h1 className='h1'> Witaj w Game Of Tilde! </h1>
                </div>
                <div className='container text-center'>
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Wpisz swoje imię</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Large"
                               value={ this.state.name }
                               aria-describedby="inputGroup-sizing-sm" onChange={this.onChangeName}/>
                        <div className="input-group-append">
                            <button onClick={() => this.onSubmit()} className="btn btn-outline-secondary"
                                    type="button">Potwierdź
                            </button>
                        </div>
                    </div>
                    <div className='m-5'>
                        {hello}
                    </div>
                </div>
            </Fragment>

        );
    }
}