// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

'use strict';

defineParticle(({DomParticle, resolver, log, html}) => {
  const host = `social-show-posts`;

  const template = html`
<style>
  [${host}] icon {
    float: right;
    margin-right: 1em;
  }
  [${host}] {
    font-family: 'Google Sans', sans-serif;
    font-size: 16pt;
    color: rgba(0, 0, 0, 0.87);
    border-top: 1px solid lightgrey;
  }
  [${host}] [msg] [avatar] {
    display: inline-block;
    height: 24px;
    width: 24px;
    min-width: 24px;
    border-radius: 100%;
    margin-left: 16px;
    margin-right: 16px;
    vertical-align: bottom;
  }
  [${host}] [header] {
    background-color: white;
    border-bottom: 1px solid lightgrey;
    text-align: center;
  }
  [${host}] [header] [blogAvatar] {
    display: inline-block;
    height: 56px;
    width: 56px;
    min-width: 56px;
    border-radius: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
  }
  [${host}] [header] [blogDescription] {
    color: rgba(0, 0, 0, 0.4);
    font-size: 16pt;
    margin-bottom: 14px;
    text-decoration: underline lightgrey;
  }
  [${host}] [zerostate] {
    font-size: 32pt;
    margin: 0.5em 56px auto 56px;
    text-align: center;
  }
  [${host}] [blogDescription] input {
    border: none;
    color: rgba(0, 0, 0, 0.4);
    font-family: 'Google Sans', sans-serif;
    font-size: 16pt;
    text-align: center;
    text-decoration: underline lightgrey;
  }
  [${host}] [msg] {
    padding-bottom: 16px;
    border-bottom: solid 0.5px;
    border-bottom-color: #d4d4d4;
  }
  [${host}] [msg] [title] {
    margin-bottom: 14px;
    margin-top: 18px;
  }
  [${host}] [msg] [content] {
    margin: 0 16px 0 56px;
  }
  [${host}] [msg] [content] img {
    display: block;
  }
  [${host}] [owner] {
    font-size: 14pt;
    margin-right: 6px;
  }
  [${host}] [when] {
    font-size: 12pt;
    color: rgba(0, 0, 0, 0.4);
  }
</style>
<div ${host}>
  <div header hidden="{{isAggregatedFeed}}">
    <div blogAvatar style='{{blogAvatarStyle}}'></div>
    <div blogAuthor>{{blogAuthor}}</div>
    <div>{{blogDescription}}</div>
  </div>
  <div zeroState hidden="{{hideZeroState}}">
    <!-- TODO(wkorman): Show different zero-state text and maybe a link
         to create a new arc when we're an aggregated feed. -->
    Get started by naming your miniblog & creating your first post!
  </div>
  <div postContent>
    <!-- TODO(wkorman): Convert to standard list particle. -->
    <x-list items="{{posts}}">
        <template>
        <div msg>
          <div title>
            <span avatar style='{{avatarStyle}}'></span><span owner>{{owner}}</span><span when>{{time}}</span>
            <icon style%="{{style}}" value="{{id}}" on-click="onDeletePost">delete</icon>
            <br>
          </div>
          <div content value="{{id}}">
            <img src="{{image}}" width="{{imageWidth}}" height="{{imageHeight}}">
            <span>{{message}}</span>
          </div>
        </div>
        </template>
    </x-list>
  </div>
</div>
<template blog-description-fixed>
  <div blogDescription>{{blogDescription}}</div>
</template>
<template blog-description-editable>
  <div blogDescription><input value="{{blogDescription}}" placeholder="Name your blog" on-blur="onBlurDescription"></div>
</template>`;

  return class extends DomParticle {
    get template() {
      return template;
    }
    peopleSetToMap(people) {
      const peopleMap = {};
      if (people)
        people.map(p => peopleMap[p.id] = p.name);
      return peopleMap;
    }
    avatarSetToMap(avatars) {
      const avatarMap = {};
      if (avatars)
        avatars.map(a => avatarMap[a.owner] = a.url);
      return avatarMap;
    }
    initBlogMetadata(props) {
      if (!props.metadata) {
        // Note that the aggregated feed recipe use case for this particle does
        // not provide a metadata handle at all.
        // TODO(wkorman): Consider splitting this particle into separate
        // ones -- one for working with a single miniblog and a separate one
        // to act as the feed, as differing logic is starting to get complex.
        if (this.handles.get('metadata')) {
          this.updateVariable('metadata', {blogOwner: props.user.id, description: ''});
        }
      }
    }
    willReceiveProps(props) {
      if (props.posts || props.stats) {
        this.initBlogMetadata(props);
        // Filter posts with no time stamp, in case somehow people have for
        // example old game stats that don't have a createdTimestamp written.
        const allPosts = (props.posts || [])
                             .concat(props.stats || [])
                             .filter(p => p.createdTimestamp);
        this.setState({
          posts: allPosts,
          people: this.peopleSetToMap(props.people),
          avatars: this.avatarSetToMap(props.avatars),
        });
      }
    }
    onDeletePost(e, state) {
      const targetPost = state.posts.find(p => p.id == e.data.value);
      if (targetPost)
        this.handles.get('posts').remove(targetPost);
    }
    onBlurDescription(e, state) {
      this.updateVariable('metadata',
          {blogOwner: this._props.user.id, description: e.data.value});
    }
    avatarToStyle(url) {
      return `background: url('${
          url}') center no-repeat; background-size: cover;`;
    }
    blogOwnerName(metadata) {
      const unknownName = 'Unknown';
      let name = unknownName;
      if (metadata) {
        name = this._state.people[metadata.blogOwner] || unknownName;
      }
      return name;
    }
    blogOwnerAvatarStyle(metadata, avatars) {
      const unknownAvatarUrl = '';
      let avatarUrl = unknownAvatarUrl;
      if (metadata) {
        avatarUrl = resolver(avatars[metadata.blogOwner]) || unknownAvatarUrl;
      }
      return this.avatarToStyle(avatarUrl);
    }
    blogDescription(user, metadata) {
      const blogDescription =
          (metadata && metadata.description) ? metadata.description : '';
      return {
        $template: (metadata && metadata.blogOwner == user.id) ?
            'blog-description-editable' :
            'blog-description-fixed',
        models: [{blogDescription}]
      };
    }
    sortPostsByDateAscending(posts) {
      return posts.sort((a, b) => {
        return b.createdTimestamp - a.createdTimestamp;
      });
    }
    clampSize(width, height) {
      if (!width || !height) {
        return {clampedWidth: width, clampedHeight: height};
      }
      const ratio = width / height;
      const maxWidth = 256;
      const clampedWidth = Math.min(maxWidth, width);
      const clampedHeight = clampedWidth / ratio;
      return {clampedWidth, clampedHeight};
    }
    postToModel(visible, {
      createdTimestamp,
      message,
      image,
      imageWidth,
      imageHeight,
      id,
      author
    }) {
      const {clampedWidth, clampedHeight} =
          this.clampSize(imageWidth, imageHeight);
      return {
        message,
        image: image || '',
        imageWidth: clampedWidth,
        imageHeight: clampedHeight,
        id,
        time: new Date(createdTimestamp).toLocaleDateString('en-US', {
          'month': 'short',
          'day': 'numeric'
        }),
        style: {display: visible ? 'inline' : 'none'},
        avatarStyle: this.avatarToStyle(resolver(this._state.avatars[author])),
        owner: this._state.people[author]
      };
    }
    render({user, metadata}, {posts, avatars}) {
      const blogAuthor = this.blogOwnerName(metadata);
      const blogAvatarStyle = this.blogOwnerAvatarStyle(metadata, avatars);
      const blogDescription = this.blogDescription(user, metadata);
      // TODO(wkorman): We'll be splitting the aggregated feed into its own
      // particle soon, so the below flag is just an interim hack.
      const isAggregatedFeed = !metadata;
      const model =
          {isAggregatedFeed, blogAuthor, blogAvatarStyle, blogDescription};
      if (posts && posts.length > 0) {
        const sortedPosts = this.sortPostsByDateAscending(posts);
        const visible = this.handles.get('posts').canWrite;
        return Object.assign(model, {
          hideZeroState: true,
          posts: sortedPosts.map(p => this.postToModel(visible, p))
        });
      } else {
        return Object.assign(model, {hideZeroState: false, posts: []});
      }
    }
  };
});
