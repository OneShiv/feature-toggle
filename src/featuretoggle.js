let isInitialised = false;

export class FeatureToggle {
  constructor() {
    this.toggles = {};
  }
  init(toggles) {
    if (!isInitialised) {
      this.toggles = toggles;
      isInitialised = true;
    } else {
      throw new Error("Object is already initialised");
    }
  }
  getFeatureState(key) {
    return new Promise((resolve, reject) => {
      if (Object.keys(this.toggles).length === 0 || !isInitialised) {
        reject("Feature toggle not initialised yet");
      }
      if (this.toggles.hasOwnProperty(key)) {
        resolve(this.toggles[key]);
      } else {
        reject("No such key exists");
      }
    });
  }
}

const featureToggleObj = new FeatureToggle();
// this will be Singleton pattern implementation right now for extension we have exported object not the clas
// so nobody can create new object
// Object.freeze(featureToggleObj);

export default featureToggleObj;
