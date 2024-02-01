import { Storage } from "aws-amplify";

export default async function s3Upload(folderName, file) {
  const filename = `${folderName}/${file.name}`;

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
    level: "protected",
    customPrefix: "vendor_uploads/"
  });

  return stored.key;
}
