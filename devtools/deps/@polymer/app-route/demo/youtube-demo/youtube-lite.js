/// BareSpecifier=@polymer/app-route/demo/youtube-demo/youtube-lite
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
/*
youtube-lite provides a simple subset of the google-youtube element's API. By
simplifying the API we're also able to make it more amenable to two-way data
binding.

Note that this element is totally agnostic to routing!
*/
import '../../../polymer/polymer-legacy.js';
import './google-youtube.js';

import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
      }

      google-youtube {
        height: 100%;
      }
    </style>

    <google-youtube
        id="player"
        video-id="{{videoId}}"
        state="{{__state}}"
        current-time="{{__currentTime}}">
    </google-youtube>
  `,

  is: 'youtube-lite',

  properties: {
    videoId: {
      type: String,
      notify: true
    },

    state: {
      type: String,
      notify: true,
      observer: '_stateChanged'
    },

    currentTime: {
      type: Number,
      notify: true,
      observer: '_currentTimeChanged'
    },

    startTime: {
      type: Number
    },

    __state: {
      type: String,
      observer: '__ytApiStateChange'
    },

    __currentTime: {
      type: Number,
      observer: '_ytCurrentTimeChanged'
    },

    __pauseOnFirstSeek: {
      type: Boolean
    }
  },

  listeners: { 'google-youtube-ready': '_onYoutubeReady' },

  _seekTo: function (newTime) {
    var player = this.$.player;
    newTime = Number(newTime);

    if ((player.duration == 1 || newTime < player.duration) && !this.__ytChangingTime) {
      player.seekTo(newTime);
    }

    this.__ytChangingTime = false;
  },

  _onYoutubeReady: function () {
    this.__pauseOnFirstSeek = this.state == 'paused';

    if (!this.__pauseOnFirstSeek || this.startTime) {
      this._seekTo(this.startTime);
    }
  },

  _currentTimeChanged: function (newTime) {
    var apiState = this.__readableStateToApiState(this.state);

    if (apiState != this.__apiStates.PAUSED || this.__state != this.__apiStates.PAUSED) {
      return;
    }

    this._seekTo(newTime);
  },

  _ytCurrentTimeChanged: function (ytCurrentTime) {
    this.__ytChangingTime = true;
    this.currentTime = ytCurrentTime;
  },

  _stateChanged: function (newState) {
    var newApiState = this.__readableStateToApiState(newState);

    if (newApiState == this.__state || this.__state == this.__apiStates.UNSTARTED || this.__state === undefined) {
      return;
    }

    this.currentTime = this.__currentTime;
    var player = this.$.player;

    switch (newApiState) {
      case this.__apiStates.PLAYING:
        player.play();
        break;
      case this.__apiStates.PAUSED:
        player.pause();
        break;
      default:
        return;
    }
  },

  __ytApiStateChange: function (newState) {
    var readableState;

    switch (newState) {
      case this.__apiStates.ENDED:
        readableState = this.__states.PAUSED;
        break;
      case this.__apiStates.PLAYING:
        readableState = this.__states.PLAYING;
        break;
      case this.__apiStates.PAUSED:
        readableState = this.__states.PAUSED;
        break;
      default:
        return;
    }

    if (this.state == readableState) {
      return;
    }

    if (this.__pauseOnFirstSeek && readableState == this.__states.PLAYING) {
      this.__pauseOnFirstSeek = false;
      this.$.player.pause();
      return;
    }

    this.state = readableState;
    this.currentTime = this.__currentTime;
  },

  __readableStateToApiState: function (readableState) {
    var newApiState = -2;

    if (readableState == this.__states.PLAYING) {
      newApiState = this.__apiStates.PLAYING;
    } else if (readableState = this.__states.PAUSED) {
      newApiState = this.__apiStates.PAUSED;
    }

    return newApiState;
  },

  __states: { PLAYING: 'playing', PAUSED: 'paused' },

  __apiStates: {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    QUEUED: 5
  }
});