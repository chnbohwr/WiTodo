import config from '../../config';

const getApiUrl = () => {
  if (config.environment === 'development') return `${config.api.apiHost}:${config.api.apiPort}`;

  return `${config.api.apiHost}`;
};

export default function mapUrl(path) {
  const protocol = config.environment === 'development' ? 'http' : 'https';
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  const apiUrl = getApiUrl();

  return `${protocol}://${apiUrl}${adjustedPath}`;
}
