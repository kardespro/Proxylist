import axios from 'axios';
import fs from 'fs';
import chalk from 'chalk';

interface Proxy {
  ip: string;
  port: number;
}



async function checkProxy(proxy: Proxy) {
  try {
    const response = await axios.get('https://api.ipify.org?format=json', {
      proxy: {
        host: proxy.ip,
        port: proxy.port,
        protocol: "http"
      }
    });

    if (response.data.ip) {
      console.log(`${chalk.green(" Validated")}`);
      fs.appendFileSync('valid.txt', `${proxy.ip}:${proxy.port}\n`);
      
    } else {
      console.log(`${chalk.red("Invalid")}`);
    }
  } catch (error) {
    fs.appendFileSync('invalid.txt', `${proxy.ip}:${proxy.port}\n`);
    console.log(`HTTP Protokollu Proxy Degil`);
  }
}

(async () => {
  let { data } = await axios.get<Proxy[]>("https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.json");
  let httpProxies: Proxy[] = data;
  httpProxies.forEach(checkProxy);
})();
