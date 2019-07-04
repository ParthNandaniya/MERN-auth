import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Form, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';

import { registerUser } from '../../actions';

import './style.css';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        loading: false
    }

    onSubmit = () => {
        const { email, password, firstName, lastName } = this.state;
        const { history, registerUser } = this.props;

        this.setState({ loading: true });

        registerUser({
            email,
            password,
            firstName,
            lastName
        }, () => {
            const {
                user: {
                    details: { firstName, lastName }
                }
            } = this.props;

            this.setState({ loading: false });
            message.success(`welcome ${firstName} ${lastName}!`, 3, () => {
                history.push({
                    pathname: '/dashboard',
                    // state: {
                    //     user: res.data.user[0]
                    // }
                });
            });
        }, error => {
            this.setState({ loading: false });
            message.error(error ? error : 'Something went wrong!', 3, () => {});
        });
    }

    render() {
        const { history, form: { getFieldDecorator } } = this.props;

        return (
            <div className='center' style={{ marginTop: '20px'}}>
                <Card title="Sign Up" style={{ width: '27%' }}>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Item label="Email address" colon={false}>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter your email',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email address is invalid'
                                    }
                                ],
                            })(
                                <Input placeholder='email' type="email"
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Password" colon={false}>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: 'Password is required'
                                    }
                                ]
                            })(<Input.Password 
                                    placeholder="Password" 
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onChange={({ target: { value } }) => this.setState({ password: value })} 
                                />)}
                        </Form.Item>
                        <Form.Item label="First Name" colon={false}>
                            {getFieldDecorator('firstName', {
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: 'first name is required'
                                    }
                                ]
                            })(<Input 
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onChange={({ target: { value } }) => this.setState({ firstName: value })} 
                                />)}
                        </Form.Item>
                        <Form.Item label="Last Name" colon={false}>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                onChange={e => this.setState({ lastName: e.target.value })}
                            />
                        </Form.Item>
                        <div className="flex-end">
                            <Button type='primary' loading={this.state.loading} 
                                onClick={this.onSubmit}
                            >
                                {this.state.loading ? 'Loading' : 'Sign up' }
                            </Button>
                        </div>
                        <div className="flex-end" >
                            already Have an Account &nbsp;
                            {/* <Button size="small" onClick={() => history.push('/signin')} >Sign In</Button> */}
                            <Link to='/auth/login' > Log In</Link>
                        </div>
                    </Form>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return ({
        user
    });
}

export default connect(mapStateToProps, {
    registerUser
})(Form.create()(Signup));
