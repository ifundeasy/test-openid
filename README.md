# test-openid

This is an example code for implements:
- [OpenID Connect Provider](https://github.com/panva/node-oidc-provider) as [auth server](auth-server)
- Rest API as [resource server](resource-server)
- Web app as [client](web-client)

## requirements
- nodejs: 16.16.x
- postgres: 14.4.x
- mongodb: 5.09.x
- asymmetric certificate: see [this](README.md#preparation)

## preparation
Generate asymmetric secret key, by running the following command
```sh
bash ./asymmetric-keypair.sh 2048
```

## how to run
Please refer to the documentation for more information
- [auth-server](auth-server/README.md)
- [resource-server](resource-server/README.md)
- [client](web-client/README.md)

## credits
This project is improved version with using pure koa javascript based on [this](https://github.com/ebrahimmfadae/openid-connect-app)