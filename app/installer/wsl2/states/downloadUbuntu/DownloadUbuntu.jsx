import React from 'react';
// componenets
import DownloadUbuntuMain from './main/DownloadUbuntuMain';
import DownloadUbuntuStatus from './status/DownloadUbuntuStatus';

const DownloadUbuntu = () => {
    return (
        <div className="DownloadUbuntu">
            <DownloadUbuntuMain />
            <DownloadUbuntuStatus />
        </div>
    )
}

export default DownloadUbuntu;