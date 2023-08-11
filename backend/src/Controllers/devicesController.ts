import { getGraphData } from "../Utils/Graph";

export const getDevices = async (_req, res) => {
    try {
      const response = await getGraphData("deviceManagement/managedDevices");
      const devices = response.value.map((device) => {
        return {
            id: device.id,
            deviceName: device.deviceName,
            manufacturer: device.manufacturer,
            model: device.model,
            serialNumber: device.serialNumber,
            operatingSystem: device.operatingSystem,
            userId: device.userId,
            userPrincipalName: device.userPrincipalName,
            userDisplayName: device.userDisplayName,
            emailAddress: device.emailAddress,
            managedDeviceName: device.managedDeviceName,
            totalStorageSpaceInBytes: Math.round(Number(device.totalStorageSpaceInBytes)/(1024*1024*1024)),
            physicalMemoryInBytes: device.physicalMemoryInBytes,
            enrolledDateTime: device.enrolledDateTime,
            lastSyncDateTime: device.lastSyncDateTime,
            complianceState: device.complianceState,
            deviceCategoryDisplayName: device.deviceCategoryDisplayName,
            deviceActionResults: device.deviceActionResults,
        };
    });

    res.status(200).json(devices.sort((a, b) => a.operatingSystem.localeCompare(b.operatingSystem)));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }    
}

export const getDevice = async (req, res) => {
    try {
      const response = await getGraphData("deviceManagement/managedDevices", req.params.id);
      const device = {
        id: response.id,
        deviceName: response.displayName,
        manufacturer: response.manufacturer,
        operatingSystem: response.operatingSystem,
      };
      res.status(200).json(device);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}