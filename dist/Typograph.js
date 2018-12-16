(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Typograph = factory());
}(this, (function () { 'use strict';

  function strEnum(o) {
      return o.reduce((res, key) => {
          res[key] = key;
          return res;
      }, Object.create(null));
  }
  const KeyboardsNames = strEnum([
      "azerty",
      "qwerty",
  ]);
  const keyboards = {
      azerty: ["azertyuiop", "qsdfghjklm", "wxcvbn"],
      qwerty: ["qwertyuiop", "asdfghjklz", "xcvbnm"],
  };
  //# sourceMappingURL=Keyboards.js.map

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  class Sequence {
      constructor(text, target, textNode = Text.arguments, keyboard, speed, mistype, mistypeRate) {
          this.target = target;
          this.textNode = textNode;
          this.keyboard = keyboard;
          this.speed = speed;
          this.mistype = mistype;
          this.mistypeRate = mistypeRate;
          this.mistypeElement = document.createElement("mistype");
          this.text = Array.prototype.slice.call(text);
      }
      write() {
          return __awaiter(this, void 0, void 0, function* () {
              console.log(this.textNode);
              const mistypes = [];
              while (this.text.length || mistypes.length) {
                  const rand = Math.random();
                  const speed = this.speed;
                  const mistyped = this.mistype && this.textNode.length && rand < this.mistypeRate;
                  let element = this.target;
                  if (this.text.length && (mistyped || !mistypes.length)) {
                      let letter = this.text.shift();
                      if (mistyped) {
                          const charCode = letter.charCodeAt(0);
                          // tag = this.mistypeTag;
                          if (!this.target.querySelector("mistype")) {
                              this.target.appendChild(this.mistypeElement);
                          }
                          mistypes.unshift({
                              index: this.textNode.length,
                              letter,
                          });
                          if (charCode > 96 && charCode < 123) {
                              const keyboardLine = this.keyboard.filter((e) => e.indexOf(letter) >= 0).shift();
                              const letterPosition = keyboardLine.indexOf(letter.toLowerCase());
                              /* wrongChar = sibbling letter (ex: if t then r or y)
                              IF first or last letter of the line
                              THEN wrongChar = first letter +1 or last letter -1 (ex for qwerty: if q then w or if n then b) */
                              letter = keyboardLine[letterPosition +
                                  (!letterPosition ? 1 :
                                      letterPosition + 1 === keyboardLine.length ? -1 : (Math.round(Math.random()) ? 1 : -1))];
                          }
                      }
                      this.textNode.nodeValue += yield this.typeLetter(speed, letter);
                  }
                  else {
                      while (mistypes.length) {
                          this.text.unshift(yield this.removeLetter(speed, mistypes.shift()));
                      }
                  }
              }
              return mistypes;
          });
      }
      typeLetter(t, letter) {
          return new Promise((resolve) => setTimeout(() => resolve(letter), t));
      }
      removeLetter(t, mistype) {
          return new Promise((resolve) => setTimeout(() => {
              this.textNode.nodeValue = this.textNode.nodeValue.slice(0, -1);
              resolve(mistype.letter);
          }, t));
      }
  }
  //# sourceMappingURL=Sequence.js.map

  class Typograph {
      constructor(p) {
          this.sequences = [];
          this.params = Object.assign({}, p, { mistype: !!p.mistype, mistypeRate: p.mistypeRate || 0.3, speed: p.speed || 250 });
      }
      type(callback) {
          this.sequences = this.initSequences();
          this.sequences.forEach((sequence) => sequence.write());
      }
      initSequences() {
          return Array.from(document.querySelectorAll(this.params.selector)).map((el) => {
              const sequence = new Sequence(this.params.text || el.getAttribute("data-typeit") || el.firstChild.nodeValue || "", el, el.insertBefore(document.createTextNode(""), el.firstChild), keyboards[this.params.keyboard || "qwerty"], this.params.speed, this.params.mistype, this.params.mistypeRate);
              console.log(el);
              el.firstChild.nodeValue = "";
              return sequence;
          });
      }
  }

  return Typograph;

})));
//# sourceMappingURL=Typograph.js.map
