/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const express_1 = __webpack_require__("express");
const axios_1 = __webpack_require__("axios");
const db_1 = __webpack_require__("./apps/api/src/db/db.ts");
const jwt = __webpack_require__("jsonwebtoken");
const router = express_1.Router();
router.post('/login', (req, res) => {
    const code = req.body.code;
    console.log('CLIENT ID : ', process.env.NX_GITHUB_CLIENT_ID);
    console.log('CLIENT SECRET : ', process.env.NX_GITHUB_SECRET);
    axios_1.default.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.NX_GITHUB_CLIENT_ID,
        client_secret: process.env.NX_GITHUB_SECRET,
        code,
    }, { headers: { 'Accept': 'application/json' } }).then((response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = yield axios_1.default.post('https://api.github.com/user', null, {
            headers: {
                'Authorization': `Bearer ${response.data.access_token}`
            }
        });
        let dbUser = yield db_1.default('users').where({ githubId: user.data.id }).first();
        if (!dbUser) {
            const [id] = yield db_1.default('users').insert({
                githubId: user.data.id,
                username: user.data.login,
                name: user.data.name,
                avatar: user.data.avatar_url,
            });
            dbUser = yield db_1.default('users').where({ githubId: user.data.id }).first();
        }
        const appToken = jwt.sign({ githubId: dbUser.githubId }, 'SECRET');
        res.send({
            user: user.data,
            appToken,
            token: response.data.access_token
        });
    })).catch((error) => {
        console.log(error);
        res.send(error.message);
    });
});
router.get('/me', (req, res) => {
    const token = req.body.token;
    // console.log(response.data)
    // let user = await db('users').where({ githubId: response.data.id })
    // if(!user) user = await db('users').insert({
    //     githubId: response.data.id,
    //     username: response.data.login,
    //     name: response.data.name,
    //     avatar: response.data.avatar_url,
    // })
});
router.post('/postest', (req, res) => {
    return res.send('tested');
});
router.get('/test', (req, res) => res.send('test'));
exports["default"] = router;


/***/ }),

/***/ "./apps/api/src/app/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const express_1 = __webpack_require__("express");
const db_1 = __webpack_require__("./apps/api/src/db/db.ts");
const user_model_1 = __webpack_require__("./apps/api/src/db/models/user.model.ts");
const jwt = __webpack_require__("jsonwebtoken");
const axios_1 = __webpack_require__("axios");
const router = express_1.Router();
router.get('/users', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.send(yield user_model_1.default.query());
}));
router.post('/projects', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const [id] = yield db_1.default('projects').insert({
        name: req.body.project.name,
        template: req.body.template,
        githubId: req.body.project.owner.id,
        url: req.body.project.clone_url,
    }, "*");
    const project = yield db_1.default('projects').where({ id }).first();
    try {
        axios_1.default.post('http://localhost/worker/start-container.sh', {
            url: project.url,
            id: project.id,
            template: project.template
        }).then(() => {
            console.log("PROJECT STARTED", project.id, project.template);
        }).catch(() => { console.log('no worker'); });
        return res.send(project);
    }
    catch (_a) {
        return res.status(404).send('Worker offline');
    }
}));
router.get('/projects', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    const payload = jwt.verify(token, 'SECRET');
    console.log(payload);
    const project = yield db_1.default('projects').where({ githubId: payload.githubId });
    return res.send(project);
}));
router.get('/projects/:id', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const project = yield db_1.default('projects').where({ id: req.params.id }).first();
    if (!project)
        return res.status(404);
    try {
        const status = yield axios_1.default.post('http://localhost/worker/project-status', { id: req.params.id });
        res.send(status);
    }
    catch (_b) {
        res.status(404).send('Worker offline');
    }
}));
exports["default"] = router;


/***/ }),

/***/ "./apps/api/src/db/db.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const objection_1 = __webpack_require__("objection");
const knex_1 = __webpack_require__("knex");
console.log("CONNECTING TO DB");
console.log("HOST", process.env.NX_DB_HOST);
console.log("USER", process.env.NX_DB_USER);
console.log("PASSWORD", process.env.NX_DB_PASSWORD);
console.log("NAME", process.env.NX_DB_NAME);
console.log("PORT", process.env.NX_DB_PORT);
const db = knex_1.default({
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
        host: process.env.NX_DB_HOST,
        user: process.env.NX_DB_USER,
        password: process.env.NX_DB_PASSWORD,
        database: process.env.NX_DB_NAME,
        port: +process.env.NX_DB_PORT
    }
});
objection_1.Model.knex(db);
exports["default"] = db;


/***/ }),

/***/ "./apps/api/src/db/models/user.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const objection_1 = __webpack_require__("objection");
class User extends objection_1.Model {
    static get tableName() {
        return 'users';
    }
}
exports["default"] = User;


/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "dotenv":
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "knex":
/***/ ((module) => {

module.exports = require("knex");

/***/ }),

/***/ "objection":
/***/ ((module) => {

module.exports = require("objection");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const express = __webpack_require__("express");
const path = __webpack_require__("path");
const auth_controller_1 = __webpack_require__("./apps/api/src/app/auth.controller.ts");
const user_controller_1 = __webpack_require__("./apps/api/src/app/user.controller.ts");
__webpack_require__("dotenv").config();
__webpack_require__("./apps/api/src/db/db.ts");
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use('/api', auth_controller_1.default);
app.use('/api', user_controller_1.default);
app.use('/', express.static(path.join(__dirname, '../user-interface/')));
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../user-interface/index.html'));
});
const port = 3333;
const server = app.listen(port, () => {
    console.log(`APP : http://localhost:${port}`);
});
server.on('error', console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map