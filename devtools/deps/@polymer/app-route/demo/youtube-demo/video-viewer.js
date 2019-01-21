/// BareSpecifier=@polymer/app-route/demo/youtube-demo/video-viewer
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '../../../iron-flex-layout/iron-flex-layout.js';
import '../../../polymer/polymer-legacy.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../app-route.js';
import './youtube-lite.js';
import './route-info.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        position: relative;
        height: calc(100vh - 60px);
        --primary-color: var(--paper-red-500);
        --primary-text-color: #fff;
        --paper-toggle-button-unchecked-bar-color: #888;
      }

      paper-input {
        width: 100px;
      }

      #controls {
        color: #fff;
        @apply --layout-vertical;
        @apply --layout-center-center;
        height: 30%;
      }

      #controls > div {
        @apply --layout-horizontal;
        padding-bottom: 1em;
      }

      #state {
        margin-left: 16px;
      }

      #player {
        height: 70%;
      }
    </style>

    <!-- This app-route consumes the route which was provided by the tail of
    a app-route in the host of this element. This means that the parent that
    provides this route decides where this element lives in the URL space. In
    this case, the parent, which uses hashes, matches #/video and hence this
    element lives in <App serving point>?queryParams#/video/:vid -->
    <app-route
        route="{{route}}"
        pattern="/:vid"
        data="{{data}}"
        query-params="{{queryParams}}">
    </app-route>

    <!-- You can bind any element's state into the URL by binding their
    properties into the queryParams object. youtube-lite doesn't have any code
    that's even aware of routing or the URL. -->
    <youtube-lite
        id="player"
        video-id="{{data.vid}}"
        state="{{queryParams.state}}"
        current-time="{{queryParams.time}}"
        start-time="{{queryParams.time}}">
    </youtube-lite>

    <div id="controls">
      <div>
        <paper-input
            id="time"
            type="number"
            on-focus="pause"
            label="Time"
            value="{{queryParams.time}}">
        </paper-input>
        <paper-toggle-button id="state" active="{{playing}}">[[queryParams.state]]</paper-toggle-button>
      </div>
      <route-info route="[[route]]"></route-info>
    </div>
  `,

  is: 'video-viewer',

  properties: {
    route: { type: Object, notify: true },

    data: { type: Object },

    playing: { type: Boolean },

    queryParams: { type: Object }
  },

  observers: ['_playingChanged(playing)', '_stateChanged(queryParams.state)'],

  pause: function () {
    this.set('queryParams.state', 'paused');
  },

  _playingChanged: function (playing) {
    this.set('queryParams.state', playing ? 'playing' : 'paused');
  },

  _stateChanged: function (state) {
    this.playing = state === 'playing';
  }
});