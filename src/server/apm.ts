import apm from 'elastic-apm-node';

const elasticApm = apm.start({
  serviceName: 'santander-totem',
  secretToken: 'UJOIlYMROPR2X9O7JV',
  serverUrl: 'https://635520710eb2466187dd3db0029e98b6.apm.us-central1.gcp.cloud.es.io:443',
  environment: 'production',
  active: true,
  captureBody: 'all',
  captureErrorLogStackTraces: 'always',
  logLevel: 'info'
});

export default elasticApm; 