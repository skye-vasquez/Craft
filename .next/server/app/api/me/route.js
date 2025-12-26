"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/me/route";
exports.ids = ["app/api/me/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fme%2Froute&page=%2Fapi%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fme%2Froute.ts&appDir=%2Fhome%2Fproject%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fproject&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fme%2Froute&page=%2Fapi%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fme%2Froute.ts&appDir=%2Fhome%2Fproject%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fproject&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_project_app_api_me_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/me/route.ts */ \"(rsc)/./app/api/me/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/me/route\",\n        pathname: \"/api/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/me/route\"\n    },\n    resolvedPagePath: \"/home/project/app/api/me/route.ts\",\n    nextConfigOutput,\n    userland: _home_project_app_api_me_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/me/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZtZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbWUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZtZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGcHJvamVjdCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnByb2plY3QmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2Y7QUFDOUQ7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wbGlhbmNlLWV2aWRlbmNlLXBvcnRhbC8/MzA1OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9wcm9qZWN0L2FwcC9hcGkvbWUvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL21lL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbWVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL21lL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvcHJvamVjdC9hcHAvYXBpL21lL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9tZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fme%2Froute&page=%2Fapi%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fme%2Froute.ts&appDir=%2Fhome%2Fproject%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fproject&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/me/route.ts":
/*!*****************************!*\
  !*** ./app/api/me/route.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth/session */ \"(rsc)/./lib/auth/session.ts\");\n\n\nasync function GET() {\n    try {\n        const session = await (0,_lib_auth_session__WEBPACK_IMPORTED_MODULE_1__.getSession)();\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                user: null\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            user: {\n                type: session.type,\n                storeId: session.storeId,\n                storeName: session.storeName,\n                email: session.email\n            }\n        });\n    } catch (error) {\n        console.error(\"Get session error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            user: null\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNLO0FBRXpDLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1GLDZEQUFVQTtRQUVoQyxJQUFJLENBQUNFLFNBQVM7WUFDWixPQUFPSCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO2dCQUFFQyxNQUFNO1lBQUs7UUFDeEM7UUFFQSxPQUFPTCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQ3ZCQyxNQUFNO2dCQUNKQyxNQUFNSCxRQUFRRyxJQUFJO2dCQUNsQkMsU0FBU0osUUFBUUksT0FBTztnQkFDeEJDLFdBQVdMLFFBQVFLLFNBQVM7Z0JBQzVCQyxPQUFPTixRQUFRTSxLQUFLO1lBQ3RCO1FBQ0Y7SUFDRixFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHNCQUFzQkE7UUFDcEMsT0FBT1YscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFQyxNQUFNO1FBQUs7SUFDeEM7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2NvbXBsaWFuY2UtZXZpZGVuY2UtcG9ydGFsLy4vYXBwL2FwaS9tZS9yb3V0ZS50cz81ZmNjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IGdldFNlc3Npb24gfSBmcm9tICdAL2xpYi9hdXRoL3Nlc3Npb24nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKCk7XG5cbiAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHVzZXI6IG51bGwgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgdHlwZTogc2Vzc2lvbi50eXBlLFxuICAgICAgICBzdG9yZUlkOiBzZXNzaW9uLnN0b3JlSWQsXG4gICAgICAgIHN0b3JlTmFtZTogc2Vzc2lvbi5zdG9yZU5hbWUsXG4gICAgICAgIGVtYWlsOiBzZXNzaW9uLmVtYWlsLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdHZXQgc2Vzc2lvbiBlcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdXNlcjogbnVsbCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlc3Npb24iLCJHRVQiLCJzZXNzaW9uIiwianNvbiIsInVzZXIiLCJ0eXBlIiwic3RvcmVJZCIsInN0b3JlTmFtZSIsImVtYWlsIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/me/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth/session.ts":
/*!*****************************!*\
  !*** ./lib/auth/session.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearSession: () => (/* binding */ clearSession),\n/* harmony export */   createSession: () => (/* binding */ createSession),\n/* harmony export */   getSession: () => (/* binding */ getSession),\n/* harmony export */   requireAdminSession: () => (/* binding */ requireAdminSession),\n/* harmony export */   requireStoreSession: () => (/* binding */ requireStoreSession),\n/* harmony export */   setSessionCookie: () => (/* binding */ setSessionCookie)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || \"fallback-secret-change-in-production\");\nconst COOKIE_NAME = \"compliance-session\";\nconst EXPIRATION_TIME = \"7d\";\nasync function createSession(payload) {\n    const token = await new jose__WEBPACK_IMPORTED_MODULE_1__.SignJWT({\n        ...payload\n    }).setProtectedHeader({\n        alg: \"HS256\"\n    }).setIssuedAt().setExpirationTime(EXPIRATION_TIME).sign(SECRET);\n    return token;\n}\nasync function setSessionCookie(token) {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    cookieStore.set(COOKIE_NAME, token, {\n        httpOnly: true,\n        secure: \"development\" === \"production\",\n        sameSite: \"lax\",\n        path: \"/\",\n        maxAge: 60 * 60 * 24 * 7\n    });\n}\nasync function getSession() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    const token = cookieStore.get(COOKIE_NAME)?.value;\n    if (!token) {\n        return null;\n    }\n    try {\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_2__.jwtVerify)(token, SECRET);\n        return payload;\n    } catch  {\n        return null;\n    }\n}\nasync function clearSession() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    cookieStore.delete(COOKIE_NAME);\n}\nasync function requireStoreSession() {\n    const session = await getSession();\n    if (!session || session.type !== \"store\") {\n        throw new Error(\"Store authentication required\");\n    }\n    return session;\n}\nasync function requireAdminSession() {\n    const session = await getSession();\n    if (!session || session.type !== \"admin\") {\n        throw new Error(\"Admin authentication required\");\n    }\n    return session;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC9zZXNzaW9uLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUEwQztBQUNIO0FBR3ZDLE1BQU1HLFNBQVMsSUFBSUMsY0FBY0MsTUFBTSxDQUNyQ0MsUUFBUUMsR0FBRyxDQUFDQyxjQUFjLElBQUk7QUFHaEMsTUFBTUMsY0FBYztBQUNwQixNQUFNQyxrQkFBa0I7QUFFakIsZUFBZUMsY0FBY0MsT0FBb0M7SUFDdEUsTUFBTUMsUUFBUSxNQUFNLElBQUliLHlDQUFPQSxDQUFDO1FBQUUsR0FBR1ksT0FBTztJQUFDLEdBQzFDRSxrQkFBa0IsQ0FBQztRQUFFQyxLQUFLO0lBQVEsR0FDbENDLFdBQVcsR0FDWEMsaUJBQWlCLENBQUNQLGlCQUNsQlEsSUFBSSxDQUFDZjtJQUVSLE9BQU9VO0FBQ1Q7QUFFTyxlQUFlTSxpQkFBaUJOLEtBQWE7SUFDbEQsTUFBTU8sY0FBYyxNQUFNbEIscURBQU9BO0lBQ2pDa0IsWUFBWUMsR0FBRyxDQUFDWixhQUFhSSxPQUFPO1FBQ2xDUyxVQUFVO1FBQ1ZDLFFBQVFqQixhQUFvQixLQUFLO1FBQ2pDbUIsVUFBVTtRQUNWQyxNQUFNO1FBQ05DLFFBQVEsS0FBSyxLQUFLLEtBQUs7SUFDekI7QUFDRjtBQUVPLGVBQWVDO0lBQ3BCLE1BQU1SLGNBQWMsTUFBTWxCLHFEQUFPQTtJQUNqQyxNQUFNVyxRQUFRTyxZQUFZUyxHQUFHLENBQUNwQixjQUFjcUI7SUFFNUMsSUFBSSxDQUFDakIsT0FBTztRQUNWLE9BQU87SUFDVDtJQUVBLElBQUk7UUFDRixNQUFNLEVBQUVELE9BQU8sRUFBRSxHQUFHLE1BQU1YLCtDQUFTQSxDQUFDWSxPQUFPVjtRQUMzQyxPQUFPUztJQUNULEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRU8sZUFBZW1CO0lBQ3BCLE1BQU1YLGNBQWMsTUFBTWxCLHFEQUFPQTtJQUNqQ2tCLFlBQVlZLE1BQU0sQ0FBQ3ZCO0FBQ3JCO0FBRU8sZUFBZXdCO0lBQ3BCLE1BQU1DLFVBQVUsTUFBTU47SUFDdEIsSUFBSSxDQUFDTSxXQUFXQSxRQUFRQyxJQUFJLEtBQUssU0FBUztRQUN4QyxNQUFNLElBQUlDLE1BQU07SUFDbEI7SUFDQSxPQUFPRjtBQUNUO0FBRU8sZUFBZUc7SUFDcEIsTUFBTUgsVUFBVSxNQUFNTjtJQUN0QixJQUFJLENBQUNNLFdBQVdBLFFBQVFDLElBQUksS0FBSyxTQUFTO1FBQ3hDLE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtJQUNBLE9BQU9GO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wbGlhbmNlLWV2aWRlbmNlLXBvcnRhbC8uL2xpYi9hdXRoL3Nlc3Npb24udHM/ZjY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWduSldULCBqd3RWZXJpZnkgfSBmcm9tICdqb3NlJztcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tICduZXh0L2hlYWRlcnMnO1xuaW1wb3J0IHR5cGUgeyBTZXNzaW9uUGF5bG9hZCB9IGZyb20gJ0AvbGliL3R5cGVzJztcblxuY29uc3QgU0VDUkVUID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICBwcm9jZXNzLmVudi5TRVNTSU9OX1NFQ1JFVCB8fCAnZmFsbGJhY2stc2VjcmV0LWNoYW5nZS1pbi1wcm9kdWN0aW9uJ1xuKTtcblxuY29uc3QgQ09PS0lFX05BTUUgPSAnY29tcGxpYW5jZS1zZXNzaW9uJztcbmNvbnN0IEVYUElSQVRJT05fVElNRSA9ICc3ZCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVTZXNzaW9uKHBheWxvYWQ6IE9taXQ8U2Vzc2lvblBheWxvYWQsICdleHAnPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHRva2VuID0gYXdhaXQgbmV3IFNpZ25KV1QoeyAuLi5wYXlsb2FkIH0pXG4gICAgLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogJ0hTMjU2JyB9KVxuICAgIC5zZXRJc3N1ZWRBdCgpXG4gICAgLnNldEV4cGlyYXRpb25UaW1lKEVYUElSQVRJT05fVElNRSlcbiAgICAuc2lnbihTRUNSRVQpO1xuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFNlc3Npb25Db29raWUodG9rZW46IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcbiAgY29va2llU3RvcmUuc2V0KENPT0tJRV9OQU1FLCB0b2tlbiwge1xuICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcbiAgICBzYW1lU2l0ZTogJ2xheCcsXG4gICAgcGF0aDogJy8nLFxuICAgIG1heEFnZTogNjAgKiA2MCAqIDI0ICogNyxcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXNzaW9uKCk6IFByb21pc2U8U2Vzc2lvblBheWxvYWQgfCBudWxsPiB7XG4gIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xuICBjb25zdCB0b2tlbiA9IGNvb2tpZVN0b3JlLmdldChDT09LSUVfTkFNRSk/LnZhbHVlO1xuXG4gIGlmICghdG9rZW4pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhd2FpdCBqd3RWZXJpZnkodG9rZW4sIFNFQ1JFVCk7XG4gICAgcmV0dXJuIHBheWxvYWQgYXMgdW5rbm93biBhcyBTZXNzaW9uUGF5bG9hZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFyU2Vzc2lvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29va2llU3RvcmUgPSBhd2FpdCBjb29raWVzKCk7XG4gIGNvb2tpZVN0b3JlLmRlbGV0ZShDT09LSUVfTkFNRSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1aXJlU3RvcmVTZXNzaW9uKCk6IFByb21pc2U8U2Vzc2lvblBheWxvYWQ+IHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKTtcbiAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udHlwZSAhPT0gJ3N0b3JlJykge1xuICAgIHRocm93IG5ldyBFcnJvcignU3RvcmUgYXV0aGVudGljYXRpb24gcmVxdWlyZWQnKTtcbiAgfVxuICByZXR1cm4gc2Vzc2lvbjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBZG1pblNlc3Npb24oKTogUHJvbWlzZTxTZXNzaW9uUGF5bG9hZD4ge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2Vzc2lvbigpO1xuICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi50eXBlICE9PSAnYWRtaW4nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBZG1pbiBhdXRoZW50aWNhdGlvbiByZXF1aXJlZCcpO1xuICB9XG4gIHJldHVybiBzZXNzaW9uO1xufVxuIl0sIm5hbWVzIjpbIlNpZ25KV1QiLCJqd3RWZXJpZnkiLCJjb29raWVzIiwiU0VDUkVUIiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJwcm9jZXNzIiwiZW52IiwiU0VTU0lPTl9TRUNSRVQiLCJDT09LSUVfTkFNRSIsIkVYUElSQVRJT05fVElNRSIsImNyZWF0ZVNlc3Npb24iLCJwYXlsb2FkIiwidG9rZW4iLCJzZXRQcm90ZWN0ZWRIZWFkZXIiLCJhbGciLCJzZXRJc3N1ZWRBdCIsInNldEV4cGlyYXRpb25UaW1lIiwic2lnbiIsInNldFNlc3Npb25Db29raWUiLCJjb29raWVTdG9yZSIsInNldCIsImh0dHBPbmx5Iiwic2VjdXJlIiwiTk9ERV9FTlYiLCJzYW1lU2l0ZSIsInBhdGgiLCJtYXhBZ2UiLCJnZXRTZXNzaW9uIiwiZ2V0IiwidmFsdWUiLCJjbGVhclNlc3Npb24iLCJkZWxldGUiLCJyZXF1aXJlU3RvcmVTZXNzaW9uIiwic2Vzc2lvbiIsInR5cGUiLCJFcnJvciIsInJlcXVpcmVBZG1pblNlc3Npb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth/session.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fme%2Froute&page=%2Fapi%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fme%2Froute.ts&appDir=%2Fhome%2Fproject%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fproject&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();