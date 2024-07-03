# Strapi plugin upload-permission


A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to secure the public route upload/(*)

[![Downloads](https://img.shields.io/npm/dm/strapi-upload-permission?style=for-the-badge)](https://www.npmjs.com/package/strapi-upload-permission)
[![Install size](https://img.shields.io/npm/l/strapi-upload-permission?style=for-the-badge)](https://github.com/PaulRichez/strapi-upload-permission/blob/master/Licence)

## 🚀 &nbsp; _Overview_

this plugin gives the possibility to protect the file download route which is normally public

## ⏳ &nbsp; _Installation_

With npm:

```bash
npm install strapi-upload-permission
```

With yarn:

```bash
yarn add strapi-upload-permission
```

---

## ✨ &nbsp; _Getting Started_
```js
// config/plugins.js
'upload-permission': {
    enabled: true,
    config: {
      "content-manager-visible": { // tab "Content Manager"
        'file': true, // add the file collection
        'folder': true, // add the folder collection
      },
      "content-type-builder": { // tab "Content-Type Builder"
        'file': true, // add the file collection
        'folder': true, // add the folder collection
      },
      "downloadcallback": async (ctx, next) => { 
        // callback from middleware on /upload/(*)
        // you have a full access like a normal middleware
        if (ctx.state.user) { // you have the user in ctx.state.user (if token)
          return await next(); // return this to accept the download
        }
        return ctx.unauthorized('You are not allowed to download this file'); // denied
      }
    }
  },
```

## 🐛 &nbsp; _Bugs_

If any bugs are found please report them as a [Github Issue](https://github.com/PaulRichez/strapi-upload-permission/issues)
