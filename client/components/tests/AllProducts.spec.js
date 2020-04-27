/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import {mount} from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import * as rrd from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
const {JSDOM} = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const {window} = jsdom

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}

const {MemoryRouter} = rrd

import mockAxios from '../../../tests/mock-axios'

const app = require('../../../server')

// import AllProducts, {
//     AllProducts as UnconnectedAllProducts
//   } from "../AllProducts";
//   import Routes from "../../routes";

//   describe("Products", () => {
//     const products = [
//         {
//           id: 1,
//           name: "trash test",
//           description: "testing this art",
//           price: 1.00
//         },
//         {
//           id: 2,
//           name: "trash test 2",
//           description: "testing this art",
//           price: 2.00
//         }
//       ];
//       beforeEach(() => {
//         // mockAxios ensures that when our client-side code requests data from the
//         // server, the request is always successful (even if we haven't implemented)
//         // our server yet.
//         mockAxios.onGet("/api/products").replyOnce(200, products);
//       });
//       describe("<AllProducts /> component", () => {
//         const getProductsSpy = sinon.spy();
//         afterEach(() => {
//           getProductsSpy.resetHistory();
//         });

//         // This test is interested in the unconnected AllProducts component. It is
//         // exported as a named export in app/components/AllProducts.js
//         it("renders the Products passed in as props", () => {
//           const wrapper = mount(
//             <Router>
//               <UnconnectedAllProducts
//                 products={products}
//                 getProducts={getProductsSpy}
//               />
//             </Router>
//           );
//           expect(wrapper.text()).to.include("trash test");
//           expect(wrapper.text()).to.include("trash test 2");
// The test is expecting an image for each campus, with src set to the
// campus's imageUrl
// const images = wrapper.find("img").map(node => node.get(0).props.src);
// expect(images).to.include.members([
//   "/images/mars.png",
//   "/images/jupiter.jpeg"
// ]);
//         })
//     });
// });
