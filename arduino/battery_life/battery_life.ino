// Arduino code to read analog input from voltage sensor, covert to 0-100% value for 112v supply, then send json response over serial to the ruby script that looks for it.
void setup(){
  Serial.begin(9600);
}

void loop(){
  get_battery_life();
}

void get_battery_life(){
  int battery_reading = 0;
  int battery_life = 0;
  int battery_full = 575;
  int battery_dead = 450;
  battery_reading = analogRead(0);
  battery_life = map(battery_reading, battery_dead, battery_full, 0, 100);
  if (battery_reading < battery_dead){ battery_life = 0; }
  if (battery_reading > battery_full){ battery_life = 100; }
  Serial.print("{'battery':");
  Serial.print(battery_life);
  Serial.print('}');
  delay(10);
})}
