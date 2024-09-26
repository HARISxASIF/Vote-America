/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// ------------ EXPRESS -------------
const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3300);
app.set('env', 'production');
const staticRoot = path.resolve(__dirname, './build');
app.use(express.static(staticRoot));
app.get('*', function (req, res) {
  res.sendFile('index.html', {root: staticRoot});
});

app.listen(app.get('port'), function () {
  console.log('Vote America Admin Panel live on port', app.get('port'));
});