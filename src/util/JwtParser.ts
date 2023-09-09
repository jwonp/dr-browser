export const getUsernameByJWT = (jwt: string):string | undefined => {
  try {
    const base64Payload = jwt.split(".")[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
    const payload = Buffer.from(base64Payload, "base64");
    const result = JSON.parse(payload.toString());

    return result.username;
  } catch {
    return undefined;
  }
  
};
