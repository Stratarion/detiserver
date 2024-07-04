// Подключаем модуль
import EasyYandexS3 from 'easy-yandex-s3';

// Инициализация
let s3 = new EasyYandexS3.default({
  auth: {
    accessKeyId: 'YCAJEb2WyfxSpA54VbbCVO1v8',
    secretAccessKey: 'YCPkmx4HlJSQhlWy8wziVSERVdRDrVDiTGCC3Krw',
  },
  Bucket: 'appvolkov', // например, "my-storage",
  debug: true, // Дебаг в консоли, потом можете удалить в релизе
});


export const uploadFile = async(req, res) => {
  try {
    let buffer = req.files[0].buffer;
    let upload = await s3.Upload(
      {
        buffer,
      },
      "/images/"
    );
    console.log(upload);
    res.json(upload)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}