import React from 'react';
import { useSelector } from 'react-redux';

const JudleClassesScreen = () => {
    const { classVideos } = useSelector(({ classes }) => classes || { classVideos: [{
        source: 'https://www.youtube.com/watch?v=64fB-2-sUaA',
        poster: 'assets/images/logo.png',
    }] });

    return (
        <div className="page page-judle-classes">
            <span>Express lessons from popular photographers (contest judles)</span>
            <div className="judle-videos-line">
                {classVideos.map(one => <ClassVideo {...one} />)}
            </div>
        </div>
    );
};

function ClassVideo(props) {
    return (
        <React.Fragment>
            <span className="judle-video-name">{props.name}</span>
            <video
                controls
                className="judle-video"
                autoPictureInPicture={true}
                poster={props.poster}
                preload={true}
            >
                <source
                    src={props.source}
                    type="video/mp4"
                />
            </video>
        </React.Fragment>
    );
}

export default JudleClassesScreen;
