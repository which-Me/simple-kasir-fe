export const convertTime = (time) => {
  return new Date(parseInt(time) * 1000).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta", // Zona waktu WIB (Jakarta)
  });
};
