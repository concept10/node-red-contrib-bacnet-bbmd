# node-red-contrib-bacnet-bbmd

## ATTENTION: This module has not been fully tested. Please test before using in production environments.  

A Node-RED node for BACnet BBMD.

## Installation

To install the node, run the following command in your Node-RED user directory (typically `~/.node-red`):

```bash
npm install node-red-contrib-bacnet-bbmd
```

## Usage

This Node-RED node allows you to interact with BACnet BBMD functionalities. Configure the node with the required parameters and use it in your flows to perform actions such as reading/writing BDT, reading FDT, registering/deleting foreign devices, and distributing broadcasts.

### Node Configuration

- **Name**: The name of the node.
- **Broadcast Address**: The broadcast address for the local subnet.
- **Port**: The BACnet UDP port.
- **BDT**: The Broadcast Distribution Table (BDT).
- **FDT**: The Foreign Devices Table (FDT).
- **BBMD Port**: The UDP port to listen to other BBMDs and Foreign devices.
- **Broadcast Mask**: The broadcast mask in CIDR format.

### Input Payload

The input payload should be an object with the following properties:

- **action**: The action to perform (`readBDT`, `writeBDT`, `readFDT`, `registerForeignDevice`, `deleteForeignDevice`, `distributeBroadcast`).
- **data**: The data required for the action, if applicable.

### Output Payload

The output payload will contain the result of the performed action.

### Example Flow

```json
[
    {
        "id": "1",
        "type": "bacnet-bbmd",
        "z": "flow",
        "name": "",
        "broadcastAddress": "192.168.10.255",
        "port": "47808",
        "bdt": "[{\"address\":\"192.168.11.101:47809\"}]",
        "fdt": "[]",
        "bbmdPort": "47809",
        "broadcastMask": "192.168.1.0/24",
        "wires": [["2"]]
    },
    {
        "id": "2",
        "type": "debug",
        "z": "flow",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 500,
        "y": 200,
        "wires": []
    }
]
```

In the example flow, the `bacnet-bbmd` node is configured with the necessary parameters. The input payload specifies the action to perform and the data required for the action. The result is sent to the `debug` node for inspection.

```json
{
    "action": "readBDT"
}
```

This will read the Broadcast Distribution Table (BDT) and output the result.
```` ▋