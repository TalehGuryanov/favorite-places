const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

export const getMapPreview = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
  &markers=color:red%7Clabel:Place%7C${lat},${lng}
  &key=${GOOGLE_API_KEY}`
}