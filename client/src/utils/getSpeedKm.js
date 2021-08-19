export function getSpeedKm(wind_speed) {
  return Math.round(wind_speed * 3.6, 0);
}