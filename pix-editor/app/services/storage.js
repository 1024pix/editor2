import Service from '@ember/service';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class StorageService extends Service {

  @service config;
  @service filePath;

  uploadFile(file, fileName) {
    let url = this.config.storagePost + Date.now()+ '.' + this.filePath.getExtension(file.name);
    let that = this;
    return this.getStorageToken()
    .then(function(token) {
      return file.uploadBinary(url, {method:'put', headers:{'X-Auth-Token': token}})
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // token expired: get a new one
          return that.getStorageToken(true)
          .then(function(token) {
            return file.uploadBinary(url, {method:'PUT', headers:{'X-Auth-Token': token}});
          });
        } else {
          return Promise.reject(error);
        }
      });
    })
    .then(function() {
      return {url:url, filename:fileName?fileName:file.name};
    });
  }

  uploadFiles(files) {
    var requests = [];
    for (var i = 0; i<files.length;i++) {
      requests.push(this.uploadFile(files[i]));
    }
    return Promise.all(requests);
  }

  getStorageToken(renew) {
    const config = this.config;
    if (!renew && typeof config.storageToken !== 'undefined') {
      return Promise.resolve(config.storageToken);
    } else {
      var data = {
        'auth':{
          'tenantName':config.storageTenant,
          'passwordCredentials':{
            'username':config.storageUser,
            'password':config.storagePassword
          }
        }
      };
      return fetch(config.storageAuth, {
        method:'POST',
        headers:{'Content-type': 'application/json'},
        body:JSON.stringify(data)
      })
      .then(response => response.ok?response.json():false)
      .then(response => {
        if (response) {
          config.storageToken = response.token;
          return config.storageToken;
        } else {
          console.error('could not get storage token');
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
}