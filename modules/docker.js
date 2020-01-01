let dd = require('dockerode');
var debug = require('debug')('dockerManager:docker');
let stream = require('stream')

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
        let a = await this.d.listContainers({ all: true });
        let b = [];
        for (let i = 0; i < a.length; i++) {
            a[i].ContainerObj = await this.d.getContainer(a[i].Id);
            b[i] = await a[i].ContainerObj.inspect();
        }
        return b;
    }

    async getContainerInfo(id) {
        return this.d.getContainer(id);
    }

    async stopContainer(id) {
        let a = await this.d.getContainer(id);
        let res = await a.stop();
        debug("Stopped container", id);
    }

    async restartContainer(id) {
        let a = await this.d.getContainer(id);
        let res = await a.restart();
        debug("Restarted container ", id)
    }

    async createContainer(config) {
        this.d.createContainer({ Image: config.Image, Cmd: config.Cmd, name: "asd" }, function (err, container) {
            console.log(err, container)
            container.start(function (err, data) {
                console.log(err, data)
            });
        });
    }


    containerLogs(container) {

        // create a single stream for stdin and stdout
        var logStream = new stream.PassThrough();
        logStream.on('data', function (chunk) {
            console.log(chunk.toString('utf8'));
        });

        container.logs({
            follow: true,
            stdout: true,
            stderr: true
        }, function (err, stream) {
            if (err) {
                return logger.error(err.message);
            }
            container.modem.demuxStream(stream, logStream, logStream);
            stream.on('end', function () {
                logStream.end('!stop!');
            });

            setTimeout(function () {
                stream.destroy();
            }, 2000);
        });
    }

    async getLogs(id) {
        let container = await this.d.getContainer(id);
        this.containerLogs(container);
        // return await logs;
    }
}


module.exports = new Docker();