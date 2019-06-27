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


class Signin extends Component {
    state = {
        email: '',
        password: '',
        message: '',
        loading: false
    }

    onSubmit = () => {
        const { email, password } = this.state;
        const { history } = this.props;

        this.setState({ loading: true });

        axios
            .post(`${configs.API.baseURL}/signin`, {
                email,
                password,
            })
            .then(res => {
                // console.log({ res });
                if(res.data.user.length !== 0) {

                    this.setState({ message: '', loading: false });
                    setTimeout(() => {

                        history.push({
                            pathname: '/home',
                            state: {
                                user: res.data.user[0]
                            }
                        });
                    }, 1000);
                } else {

                    this.setState({ message: 'user not exist', loading: false });
                }
            })
            .catch(error => {
                this.setState({ message: error, loading: false });
            });
    }

    render() {
        return (
            <div className='center'>
                <Card>
                    <Card.Content header="Sign In" />
                    <Card.Description className="horizontalPadding" >
                        <Form onSubmit={this.onSubmit}>
                            <Form.Field>
                                <label>email</label>
                                <Input placeholder='email' type="email"
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Input placeholder='password'  type="password"
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                            </Form.Field>
                            <div>
                                <span>{this.state.message}</span>
                            </div>
                            <div className="flex-end">
                                <Button type='submit' color="blue" loading={this.state.loading} >
                                    {this.state.loading ? 'Loading' : 'Sign In' }
                                </Button>
                            </div>
                            <div className="flex-end" >
                                Don't have an Account &nbsp;
                                {/* <Button size="small" onClick={() => history.push('/signin')} >Sign In</Button> */}
                                <Link to='/' > Sign Up</Link>
                            </div>
                        </Form>
                    </Card.Description>
                </Card>
            </div>
        )
    }
}

export default Signin;
