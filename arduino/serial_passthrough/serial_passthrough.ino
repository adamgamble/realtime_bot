
int inByte = 0; // incoming serial byte

void setup(){
  // start serial port at 9600 bps:
  Serial.begin(19200);
}

void loop(){
  // check for serial stream
  if (Serial.available() > 0) {
    // read serial
    inByte = Serial.read();
    // write whatever you got
    Serial.write(inByte);
  }
}
