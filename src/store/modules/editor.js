import * as types from '../mutation-types';

const initialState = {
  title: "Photo Editor",
  cropped: false,
  cropping: false,
  buttons: {
    cancel: true,
    remove: true,
    download: true,
    viewOnGithub: true
  },
  cropper: {
    options: {
      cropBoxResizable: true,
      zoomable: true,
      rotatable: true
    },
    data: null,
    canvasData: null,
    cropBoxData: null
  }
};

const mutations = {
  [types.EDITOR_ASSIGN](state, data) {
    Object.assign(state, data);
  },
};

const actions = {
  update(context, data) {
    context.commit(types.EDITOR_ASSIGN, data);
  },
  remove(context) {
    context.commit(types.EDITOR_ASSIGN, initialState);
  },
};

const getters = {
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: Object.assign({}, initialState),
};
