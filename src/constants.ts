export enum Constants {
  //Server Defaults
  PortKey = 'PORT',

  //AUTH0
  Auth0Domain = 'AUTH0_DOMAIN',
  Auth0IssuerURLKey = 'AUTH0_ISSUER_URL',
  Auth0Audience = 'AUTH0_AUDIENCE',
  ApplicationBaseUrl = 'APPLICATION_BASE_URL',

  //Example setup configurations for
  //authenticating against another API
  //that is using Auth0
  Client_Auth0Audience = 'CLIENT_AUTH0_AUDIENCE',
  Client_Auth0SecretKey = 'CLIENT_AUTH0_SECRET',
  Client_Auth0ClientIdKey = 'CLIENT_AUTH0_CLIENT_ID',

  //Auth0 Setup for Swagger
  SwaggerAuth0Secret = 'SWAGGER_AUTH0_SECRET',
  SwaggerAuth0ClientId = 'SWAGGER_AUTH0_CLIENT_ID',

  //Swagger
  SwaggerUIPath = 'docs',

  // Redis
  RedisCacheHostKey = 'REDIS_HOST',
  RedisCachePortKey = 'REDIS_PORT',
  RedisCachePasswordKey = 'REDIS_PASSWORD',
}
