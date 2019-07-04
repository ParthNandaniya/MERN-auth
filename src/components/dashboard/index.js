import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Upload, Icon, Button, message,PageHeader, Spin } from 'antd';
import { connect } from 'react-redux';
import { logout, fetchMedia } from '../../actions';
import _ from 'lodash';
import Slider from './slider';

import configs from '../../configs';

import './style.css';

class Dashboard extends Component {
    state = {
        fileList: [],
        attachments: [],
        uploading: false
        //     {
        //       uid: '-1',
        //       name: 'xxx.png',
        //       status: 'done',
        //       url: 'http://www.baidu.com/xxx.png',
        //     },
        //   ],
    }

    logout = () => {
        const { user: { details: { email } }, logout, history } = this.props;

        logout({
            email
        }, () => {

            history.push({ pathname: '/auth/login' });
            message.success(`goodbye, have a great day!`, 3);
        }, error => {
            message.error(error ? error : 'Something went wrong!', 3, () => {});
        });
    }

    componentDidMount() {
        const { history, fetchMedia } = this.props;

        if(typeof this.props.user.details._id === 'undefined') {
            history.push({ pathname: '/auth/login' });
        } else {
            fetchMedia({});
        }
    }
    
    render() {
        const { fileList, attachments, uploading } = this.state;
        const { user : { details: { firstName, lastName, email, _id } }, fetchMedia } = this.props;
        
        const uploadProps = {
            action: `${configs.API.baseURL}dashboard/upload/${_id}`,
            multiple: false,
            name: 'file',
            method: 'POST',
            // data: file => { 
            //     console.log('asdsad', file);
            //     return { file, firstName, lastName, _id, email }
            // },
            data : { firstName, lastName, _id, email },
            // headers: {
            //     authorization: 'authorization-text',
            // },
            // enctype: "multipart/form-data",
            // headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s' },
            onChange: ({ file, fileList }) => {
                const{ name, status } = file;

                // console.log(file, fileList);
				switch (status) {
                    case 'uploading':
                        this.setState({ uploading: true });

					case 'done':
						message.success(`${name} file uploaded successfully.`, 2);
                        this.setState({ uploading: false });

						break;

					case 'error':
                        message.error(`${name} file upload failed.`, 2);
                        this.setState({ uploading: false });

						break;

					case 'removed':
                        this.setState({ attachments: _.remove(_.concat([], this.state.attachments), attachment => attachment.name !== name), uploading: false });
                        

						break;

					default:
                        this.setState({ uploading: false });

						break;
				}
			},
        };

        return (
            <div>
                <PageHeader 
                    title="Media House" 
                    subTitle={
                        <div className="upload-button">
                            <div>  
                                <span>{firstName} {lastName} &nbsp;</span>
                                <Button type="primary" style={{ marginRight: '20px' }} size="small" 
                                    onClick={() => fetchMedia({})}
                                >
                                    <Icon type="sync" /> Refresh
                                </Button>
                            </div>
                            <span style={{ marginLeft: '300px' }}>marketplace for Video/Audio/Images</span>
                        </div>
                    }
                    extra={
                        <div className="upload-button">
                            <Upload
                                fileList={fileList}
                                {...uploadProps}
                            >
                                
                                {uploading ? <Icon type="sync" spin style={{ fontSize: '18px', marginRight: '10px'}} /> : <span />}
                                <Button type="upload" style={{ marginRight: '20px' }} >
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                            <Button type="primary" onClick={this.logout} >Logout</Button>
                        </div>
                    }
                >
                    <Slider />
                </PageHeader>
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
    logout,
    fetchMedia
})(Dashboard);
