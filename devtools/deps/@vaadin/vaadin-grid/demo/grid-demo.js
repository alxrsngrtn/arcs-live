/// BareSpecifier=@vaadin/vaadin-grid/demo/grid-demo
window.GridDemo = superClass => {
  return class extends superClass {
    static get properties() {
      return {};
    }
  };
};

window.addEventListener('WebComponentsReady', () => {
  document.body.removeAttribute('unresolved');
});