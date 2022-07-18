const axios = require('axios');

const baseURL = `https://api.cloudflare.com/client/v4/zones/ccb563d0bc931c57ca7432d8b72b962f`;

const axiosInstance = axios.create({
  baseURL: `${process.env.CLOUDFLARE_API}/${process.env.CLOUDFLARE_ZONE}`,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
  }
});

const addRecordDNS = (data) => {
  return axiosInstance.post('/dns_records', data);
} 

module.exports = {
  axiosInstance,
  addRecordDNS
}
