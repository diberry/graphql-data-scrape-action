/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 698:
/***/ ((module) => {

module.exports = eval("require")("../get-data");


/***/ }),

/***/ 531:
/***/ ((module) => {

module.exports = eval("require")("./get-environment-vars");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

const getEnvironmentVars = __nccwpck_require__(531);
const getGraphQLCursor = __nccwpck_require__(698);

try {
  const envVars = getEnvironmentVars();

  // check errors
  if (!envVars.bearerToken && envVars.bearerTokenOverride == "false") {
    throw new Error("missing required bearer token");
  }

  const queryParams = {
    personal_access_token: envVars.bearerToken,
    personal_access_token_required: envVars.bearerTokenOverride,
    url: envVars.graphQlUrl,
    query,
    queryVariables,
    orgName
  }

  return getGraphQLCursor(queryParams);

} catch (error) {
  core.setFailed(error.message);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;