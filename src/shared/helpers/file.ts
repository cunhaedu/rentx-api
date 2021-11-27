import fs from 'fs';

export const deleteFile = async (folder: string, fileName: string) => {
  const path = `./uploads/${folder}/${fileName}`;
  try {
    await fs.promises.stat(path);
  } catch (error) {
    console.log(error);
    return;
  }

  await fs.promises.unlink(path);
};
