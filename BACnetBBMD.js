class BACnetBBMD {
  constructor(options) {
    this.broadcastAddress = options.broadcastAddress;
    this.port = options.port;
    this.bdt = options.bdt;
    this.fdt = options.fdt;
    this.bbmdPort = options.bbmdPort;
    this.broadcastMask = options.broadcastMask; // New property for broadcast mask
  }

  // Implementing Broadcast mask in BDT
  applyBroadcastMask(ipAddress) {
    // Assuming broadcastMask is a string in CIDR format, e.g., '192.168.1.0/24'
    const [subnet, prefixLength] = this.broadcastMask.split('/');
    const subnetBinary = this.ipToBinary(subnet);
    const ipBinary = this.ipToBinary(ipAddress);

    // Apply the mask to check if the IP address is within the subnet
    for (let i = 0; i < prefixLength; i++) {
      if (subnetBinary[i] !== ipBinary[i]) {
        return false; // IP address is outside the subnet
      }
    }
    return true; // IP address is within the subnet
  }

  ipToBinary(ipAddress) {
    return ipAddress.split('.').map(Number).map((octet) => octet.toString(2).padStart(8, '0')).join('');
  }

  // Read/Write BDT function
  readBDT() {
    return this.bdt;
  }

  writeBDT(newBDT) {
    this.bdt = newBDT;
  }

  // Read FDT function
  readFDT() {
    return this.fdt;
  }

  // Register/Delete Foreign Device
  registerForeignDevice(device) {
    this.fdt.push(device);
  }

  deleteForeignDevice(device) {
    this.fdt = this.fdt.filter((d) => d.address !== device.address);
  }

  // Handle "Distribute Broadcast to Network" message
  handleDistributeBroadcastToNetwork(message) {
    const broadcastMessage = this.wrapInForwardedNPDU(message);
    this.sendToAllBBMDs(broadcastMessage);
  }

  wrapInForwardedNPDU(message) {
    return `Forwarded: ${message}`;
  }

  sendToAllBBMDs(message) {
    this.bdt.forEach((entry) => {
      this.sendMessage(entry.address, message);
    });
  }

  sendMessage(address, message) {
    console.log(`Sending message to ${address}: ${message}`);
  }
}