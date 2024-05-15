const videoFormats = ["mp4", "mov", "avi", "wmv", "mkv", "flv", "webm"];
const audioFormats = ["mp3", "aac", "flac", "wav", "ogg", "wma", "m4a", "mpeg"];
const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "psd", "ai"];

const mediaFormater = (media) => {
  if (media?.mimeType) {
    if (videoFormats.includes(media.mimeType.slice(6))) {
      return "video";
    } else if (audioFormats.includes(media.mimeType.slice(6))) {
      return "audio";
    } else if (imageFormats.includes(media.mimeType.slice(6))) {
      return "image";
    } else {
      return "text";
    }
  } else {
    if (
      videoFormats.includes(media.uri.slice(media.uri.lastIndexOf(".") + 1))
    ) {
      return "video";
    } else if (
      audioFormats.includes(media.uri.slice(media.uri.lastIndexOf(".") + 1))
    ) {
      return "audio";
    } else if (
      imageFormats.includes(media.uri.slice(media.uri.lastIndexOf(".") + 1))
    ) {
      return "image";
    } else {
      return "text";
    }
  }
};

export default mediaFormater;
