import config from "../config";

const NoteService = {
  getNotes() {
    return fetch(`${config.DATABASE_URL}/notes`, {}).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getNoteId(id) {
    return fetch(`${config.DATABASE_URL}/notes/${id}`, {}).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  deleteNote(e) {
    return fetch(`${config.DATABASE_URL}/notes/${e}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
    if (res.ok) {
      return this.getNotes();
    }
    res.json().then(e => Promise.reject(e)) 
  });
  }
};

export default NoteService;
