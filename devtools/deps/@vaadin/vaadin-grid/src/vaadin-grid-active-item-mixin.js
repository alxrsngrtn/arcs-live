/// BareSpecifier=@vaadin/vaadin-grid/src/vaadin-grid-active-item-mixin
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
/**
 * @polymerMixin
 */
export const ActiveItemMixin = superClass => class ActiveItemMixin extends superClass {

  static get properties() {
    return {
      /**
       * The item user has last interacted with. Turns to `null` after user deactivates
       * the item by re-interacting with the currently active item.
       */
      activeItem: {
        type: Object,
        notify: true,
        value: null
      }
    };
  }

  ready() {
    super.ready();

    this.$.scroller.addEventListener('click', this._onClick.bind(this));
    this.addEventListener('cell-activate', this._activateItem.bind(this));
  }

  _activateItem(e) {
    const model = e.detail.model;
    const clickedItem = model ? model.item : null;

    if (clickedItem) {
      this.activeItem = !this._itemsEqual(this.activeItem, clickedItem) ? clickedItem : null;
    }
  }

  // we need to listen to click instead of tap because on mobile safari, the
  // document.activeElement has not been updated (focus has not been shifted)
  // yet at the point when tap event is being executed.
  _onClick(e) {
    if (e.defaultPrevented) {
      // Something has handled this click already, e. g., <vaadin-grid-sorter>
      return;
    }

    const path = e.composedPath();
    const cell = path[path.indexOf(this.$.table) - 3];
    if (!cell || cell.getAttribute('part').indexOf('details-cell') > -1) {
      return;
    }
    const cellContent = cell._content;

    const activeElement = this.getRootNode().activeElement;
    const cellContentHasFocus = cellContent.contains(activeElement) && (
    // MSIE bug: flex children receive focus. Make type & attributes check.
    !this._ie || this._isFocusable(activeElement));
    if (!cellContentHasFocus && !this._isFocusable(e.target)) {
      this.dispatchEvent(new CustomEvent('cell-activate', { detail: { model: cell._instance } }));
    }
  }

  _isFocusable(target) {
    if (!target.parentNode) {
      return false;
    }
    const focusables = Array.from(target.parentNode.querySelectorAll('[tabindex], button, input, select, textarea, object, iframe, label, a[href], area[href]')).filter(element => element.getAttribute('part') !== 'cell body-cell');

    const isFocusableElement = focusables.indexOf(target) !== -1;
    return !target.disabled && isFocusableElement;
  }
};