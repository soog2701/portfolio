webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./redux/saga.js":
/*!***********************!*\
  !*** ./redux/saga.js ***!
  \***********************/
/*! exports provided: authorize, loginFlow, registerFlow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authorize", function() { return authorize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginFlow", function() { return loginFlow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerFlow", function() { return registerFlow; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _module_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module/login */ "./redux/module/login.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(authorize),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(loginFlow),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(registerFlow),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(rootSaga);

/* global fetch */
 // import {take, call, put, fork, race} from 'redux-saga/effects'


 // import { actionTypes, failureLogin, successLogin, failureLogout, successLogout } from './module/login'


var auth = {
  login: function login(username, password) {
    // if (auth.loggedIn()) return Promise.resolve(true)
    // // Post a fake request
    // return request.post('/login', {username, password})
    //   .then(response => {
    //     // Save token to local storage
    //     localStorage.token = response.token
    //     return Promise.resolve(true)
    //   })
    console.log({
      username: username,
      password: password
    });
  },
  register: function register(username, password) {
    // Post a fake request
    // return request.post('/register', {username, password})
    //   // Log user in after registering
    //   .then(() => auth.login(username, password))
    console.log('register ===');
    auth.login(username, password);
  }
};
es6_promise__WEBPACK_IMPORTED_MODULE_2___default.a.polyfill(); // function * loginSaga() {
//   const action = yield take("LOGIN_REQUEST");
//   const { name, password } = action.payload;
//   try {
//     yield call(api.login, name, password);
//   } catch (err) {
//     yield put(failureLogin(err));
//     return;
//   }
//   yield put(successLogin());
// }

function authorize(_ref) {
  var username, password, isRegistering, salt, hash, response;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function authorize$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = _ref.username, password = _ref.password, isRegistering = _ref.isRegistering;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _module_login__WEBPACK_IMPORTED_MODULE_4__["SENDING_REQUEST"],
            sending: true
          });

        case 3:
          _context.prev = 3;
          // const salt = genSalt(username)
          // const hash = hashSync(password, salt)
          salt = '1username';
          hash = '2password';

          if (!isRegistering) {
            _context.next = 12;
            break;
          }

          _context.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(auth.register, username, hash);

        case 9:
          response = _context.sent;
          _context.next = 15;
          break;

        case 12:
          _context.next = 14;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(auth.login, username, hash);

        case 14:
          response = _context.sent;

        case 15:
          return _context.abrupt("return", response);

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](3);
          console.log('hi');
          _context.next = 23;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _module_login__WEBPACK_IMPORTED_MODULE_4__["REQUEST_ERROR"],
            error: _context.t0.message
          });

        case 23:
          return _context.abrupt("return", false);

        case 24:
          _context.prev = 24;
          _context.next = 27;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _module_login__WEBPACK_IMPORTED_MODULE_4__["SENDING_REQUEST"],
            sending: false
          });

        case 27:
          return _context.finish(24);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[3, 18, 24, 28]]);
}
function loginFlow() {
  var request, _request$data, username, password, winner;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function loginFlow$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (false) {}

          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["take"])(_module_login__WEBPACK_IMPORTED_MODULE_4__["LOGIN_REQUEST"]);

        case 3:
          request = _context2.sent;
          _request$data = request.data, username = _request$data.username, password = _request$data.password;
          _context2.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["race"])({
            auth: Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(authorize, {
              username: username,
              password: password,
              isRegistering: false
            }),
            logout: Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["take"])(_module_login__WEBPACK_IMPORTED_MODULE_4__["LOGOUT"])
          });

        case 7:
          winner = _context2.sent;

          if (!winner.auth) {
            _context2.next = 14;
            break;
          }

          _context2.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _module_login__WEBPACK_IMPORTED_MODULE_4__["SET_AUTH"],
            newAuthState: true
          });

        case 11:
          _context2.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _module_login__WEBPACK_IMPORTED_MODULE_4__["CHANGE_FORM"],
            newFormState: {
              username: '',
              password: ''
            }
          });

        case 13:
          // Clear form
          forwardTo('/dashboard'); // Go to dashboard page

        case 14:
          _context2.next = 0;
          break;

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
function registerFlow() {
  var request, _request$data2, username, password, wasSuccessful;

  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function registerFlow$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (false) {}

          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["take"])(_module_login__WEBPACK_IMPORTED_MODULE_4__["REGISTER_REQUEST"]);

        case 3:
          request = _context3.sent;
          _request$data2 = request.data, username = _request$data2.username, password = _request$data2.password;
          _context3.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(authorize, {
            username: username,
            password: password,
            isRegistering: true
          });

        case 7:
          wasSuccessful = _context3.sent;

          if (!wasSuccessful) {
            _context3.next = 14;
            break;
          }

          _context3.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _module_login__WEBPACK_IMPORTED_MODULE_4__["SET_AUTH"],
            newAuthState: true
          });

        case 11:
          _context3.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _module_login__WEBPACK_IMPORTED_MODULE_4__["CHANGE_FORM"],
            newFormState: {
              username: '',
              password: ''
            }
          });

        case 13:
          // Clear form
          forwardTo('/dashboard'); // Go to dashboard page

        case 14:
          _context3.next = 0;
          break;

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

function rootSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function rootSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["fork"])(loginFlow);

        case 2:
          _context4.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["fork"])(registerFlow);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
} // export default rootSaga


/* harmony default export */ __webpack_exports__["default"] = (rootSaga);

/***/ })

})
//# sourceMappingURL=_app.js.684e332807e7e0fbd15b.hot-update.js.map