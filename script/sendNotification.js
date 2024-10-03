import axios from 'axios';

const platform = process.env.INPUTS_PLATFORM;
const name = process.env.INPUTS_NAME;

let fileName;
if (platform === 'windows-latest') {
  fileName = `${name}.msi`;
} else if (platform === 'macos-latest') {
  fileName = `${name}.dmg`;
} else {
  fileName = `${name}.zip`;
}

const message = `构建完成: ${name} for ${platform} 已生成: ${fileName}`;

const sendMessage = async () => {
  try {
    await axios.post(`https://api.telegram.org/bot7518333944:AAFwQrQIcU4HriivCciwe70yk-djhdp8wIs/sendMessage`, {
      chat_id: '-1002257173670',
      text: message,
    });

    // 上传文件
    const form = new FormData();
    form.append('chat_id', '-1002257173670');
    form.append('document', fs.createReadStream(`node_modules/pake-cli/output/${fileName}`));

    await axios.post(`https://api.telegram.org/bot7518333944:AAFwQrQIcU4HriivCciwe70yk-djhdp8wIs/sendDocument`, form, {
      headers: form.getHeaders(),
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

sendMessage();
