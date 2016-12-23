'use strict';
const angular = require('angular');

export default angular.module('nzbnodeApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
