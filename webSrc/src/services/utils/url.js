import config from '../../config';

const getApiUrl = () => `${config.api.apiHost}`;

export default function mapUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  const apiUrl = getApiUrl();

  return `https://${apiUrl}${adjustedPath}`;
}
