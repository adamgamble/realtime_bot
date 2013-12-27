# Messages

Messages sent to front-end websocket follow this struture: `{ channel: "topic", data: [] }`

E.g. `{ channel: "lidar", data: [] }`

## Message Channels and Expected Data

All messages should be documented here:

### Battery Voltage

This represents the battery voltage on the primary battery, in volts.

```json
{
  channel: "battery_voltage",
  data: "3.5"
}
```

