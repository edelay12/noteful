import config from '../config'
const FolderService = {
getFolders() {
    return fetch(`${config.DATABASE_URL}/folders`, {
      }).then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      );
    },
deleteFolder(e){
        return fetch(`${config.DATABASE_URL}/folders/${e}`, {
          headers: {
          }
        }).then(res =>
          !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
        );
      }
}

export default FolderService