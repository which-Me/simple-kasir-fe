export const ImageValidation = (url) => {
  return import.meta.env.VITE_PRODUCTION === "PRODUCTION"
    ? `${window.location.origin}/${url}`
    : `${import.meta.env.VITE_ROOT_URL}/${url}`;
};
