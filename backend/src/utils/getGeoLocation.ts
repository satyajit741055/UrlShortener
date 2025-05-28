// utils/getGeoLocation.ts
import axios from 'axios';

export const getGeoLocation = async (ip: string) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { country, city, regionName, timezone, query } = response.data;
    return {
      ipAddress: query,
      country,
      city,
      region: regionName,
      timezone,
    };
  } catch (error) {
    console.error("GeoLocation error:", error);
    return {
      ipAddress: ip,
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
      timezone: "Unknown",
    };
  }
};
