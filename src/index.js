import { fetchToggles } from "./utils";
import featureToggleObj, { FeatureToggle } from "./featuretoggle";

async function getToggles() {
  const response = await fetchToggles();
  featureToggleObj.init(response);
}

// let's say we add our own override we can add this to prototype
FeatureToggle.prototype.addDevOverride = function (key, value) {
  if (Object.keys(this.toggles).length === 0) {
    // assuming after initilisation there is no way to remove keys to get lenn=gth 0
    throw new Error("Feature toggle not initialised yet");
  }

  if (!this.toggles.hasOwnProperty(key)) {
    throw new Error("No such key exists");
  }
  this.toggles[key] = value;
};

getToggles().then(() => {
  featureToggleObj.getFeatureState("is-menu-expanded").then((isDailogOn) => {
    if (isDailogOn) {
      console.log("toggle is on");
    } else {
      console.log("toggle is off");
    }
  });
  featureToggleObj.addDevOverride("is-menu-expanded", false);
  featureToggleObj.getFeatureState("is-menu-expanded").then((isDailogOn) => {
    if (isDailogOn) {
      console.log("toggle is on");
    } else {
      console.log("toggle is off");
    }
  });
});
