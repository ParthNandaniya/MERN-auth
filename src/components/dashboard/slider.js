import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Upload, Icon, Button, message,PageHeader, Spin } from 'antd';
import { connect } from 'react-redux';
import { 
    fetchMedia
 } from '../../actions';
import _ from 'lodash';
import axios from 'axios';

import configs from '../../configs';

import './style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Slider extends Component {
    state = {
        imageNo: 0
    }

    componentDidMount() {
        const { fetchingMedia, mediaList } = this.props;

        if(!fetchingMedia && mediaList.length === 0) {
            fetchMedia({}, () => {
                console.log(mediaList[0]._id);
                axios  
                    .post(`${configs.API.baseURL}dashboard/streamMedia`, { 
                        id: mediaList[0]._id,
                        fileName: mediaList[0].filename,
                        originalname: mediaList[0].originalname
                    })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.log('er', error);
                    });
            });
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {

        if(nextState.imageNo !== this.state.imageNo) {
            const { mediaList } = nextProps;
            console.log(mediaList[nextState.imageNo]._id);
            axios  
                .post(`${configs.API.baseURL}dashboard/streamMedia`, { 
                    id: mediaList[nextState.imageNo]._id,
                    fileName: mediaList[nextState.imageNo].filename,
                    originalname: mediaList[nextState.imageNo].originalname
                })
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log('er', error);
                });
        }
        return true;
    }

    render() {
        const { mediaList } = this.props;
        console.log(mediaList)

        if(mediaList.length === 0) {
            return (
                <div className="slider" >
                    <Carousel
                        width="1000px"
                        // onChange={data => console.log(data)}
                    >
                        <div>
                            <img src={require('../../assets/noimage.png')} />
                            <p className="legend">No Media found, be the first to upload image/audio/video</p>
                        </div>
                    </Carousel>
                </div>
            )
        }
        return (
            // <div className="slider" >
                <Carousel
                    width="1000px"
                    centerSlidePercentage={75}
                    dynamicHeight={true}
                    // centerMode={true}
                    onChange={data => this.setState({ imageNo: data })}
                >
                    {/* <div>
                        <img src={require('../../assets/noimage.png')} />
                        <p className="legend">Legend 1</p>
                    </div> */}
                    {
                        _.map(mediaList, (media, index) => {

                            return (
                                <div key={index}>
                                    <img src={require('../../assets/noimage.png')} />
                                    <p className="legend">
                                        { media.originalname } uploaded by { media.uploader.firstName } { media.uploader.lastName } --- { media.mimetype }
                                    </p>
                                </div>
                            )
                        })
                    }
                </Carousel>
            // </div>
        )
    }
}

const mapStateToProps = ({ media }) => {
    return ({
        mediaList: media.mediaList,
        fetchingMedia: media.fetchingMedia
    });
}

export default connect(mapStateToProps, {
    fetchMedia
})(Slider);
