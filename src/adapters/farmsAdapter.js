export default function farmsAdapter({ id, name, owner, telephone, country, ubication, totalSurface, infrastructure, perimetralFence, urls, start, hidricRes }) {
  return {
    id,
    name,
    owner,
    phone: telephone,
    country,
    lat: Number(ubication.lat),
    lng: Number(ubication.lng),
    totalSurface: Number(totalSurface),
    infrastructure,
    perimetralFence,
    urls,
    start,
    hidricRes
  };
}
