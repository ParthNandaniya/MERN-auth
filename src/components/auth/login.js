import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Form, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';

import { login } from '../../actions';

import './style.css';


class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    onSubmit = () => {
        const { email, password } = this.state;
        const { history, login } = this.props;

        this.setState({ loading: true });

        login({
            email,
            password
        }, () => {
            const {
                user: {
                    details: { firstName, lastName }
                }
            } = this.props;
            
            this.setState({ loading: false });
            message.success(`welcome back ${firstName} ${lastName}!`, 1, () => {
                history.push({
                    pathname: '/dashboard'
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
            <div className='center' style={{ marginTop: '70px' }}>
                <Card title="Login" style={{ width: '27%' }}>
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
                        <div className="flex-end">
                            <Button type='primary' loading={this.state.loading} 
                                onClick={this.onSubmit}
                            >
                                {this.state.loading ? 'Loading' : 'Log In' }
                            </Button>
                        </div>
                        <div className="flex-end" >
                            Don't have an Account &nbsp;
                            {/* <Button size="small" onClick={() => history.push('/signin')} >Sign In</Button> */}
                            <Link to='/auth/signup' > Sign Up</Link>
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
    login
})(Form.create()(Login));
