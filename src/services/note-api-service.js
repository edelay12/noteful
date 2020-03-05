import config from "../config";

const NoteService = {
  getNotes() {
    return fetch(`${config.DATABASE_URL}/notes`, {}).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  deleteNote(e) {
    return fetch(`${config.DATABASE_URL}/notes/${e}`, {
      method: "DELETE"
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default NoteService;
