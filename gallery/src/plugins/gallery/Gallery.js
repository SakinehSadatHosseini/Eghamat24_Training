const Gallery = {};

Gallery.install = function(Vue) {
    Vue.component('gallery-main', require('./components/gallery-Main').default)
    Vue.component('gallery-item', require('./components/gallery-Item').default)
};

export { Gallery as default };