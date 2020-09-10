import ENV from 'pixeditor/config/environment';

export default function () {
  const appConfig = {
    airtableKey: ENV.APP.airtableKey,
    configKey: ENV.APP.configKey,
    author: 'XXX',
    access: 1,
  };
  localStorage.setItem('pix-config', JSON.stringify(appConfig));
}

