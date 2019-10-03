

window.onload = function() {
  chrome.runtime.onConnect.addListener(function (externalPort) {
    // console.log('creat connect!')

    externalPort.onDisconnect.addListener( async function() {
      var ignoreError = chrome.runtime.lastError;

      // console.log("onDisconnect");
      // handle save issues

      const taskData = await taskDB.search();
      const completeData = await completeDB.search();
      const pendingData= await pendingDB.search();
      const configData = await configDB.search();
      
      const backup = Object.assign({}, {taskData}, {completeData}, {pendingData}, {configData})
      const backupStr = JSON.stringify(backup, null, 2);

      const token = '';
      const url = 'https://api.github.com/repos/onvno/tiny-todo-list/issues/2';

      axios.patch(`${url}?access_token=${token}`, {
        title: `backup ${new Date().getTime()}`,
        body: backupStr,
      })

    });

  })
}