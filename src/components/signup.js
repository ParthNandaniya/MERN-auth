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

class Signup extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        message: '',
        loading: false
    }

    onSubmit = () => {
        const { email, password, firstName, lastName } = this.state;
        const { history, location } = this.props;

        this.setState({ loading: true });

        axios
            .post(`${configs.API.baseURL}/signup`, {
                email,
                password,
                firstName,
                lastName
            })
            .then(res => {
                if(res.data.result === 'successful') {

                    history.push({
                        pathname: '/home',
                        state: {
                            user: res.data.user[0]
                        }
                    });
                } else {

                    this.setState({ message: res.data.error, loading: false });
                }
            })
            .catch(error => {
                this.setState({ message: error, loading: false });
            });
    }

    render() {
        const { history } = this.props;

        return (
            <div className='center'>
                <Card>
                    <Card.Content header="Sign Up" />
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
                            <Form.Field>
                                <label>First Name</label>
                                <Input placeholder='firstName' 
                                    onChange={e => this.setState({ firstName: e.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <Input placeholder='lastName' 
                                    onChange={e => this.setState({ lastName: e.target.value })}
                                />
                            </Form.Field>
                            <div>
                                <span>{this.state.message}</span>
                            </div>
                            <div className="flex-end">
                                <Button type='submit' color="blue" loading={this.state.loading} >
                                    {this.state.loading ? 'Loading' : 'Sign up' }
                                </Button>
                            </div>
                            <div className="flex-end" >
                                already Have an Account &nbsp;
                                {/* <Button size="small" onClick={() => history.push('/signin')} >Sign In</Button> */}
                                <Link to='/signin' > Sign In</Link>
                            </div>
                        </Form>
                    </Card.Description>
                </Card>
            </div>
        )
    }
}

export default Signup;
