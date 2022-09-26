const GOOGLE_API_KEY = "AIzaSyBgvq9fJ5l2NffBUfa6Lm10993H5CxnLag";

export function getMapPreview(lat: number, long: number) {
  const locationPreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${long}
    &key=${GOOGLE_API_KEY}`;

  console.log(locationPreview);
  return locationPreview;
}
