const withTM = require('next-transpile-modules')(
  [
    '@rifario/components/atoms',
    '@rifario/components/molecules',
    '@rifario/components/provider'
  ]
)
module.exports = withTM()
