// vendor
import React from 'react';
// componenets
import DownloadingUbuntuMain from './main/DownloadingUbuntuMain';
import DownloadingUbuntuStatus from './status/DownloadingUbuntuStatus';

const DownloadingUbuntu = () => {
    return (
        <div className="DownloadingUbuntu">
            <DownloadingUbuntuMain />
            <DownloadingUbuntuStatus />
        </div>
    )
}

export default DownloadingUbuntu;
