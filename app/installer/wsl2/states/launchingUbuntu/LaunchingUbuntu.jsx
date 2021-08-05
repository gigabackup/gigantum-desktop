import React from 'react';
// componenets
import LaunchingUbuntuMain from './main/LaunchingUbuntuMain';
import LaunchingUbuntuStatus from './status/LaunchingUbuntuStatus';

const LaunchingUbuntu = () => {
    return (
        <div className="LaunchingUbuntu">
            <LaunchingUbuntuMain />
            <LaunchingUbuntuStatus />
        </div>
    )
}

export default LaunchingUbuntu;