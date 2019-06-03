/// BareSpecifier=@vaadin/vaadin-grid/demo/grid-theme-demos
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
class GridThemeDemos extends DemoReadyEventEmitter(GridDemo(PolymerElement)) {
  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>

    <p>You can combine all of these variants together, e.g. <code>&lt;vaadin-grid <b>theme="compact no-row-borders row-stripes"</b>&gt;</code></p>

    <h3>Compact</h3>
    <p><code>&lt;vaadin-grid <b>theme="compact"</b>&gt;</code></p>
    <vaadin-demo-snippet id="grid-theme-demos-compact">
      <template preserve-content="">
        <dom-bind>
          <template>
            <iron-ajax auto="" url="https://demo.vaadin.com/demo-data/1.0/people?count=20" handle-as="json" last-response="{{users}}"></iron-ajax>

            <vaadin-grid theme="compact" items="[[users.result]]" column-reordering-allowed="" multi-sort="">

              <vaadin-grid-selection-column auto-select=""> </vaadin-grid-selection-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="firstName">First Name</vaadin-grid-sorter>
                </template>
                <template>[[item.firstName]]
                </template>
              </vaadin-grid-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="lastName">Last Name</vaadin-grid-sorter>
                </template>
                <template>[[item.lastName]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column width="15em" flex-grow="2">
                <template class="header">
                  <vaadin-grid-sorter path="address.street">Address</vaadin-grid-sorter>
                </template>
                <template>[[item.address.street]], [[item.address.city]]</template>
              </vaadin-grid-column>

            </vaadin-grid>
          </template>
        </dom-bind>
      </template>
    </vaadin-demo-snippet>

    <h3>No border</h3>
    <p><code>&lt;vaadin-grid <b>theme="no-border"</b>&gt;</code></p>
    <vaadin-demo-snippet id="grid-theme-demos-bordered">
      <template preserve-content="">
        <dom-bind>
          <template>
            <iron-ajax auto="" url="https://demo.vaadin.com/demo-data/1.0/people?count=20" handle-as="json" last-response="{{users}}"></iron-ajax>

            <vaadin-grid theme="no-border" items="[[users.result]]" column-reordering-allowed="" multi-sort="">

              <vaadin-grid-selection-column auto-select=""> </vaadin-grid-selection-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="firstName">First Name</vaadin-grid-sorter>
                </template>
                <template>[[item.firstName]]
                </template>
              </vaadin-grid-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="lastName">Last Name</vaadin-grid-sorter>
                </template>
                <template>[[item.lastName]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column width="15em" flex-grow="2">
                <template class="header">
                  <vaadin-grid-sorter path="address.street">Address</vaadin-grid-sorter>
                </template>
                <template>[[item.address.street]], [[item.address.city]]</template>
              </vaadin-grid-column>

            </vaadin-grid>
          </template>
        </dom-bind>
      </template>
    </vaadin-demo-snippet>

    <h3>No row borders</h3>
    <p><code>&lt;vaadin-grid <b>theme="no-row-borders"</b>&gt;</code></p>
    <vaadin-demo-snippet id="grid-theme-demos-row-borders">
      <template preserve-content="">
        <dom-bind>
          <template>
            <iron-ajax auto="" url="https://demo.vaadin.com/demo-data/1.0/people?count=20" handle-as="json" last-response="{{users}}"></iron-ajax>

            <vaadin-grid theme="no-row-borders" items="[[users.result]]" column-reordering-allowed="" multi-sort="">

              <vaadin-grid-selection-column auto-select=""> </vaadin-grid-selection-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="firstName">First Name</vaadin-grid-sorter>
                </template>
                <template>[[item.firstName]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="lastName">Last Name</vaadin-grid-sorter>
                </template>
                <template>[[item.lastName]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column width="15em" flex-grow="2">
                <template class="header">
                  <vaadin-grid-sorter path="address.street">Address</vaadin-grid-sorter>
                </template>
                <template>[[item.address.street]], [[item.address.city]]</template>
              </vaadin-grid-column>

            </vaadin-grid>
          </template>
        </dom-bind>
      </template>
    </vaadin-demo-snippet>

    <h3>Column borders</h3>
    <p><code>&lt;vaadin-grid <b>theme="column-borders"</b>&gt;</code></p>
    <vaadin-demo-snippet id="grid-theme-demos-column-borders">
      <template preserve-content="">
        <dom-bind>
          <template>
            <iron-ajax auto="" url="https://demo.vaadin.com/demo-data/1.0/people?count=20" handle-as="json" last-response="{{users}}"></iron-ajax>

            <vaadin-grid theme="column-borders" items="[[users.result]]" column-reordering-allowed="" multi-sort="">

              <vaadin-grid-selection-column auto-select=""> </vaadin-grid-selection-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="firstName">First Name</vaadin-grid-sorter>
                </template>
                <template>[[item.firstName]]
                </template>
              </vaadin-grid-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="lastName">Last Name</vaadin-grid-sorter>
                </template>
                <template>[[item.lastName]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column width="15em" flex-grow="2">
                <template class="header">
                  <vaadin-grid-sorter path="address.street">Address</vaadin-grid-sorter>
                </template>
                <template>[[item.address.street]], [[item.address.city]]</template>
              </vaadin-grid-column>

            </vaadin-grid>
          </template>
        </dom-bind>
      </template>
    </vaadin-demo-snippet>

    <h3>Row Stripes</h3>
    <p><code>&lt;vaadin-grid <b>theme="row-stripes"</b>&gt;</code></p>
    <vaadin-demo-snippet id="grid-theme-demos-row-stripes">
      <template preserve-content="">
        <dom-bind>
          <template>
            <iron-ajax auto="" url="https://demo.vaadin.com/demo-data/1.0/people?count=20" handle-as="json" last-response="{{users}}"></iron-ajax>

            <vaadin-grid theme="row-stripes" items="[[users.result]]" column-reordering-allowed="" multi-sort="">

              <vaadin-grid-selection-column auto-select=""> </vaadin-grid-selection-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="firstName">First Name</vaadin-grid-sorter>
                </template>
                <template>[[item.firstName]]
                </template>
              </vaadin-grid-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="lastName">Last Name</vaadin-grid-sorter>
                </template>
                <template>[[item.lastName]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column width="15em" flex-grow="2">
                <template class="header">
                  <vaadin-grid-sorter path="address.street">Address</vaadin-grid-sorter>
                </template>
                <template>[[item.address.street]], [[item.address.city]]</template>
              </vaadin-grid-column>

            </vaadin-grid>
          </template>
        </dom-bind>
      </template>
    </vaadin-demo-snippet>

    <h3>Wrap Cell Content</h3>
    <p><code>&lt;vaadin-grid <b>theme="wrap-cell-content"</b>&gt;</code></p>
    <p>By default, cell contents don’t wrap and all overflowing content is either clipped or truncated. Apply the <code>wrap-cell-content</code> theme to make the cell content wrap instead.</p>
    <vaadin-demo-snippet id="grid-theme-demos-wrap-cell-content">
      <template preserve-content="">
        <dom-bind>
          <template>
            <iron-ajax auto="" url="https://demo.vaadin.com/demo-data/1.0/people?count=20" handle-as="json" last-response="{{users}}"></iron-ajax>

            <vaadin-grid theme="wrap-cell-content" items="[[users.result]]" column-reordering-allowed="" multi-sort="">

              <vaadin-grid-selection-column auto-select=""> </vaadin-grid-selection-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="firstName">First Name</vaadin-grid-sorter>
                </template>
                <template>[[item.firstName]]
                </template>
              </vaadin-grid-column>

              <vaadin-grid-column width="9em">
                <template class="header">
                  <vaadin-grid-sorter path="lastName">Last Name</vaadin-grid-sorter>
                </template>
                <template>[[item.lastName]]</template>
              </vaadin-grid-column>

              <vaadin-grid-column width="15em">
                <template class="header">
                  <vaadin-grid-sorter path="address.street">Address</vaadin-grid-sorter>
                </template>
                <template>[[item.address.street]], [[item.address.city]]</template>
              </vaadin-grid-column>

            </vaadin-grid>
          </template>
        </dom-bind>
      </template>
    </vaadin-demo-snippet>
`;
  }

  static get is() {
    return 'grid-theme-demos';
  }
}
customElements.define(GridThemeDemos.is, GridThemeDemos);