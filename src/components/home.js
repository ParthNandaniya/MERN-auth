import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Input,
    Icon,
    Form,
    Card
} from 'semantic-ui-react';
import axios from 'axios';
import configs from '../configs';

import './style.css';

class Home extends Component {
    state = {
        user: {
            firstName: '',
            lastName: '',
            email: ''
        },
        message: ''
    }

    logout = () => {
        // const { location: { state: { user: { firstName, lastName, email } } } } = this.props;
        const { user : { firstName, lastName, email } } = this.state;
        const { history } = this.props;

        axios
            .post(`${configs.API.baseURL}/signout`, {
                email
            })
            .then(res => {
                // console.log({ res });
                if(res.data.result === 'successful') {

                    setTimeout(() => {

                        history.push('/signin');
                    }, 1000);
                }
            })
            .catch(error => {
                this.setState({ message: error });
            });

    }

    componentDidMount() {
        const { location: { state: { user } } } = this.props;

        this.setState({ user });
    }
    
    render() {
        // const { location: { state: { user: { firstName, lastName, email } } } } = this.props;
        const { user : { firstName, lastName, email } } = this.state;

        return (
            <div className="center">
                <Card>
                    <div style={{ padding: '15px' }}>
                        <div className="center">
                            <span>Home Sweet Home</span>
                        </div>
                        <br />
                        <div>
                            welcome back, <b>{firstName} {lastName}</b>
                            &nbsp;
                        </div>
                        <div>
                            Your email is <b>{email}</b>
                        </div>

                        <div>
                            <span>{this.state.message}</span>
                        </div>

                        <div className="flex-end">
                            <Link to='/signin' >Log Out</Link>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Home;
