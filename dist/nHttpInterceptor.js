/**
 * 
 * @version v1.0.0 - 2015-05-13
 * @link 
 * @author Tommy Jepsen
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function() {
	'use strict';

	angular.module('nCore.nHttpInterceptor', ['nCore.nHttpInterceptor.provider', 'nCore.nHttpInterceptor.factory', 'nCore.nLogger']);
})();

(function() {
	'use strict';

	angular
		.module('nCore.nHttpInterceptor.provider', [])
		.provider('nHttpInterceptor', interceptorProvider);

	/* @ngInject */
	function interceptorProvider() {
		/*jshint validthis: true */

		/* Defaults messages on error */
		var defaults = {
			error304: 'Not modified',
			error401: 'Unauthorized',
			error403: 'Forbidden',
			error404: 'Not found',
			error412: 'Precondition failed',
			error440: 'No accept header',
			error441: 'No token was provided',
			error442: 'Invalid token',
			error443: 'Token has expired',
			error445: 'Invalid 3rd party token',
			error500: 'Interal server error'
		};

		this.configure = function(config) {
			angular.extend(defaults, config);
		};

		this.$get = [function() {
			return {
				errorMessages: defaults
			};
		}];
	}

})();

(function () {
	'use strict';

	angular
		.module('nCore.nHttpInterceptor.factory', ['nCore.nHttpInterceptor.provider'])
		.factory('nHttpInterceptorFactory', interceptorFactory);

	/* @ngInject */
	function interceptorFactory(nHttpInterceptor, $rootScope, nLogger) {

		var service = {
			errorHandle: errorHandle
		};

		return service;

		function errorHandle(statuscode) {
			/* Convert it so match the object with keys and errormessages in */
			var getErrorMsg = 'error' + statuscode;

			/* Message it out */
			/* If it exists in translate, then message it, or else message the string */
			if($rootScope.translate[getErrorMsg]) {
				nLogger.error($rootScope.translate[getErrorMsg]);
			} else if(nHttpInterceptor.errorMessages[getErrorMsg]) {
				nLogger.error(nHttpInterceptor.errorMessages[getErrorMsg]);
			}
		}
	}
	interceptorFactory.$inject = ["nHttpInterceptor", "$rootScope", "nLogger"];

})();
