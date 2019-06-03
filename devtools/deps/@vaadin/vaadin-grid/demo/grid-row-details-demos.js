/// BareSpecifier=@vaadin/vaadin-grid/demo/grid-row-details-demos
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
class GridRowDetailsDemos extends DemoReadyEventEmitter(GridDemo(PolymerElement)) {
  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>


    <h3>Row Details</h3>
    <p>
      Row Details can be enabled by providing a <code>&lt;template class="row-details"&gt;</code>
      and toggling item details by using <code>{{detailsOpened}}</code> template variable,
      <code>detailsOpenedItems</code> property or <code>openItemDetails(item)</code> and
      <code>closeItemDetails(item)</code> methods.
    </p>
    <vaadin-demo-snippet id="grid-row-details-demos-row-details">
      <template preserve-content="">
        <dom-bind>
          <template>
            <style>
              .details {
                display: flex;
                font-size: 20px;
              }

              img {
                width: 80px;
                height: 80px;
                margin: 20px;
              }
            </style>

            <x-data-provider data-provider="{{dataProvider}}"></x-data-provider>

            <vaadin-grid active-item="{{activeItem}}" aria-label="Row Details Example" data-provider="[[dataProvider]]" size="200">

              <template class="row-details">
                <div class="details">
                  <img src="[[item.picture.large]]">
                  <p>
                    Hi! My name is [[item.name.first]]!<br>
                    <small>[[item.email]]</small>
                  </p>
                </div>
              </template>

              <vaadin-grid-column width="60px" flex-grow="0">
                <template class="header">#</template>
                <template>[[index]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column>
                <template class="header">First Name</template>
                <template>[[item.name.first]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column>
                <template class="header">Last Name</template>
                <template>[[item.name.last]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column width="100px">
                <template class="header"></template>
                <template>
                  <vaadin-checkbox aria-label\$="Show Details for [[item.name.first]]" checked="{{detailsOpened}}">Show Details</vaadin-checkbox>
                </template>
              </vaadin-grid-column>

            </vaadin-grid>
          </template>
        </dom-bind>
      </template>
    </vaadin-demo-snippet>


    <h3>Toggling Details Without Data Binding</h3>
    <p>
      In this example the grid's <code>activeItem</code> property is bound to <code>detailsOpenedItems</code> property.
    </p>
    <p>
      <b>Hint: </b>Click a row to toggle the active item.
    </p>
    <vaadin-demo-snippet id="grid-row-details-demos-toggling-details-without-data-binding">
      <template preserve-content="">
        <bind-details-opened-items></bind-details-opened-items>
        <dom-module id="bind-details-opened-items">
          <template preserve-content="">
            <style>
              :host {
                display: block;
              }

              .details {
                display: flex;
                font-size: 20px;
              }

              img {
                width: 80px;
                height: 80px;
                margin: 20px;
              }
            </style>

            <x-data-provider data-provider="{{dataProvider}}"></x-data-provider>

            <vaadin-grid on-active-item-changed="_onActiveItemChanged" id="grid" aria-label="Details Opened Items Example" data-provider="[[dataProvider]]" size="200">

              <template class="row-details">
                <div class="details">
                  <img src="[[item.picture.large]]">
                  <p>
                    Hi! My name is [[item.name.first]]!<br>
                    <small>[[item.email]]</small>
                  </p>
                </div>
              </template>

              <vaadin-grid-column width="60px" flex-grow="0">
                <template class="header">#</template>
                <template>[[index]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column>
                <template class="header">First Name</template>
                <template>[[item.name.first]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column>
                <template class="header">Last Name</template>
                <template>[[item.name.last]]</template>
              </vaadin-grid-column>

            </vaadin-grid>

          </template>
          <script>
            window.addDemoReadyListener('#grid-row-details-demos-toggling-details-without-data-binding', function(document) {
              Polymer({
                is: 'bind-details-opened-items',

                _onActiveItemChanged: function(e) {
                  this.\$.grid.detailsOpenedItems = [e.detail.value];
                }
              });
            });
          &lt;/script>
        </dom-module>

      </template>
    </vaadin-demo-snippet>
`;
  }

  static get is() {
    return 'grid-row-details-demos';
  }
}
customElements.define(GridRowDetailsDemos.is, GridRowDetailsDemos);