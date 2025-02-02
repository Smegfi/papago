export type SensorType = {
   id: number;
   name: string;
   description: string;
   units: string;
};
export type Device = {
   id: number;
   name: string;
   location: string;
   mac: string;
   ipAddress: string;
};
export type Measuring = {
   id: number;
   deviceId: number;
   sensorType: number;
   timestamp: number;
   value: string;
   status: number;
};
