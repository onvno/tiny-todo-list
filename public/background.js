

window.onload = function() {
  chrome.runtime.onConnect.addListener(function (externalPort) {
    // console.log('creat connect!')

    externalPort.onDisconnect.addListener( async function() {
      var ignoreError = chrome.runtime.lastError;

      // handle save issues

      const taskData = await taskDB.search();
      const completeData = await completeDB.search();
      const pendingData= await pendingDB.search();
      const configData = await configDB.search();

      let url, token;
      if(configData.length === 1 && configData[0].url && configData[0].token) {
        url = configData[0].url.indexOf('api') == 0 ? `https://${configData[0].url}` : configData[0].url;
        token = configData[0].token;
        
        delete configData[0]['token'];
        delete configData[0]['url'];

        const backup = Object.assign({}, {taskData}, {completeData}, {pendingData}, {configData})
        const backupStr = JSON.stringify(backup, null, 2);

        axios.patch(`${url}?access_token=${token}`, {
          title: `backup ${new Date().getTime()}`,
          body: backupStr,
        })
      }


    });

  })
}