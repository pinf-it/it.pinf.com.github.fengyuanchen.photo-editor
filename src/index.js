import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import 'cropperjs/dist/cropper.css';
import 'babel-polyfill';

import Vue from 'vue';
import App from './app.vue';
import store from './store';
import './components';

new Vue({
  store,
  el: '#app',
  render: createElement => createElement(App),
});

var messageOrigin = null;
var messageTarget = null;

function broadcastState () {
  if (!messageOrigin) {
    return;
  }
  messageTarget.postMessage({
    "@it.pinf.com.github.fengyuanchen.photo-editor": {
      "state": {
        "editor": store.state.editor,
        "loader": store.state.loader
      }
    }
  }, messageOrigin);
}

store.subscribe(function (mutation, state) {
  if (mutation.type === "editor/EDITOR_ASSIGN") {
    if (typeof mutation.payload.cropping !== "undefined") {
      broadcastState();
    }
  }
});

window.addEventListener("message", function (event) {
  var message = event.data || "{}";
  var body = null;
  try {
      body = message["@it.pinf.com.github.fengyuanchen.photo-editor"];
  } catch (err) {
      return;
  }
  if (!body) return;
  if (body.getState) {
    broadcastState();
  }
  if (body.setState) {
    messageOrigin = event.origin;
    messageTarget = event.source;
    /*
    {
      title: "Crop Image",
      buttons: {
        cancel: false,
        download: false,
        remove: false,
        viewOnGithub: false
      },
      cropping: true,
      cropper: {
        options: {
          cropBoxResizable: false
        },
        data: {
          x: 100,
          y: 100,
          width: 400,
          height: 400
        }
      }
    }
    */
    store.dispatch('editor/update', body.setState.editor);
    /*
    {
        loaded: true,
        name: "filename.jpg",
        type: "image/jpeg",
        url: "http://localhost:8080/images/filename.jpg"
    }
    */
    store.dispatch('loader/update', body.setState.loader);
  }
}, false);
  