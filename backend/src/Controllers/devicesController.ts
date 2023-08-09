import { getGraphData } from "../Utils/Graph";

export const getDevices = async (_req, res) => {
    try {
      const response = await getGraphData("devices");
      const devices = response.value.map((device) => {
        return {
            id: device.id,
            deviceName: device.displayName,
            manufacturer: device.manufacturer,
            operatingSystem: device.operatingSystem,
        };
    });

    res.status(200).json(devices.sort((a, b) => a.operatingSystem.localeCompare(b.operatingSystem)));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }    
}

export const getDevice = async (req, res) => {
    try {
      const response = await getGraphData("devices", req.params.id);
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