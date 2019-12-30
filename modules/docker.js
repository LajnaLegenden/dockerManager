let dd = require('dockerode');

class Docker {
    constructor() {
        this.d = new dd();
    }

    async getImages() {
        let a = await this.d.listImages();
        let b = [];
        for (let i = 0; i < a.length; i++) {
            a[i].ImageObj = await this.d.getImage(a[i].Id);
            b[i] = await a[i].ImageObj.inspect();
        }
        return b;
    }

    async getContainers() {
        return await this.d.listContainers();
    }

    async getContainerInfo(id) {
        return this.d.getContainer(id);
    }
}




module.exports = new Docker();