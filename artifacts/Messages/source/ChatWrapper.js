// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

'use strict';

defineParticle(({DomParticle, resolver, html, log}) => {

  const host = `chat-wrapper`;

  const template = html`

<div ${host}>

  <style>
    [${host}] {
      border-bottom: 1px solid silver;
      padding: 16px 24px;
    }
    [${host}] > [header] {
      display: flex;
      align-items: center;
    }
    [${host}] > [header] i {
      padding: 11px 8px 8px 8px;
      vertical-align: middle;
      user-select: none;
    }
    [${host}] .material-icons {
      font-family: 'Material Icons';
      font-size: 24px;
      font-style: normal;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
      vertical-align: middle;
      cursor: pointer;
    }
    [${host}] > [header] [message] {
      flex: 1;
      transform: translate3d(100vw, 0, 0);
      transition: transform 800ms ease-out;
    }
    [${host}] > [header] [message][show] {
      transform: translate3d(0, 0, 0);
    }
    [${host}] > [header] [message] {
      background-color: lightblue;
      box-sizing: border-box;
      padding: 6px 12px;
      margin: 0 16px;
      border-radius: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    [${host}] > [header] img {
      height: 32px;
      border-radius: 100%;
      vertical-align: middle;
      margin-left: 16px;
      opacity: 0;
      transition: opacity 800ms ease-out;
    }
    [${host}] > [header] img[show] {
      opacity: 1;
    }
    [${host}] > [chat]:not([open]) {
      display: none;
    }
  </style>

  <div header on-click="_onOpenClick">
    <icon>chat</icon>
    <span>{{messageCount}}</span>
    <img show$="{{show}}" src="{{avatar}}">
    <div message show$="{{show}}">{{message}}</div>
  </div>
  <div chat open$="{{open}}">
    <div slotid="chatmessages"></div>
  </div>
  <div slotid="compose"></div>
</div>

  `;

  const chatPre = [
    `%cChatWrapper`,
    `background: #524c00; color: white; padding: 1px 6px 2px 8px; border-radius: 6px;`
  ];

  return class extends DomParticle {
    get template() {
      return template;
    }
    _getInitialState() {
      return {open: false, animations: []};
    }
    shouldRender(props) {
      return props.messages && props.avatars;
    }
    render(props, state) {
      let {messages, avatars} = props;
      let count = messages && messages.length;
      // Last points to the last non-custom message.
      // TODO(noelutz): expose a custom slot to render the last message properly even
      // if it's a custom message.
      let last = count && messages.slice().reverse().find(m => !m.type);
      if (state.open) {
        state.animations = [];
        state.showing = null;
        state.count = 0;
      } else {
        // if the count has changed (and there is a last message)
        if (state.count !== count && last) {
          // remember the count
          state.count = count;
          // we need to animate this message
          state.animations.push(last);
          log(`count changed`);
        }
        // if we aren't showing something now
        if (!state.showing) {
          // get the next pending thing to show
          state.showing = state.animations.shift();
          if (state.showing) {
            state.content = state.showing.content;
            log(`show new message, dismiss in a few seconds`);
            // make it go away in a bit
            clearTimeout(state.timeout);
            state.timeout = setTimeout(() => this._invalidate(), 4000);
          }
        }
        // else, if we have old message showing
        else {
          // make it go away now
          log(`dismissing old message`);
          state.showing = null;
          clearTimeout(state.timeout);
          if (state.animations.length) {
            log(`show next message in 0.8s`);
            // go again after the dismiss animation is complete
            state.timeout = setTimeout(() => this._invalidate(), 800);
          }
        }
      }
      const avatarEntity = state.showing && this.boxQuery(avatars, state.showing.userid)[0];
      const avatar = !avatarEntity ? '' : resolver(avatarEntity.url || 'https://$shell/assets/avatars/user.jpg');
      return {
        open: Boolean(state.open),
        messageCount: `(${count})`,
        show: !state.open && Boolean(state.showing),
        message: state.content || '',
        avatar
      };
    }
    _onOpenClick(e, state) {
      this._setState({open: !state.open});
    }
  };
});