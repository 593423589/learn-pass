import OSS from 'ali-oss';

const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI4GHkJcbbT5raepiWgS7D',
  accessKeySecret: 'WSA2tLdAYAaBKaYaRdr7gIQQb9xNkA',
  bucket: 'learn-pass',
});

enum PATH {
  cover = '/cover',
  video = '/video',
  document = '/document',
}

const getUniqueId = () => Date.now().toString(36);

const uploadCover = (file: File) => directUploade(file, PATH.cover);

const uploadDocument = (file: File) => directUploade(file, PATH.document);

const directUploade = async (file: File, path: PATH) =>
  await client.put(`${path}/${getUniqueId()}-${file.name}`, file);
// // 恢复上传。

// async function resumeUpload() {
//   try {
//     let result = await client.multipartUpload(
//       'object-key',
//       'file-object',
//       {
//         progress: function(p, checkpoint) {
//           tempCheckpoint = checkpoint;
//         },
//         checkpoint: tempCheckpoint,
//         meta: { year: 2020, people: 'test' },
//         mime: 'image/jpeg',
//       },
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }

export { uploadCover, uploadDocument };
