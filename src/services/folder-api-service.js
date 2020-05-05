import config from "../config";
const FolderService = {
  getFolders() {
    return fetch(`${config.DATABASE_URL}/folders`, {}).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  deleteFolder(e) {
    return fetch(`${config.DATABASE_URL}/folders/${e}`, {
      method: "DELETE",
      headers: {}
    }).then(res => {
      console.log(res);
      if (res.ok) {
        return this.getFolders();
      }

      throw new Error(res.statusText);
    });
  }
};

export default FolderService;
