const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//read contents of file
const source = fs.readFileSync(inboxPath, 'utf8');

//compile statement with export
module.exports = solc.compile(source, 1).contracts[':Inbox'];