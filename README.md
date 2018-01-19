# capella.nodejs

Image uploader to [Capella](https://github.com/codex-team/capella)

## Usage

```js
let Capella = require('capella-pics');

capella = new Capella();

//upload by URL
capella.uploadFileByURL('https://capella.pics/public/app/svg/capella-logo.svg', function (resp) {
    console.log(resp);
});

//upload by local path
capella.uploadFile('C:/Users/Capella/Desktop/svg/capella-logo.svg', function (resp) {
    console.log(resp);
});
```

## Response
Return Capella response [Describe Response object here](https://github.com/codex-team/capella#upload-api) object if everything is ok, otherwise returns Error message.

## Exceptions
Exception will be thrown in cases of invalid file, inactive internet connection etc.

