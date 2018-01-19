# capella.nodejs

Image uploader to [Capella](https://github.com/codex-team/capella)

## Usage

```js
let capella = require('capella-pics');

capella = new capella;

//upload by URL
capella.uploadFileByURL('https://capella.pics/public/app/svg/capella-logo.svg', (resp) => {
    console.log(resp);
});

//upload by local path
capella.uploadFile('C:/Users/Capella/Desktop/svg/capella-logo.svg', (resp) => {
    console.log(resp);
});
```

## Response
Return string error if operation failed or [capella response](https://github.com/codex-team/capella#upload-api) if all was successful

## Exceptions
If you have not valid path, not valid internet connection and etc. you get exception 
