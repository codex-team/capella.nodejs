# capella.nodejs

Image uploader to [Capella](https://github.com/codex-team/capella)

## Installation

```
$ npm install capella-pics
```

## Usage

```js
let Capella = require('capella-pics');

capella = new Capella();

// upload by URL
capella.uploadFileByURL('https://capella.pics/public/app/capella-logo.png', function (resp) {
    console.log(resp);
});

// upload from local path
capella.uploadFile('C:/Users/Capella/Desktop/capella-logo.png', function (resp) {
    console.log(resp);
});
```

## Response
Return [Capella response](https://github.com/codex-team/capella#upload-api) object if everything is ok, otherwise returns Error message.

## Response format
Callback argument description

**On error**
```
{
   "success": false,
   "message": <message>
}
```
**On success**
```
{
   "success": true,
   "message": <message>,
   "id": <id>,
   "url": <url>
}
```

## License

MIT