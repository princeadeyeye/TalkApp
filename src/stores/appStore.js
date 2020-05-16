class ObservableListStore {
   _profileModal

   get profileModal() {
    return this._profileModal;
  }

   set profileModal(value) {
    this._profileModal = value;
  }
}

const observableListStore = new ObservableListStore();
export default observableListStore;
