export const getDateDisplayText = (lastTagged: string) => {
  if (!lastTagged) {
    return "";
  }
  return rewriteLastTagged(lastTagged);
};
const rewriteLastTagged = (lastTagged: string) => {
  return lastTagged.split(".", 1)[0].replaceAll("-", "/").replaceAll("T", " ");
};
