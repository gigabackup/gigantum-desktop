import download from 'download';

const downloadUbuntu = () => {
    let downloadProgress = 0;
    const downloadLink = 'https://aka.ms/wslubuntu2004';
    const downloadDirectory = `${os.homedir()}\\Downloads`;
    const downloadedFile = `${downloadDirectory}\\Ubuntu.appx`;
    download(downloadLink, downloadDirectory, {
        extract: false,
        strip: 1,
        filename: 'Ubuntu.appx'
      })
        .on('response', response => {
          const totalSize = response.headers['content-length'];
          let count = 0;
          response.on('data', data => {
            count += 1;
            downloadProgress += data.length;
            // delay frequency of callback firing - causes UI to crash
            if (count % 50 === 0) {
              console.log(
                'PROGRESS:',
                (downloadProgress / totalSize) * 100,
                totalSize
              );
              // TODO update state machine with data containing progress
            }
          });
        })
        .then(() => {
          console.log('DONE DOWNLOADING');
  
          callback({
            success: true,
            finished: true,
            // TODO update state machine with data containing progress and pass in downloadedFile path
          });
  
          return null;
        })
        .catch(error => {
          console.log('error');
        // TODO update state machine to reject into error state
          console.log(error);
        });
}

export default {
    downloadUbuntu,
}