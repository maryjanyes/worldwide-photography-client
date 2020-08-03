import React from 'react';
import { useSelector } from 'react-redux';

import ExpanderTab from 'components/common/ExpanderTab';

const JudleClassesScreen = () => {
    const { classVideos } = useSelector(({ classes }) => classes || { classVideos: [{
        source: 'https://www.youtube.com/watch?v=64fB-2-sUaA',
        poster: 'assets/images/logo.png',
        name: 'Juice lesson'
    }, {
        source: 'https://www.youtube.com/watch?v=64fB-2-sUaA',
        poster: 'assets/images/logo.png',
        name: 'Juice lesson'
    }, {
        source: 'https://www.youtube.com/watch?v=64fB-2-sUaA',
        poster: 'assets/images/logo.png',
        name: 'Juice lesson'
    }] });
    const standardVideoTags = [{
        name: 'tag1',
    }, {
        name: 'tag2',
    }];

    return (
        <div className="page page-judle-classes">
            {/** <div className="judle-videos-line">
                {classVideos.map(one => <ClassVideo {...{ ...one, tags: standardVideoTags }} />)}
    </div> **/}
        </div>
    );
};

function VideoTag({ name }) {
    return (
        <div className="video-tag">
            <span>{name}</span>
        </div>
    );
}

function ClassVideo(props) {
    return (
        <div className="class-video-container">
            <ExpanderTab Header={({ toggle }) => (
                <React.Fragment>
                    <button onClick={toggle}>||</button>
                </React.Fragment>
            )}>
                <React.Fragment>
                    <video
                        controls
                        className="class-video"
                        autoPictureInPicture={true}
                        poster={props.poster}
                        preload={true}
                    >
                        <source
                            src={props.source}
                            type="video/mp4"
                        />
                    </video>
                    <div className="video-tags">
                        <p>video tags</p>
                        <p className="class-video-tags">
                           {props.tags.map(one => <VideoTag {...one} />)}
                        </p>
                    </div>
                </React.Fragment>
            </ExpanderTab>
        </div>
    );
}

export default JudleClassesScreen;
