const codeChallengeMethod = 'S256'
const { BASE_URI, AUTH_HOST, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_CLIENT_CALLBACK, RESOURCE_HOST } = process.env

module.exports = () => ({
  home: async (ctx) => {
    return ctx.render('home', {
      title: 'Home',
      grantTypes: [
        { url: `${BASE_URI}/openid`, name: 'Openid', available: true, comments: '' },
        { url: `${BASE_URI}/authorization-code`, name: 'Authorization code', available: true, comments: '' },
        { url: `${BASE_URI}/client-credentials`, name: 'Client credentials', available: true, comments: '' },
        { url: `${BASE_URI}/implicit`, name: 'implicit', available: false, comments: '' },
        { url: `${BASE_URI}/password`, name: 'Password', available: true, comments: 'legacy' },
      ],
      pages: [
        { url: `${BASE_URI}/abc`, name: 'Get abc resource', comments: 'using token introspection' },
        { url: `${BASE_URI}/xyz`, name: 'Get xyz resource', comments: 'public key decoding' },
        { url: `${BASE_URI}/registration`, name: 'User registration', comments: '' }
        // TODO: Add page for handling: device auth, user info, refresh token, logout, token introspection, token revocation
      ]
    })
  },
  openid: async (ctx) => {
    return ctx.render('openid', {
      title: 'OpenID Connect',
      authServerUrl: `${AUTH_HOST}/auth`,
      clientId: AUTH_CLIENT_ID,
      grantType: 'authorization_code',
      responseType: 'code',
      callbackUrl: AUTH_CLIENT_CALLBACK,
      scopes: 'openid offline_access address email phone profile',
      prompt: 'consent',
      codeChallengeMethod,
    })
  },
  authorizationCode: async (ctx) => {
    return ctx.render('authorization-code', {
      title: 'Authorization code',
      authServerUrl: `${AUTH_HOST}/auth`,
      clientId: AUTH_CLIENT_ID,
      grantType: 'authorization_code',
      responseType: 'code',
      callbackUrl: AUTH_CLIENT_CALLBACK,
      apiUrl: `${RESOURCE_HOST}/abc`,
      scopes: 'openid offline_access api:read',
      prompt: 'consent',
      codeChallengeMethod,
    })
  },
  password: async (ctx) => {
    return ctx.render('password', {
      title: 'Login',
      authServerUrl: `${AUTH_HOST}/token`,
      clientId: AUTH_CLIENT_ID,
      clientSecret: AUTH_CLIENT_SECRET,
      grantType: 'password',
      apiUrl: `${RESOURCE_HOST}/abc`,
      scopes: 'openid offline_access api:read',
      prompt: 'consent',
      username: 'sample',
      password: 'pass',
    })
  },
  callback: async (ctx) => {
    if ('error' in ctx.query) {
      ctx.throw(401, `${ctx.query.error}: ${ctx.query.error_description}`)
    } else {
      return ctx.render('callback', {
        title: 'Callback',
        code: ctx.query.code,
        authServerUrl: `${AUTH_HOST}/token`,
        clientId: AUTH_CLIENT_ID,
        clientSecret: AUTH_CLIENT_SECRET,
        grantType: 'authorization_code',
        callbackUrl: AUTH_CLIENT_CALLBACK,
        scopes: 'openid offline_access api:read',
        codeChallengeMethod,
      })
    }
  },
  registration: async (ctx) => {
    return ctx.render('registration', {
      title: 'Registration',
      authServerUrl: `${AUTH_HOST}/registration`,
    })
  },
  clientCredentials: async (ctx) => {
    return ctx.render('client-credentials', {
      title: 'Client login',
      authServerUrl: `${AUTH_HOST}/token`,
      clientId: AUTH_CLIENT_ID,
      clientSecret: AUTH_CLIENT_SECRET,
      grantType: 'client_credentials',
      scopes: 'openid',
    })
  },
  getXResource: async (ctx) => {
    return ctx.render('get-abc-resource', { title: 'Get ABC resource', apiUrl: `${RESOURCE_HOST}/abc` })
  },
  getYResource: async (ctx) => {
    return ctx.render('get-xyz-resource', { title: 'Get XYZ resource', apiUrl: `${RESOURCE_HOST}/xyz` })
  },
})
