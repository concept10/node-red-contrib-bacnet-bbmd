module.exports = function(RED) {
    function BacnetBBMDNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        const BACnetBBMD = require('bacnet-bbmd');
        const bbmd = new BACnetBBMD({
            broadcastAddress: config.broadcastAddress,
            port: config.port,
            bdt: config.bdt ? JSON.parse(config.bdt) : [],
            fdt: config.fdt ? JSON.parse(config.fdt) : [],
            bbmdPort: config.bbmdPort,
            broadcastMask: config.broadcastMask,
        });

        node.on('input', function(msg) {
            const action = msg.payload.action;
            const data = msg.payload.data;

            switch (action) {
                case 'readBDT':
                    msg.payload = bbmd.readBDT();
                    break;
                case 'writeBDT':
                    bbmd.writeBDT(data);
                    msg.payload = 'BDT updated';
                    break;
                case 'readFDT':
                    msg.payload = bbmd.readFDT();
                    break;
                case 'registerForeignDevice':
                    bbmd.registerForeignDevice(data);
                    msg.payload = 'Foreign Device registered';
                    break;
                case 'deleteForeignDevice':
                    bbmd.deleteForeignDevice(data);
                    msg.payload = 'Foreign Device deleted';
                    break;
                case 'distributeBroadcast':
                    bbmd.handleDistributeBroadcastToNetwork(data);
                    msg.payload = 'Broadcast distributed';
                    break;
                default:
                    msg.payload = 'Invalid action';
            }

            node.send(msg);
        });
    }

    RED.nodes.registerType("bacnet-bbmd", BacnetBBMDNode);
};