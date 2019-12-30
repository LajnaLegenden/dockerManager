let Docker = require('dockerode');

module.exports = async function () {
    let a = new Docker();
    console.log(await a.listContainers());
}