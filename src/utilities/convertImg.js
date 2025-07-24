function convertDriveLinkToDirect(link) {
  const regex = /https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/;
  const match = link.match(regex);
  if (match && match[1]) {
    console.log(`https://drive.google.com/uc?export=view&id=${match[1]}`);
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  } else {
    console.warn("Invalid Google Drive link:", link);
    return link;
  }
}

export default convertDriveLinkToDirect;