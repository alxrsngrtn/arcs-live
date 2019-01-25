/// BareSpecifier=@vaadin/vaadin-lumo-styles/version
class Lumo extends HTMLElement {
  static get version() {
    return '1.4.1';
  }
}

customElements.define('vaadin-lumo-styles', Lumo);

export { Lumo };