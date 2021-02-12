const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
let INITIAL_STRING = 'intial message';

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });

        inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
        console.log(accounts);
        console.log(address)
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('second message').send({ from: accounts[0] })
        const message = await inbox.methods.message().call();
        assert.equal(message, 'second message')
    });
});
