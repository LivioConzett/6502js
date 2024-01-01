(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["js6502"] = factory();
	else
		root["js6502"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return StateClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ExternalClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return InternalClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EXTERNAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return INTERNAL; });
class StateClass {
  constructor() {
    /**
     * A register (Accumulator)
     */
    this.A = 0x00;
    /**
     * X register
     */
    this.X = 0x00;
    /**
     * Y register
     */
    this.Y = 0x00;
    this.STATUS_REGISTER = {
      /**
       * Carry flag. Carry produced by add, borrow produced by sub, or value after bitshift operation. 1 = true
       */
      CARRY: false,
      /**
       * Zero flag. was the result of an operation zero. 1 = result zero
       */
      ZERO: false,
      /**
       * IRQ disable bit. Lock out external interupts. 1 = disabled.
       * default is true.
       */
      IRQ_DISABLE: true,
      /**
       * Decimal mode bit. should Arithmetic be in straight binary adder or decimal adder.
       * in decimal mode one byte = 2 BCD numbers.
       * 1 = true
       */
      DECIMAL_MODE: false,
      /**
       * break command flag. was an interrupt triggered by software or hardware. 1 = brk.
       */
      BRK_COMMAND: false,
      /**
       * overflow flag. only arithmetic on signed numbers.
       * add of likes-signed numbers or sub of unlike-signed numbers is > 127 or < 128. 1 = true.
       */
      OVERFLOW: false,
      /**
       * negative flag. indicates if arithmetic of signed numbers is negative or not.
       * also indicates the most segnificant bit in the Accumulator. 1 = negative.
       */
      NEGATIVE: false
    };
    /**
     * position of the the top of the stack.
     * is initialized as random between 0 and 255
     */
    this.STACK_POINTER = Math.floor(Math.random() * 256);
    /**
     * zero page ram array
     */
    this.ZERO_PAGE_RAM = [];
    /**
     * the stack array
     */
    this.STACK = [];
    /**
     * the ram array
     */
    this.RAM = [];
    /**
     * the rom array
     */
    this.ROM = [];
    /**
     * address being read for instruction.
     * initial value = 0xfffc
     */
    //PROGRAM_COUNTER: number = 0xfffc;
    /**
     * program counter with a listener
     */
    this.PROGRAM_COUNTER = {
      internal: 0xfffc,
      listener: function (val) {},
      set value(val) {
        this.internal = val;
        this.listener(val);
      },
      get value() {
        return this.internal;
      },
      registerListener: function (listener) {
        this.listener = listener;
      }
    };
    /**
     * instruction part of LCD
     */
    this.LCDA = {
      internal: 0,
      listener: function (val) {},
      set value(val) {
        this.internal = val;
        this.listener(val);
      },
      get value() {
        return this.internal;
      },
      registerListener: function (listener) {
        this.listener = listener;
      }
    };
    /**
     * data part of lcd
     */
    this.LCDB = {
      internal: 0,
      listener: function (val) {},
      set value(val) {
        this.internal = val;
        this.listener(val);
      },
      get value() {
        return this.internal;
      },
      registerListener: function (listener) {
        this.listener = listener;
      }
    };
  }
}
class ExternalClass {
  constructor() {
    /**
     * external interrupt
     */
    this.IRQ = false;
    /**
     * external non maskable interrupt
     */
    this.NMI = false;
    /**
     * stop the program
     */
    this.STOP = false;
    /**
     * reset signal
     */
    this.RESET = false;
  }
}
class InternalClass {
  constructor() {
    /**
     * has the program counter already been increased
     */
    this.PC_INCREASED = false;
  }
}
const STATE = new StateClass();
const EXTERNAL = new ExternalClass();
const INTERNAL = new InternalClass();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return initZeroPageRam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return initStack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return initRam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return initRom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return initMemory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return bcdToDec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return decToBcd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return overFlow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return wrapAround; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return wrapAroundBCD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return decToBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return binaryToDec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return binaryToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return hexToDec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return decToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return octToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return octToDec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return asciiToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return decToAscii; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addressToMemory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return statusToByte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return byteToStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return printMemory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return loadRom; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


/**
 * initializes the Stack arry to the configured length
 */
function initZeroPageRam() {
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].ZERO_PAGE_RAM = [];
    // add the amount of 0's needed
    for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_0__[/* ZERO_PAGE_SIZE */ "o"]; i++) {
        _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].ZERO_PAGE_RAM.push(0);
    }
}
/**
 * initializes the Stack arry to the configured length
 */
function initStack() {
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK = [];
    // add the amount of 0's needed
    for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_0__[/* STACK_SIZE */ "m"]; i++) {
        _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK.push(0);
    }
}
/**
 * initializes the ram array to the configured length
 */
function initRam() {
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].RAM = [];
    // add the amount of 0's needed
    for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_0__[/* RAM_SIZE */ "h"]; i++) {
        _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].RAM.push(0);
    }
}
/**
 * initialize the rom array to the configured length
 */
function initRom() {
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].ROM = [];
    // add the amount of 0's needed
    for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_0__[/* ROM_SIZE */ "j"]; i++) {
        _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].ROM.push(0);
    }
}
/**
 * initialize all the memory places
 */
function initMemory() {
    initZeroPageRam();
    initStack();
    initRom();
    initRam();
}
/**
 * Turns bcd encoded numbers into a dec number
 * @param bcd encoded number to turn into a dec number
 */
function bcdToDec(bcd) {
    // turn the bcd number to binary
    const binary = decToBinary(bcd);
    // get the high number
    let tens = binaryToDec(binary.substring(0, 4));
    // get the low number
    let ones = binaryToDec(binary.substring(4, 8));
    // make sure it doesn't get too big
    if (tens > 9) {
        tens = 9;
    }
    if (ones > 9) {
        ones = 9;
    }
    return tens * 10 + ones;
}
/**
 * Turns dec numbers into bcd
 * @param dec bcd encoded number
 */
function decToBcd(dec) {
    // turn the number into a string
    const string = dec.toString();
    // get the last 2 digits of the number
    const low = parseInt(string.substring(string.length - 1));
    const high = parseInt(string.substring(string.length - 2, string.length - 1));
    // conactinate the binary numbers
    const bin = decToBinary(high).substring(4, 8) + decToBinary(low).substring(4, 8);
    return binaryToDec(bin);
}
/**
 * splits the numbers into chnucks of configured bits
 * @param number to overflowed
 * @return an array with the number as Binary in the first slot and the overflow following
 */
function overFlow(number) {
    const binary = decToBinary(number);
    // counter to help count the bits
    let counter = 0;
    let arrayIndex = 0;
    let bitArray = new Array();
    // push first empty array into bitArray
    bitArray.push([]);
    // devide the bin number into the bit lengths
    // go through it backwards since binary is right to left
    for (let i = binary.length - 1; i > -1; i--) {
        // if the counter has reach the bit number
        // add a new array and set the index to that array
        if (counter >= _config__WEBPACK_IMPORTED_MODULE_0__[/* BIT_SIZE */ "b"]) {
            bitArray.push([]);
            arrayIndex++;
            counter = 0;
        }
        // add the new bit to the beginning of the string
        // so the binary number is still in the right order
        bitArray[arrayIndex] = binary[i] + bitArray[arrayIndex];
        counter++;
    }
    // make sure bitArray is always at least 2 long
    // this is used for the overflow lfag check
    if (bitArray.length < 2) {
        bitArray.push('0');
    }
    return bitArray;
}
/**
 * wraps around a number according to the BIT size
 * @param number what number should be wrapped around
 * @param bytes is it a 1 or a 2 byte number? default 1.
 * @return the wrapped around number
 */
function wrapAround(number, bytes = 1) {
    if (bytes === 1) {
        return binaryToDec(overFlow(number)[0]);
    }
    if (bytes === 2) {
        return binaryToDec(overFlow(number)[1] + overFlow(number)[0]);
    }
}
/**
 * Wraps numbers around 99
 * @param number number to wrap around
 */
function wrapAroundBCD(number) {
    if (number > 99) {
        // 100, because it wraps around to 0
        return number - 100;
    }
    return number;
}
/**
 * turns a decimal number into a binary string
 * @param dec decimal number to be turned into binary
 * @return a binary representation of the dec as a string
 */
function decToBinary(dec) {
    let number = (dec >>> 0).toString(2);
    // add the zeros to the front
    for (let i = number.length; i < _config__WEBPACK_IMPORTED_MODULE_0__[/* BIT_SIZE */ "b"]; i++) {
        number = `0${number}`;
    }
    return number;
}
/**
 * turns binary strings into a number
 * @param bin string of 1s and 0s
 * @return the number
 */
function binaryToDec(bin) {
    return parseInt(bin, 2);
}
/**
 * creates a hex from a binary
 * @param bin bin as string
 */
function binaryToHex(bin) {
    return decToHex(binaryToDec(bin));
}
/**
 * turns a hex string into a number
 * if there is a $ sign it removes it
 * @param hex hex string
 * @return returns a number
 */
function hexToDec(hex) {
    // remove the $
    const num = hex.replace('$', '');
    let dec = parseInt(num, 16);
    if (isNaN(dec)) {
        dec = 0;
    }
    return dec;
}
/**
 * turns a number into a hex string
 * @param dec number to turn into hex
 * @param amount how many chars it should have. default 2
 * @return returns a hex string of the dec
 */
function decToHex(dec, amount = 2) {
    let hex = dec.toString(16);
    // don't leave it at three
    if (hex.length > 2) {
        amount = 4;
    }
    for (let i = hex.length; i < amount; i++) {
        hex = `0${hex}`;
    }
    return hex;
}
/**
 * convert octal number to hex number
 * @param oct octal number to convert
 */
function octToHex(oct) {
    // convert to dec
    let dec = parseInt(oct, 8);
    // check if it is a number
    if (isNaN(dec)) {
        dec = 0;
    }
    return decToHex(dec);
}
/**
 * convert octal to decimal
 * @param oct octal to convert
 */
function octToDec(oct) {
    // convert to dec
    let dec = parseInt(oct, 8);
    // check if it is a number
    if (isNaN(dec)) {
        dec = 0;
    }
    return dec;
}
/**
 * converts ascii to hex
 * @param ascii string to convert
 */
function asciiToHex(ascii) {
    let hex = '';
    // go through the string
    for (let i = 0; i < ascii.length; i++) {
        let char = ascii[i].charCodeAt(0);
        hex = hex + decToHex(char);
    }
    return hex;
}
/**
 * Turns a dec number to an ascii char
 * @param dec number to turn into an ascii char
 */
function decToAscii(dec) {
    return String.fromCharCode(dec);
}
/**
 * gives back the name of the memorry array and the position within that
 * array the address is pointing towards
 * @param addr address as an int
 */
function addressToMemory(addr) {
    // which place is the address pointing toward
    let memoryMedium = _config__WEBPACK_IMPORTED_MODULE_0__[/* MemoryPlace */ "g"].NOT_DEFINED;
    let memoryPos = 0;
    // go through the memory map and find out where the address lies
    for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_0__[/* MEMORY_MAP */ "f"].length; i++) {
        if (addr >= _config__WEBPACK_IMPORTED_MODULE_0__[/* MEMORY_MAP */ "f"][i][1] && addr < _config__WEBPACK_IMPORTED_MODULE_0__[/* MEMORY_MAP */ "f"][i][2]) {
            memoryMedium = _config__WEBPACK_IMPORTED_MODULE_0__[/* MEMORY_MAP */ "f"][i][0];
            memoryPos = addr - _config__WEBPACK_IMPORTED_MODULE_0__[/* MEMORY_MAP */ "f"][i][1];
            break;
        }
    }
    return {
        memory: memoryMedium,
        pos: memoryPos
    };
}
/**
 * Turns the Status register into a number
 */
function statusToByte() {
    const string = `${+_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE}` + `${+_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.OVERFLOW}` + `0` + `${+_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.BRK_COMMAND}` + `${+_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.DECIMAL_MODE}` + `${+_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.IRQ_DISABLE}` + `${+_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.ZERO}` + `${+_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.CARRY}`;
    return binaryToDec(string);
}
/**
 * puts a byte into the Status Register
 * @param byte number representing the Status register
 */
function byteToStatus(byte) {
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = (byte & 0b10000000) === 0b10000000;
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.OVERFLOW = (byte & 0b01000000) === 0b01000000;
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.BRK_COMMAND = (byte & 0b00010000) === 0b00010000;
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.DECIMAL_MODE = (byte & 0b00001000) === 0b00001000;
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.IRQ_DISABLE = (byte & 0b00000100) === 0b00000100;
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.ZERO = (byte & 0b00000010) === 0b00000010;
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.CARRY = (byte & 0b00000001) === 0b00000001;
}
/**
 * Prints out the memory in a hex dum sort of way
 * @param memory array of numbers to show
 * @param start place to start the memory address off. default 0
 * @param ascii should the ascii aquivelent should be shown or not. default false
 */
function printMemory(memory, start = 0, ascii = false) {
    // string to return at the end
    let returnString = '         01   23   45   67   89   ab   cd   ef\n';
    // the line to show
    let line = '';
    let asciiLine = '';
    // the line before
    let lastLine = ' ';
    // counter for the lines
    let counter = 0;
    let dotsAlreadyShown = false;
    let i = 0;
    let address = '';
    // go through the memory
    for (i = 0; i < memory.length; i++) {
        if (counter === 0) {
            address = `0x${decToHex(i + start, 4)}  `;
        }
        // handle an undifined number
        if (memory[i] == undefined) {
            line += `??`;
        } else {
            line += `${decToHex(memory[i])}`;
        }
        if (i % 2 != 0) {
            line += ' ';
        }
        // if the ascii is requested
        if (ascii) {
            if (memory[i] < 0x20 || memory[i] > 0x7e) {
                asciiLine += `.`;
            } else {
                asciiLine += `${decToAscii(memory[i])}`;
            }
        }
        counter++;
        if (counter >= 16 && i < memory.length - 1) {
            if (line != lastLine) {
                // add the address to the beginning of the line
                returnString += `${address}${line}`;
                if (ascii) {
                    returnString += ` |${asciiLine}|`;
                }
                returnString += '\n';
                dotsAlreadyShown = false;
            } else if (!dotsAlreadyShown) {
                returnString += '  .\n';
                dotsAlreadyShown = true;
            }
            counter = 0;
            lastLine = line;
            line = '';
            asciiLine = '';
        }
    }
    // add the last line
    returnString += `${address}${line}`;
    if (ascii) {
        returnString += ` |${asciiLine}|`;
    }
    returnString += '\n';
    return returnString;
}
/**
 * Loads an array of numbers into the rom
 * @param array array of numbers to load into the rom
 */
function loadRom(array) {
    // initialize the rom
    initRom();
    // get the smaller of the tows length
    let length = _config__WEBPACK_IMPORTED_MODULE_0__[/* ROM_SIZE */ "j"];
    if (array.length < _config__WEBPACK_IMPORTED_MODULE_0__[/* ROM_SIZE */ "j"]) {
        length = array.length;
    }
    for (let i = 0; i < length; i++) {
        _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].ROM[i] = array[i];
    }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return pushToStack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return pullFromStack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return readFromAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return writeToAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return resetCpu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return stopCpu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return startCpu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return handleIrq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return handleNmi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return runProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return programStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return instructionDecode; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _instructionset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);




// the timeout for the program timer
let programRunTimout;
let stopRequest = false;
/**
 * decrement the stack pointer by one with wraparound
 */
function decrementStackPointer() {
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER--;
    // handle the overflow
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER);
}
/**
 * increments the stack pointer by one with wrap around
 */
function incrementStackPointer() {
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER++;
    // handle the overflow
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER);
}
/**
 * pushes a number onto the stack,
 * then decrements the STACK_POINTER
 * @param num number to push onto stack
 */
function pushToStack(num) {
    // save the value in the stack array
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK[_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER] = num;
    // then decrement the stack pointer
    decrementStackPointer();
}
/**
 * increments the STACK_POINTER,
 * then pulls from the top of the stack
 * @return the value stored in the top of the stack
 */
function pullFromStack() {
    // increment the stack pointer
    incrementStackPointer();
    // return the value at this place in the stack array
    return _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK[_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER];
}
/**
 * returns the byte at the address
 * @param address address as number
 * @return value of the byte as a number
 */
function readFromAddress(address) {
    const memory = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* addressToMemory */ "a"])(address);
    switch (memory.memory) {
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].ZERO_PAGE_RAM:
            return _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].ZERO_PAGE_RAM[memory.pos];
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].STACK:
            return _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK[memory.pos];
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].ROM:
            return _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].ROM[memory.pos];
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].RAM:
            return _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].RAM[memory.pos];
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].LCDA:
            return _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].LCDA.value;
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].LCDB:
            return _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].LCDB.value;
        default:
            return 0x00;
    }
}
/**
 * writes a byte to a memory location
 * @param address address as number
 * @param value as number
 */
function writeToAddress(address, value) {
    const memory = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* addressToMemory */ "a"])(address);
    switch (memory.memory) {
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].ZERO_PAGE_RAM:
            _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].ZERO_PAGE_RAM[memory.pos] = value;
            break;
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].STACK:
            _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK[memory.pos] = value;
            break;
        // can't write to ROM
        // case MemoryPlace.ROM:
        //     STATE.ROM[memory.pos] = value;
        //     break;
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].RAM:
            _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].RAM[memory.pos] = value;
            break;
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].LCDA:
            _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].LCDA.value = value;
            break;
        case _config__WEBPACK_IMPORTED_MODULE_3__[/* MemoryPlace */ "g"].LCDB:
            _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].LCDB.value = value;
            break;
        default:
    }
}
/**
 * resets the cpu.
 * set the PROGRAM_COUNTER to the address stored in 0xfffc and 0xfffd.
 * randomize the STACK_POINTER
 */
function resetCpu() {
    // get the statring memory
    const lowByte = readFromAddress(0xfffc);
    const highByte = readFromAddress(0xfffd);
    // set the program counter to that
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].PROGRAM_COUNTER.value = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(highByte) + Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(lowByte));
    // randomize the statck pointer
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STACK_POINTER = Math.floor(Math.random() * 0xff);
}
/**
 * stops the cpu from running
 */
function stopCpu() {
    // clear the program runner timeout
    clearTimeout(programRunTimout);
    stopRequest = true;
}
/**
 * starts the cpu running
 */
function startCpu() {
    stopRequest = false;
    // run the program
    runProgram();
}
/**
 * handels an external interrupt
 */
function handleIrq() {
    // get the low and high byte of the momentary Program counter
    const posHex = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].PROGRAM_COUNTER.value, 4);
    const lowByte = posHex.substring(2, 4);
    const highByte = posHex.substring(0, 2);
    // push the highbyte to the stack
    pushToStack(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(highByte));
    // push the lowbyte to the stack
    pushToStack(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(lowByte));
    // push the status register to the stack
    pushToStack(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* statusToByte */ "v"])());
    // get the low byte
    const low = readFromAddress(0xfffe);
    // get high byte 
    const high = readFromAddress(0xffff);
    // set the program counter to the new address
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].PROGRAM_COUNTER.value = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(high) + Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(low)) - 1;
    // set the irq disable to true;
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.IRQ_DISABLE = true;
}
/**
 * handels an external non maskable interrupt
 */
function handleNmi() {
    // get the low and high byte of the momentary Program counter
    const posHex = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].PROGRAM_COUNTER.value, 4);
    const lowByte = posHex.substring(2, 4);
    const highByte = posHex.substring(0, 2);
    // push the highbyte to the stack
    pushToStack(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(highByte));
    // push the lowbyte to the stack
    pushToStack(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(lowByte));
    // push the status register to the stack
    pushToStack(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* statusToByte */ "v"])());
    // get the low byte
    const low = readFromAddress(0xfffa);
    // get high byte 
    const high = readFromAddress(0xfffb);
    // set the program counter to the new address
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].PROGRAM_COUNTER.value = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(high) + Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(low)) - 1;
    // set the irq disable to true;
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.IRQ_DISABLE = true;
}
/**
 * function that runs through the program until the STOP is set
 */
function runProgram() {
    // handle the non maskable interrupt
    if (_memory__WEBPACK_IMPORTED_MODULE_1__[/* EXTERNAL */ "a"].NMI) {
        // reset the intterupt
        _memory__WEBPACK_IMPORTED_MODULE_1__[/* EXTERNAL */ "a"].NMI = false;
        handleNmi();
    }
    // handle the external interrupts
    if (_memory__WEBPACK_IMPORTED_MODULE_1__[/* EXTERNAL */ "a"].IRQ && !_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].STATUS_REGISTER.IRQ_DISABLE) {
        // reset the external interrupt
        _memory__WEBPACK_IMPORTED_MODULE_1__[/* EXTERNAL */ "a"].IRQ = false;
        handleIrq();
    }
    // step through the program
    programStep();
    if (!stopRequest) {
        // call the program again
        programRunTimout = setTimeout(() => {
            runProgram();
        }, _config__WEBPACK_IMPORTED_MODULE_3__[/* SETTINGS */ "l"].RUN_TIMEOUT);
    }
}
/**
 * do the instruction and then step to the next one.
 * Is not a tick stepper, but an instruction stepper.
 */
function programStep() {
    // get the value from the memory where the program counter is pointing towards
    const value = readFromAddress(_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].PROGRAM_COUNTER.value);
    // run that op code
    instructionDecode(value);
    // increment the program counter if the function hasn't already
    if (!_memory__WEBPACK_IMPORTED_MODULE_1__[/* INTERNAL */ "c"].PC_INCREASED) {
        _memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].PROGRAM_COUNTER.value = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_1__[/* STATE */ "e"].PROGRAM_COUNTER.value + 1, 2);
    }
    _memory__WEBPACK_IMPORTED_MODULE_1__[/* INTERNAL */ "c"].PC_INCREASED = false;
}
/**
 * decodes the instruction and calls the coresponding function
 * with the addressing mode
 * @param instruction op code of function as a number
 */
function instructionDecode(instruction) {
    // go through the op codes and find out which one it is
    loop1: for (let i = 0; i < _instructionset__WEBPACK_IMPORTED_MODULE_2__[/* OP_CODE */ "J"].length; i++) {
        // create a list of all the keys in the op code element
        // and see if the instruction is in it
        // for some reason includes decided to stop working
        // if(Object.keys(OP_CODE[i]).includes(instruction.toString())){
        //     // call the function
        //     // the address that you get from the addressing mode
        //     OP_CODE[i].function.call(this, OP_CODE[i][instruction].call(null));
        //     break;
        // }
        let keyArray = Object.keys(_instructionset__WEBPACK_IMPORTED_MODULE_2__[/* OP_CODE */ "J"][i]);
        for (let y = 0; y < keyArray.length; y++) {
            if (keyArray[y] === instruction.toString()) {
                _instructionset__WEBPACK_IMPORTED_MODULE_2__[/* OP_CODE */ "J"][i].function.call(this, _instructionset__WEBPACK_IMPORTED_MODULE_2__[/* OP_CODE */ "J"][i][instruction].call(null));
                break loop1;
            }
        }
    }
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BIT_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADDR_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return ZERO_PAGE_START_ADDR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return ZERO_PAGE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return STACK_START_ADDR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return STACK_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return RAM_START_ADDR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return RAM_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return ROM_START_ADDR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return ROM_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LCDA_ADDR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LCDB_ADDR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return MemoryPlace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return MEMORY_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return COMPILER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return SETTINGS; });
/**
 * how many bits can be saved in a storage address, stack space and register
 */
const BIT_SIZE = 8;
/**
 * address size is twice the bit size
 */
const ADDR_SIZE = BIT_SIZE * 2;
/**
 * start of the zero page ram
 */
const ZERO_PAGE_START_ADDR = 0;
/**
 * size of the zero page ram
 */
const ZERO_PAGE_SIZE = 0x100;
/**
 * stack in the 6502 is from address $0100 - $01FF
 * starting address of the stack
 */
const STACK_START_ADDR = 0x100; // 256
/**
 * amount of addresses in the stack
 */
const STACK_SIZE = 0x100; // 256
/**
 * starting address for the ram.
 * In this case right after the stack
 */
const RAM_START_ADDR = 0x200;
/**
 * amount of ram addresses follwing the RAM_START_ADDR
 */
const RAM_SIZE = 256;
/**
 * starting address for the rom
 */
const ROM_START_ADDR = 0x8000; // 32768
/**
 * amount of rom addresses follwing the ROM_START_ADDR
 */
const ROM_SIZE = 0x8000;
/**
 * place where LCD is
 */
const LCDA_ADDR = 0x6000;
/**
 * size of LCD
 */
const LCDB_ADDR = 0x6001;
/**
 * enum of the memory places
 */
var MemoryPlace;
(function (MemoryPlace) {
  MemoryPlace[MemoryPlace["NOT_DEFINED"] = 0] = "NOT_DEFINED";
  MemoryPlace[MemoryPlace["ZERO_PAGE_RAM"] = 1] = "ZERO_PAGE_RAM";
  MemoryPlace[MemoryPlace["STACK"] = 2] = "STACK";
  MemoryPlace[MemoryPlace["RAM"] = 3] = "RAM";
  MemoryPlace[MemoryPlace["ROM"] = 4] = "ROM";
  MemoryPlace[MemoryPlace["LCDA"] = 5] = "LCDA";
  MemoryPlace[MemoryPlace["LCDB"] = 6] = "LCDB";
})(MemoryPlace || (MemoryPlace = {}));
/**
 * a memory map to make it easier to determine where the address is pointing to
 */
const MEMORY_MAP = [[MemoryPlace.ZERO_PAGE_RAM, ZERO_PAGE_START_ADDR, ZERO_PAGE_START_ADDR + ZERO_PAGE_SIZE], [MemoryPlace.STACK, STACK_START_ADDR, STACK_START_ADDR + STACK_SIZE], [MemoryPlace.RAM, RAM_START_ADDR, RAM_START_ADDR + RAM_SIZE], [MemoryPlace.ROM, ROM_START_ADDR, ROM_START_ADDR + ROM_SIZE], [MemoryPlace.LCDA, LCDA_ADDR, LCDA_ADDR + 1], [MemoryPlace.LCDB, LCDB_ADDR, LCDB_ADDR + 1]];
/**
 * Compiler speciffic configs
 */
const COMPILER = {
  /**
   * number of spaces in front of operations
   */
  INDENT: 2
};
/**
 * settings class
 */
class settings {
  constructor() {
    /**
     * timeout number for the program runner
     */
    this.RUN_TIMEOUT = 1000;
  }
}
const SETTINGS = new settings();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AddressingMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lb", function() { return am_Implied; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jb", function() { return am_Accumulator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pb", function() { return am_Relative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nb", function() { return am_IndirectAbsolute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kb", function() { return am_Immediate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "qb", function() { return am_ZeroPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rb", function() { return am_ZeroPageIndexedX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sb", function() { return am_ZeroPageIndexedY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gb", function() { return am_Absolute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hb", function() { return am_AbsoluteIndexedX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ib", function() { return am_AbsoluteIndexedY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mb", function() { return am_IndexedIndirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ob", function() { return am_IndirectIndexed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return OP_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ASL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return BCC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return BCS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return BEQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return BIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return BNE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return BMI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return BPL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return BRK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return BVS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return BVC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return CLC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return CLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return CLI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return CLV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return CMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return CPX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return CPY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return DEC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return DEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return DEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return EOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return INC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return INX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return INY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return JMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return JSR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return LDA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return LDX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return LDY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return LSR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return NOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return ORA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return PHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return PHP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return PLA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return PLP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return ROL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return ROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return RTI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return RTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return SBC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return SEC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return SED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return SEI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return STA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return STX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return STY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab", function() { return TAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bb", function() { return TAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cb", function() { return TSX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "db", function() { return TXA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eb", function() { return TXS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fb", function() { return TYA; });
/* harmony import */ var _memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _cpu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);




/**
 * Enums for the various addressing modes possible
 */
var AddressingMode;
(function (AddressingMode) {
    AddressingMode["Immediate"] = "Immediate";
    AddressingMode["Absolute"] = "Absolute";
    AddressingMode["Zero_Page"] = "Zero_Page";
    AddressingMode["Implied"] = "Implied";
    AddressingMode["Indirect_Absolute"] = "Indirect_Absolute";
    AddressingMode["Absolute_Indexed_X"] = "Absolute_Indexed_X";
    AddressingMode["Absolute_Indexed_Y"] = "Absolute_Indexed_Y";
    AddressingMode["Zero_Page_Indexed_X"] = "Zero_Page_Indexed_X";
    AddressingMode["Zero_Page_Indexed_Y"] = "Zero_Page_Indexed_Y";
    AddressingMode["Indexed_Indirect"] = "Indexed_Indirect";
    AddressingMode["Indirect_Indexed"] = "Indirect_Indexed";
    AddressingMode["Relative"] = "Relative";
    AddressingMode["Accumulator"] = "Accumulator";
})(AddressingMode || (AddressingMode = {}));
/**
 * addressing mode for functions that don't need addresses.
 * is needed for the instruction decoder to function properly
 * @return returns 0
 */
function am_Implied() {
    return 0;
}
/**
 * needed for the four shift and rotate functions
 * to do the opperation on the Accumulator and not memory
 * @return returns the string 'A'
 */
function am_Accumulator() {
    return 'A';
}
/**
 * address relative to the position we are in according
 * to the next value
 * @returns an address
 */
function am_Relative() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the value in the next field
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value);
    // turn the value into a binary
    let binary = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value);
    // if the high bit is a 1, fill up the rest of the address with 1's
    if (binary[0] === '1') {
        for (let i = binary.length; i < _config__WEBPACK_IMPORTED_MODULE_3__[/* ADDR_SIZE */ "a"]; i++) {
            binary = `1${binary}`;
        }
    }
    // return the program counter with the offset;
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value + Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(binary), 2);
}
/**
 * Gives back the address stored in a different absolute address place
 * @return the address to get a value
 */
function am_IndirectAbsolute() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the loworder byte of the address
    const lowOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value));
    // increment the programcounter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the highorder Byte of the address
    const highOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value));
    // concatinate the high and low address
    const tempAddress = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(highOrder + lowOrder);
    // get the new low order byte
    const newLowOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(tempAddress));
    // get the new high order byte
    const newHighOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(tempAddress + 1));
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(newHighOrder + newLowOrder);
}
/**
 * function for the immediate addressing mode
 * @return the address to read from for the value
 */
function am_Immediate() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // set address to the next in line
    return _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value;
}
/**
 * function for the Zero Page addressing
 * @return the address to read from for the value
 */
function am_ZeroPage() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // the value of the address it is pointing to
    return Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value);
}
/**
 * function for the zero page indexed X addressing
 * @return the address to read from for the value with the X register as offset
 */
function am_ZeroPageIndexedX() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    //console.log(wrapAround(readFromAddress(STATE.PROGRAM_COUNTER.value) + STATE.X));
    // the value of the address it is pointing to plus the X register
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value) + _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X);
}
/**
 * function for the zero page indexed Y addressing
 * @return the address to read from for the value with the Y register as offset
 */
function am_ZeroPageIndexedY() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // the value of the address it is pointing to plus the X register
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value) + _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y);
}
/**
 * function for the absolut addressing
 * @return the address to read from for the value
 */
function am_Absolute() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the loworder byte of the address
    const lowOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value));
    // increment the programcounter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the highorder Byte of the address
    const highOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value));
    // create the address
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(highOrder + lowOrder);
}
/**
 * function for the absolut indexed X addressing
 * @return the address to read from for the value
 */
function am_AbsoluteIndexedX() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the loworder byte of the address
    const lowOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value));
    // increment the programcounter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the highorder Byte of the address
    const highOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value));
    // create the address
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(highOrder + lowOrder) + _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X, 2);
}
/**
 * function for the absolut indexed Y addressing
 * @return the address to read from for the value
 */
function am_AbsoluteIndexedY() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the loworder byte of the address
    const lowOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value));
    // increment the programcounter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the highorder Byte of the address
    const highOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value));
    // create the address adding the y
    // wrap around needed to stop it from going over
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(highOrder + lowOrder) + _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y, 2);
}
/**
 * function for the Indexed Indirect addressing
 * @return the address to read from for the value
 */
function am_IndexedIndirect() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // add the X registry to the number
    const tempAddress = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value) + _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X);
    // get the value stored in that place
    const lowOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(tempAddress));
    const highOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(tempAddress + 1)));
    // create the address
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(highOrder + lowOrder);
}
/**
 * function for the Indirect Indexed addressing
 * @return the address to read from for the value
 */
function am_IndirectIndexed() {
    // increment the counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value++;
    // get the address from the place the number is pointing to
    const tempAddress = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value);
    // get the value stored in that place
    const lowOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(tempAddress));
    const highOrder = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(tempAddress + 1)));
    // create the address addin the Y register
    return Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(highOrder + lowOrder) + _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y, 2);
}
/**
 * map of hex numbers to functions and AddressingMode
 */
const OP_CODE = [{
    function: ADC,
    0x69: am_Immediate,
    0x65: am_ZeroPage,
    0x75: am_ZeroPageIndexedX,
    0x6d: am_Absolute,
    0x7d: am_AbsoluteIndexedX,
    0x79: am_AbsoluteIndexedY,
    0x61: am_IndexedIndirect,
    0x71: am_IndirectIndexed
}, {
    function: AND,
    0x29: am_Immediate,
    0x25: am_ZeroPage,
    0x35: am_ZeroPageIndexedX,
    0x2d: am_Absolute,
    0x3d: am_AbsoluteIndexedX,
    0x39: am_AbsoluteIndexedY,
    0x21: am_IndexedIndirect,
    0x31: am_IndirectIndexed
}, {
    function: ASL,
    0x0a: am_Accumulator,
    0x06: am_ZeroPage,
    0x16: am_ZeroPageIndexedX,
    0x0e: am_Absolute,
    0x1e: am_AbsoluteIndexedX
}, {
    function: BCC,
    0x90: am_Relative
}, {
    function: BCS,
    0xb0: am_Relative
}, {
    function: BEQ,
    0xf0: am_Relative
}, {
    function: BIT,
    0x24: am_ZeroPage,
    0x2c: am_Absolute
}, {
    function: BNE,
    0xd0: am_Relative
}, {
    function: BMI,
    0x30: am_Relative
}, {
    function: BPL,
    0x10: am_Relative
}, {
    function: BVS,
    0x70: am_Relative
}, {
    function: BRK,
    0x00: am_Implied
}, {
    function: BVC,
    0x50: am_Relative
}, {
    function: CLC,
    0x18: am_Implied
}, {
    function: CLD,
    0xd8: am_Implied
}, {
    function: CLI,
    0x58: am_Implied
}, {
    function: CLV,
    0xb8: am_Implied
}, {
    function: CMP,
    0xc9: am_Immediate,
    0xc5: am_ZeroPage,
    0xd5: am_ZeroPageIndexedX,
    0xcd: am_Absolute,
    0xdd: am_AbsoluteIndexedX,
    0xd9: am_AbsoluteIndexedY,
    0xc1: am_IndexedIndirect,
    0xd1: am_IndirectIndexed
}, {
    function: CPX,
    0xe0: am_Immediate,
    0xe4: am_ZeroPage,
    0xec: am_Absolute
}, {
    function: CPY,
    0xc0: am_Immediate,
    0xc4: am_ZeroPage,
    0xcc: am_Absolute
}, {
    function: DEC,
    0xc6: am_ZeroPage,
    0xd6: am_ZeroPageIndexedX,
    0xce: am_Absolute,
    0xde: am_AbsoluteIndexedX
}, {
    function: DEX,
    0xca: am_Implied
}, {
    function: DEY,
    0x88: am_Implied
}, {
    function: EOR,
    0x49: am_Immediate,
    0x45: am_ZeroPage,
    0x55: am_ZeroPageIndexedX,
    0x4d: am_Absolute,
    0x5d: am_AbsoluteIndexedX,
    0x59: am_AbsoluteIndexedY,
    0x41: am_IndexedIndirect,
    0x51: am_IndirectIndexed
}, {
    function: JMP,
    0x4c: am_Absolute,
    0x6c: am_IndirectAbsolute
}, {
    function: JSR,
    0x20: am_Absolute
}, {
    function: INC,
    0xe6: am_ZeroPage,
    0xf6: am_ZeroPageIndexedX,
    0xee: am_Absolute,
    0xfe: am_AbsoluteIndexedX
}, {
    function: INX,
    0xe8: am_Implied
}, {
    function: INY,
    0xc8: am_Implied
}, {
    function: LDA,
    0xa9: am_Immediate,
    0xa5: am_ZeroPage,
    0xb5: am_ZeroPageIndexedX,
    0xad: am_Absolute,
    0xbd: am_AbsoluteIndexedX,
    0xb9: am_AbsoluteIndexedY,
    0xa1: am_IndexedIndirect,
    0xb1: am_IndirectIndexed
}, {
    function: LDX,
    0xa2: am_Immediate,
    0xa6: am_ZeroPage,
    0xb6: am_ZeroPageIndexedY,
    0xae: am_Absolute,
    0xbe: am_AbsoluteIndexedY
}, {
    function: LDY,
    0xa0: am_Immediate,
    0xa4: am_ZeroPage,
    0xB4: am_ZeroPageIndexedX,
    0xac: am_Absolute,
    0xbc: am_AbsoluteIndexedX
}, {
    function: LSR,
    0x4a: am_Accumulator,
    0x46: am_ZeroPage,
    0x56: am_ZeroPageIndexedX,
    0x4e: am_Absolute,
    0x5e: am_AbsoluteIndexedX
}, {
    function: NOP,
    0xea: am_Implied
}, {
    function: ORA,
    0x09: am_Immediate,
    0x05: am_ZeroPage,
    0x15: am_ZeroPageIndexedX,
    0x0d: am_Absolute,
    0x1d: am_AbsoluteIndexedX,
    0x19: am_AbsoluteIndexedY,
    0x01: am_IndexedIndirect,
    0x11: am_IndirectIndexed
}, {
    function: PHA,
    0x48: am_Implied
}, {
    function: PHP,
    0x08: am_Implied
}, {
    function: PLA,
    0x68: am_Implied
}, {
    function: PLP,
    0x28: am_Implied
}, {
    function: ROL,
    0x2a: am_Accumulator,
    0x26: am_ZeroPage,
    0x36: am_ZeroPageIndexedX,
    0x2e: am_Absolute,
    0x3e: am_AbsoluteIndexedX
}, {
    function: ROR,
    0x6a: am_Accumulator,
    0x66: am_ZeroPage,
    0x76: am_ZeroPageIndexedX,
    0x6e: am_Absolute,
    0x7e: am_AbsoluteIndexedX
}, {
    function: RTI,
    0x40: am_Implied
}, {
    function: RTS,
    0x60: am_Implied
}, {
    function: SBC,
    0xe9: am_Immediate,
    0xe5: am_ZeroPage,
    0xf5: am_ZeroPageIndexedX,
    0xed: am_Absolute,
    0xfd: am_AbsoluteIndexedX,
    0xf9: am_AbsoluteIndexedY,
    0xe1: am_IndexedIndirect,
    0xf1: am_IndirectIndexed
}, {
    function: SEC,
    0x38: am_Implied
}, {
    function: SED,
    0xf8: am_Implied
}, {
    function: SEI,
    0x78: am_Implied
}, {
    function: STA,
    0x85: am_ZeroPage,
    0x95: am_ZeroPageIndexedX,
    0x8d: am_Absolute,
    0x9d: am_AbsoluteIndexedX,
    0x99: am_AbsoluteIndexedY,
    0x81: am_IndexedIndirect,
    0x91: am_IndirectIndexed
}, {
    function: STX,
    0x86: am_ZeroPage,
    0x96: am_ZeroPageIndexedY,
    0x8e: am_Absolute
}, {
    function: STY,
    0x84: am_ZeroPage,
    0x94: am_ZeroPageIndexedX,
    0x8c: am_Absolute
}, {
    function: TAX,
    0xaa: am_Implied
}, {
    function: TAY,
    0xa8: am_Implied
}, {
    function: TSX,
    0xba: am_Implied
}, {
    function: TXA,
    0x8a: am_Implied
}, {
    function: TXS,
    0x9a: am_Implied
}, {
    function: TYA,
    0x98: am_Implied
}];
/**
 * Add to Accumulator with carry.
 * A + M + C -> A, C
 * @param address address to get the value from
 */
function ADC(address) {
    // clear the overflow bit
    CLV();
    // get the value
    const dec = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    let likeSignd = false;
    // are the two numbers like-signed
    if (Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(dec)[0] === Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0]) {
        likeSignd = true;
    }
    // is it in decimal mode or not
    if (_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.DECIMAL_MODE) {
        // convert the bcd encoded number into something we can calc with
        const bcd = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* bcdToDec */ "c"])(dec);
        // do the calculation
        const ans = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* bcdToDec */ "c"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A) + bcd + +_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY;
        // set the accumulator
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBcd */ "h"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAroundBCD */ "x"])(ans));
        // set the carry flag
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = ans > 99;
    } else {
        // added the value plus the carry to the accumulator
        const ans = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A + dec + +_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY;
        // set the accumulator
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(ans);
        //get overflow of ans
        const ansOver = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* overFlow */ "t"])(ans);
        // set the carry flag if the value exeeds the max
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = ansOver[1].length > 1 || ansOver[1][0] === '1';
        // set the overflow flag
        if (likeSignd) {
            if (ans > 127 || ans < -128) {
                _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.OVERFLOW = true;
            }
        }
    }
    // set the negative flag if the most segnificant bit of the accumulator is a 1
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0] === '1';
    // set the zero flag if the accumulator is zero
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A === 0;
    // STATE.STATUS_REGISTER.OVERFLOW = (STATE.STATUS_REGISTER.NEGATIVE || STATE.STATUS_REGISTER.CARRY);
}
/**
 * Ands the accumultor with some value and stores the resault in the Accumulator
 * @param address address to ge the value from
 */
function AND(address) {
    // get the value from the address
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // and the value and store it
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A & value;
    // set the negative flag if the most segnificant bit of the accumulator is a 1
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0] === '1';
    // set the zero flag if the accumulator is zero
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A === 0;
}
/**
 * Accumulator Shit Left.
 * Shifts accumulator or memory to the left
 * @param address addess or the Accumulator
 */
function ASL(address) {
    let shift;
    let value;
    if (address === 'A') {
        // use the accumulator
        value = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A;
    } else {
        // get the value from the address
        // @ts-ignore (here the address could also be an 'A')
        value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    }
    // shift the accumulator left by one
    shift = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* overFlow */ "t"])(value << 1);
    // set the zero Flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]) === 0;
    // set the negative Flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = shift[0][0] === '1';
    // set the carry flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = !!+parseInt(shift[1][0]);
    if (address === 'A') {
        // set the Accumulator
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]);
    } else {
        // set the value to the address again
        // @ts-ignore (here the address could also be an 'A')
        Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]));
    }
}
/**
 * Branch on Carry Clear
 * @param address address to branch toward
 */
function BCC(address) {
    // only branch if carry is cleard
    if (!_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY) {
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
    }
}
/**
 * Branch on Carry Set
 * @param address address to branch toward
 */
function BCS(address) {
    // only branch if carry is set
    if (_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY) {
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
    }
}
/**
 * Branch on result equal to zero
 * @param address address to branch to
 */
function BEQ(address) {
    // only branch if zero flag is set
    if (_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO) {
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
    }
}
/**
 * ands a valu with the accumulator without saveing the result
 * @param address address to get value from
 */
function BIT(address) {
    // get the value
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // AND it with the accumulator
    const ans = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A & value;
    // set the zero flag if the answer is zero
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = ans === 0;
    // the negative flag gets set by the un-ANDed memory value
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[0] === '1';
    // the overflow flag gets set by the bit 6 un-ANDed memory value
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.OVERFLOW = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[1] === '1';
}
/**
 * Branch on result NOT equal to zero
 * @param address address to branch to
 */
function BNE(address) {
    // only branch if zero flag is set
    if (!_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO) {
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
    }
}
/**
 * Branch on result minus
 * @param address address to branch to
 */
function BMI(address) {
    // only branch if zero flag is set
    if (_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE) {
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
    }
}
/**
 * Branch on result positive
 * @param address address to branch to
 */
function BPL(address) {
    // only branch if zero flag is set
    if (!_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE) {
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
    }
}
/**
 * break command.
 * similar to the external IRQ, except that this is triggered by SW and not HW.
 */
function BRK() {
    // get the low and high byte of the momentary Program counter
    const posHex = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value, 4);
    const lowByte = posHex.substring(2, 4);
    const highByte = posHex.substring(0, 2);
    // push the highbyte to the stack
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pushToStack */ "f"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(highByte));
    // push the lowbyte to the stack
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pushToStack */ "f"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(lowByte));
    // set the irq disable to true;
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.BRK_COMMAND = true;
    // push the status register to the stack
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pushToStack */ "f"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* statusToByte */ "v"])());
    // set the irq disable to false
    // since the B flag doesn't really exist in the status register
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.BRK_COMMAND = false;
    // get the low byte
    const low = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(0xfffe);
    // get high byte 
    const high = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(0xffff);
    // set the program counter to the new address
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(high) + Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(low));
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
}
/**
 * Branch on overflow set
 * @param address address to branch to
 */
function BVS(address) {
    // only branch if zero flag is set
    if (_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.OVERFLOW) {
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
    }
}
/**
 * Branch on overflow clear
 * @param address address to branch to
 */
function BVC(address) {
    // only branch if zero flag is set
    if (!_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.OVERFLOW) {
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
    }
}
/**
 * clears the carry flag
 */
function CLC() {
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = false;
}
/**
 * Clears the Decimal flag in the Status register.
 * Causes the ALU to function in the binary mode
 */
function CLD() {
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.DECIMAL_MODE = false;
}
/**
 * Clear Interrupt Disable Bits
 */
function CLI() {
    // clear the intertupt disable bit
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.IRQ_DISABLE = false;
}
/**
 * reset the overflow flag
 */
function CLV() {
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.OVERFLOW = false;
}
/**
 * Compares the Accumulator against a value
 * @param address address to get value from to compare
 */
function CMP(address) {
    // get the value
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // subtract the value from the accumulator
    const ans = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A - value);
    // set the zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = ans === 0;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(ans)[0] === '1';
    // set the carry flag
    //STATE.STATUS_REGISTER.CARRY = (ans[1][0] === '1' || ans[1].length > 1);
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO || !_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE && !_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO;
}
/**
 * Compares the X Register against a value
 * @param address address to get value from to compare
 */
function CPX(address) {
    // get the value
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // subtract the value from the accumulator
    const ans = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X - value);
    // set the zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = ans === 0;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(ans)[0] === '1';
    // set the carry flag
    //STATE.STATUS_REGISTER.CARRY = (ans[1][0] === '1' || ans[1].length > 1);
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO || !_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE && !_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO;
}
/**
 * Compares the Y Register against a value
 * @param address address to get value from to compare
 */
function CPY(address) {
    // get the value
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // subtract the value from the accumulator
    const ans = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y - value);
    // set the zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = ans === 0;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(ans)[0] === '1';
    // set the carry flag
    //STATE.STATUS_REGISTER.CARRY = (ans[1][0] === '1' || ans[1].length > 1);
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO || !_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE && !_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO;
}
/**
 * Decrement a value in memory
 * @param address address of the value to decrement
 */
function DEC(address) {
    // get the value from the address
    let value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // decrement the value by one 
    value = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(value - 1);
    // write the value to the address
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, value);
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = value === 0;
}
/**
 * Decrement X register by one
 */
function DEX() {
    // decrease the X register by one
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X - 1);
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X === 0;
}
/**
 * Decrement Y register by one
 */
function DEY() {
    // decrease the X register by one
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y - 1);
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y === 0;
}
/**
 * XOR a value with the Accumulator and save the resault in the Accumulator
 * @param address address of the value
 */
function EOR(address) {
    // get the value from the address
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // and the value and store it
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A ^ value;
    // set the negative flag if the most segnificant bit of the accumulator is a 1
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0] === '1';
    // set the zero flag if the accumulator is zero
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A === 0;
}
/**
 * increment a value in memory
 * @param address address of the value to increment
 */
function INC(address) {
    // get the value from the address
    let value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // increment the value by one 
    value = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(value + 1);
    // write the value to the address
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, value);
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = value === 0;
}
/**
 * increment the x register
 */
function INX() {
    // increment the x register
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X + 1);
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X === 0;
}
/**
 * Increment Y register by one
 */
function INY() {
    // decrease the X register by one
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y + 1);
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y === 0;
}
/**
 * Sets the program counter to the given address.
 * "jumps" to that position in memory
 * @param address address to jump to
 */
function JMP(address) {
    // set the program counter to the address
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
}
/**
 * Jump to Subroutine
 * @param address address of the subroutine
 */
function JSR(address) {
    // get the low and high byte of the momentary Program counter
    const posHex = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value, 4);
    const lowByte = posHex.substring(2, 4);
    const highByte = posHex.substring(0, 2);
    // push the highbyte to the stack
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pushToStack */ "f"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(highByte));
    // push the lowbyte to the stack
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pushToStack */ "f"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(lowByte));
    // set the porgram counter to the address 
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = address;
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* INTERNAL */ "c"].PC_INCREASED = true;
}
/**
 * Load a value into the Accumulator
 * @param address the address to load
 */
function LDA(address) {
    // get the value
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // check if the value is null
    // set the zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = value < 1;
    // check if the first highest bit in the number is a one
    // and set the negativ flag accordingly
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = !!+Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[0];
    // put the value into the accumulator
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = value;
}
/**
 * Load the X register
 * @param address the address to load
 */
function LDX(address) {
    // get the value
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // check if the value is null
    // set the zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = value < 1;
    // check if the first highest bit in the number is a one
    // and set the negativ flag accordingly
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = !!+Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[0];
    // put the value into the X register
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X = value;
}
/**
 * Load the Y register
 * @param address the address to load
 */
function LDY(address) {
    // get the value
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // check if the value is null
    // set the zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = value < 1;
    // check if the first highest bit in the number is a one
    // and set the negativ flag accordingly
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = !!+Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[0];
    // put the value into the X register
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y = value;
}
/**
 * Logic Shit Right.
 * Shifts accumulator or memory to the right
 * @param address addess or the Accumulator
 */
function LSR(address) {
    let shift;
    let value;
    if (address === 'A') {
        // use the accumulator
        value = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A;
    } else {
        // get the value from the address
        // @ts-ignore (here the address could also be an 'A')
        value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    }
    // set the carry flag. The bit that will be pushed out of the number
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[7] === '1';
    // shift the accumulator right by one
    shift = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* overFlow */ "t"])(value >>> 1);
    // set the zero Flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]) === 0;
    // set the negative Flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = shift[0][0] === '1';
    if (address === 'A') {
        // set the Accumulator
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]);
    } else {
        // set the value to the address again
        // @ts-ignore (here the address could also be an 'A')
        Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]));
    }
}
/**
 * No Operation.
 * Does absolutly nothing
 */
function NOP() {}
// do nothing

/**
 * ORs the accumulator with a value and stores it in the accumulator
 * @param address address to get value from
 */
function ORA(address) {
    // get the value from the address
    const value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    // and the value and store it
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A | value;
    // set the negative flag if the most segnificant bit of the accumulator is a 1
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0] === '1';
    // set the zero flag if the accumulator is zero
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A === 0;
}
/**
 * Push Accumulator on Stack
 */
function PHA() {
    // push the Accumulator onto the stack
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pushToStack */ "f"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A);
}
/**
 * Push processor Status on stack
 */
function PHP() {
    // create the processor Status byte
    const byte = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* statusToByte */ "v"])();
    // push the byte to the stack
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pushToStack */ "f"])(byte);
}
/**
 * Pull Accumulator from stack
 */
function PLA() {
    // pull from stack
    const num = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pullFromStack */ "e"])();
    // save that in the Accumulator
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = num;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A === 0;
}
/**
 * Pull processor Status from Stack
 */
function PLP() {
    // get the number from the stack
    const num = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pullFromStack */ "e"])();
    // convert the number into the status register
    Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* byteToStatus */ "f"])(num);
}
/**
 * Rotate Left
 * Rotates accumulator or memory to the left
 * @param address addess or the Accumulator
 */
function ROL(address) {
    let shift;
    let value;
    if (address === 'A') {
        // use the accumulator
        value = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A;
    } else {
        // get the value from the address
        // @ts-ignore (here the address could also be an 'A')
        value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    }
    // shift the accumulator left by one
    shift = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* overFlow */ "t"])(value << 1);
    // turn the number into an array
    let array = shift[0].split('');
    // add the carry to the beginning of the value
    array[7] = (+_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY).toString();
    // add it back to the shift
    shift[0] = array.join('');
    // set the zero Flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]) === 0;
    // set the negative Flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = shift[0][0] === '1';
    // set the carry flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = !!+parseInt(shift[1][0]);
    if (address === 'A') {
        // set the Accumulator
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]);
    } else {
        // set the value to the address again
        // @ts-ignore (here the address could also be an 'A')
        Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]));
    }
}
/**
 * Rotate Right
 * Rotates accumulator or memory to the right
 * @param address addess or the Accumulator
 */
function ROR(address) {
    let shift;
    let value;
    if (address === 'A') {
        // use the accumulator
        value = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A;
    } else {
        // get the value from the address
        // @ts-ignore (here the address could also be an 'A')
        value = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    }
    // set the carry var. The bit that will be pushed out of the number
    const Carry = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(value)[7] === '1';
    // shift the accumulator left by one
    shift = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* overFlow */ "t"])(value >>> 1);
    // turn the number into an array
    let array = shift[0].split('');
    // add the carry to the beginning of the value
    array[0] = (+_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY).toString();
    // add it back to the shift
    shift[0] = array.join('');
    // set the zero Flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]) === 0;
    // set the negative Flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = shift[0][0] === '1';
    // set the carry flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = Carry;
    if (address === 'A') {
        // set the Accumulator
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]);
    } else {
        // set the value to the address again
        // @ts-ignore (here the address could also be an 'A')
        Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* binaryToDec */ "d"])(shift[0]));
    }
}
/**
 * return from interrupt
 */
function RTI() {
    // get the status register from the stack
    const statusByte = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pullFromStack */ "e"])();
    // get the lowbyte of the address
    const lowByte = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pullFromStack */ "e"])();
    // get the high byte of the address
    const highByte = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pullFromStack */ "e"])();
    // put the status byte into the status register
    Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* byteToStatus */ "f"])(statusByte);
    // reset the break flag since that technically isn't part of the status register
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.BRK_COMMAND = false;
    // put the address into the program counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(highByte) + Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(lowByte));
    // increment the progam counter by one
    // STATE.PROGRAM_COUNTER.value = wrapAround(STATE.PROGRAM_COUNTER.value + 1, 2);
}
/**
 * Return from Subroutine
 */
function RTS() {
    // get the lowByte from the stack
    const lowByte = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pullFromStack */ "e"])();
    // get the highByte
    const highByte = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* pullFromStack */ "e"])();
    // set the program counter
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].PROGRAM_COUNTER.value = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* hexToDec */ "k"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(highByte) + Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToHex */ "j"])(lowByte));
    // increment the progam counter by one
    // STATE.PROGRAM_COUNTER.value = wrapAround(STATE.PROGRAM_COUNTER.value + 1, 2);
}
/**
 * Subtracts a value from the Accumulator.
 * A - M - !C => A
 * @param address place to get value from
 */
function SBC(address) {
    // clear the overflow flag
    CLV();
    // get the value
    const dec = Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* readFromAddress */ "g"])(address);
    let unLikeSignd = false;
    // are the two numbers unlike-signed
    if (Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(dec)[0] != Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0]) {
        unLikeSignd = true;
    }
    if (_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.DECIMAL_MODE) {
        // convert the bcd encoded number into something we can calc with
        const bcd = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* bcdToDec */ "c"])(dec);
        // do the calculation
        const ans = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* bcdToDec */ "c"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A) - bcd - +!_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY;
        // set the accumulator
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBcd */ "h"])(Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAroundBCD */ "x"])(ans));
        // set the carry flag
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = ans >= 0;
    } else {
        // added the value plus the inverse carry to the accumulator
        const ans = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A - dec - +!_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY;
        // set the accumulator
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* wrapAround */ "w"])(ans);
        //get overflow of ans
        const ansOver = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* overFlow */ "t"])(ans);
        // set the carry flag if the value is greater then or equal to zero
        _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = ans >= 0;
        // set the overflow flag
        if (unLikeSignd) {
            if (ans > 127 || ans < -128) {
                _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.OVERFLOW = true;
            }
        }
    }
    // set the negative flag if the most segnificant bit of the accumulator is a 1
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0] === '1';
    // set the zero flag if the accumulator is zero
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A === 0;
    // STATE.STATUS_REGISTER.OVERFLOW = (STATE.STATUS_REGISTER.NEGATIVE || STATE.STATUS_REGISTER.CARRY);
}
/**
 * Sets the carry flag to true
 */
function SEC() {
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.CARRY = true;
}
/**
 * Sets the Decimal mode flag in the status register.
 * Causes the ALU to work in BCD mode.
 * (8Bits => 2x 4Bit digits)
 */
function SED() {
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.DECIMAL_MODE = true;
}
/**
 * Set Interrupt Disable Status
 */
function SEI() {
    // set the interrupt disable bit
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.IRQ_DISABLE = true;
}
/**
 * Stores the value of the Accumulator at an address
 * @param address the address to store
 */
function STA(address) {
    // store the accumulator at the address
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A);
}
/**
 * Stores the value of the X Register at an address
 * @param address the address to store
 */
function STX(address) {
    // store the accumulator at the address
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X);
}
/**
 * Stores the value of the Y Register at an address
 * @param address the address to store
 */
function STY(address) {
    // store the accumulator at the address
    Object(_cpu__WEBPACK_IMPORTED_MODULE_1__[/* writeToAddress */ "l"])(address, _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y);
}
/**
 * Transfer Accumulator to register X
 */
function TAX() {
    // copy A to X
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X === 0;
}
/**
 * Transfer Accumulator to register Y
 */
function TAY() {
    // copy A to Y
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y === 0;
}
/**
 * Transfer Stack pointer to register X
 */
function TSX() {
    // copy the Stack pointer to register X
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STACK_POINTER;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X === 0;
}
/**
 * Transfer register X to Accumulator
 */
function TXA() {
    // copy X to A
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A === 0;
}
/**
 * Transfer index X to Stack Pointer
 */
function TXS() {
    // transfer the x to the Stackpointer
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STACK_POINTER = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].X;
}
/**
 * Transfer register Y to Accumulator
 */
function TYA() {
    // copy Y to A
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].Y;
    // set the Negative flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.NEGATIVE = Object(_util__WEBPACK_IMPORTED_MODULE_2__[/* decToBinary */ "i"])(_memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A)[0] === '1';
    // set the Zero flag
    _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].STATUS_REGISTER.ZERO = _memory__WEBPACK_IMPORTED_MODULE_0__[/* STATE */ "e"].A === 0;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return errorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return funcToOp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return labelToAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addressToLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return mapAsmToCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return opArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return opArrayPointer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return origin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return originSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return resetCompiler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return initOpArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return compile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return removeComments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return replaceVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return convertNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return convertAscii; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return handleLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return handleDotWords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return handleAddressingMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return handleOpCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return replaceLabels; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _instructionset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



var errorType;
(function (errorType) {
    errorType["NONE"] = "";
    errorType["SYNTAX"] = "--- SYNTAX ERROR ---";
    errorType["SIZE"] = "--- SIZE ERROR ---";
    errorType["LOGIC"] = "--- LOGIC ERROR ---";
    errorType["INTERNAL"] = "--- INTERNAL ERROR ---";
})(errorType || (errorType = {}));
/**
 * compiler status
 */
let STATUS = {
    internal: '',
    listener: function (val) {},
    set value(val) {
        this.internal = val;
        this.listener(val);
    },
    get value() {
        return this.internal;
    },
    registerListener: function (listener) {
        this.listener = listener;
    }
};
/**
 * function to Op code map
 */
const funcToOp = {
    ADC: {
        Indexed_Indirect: 0x61,
        Zero_Page: 0x65,
        Immediate: 0x69,
        Absolute: 0x6d,
        Indirect_Indexed: 0x71,
        Zero_Page_Indexed_X: 0x75,
        Absolute_Indexed_Y: 0x79,
        Absolute_Indexed_X: 0x7d
    },
    AND: {
        Indexed_Indirect: 0x21,
        Zero_Page: 0x25,
        Immediate: 0x29,
        Absolute: 0x2d,
        Indirect_Indexed: 0x31,
        Zero_Page_Indexed_X: 0x35,
        Absolute_Indexed_Y: 0x39,
        Absolute_Indexed_X: 0x3d
    },
    ASL: {
        Zero_Page: 0x06,
        Accumulator: 0x0a,
        Absolute: 0x0e,
        Zero_Page_Indexed_X: 0x16,
        Absolute_Indexed_X: 0x1e
    },
    BCC: {
        Relative: 0x90
    },
    BCS: {
        Relative: 0xb0
    },
    BEQ: {
        Relative: 0xf0
    },
    BIT: {
        Zero_Page: 0x24,
        Absolute: 0x2c
    },
    BNE: {
        Relative: 0xd0
    },
    BMI: {
        Relative: 0x30
    },
    BPL: {
        Relative: 0x10
    },
    BVS: {
        Relative: 0x70
    },
    BRK: {
        Implied: 0x00
    },
    BVC: {
        //Relative: 0x50
        Zero_Page: 0x50
    },
    CLC: {
        Implied: 0x18
    },
    CLD: {
        Implied: 0xd8
    },
    CLI: {
        Implied: 0x58
    },
    CLV: {
        Implied: 0xb8
    },
    CMP: {
        Indexed_Indirect: 0xc1,
        Zero_Page: 0xc5,
        Immediate: 0xc9,
        Absolute: 0xcd,
        Indirect_Indexed: 0xd1,
        Zero_Page_Indexed_X: 0xd5,
        Absolute_Indexed_Y: 0xd9,
        Absolute_Indexed_X: 0xdd
    },
    CPX: {
        Immediate: 0xe0,
        Zero_Page: 0xe4,
        Absolute: 0xec
    },
    CPY: {
        Immediate: 0xc0,
        Zero_Page: 0xc4,
        Absolute: 0xcc
    },
    DEC: {
        Zero_Page: 0xc6,
        Absolute: 0xce,
        Zero_Page_Indexed_X: 0xd6,
        Absolute_Indexed_X: 0xde
    },
    DEX: {
        Implied: 0xca
    },
    DEY: {
        Implied: 0x88
    },
    EOR: {
        Indexed_Indirect: 0x41,
        Zero_Page: 0x45,
        Immediate: 0x49,
        Absolute: 0x4d,
        Indirect_Indexed: 0x51,
        Zero_Page_Indexed_X: 0x55,
        Absolute_Indexed_Y: 0x59,
        Absolute_Indexed_X: 0x5d
    },
    JMP: {
        Absolute: 0x4c,
        Indirect_Absolute: 0x6c
    },
    JSR: {
        Absolute: 0x20
    },
    INC: {
        Zero_Page: 0xe6,
        Absolute: 0xee,
        Zero_Page_Indexed_X: 0xf6,
        Absolute_Indexed_X: 0xfe
    },
    INX: {
        Implied: 0xe8
    },
    INY: {
        Implied: 0xc8
    },
    LDA: {
        Indexed_Indirect: 0xa1,
        Zero_Page: 0xa5,
        Immediate: 0xa9,
        Absolute: 0xad,
        Indirect_Indexed: 0xb1,
        Zero_Page_Indexed_X: 0xb5,
        Absolute_Indexed_Y: 0xb9,
        Absolute_Indexed_X: 0xbd
    },
    LDX: {
        Immediate: 0xa2,
        Zero_Page: 0xa6,
        Absolute: 0xae,
        Zero_Page_Indexed_Y: 0xb6,
        Absolute_Indexed_Y: 0xbe
    },
    LDY: {
        Immediate: 0xa0,
        Zero_Page: 0xa4,
        Absolute: 0xac,
        Zero_Page_Indexed_X: 0xb4,
        Absolute_Indexed_X: 0xbc
    },
    LSR: {
        Zero_Page: 0x46,
        Accumulator: 0x4a,
        Absolute: 0x4e,
        Zero_Page_Indexed_X: 0x56,
        Absolute_Indexed_X: 0x5e
    },
    NOP: {
        Implied: 0xea
    },
    ORA: {
        Indexed_Indirect: 0x01,
        Zero_Page: 0x05,
        Immediate: 0x09,
        Absolute: 0x0d,
        Indirect_Indexed: 0x11,
        Zero_Page_Indexed_X: 0x15,
        Absolute_Indexed_Y: 0x19,
        Absolute_Indexed_X: 0x1d
    },
    PHA: {
        Implied: 0x48
    },
    PHP: {
        Implied: 0x08
    },
    PLA: {
        Implied: 0x68
    },
    PLP: {
        Implied: 0x28
    },
    ROL: {
        Zero_Page: 0x26,
        Accumulator: 0x2a,
        Absolute: 0x2e,
        Zero_Page_Indexed_X: 0x36,
        Absolute_Indexed_X: 0x3e
    },
    ROR: {
        Zero_Page: 0x66,
        Accumulator: 0x6a,
        Absolute: 0x6e,
        Zero_Page_Indexed_X: 0x76,
        Absolute_Indexed_X: 0x7e
    },
    RTI: {
        Implied: 0x40
    },
    RTS: {
        Implied: 0x60
    },
    SBC: {
        Indexed_Indirect: 0xe1,
        Zero_Page: 0xe5,
        Immediate: 0xe9,
        Absolute: 0xed,
        Indirect_Indexed: 0xf1,
        Zero_Page_Indexed_X: 0xf5,
        Absolute_Indexed_Y: 0xf9,
        Absolute_Indexed_X: 0xfd
    },
    SEC: {
        Implied: 0x38
    },
    SED: {
        Implied: 0xf8
    },
    SEI: {
        Implied: 0x78
    },
    STA: {
        Indexed_Indirect: 0x81,
        Zero_Page: 0x85,
        Absolute: 0x8d,
        Indirect_Indexed: 0x91,
        Zero_Page_Indexed_X: 0x95,
        Absolute_Indexed_Y: 0x99,
        Absolute_Indexed_X: 0x9d
    },
    STX: {
        Zero_Page: 0x86,
        Absolute: 0x8e,
        Zero_Page_Indexed_Y: 0x96
    },
    STY: {
        Zero_Page: 0x84,
        Absolute: 0x8c,
        Zero_Page_Indexed_X: 0x94
    },
    TAX: {
        Implied: 0xaa
    },
    TAY: {
        Implied: 0xa8
    },
    TSX: {
        Implied: 0xba
    },
    TXA: {
        Implied: 0x8a
    },
    TXS: {
        Implied: 0x9a
    },
    TYA: {
        Implied: 0x98
    }
};
/**
 * array of labels found and the corresponding address
 */
let labelToAddress = [];
/**
 * array of places a label needs to be replaced with an address
 */
let addressToLabel = [];
/**
 * map of the line of assembly to the compiled code.
 * Useing the PROGRAM_COUNTER you can than show what line is being executed.
 * What addresses in the rom corespond to what assembly line in the editor
 */
let mapAsmToCode = [];
/**
 * the array with the compiled code
 */
let opArray = [];
/**
 * pointer for the opArray
 */
let opArrayPointer = 0;
/**
 * origin of the code addresses in the rom.
 * eg: if the rom starts at $8000 then add $8000 to the labels
 * to get the overall address the cpu needs to address them.
 */
let origin = 0;
let originSet = false;
/**
 * list of Regex
 */
const regexList = {
    comment: /;.*/i,
    label: /^[\w\d]+: */i,
    var: /^[\w\d]+ *= *.+/i,
    op: /  [\w]{3}\b/i,
    dotWords: /\.\w+/gi,
    number: /[(# ](([@%]?\d+)|(\$[a-f\d]+))/gi,
    hex: /\$[a-f\d]+/gi,
    oct: /@\d+/g,
    binary: /%\d+/g,
    dec: /\b\d+/g,
    ascii: /("((?!").|\n)*")|('((?!').|\n)*')/gi,
    am_Immediate: /^#\$[a-f\d]{2}$/i,
    am_Absolute: /^\$[a-f\d]{4}$/i,
    am_Zero_Page: /^\$[a-f\d]{2}$/i,
    am_Indirect_Absolute: /^\(\$[a-f\d]{4}\)$/i,
    am_Absolute_Indexed_X: /^\$[a-f\d]{4},? *X$/i,
    am_Absolute_Indexed_Y: /^\$[a-f\d]{4},? *Y$/i,
    am_Zero_Page_Indexed_X: /^\$[a-f\d]{2},? *X$/i,
    am_Zero_Page_Indexed_Y: /^\$[a-f\d]{2},? *Y$/i,
    am_Indexed_Indirect: /^\(\$[a-f\d]{2},? *X\)$/i,
    am_Indirect_Indexed: /^\(\$[a-f\d]{2}\),? *Y$/i,
    am_Accumulator: /^A$/i,
    am_Implide: /^[\W\n]*$/i,
    valueLabels: /^[\w\d]+([, ]{1}[ ]?[xy])?$/i,
    emptyLine: /^[\W\n]*$/i
};
/**
 * resets the compiler
 */
function resetCompiler() {
    initOpArray();
    labelToAddress = [];
    addressToLabel = [];
    origin = 0;
    originSet = false;
    mapAsmToCode = [];
}
/**
 * build the opArray
 */
function initOpArray() {
    // clear opArray
    opArray = [];
    // build the opArray
    for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_2__[/* ROM_SIZE */ "j"]; i++) {
        opArray.push(0);
    }
    // init op Array pointer
    opArrayPointer = 0;
}
/**
 * Compiles the 6502 assembly code
 * @param assembly code to compile
 * @param callback function to run after succesful compile.
 */
function compile(assembly, callback = function () {}) {
    // reset the compiler
    resetCompiler();
    // split the code into lines
    let code = assembly.split('\n');
    // remove the comments
    const codeWOComments = removeComments(code);
    // replace all the variables
    const codeWOVar = replaceVariables(codeWOComments);
    // convert all the numbers to hex
    const codeConvertedNums = convertNumbers(codeWOVar);
    // convert all the strings to hex
    const codeConvertedAscii = convertAscii(codeConvertedNums);
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: '\nConverting Assembly to OPCodes...'
    };
    // go through the code line by line
    for (let i = 0; i < codeConvertedAscii.length; i++) {
        // is it a label
        if (codeConvertedAscii[i].match(regexList.label)) {
            // handel the lable
            handleLabel(codeConvertedAscii[i], opArrayPointer);
        }
        // if it is an opcode
        /*else*/if (codeConvertedAscii[i].match(regexList.op)) {
            // handle the op code
            const opCode = handleOpCode(codeConvertedAscii[i]);
            // catch error and pass it on to the status
            if (opCode.error) {
                STATUS.value = {
                    line: i + 1,
                    error: true,
                    errorType: opCode.errorType,
                    text: opCode.text
                };
                return null;
            }
            // temporary array for the opArray addresses that the assembly line covers
            let tempLineArray = [];
            // push the value into the opArray
            for (let q = 0; q < opCode.value.length; q++) {
                // push the opArray pointer into the temp linearray
                tempLineArray.push(opArrayPointer);
                // place the value in its place
                opArray[opArrayPointer] = opCode.value[q];
                // increment the opArray pointer
                opArrayPointer++;
            }
            mapAsmToCode.push({
                // assembly code line we are on
                assembly: i,
                // code addresses that are on that line
                code: tempLineArray
            });
        }
        // dot words ( .org, .word )
        else if (codeConvertedAscii[i].match(regexList.dotWords)) {
                // handle the dot words
                let ans = handleDotWords(codeConvertedAscii[i]);
                if (ans.error) {
                    STATUS.value = {
                        line: i + 1,
                        error: true,
                        errorType: ans.errorType,
                        text: ans.text
                    };
                    return null;
                }
            } else {
                if (!codeConvertedAscii[i].match(regexList.emptyLine) && !codeConvertedAscii[i].match(regexList.label)) {
                    STATUS.value = {
                        line: i + 1,
                        error: true,
                        errorType: errorType.SYNTAX,
                        text: `Something wrong with this line of code:\n  "${codeConvertedAscii[i]}"`
                    };
                    return null;
                }
            }
        // check if the opArrayPointer is still within range
        if (opArrayPointer > _config__WEBPACK_IMPORTED_MODULE_2__[/* ROM_SIZE */ "j"]) {
            STATUS.value = {
                line: i + 1,
                error: true,
                errorType: errorType.SIZE,
                text: `Trying to write into memory space that doesn't exist.`
            };
            return null;
        }
    }
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: 'done.'
    };
    const ans = replaceLabels(labelToAddress, addressToLabel);
    if (ans.error) {
        STATUS.value = {
            line: 0,
            error: true,
            errorType: errorType.NONE,
            text: ans.text
        };
        return null;
    }
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: '\n--- Finished Compiling ---'
    };
    return opArray;
}
/**
 * removes comments from the given code
 * @param code code to remove the comment from
 */
function removeComments(code) {
    // set the status
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: '\nRemoving comments...'
    };
    // array to push the new stuff in
    let returnArray = [];
    // go through the code and remove all the comments
    for (let i = 0; i < code.length; i++) {
        returnArray.push(code[i].replace(regexList.comment, ''));
    }
    // set the status
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: 'done'
    };
    return returnArray;
}
/**
 * replaces the variables
 * @param code code to get var from
 */
function replaceVariables(code) {
    // set the status
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: '\nReplaceing the variables...'
    };
    // array to push the new stuff in
    let returnArray = [];
    // array of found variables
    let variables = [];
    // go through the code looking for variables
    for (let i = 0; i < code.length; i++) {
        // is it a variable
        let match = code[i].match(regexList.var);
        if (match != null) {
            // split the variable to the array
            let variable = code[i].split('=');
            let name = variable[0].trim();
            let value = variable[1].trim();
            variables.push([name, value]);
        }
        // push the row into the return array
        returnArray.push(code[i]);
    }
    // go through the code again, this time replaceing all the variables
    for (let i = 0; i < returnArray.length; i++) {
        // replace the var declerations with nothing
        // keep the empty arrays so the assembly line to code map will still be correct 
        returnArray[i] = returnArray[i].replace(regexList.var, '');
        // go through the found variables and replace them
        for (let q = 0; q < variables.length; q++) {
            let newRegex = new RegExp(`\\b${variables[q][0]}\\b`, 'g');
            returnArray[i] = returnArray[i].replace(newRegex, variables[q][1]);
        }
    }
    // set the status
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: 'done.'
    };
    return returnArray;
}
/**
 * converts all the number types ($,@,%, ) to hex
 * @param code code to convert
 */
function convertNumbers(code) {
    // set the status
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: '\nconverting numbers ...'
    };
    // return array
    let returnArray = code;
    // array of the length of the hex values
    let lengthArray = [];
    // build the length array
    for (let r = 0; r < returnArray.length; r++) {
        lengthArray.push([]);
    }
    // go through the code and find all the numbers
    for (let i = 0; i < returnArray.length; i++) {
        let match = returnArray[i].match(regexList.number);
        // is there a number
        if (match != null) {
            // handle the hex
            if (returnArray[i].match(regexList.hex)) {
                const hex = returnArray[i].match(regexList.hex);
                let tempArr = [];
                // build temp array
                for (let r = 0; r < hex.length; r++) {
                    tempArr.push(0);
                }
                for (let d = 0; d < hex.length; d++) {
                    tempArr[d] = hex[d].length - 1;
                    const dec = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(hex[d].replace('$', '')).toString();
                    returnArray[i] = returnArray[i].replace(hex[d], dec);
                    lengthArray[i] = tempArr;
                }
            }
            // handle octal number
            if (returnArray[i].match(regexList.oct)) {
                const oct = returnArray[i].match(regexList.oct);
                for (let c = 0; c < oct.length; c++) {
                    const dec = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* octToDec */ "r"])(oct[c].replace('@', '')).toString();
                    returnArray[i] = returnArray[i].replace(oct[c], dec);
                }
            }
            // handle the binary
            if (returnArray[i].match(regexList.binary)) {
                const bin = returnArray[i].match(regexList.binary);
                for (let b = 0; b < bin.length; b++) {
                    const dec = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* binaryToDec */ "d"])(bin[b].replace('%', '')).toString();
                    returnArray[i] = returnArray[i].replace(bin[b], dec);
                }
            }
            // do math if there
            let mathMatch = returnArray[i].match(/[\+\-|\&]/g);
            if (mathMatch != null) {
                // find the math
                let math = returnArray[i].match(/\d+( *[\+\-|\&] *\d+)+/g);
                if (math != null) {
                    // do the math
                    let ans = eval(math[0]);
                    // replace the math with the ans
                    returnArray[i] = returnArray[i].replace(math[0], ans);
                    // replace possible ()
                    //returnArray[i] = returnArray[i].replace(/[\(\)]/g,'');
                }
            }
            // numbers to hex
            if (returnArray[i].match(regexList.dec)) {
                const dec = returnArray[i].match(regexList.dec);
                for (let a = 0; a < dec.length; a++) {
                    let length = lengthArray[i][a];
                    if (length < 2) {
                        length = 2;
                    }
                    let hex = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(parseInt(dec[a]), length);
                    returnArray[i] = returnArray[i].replace(dec[a], `$${hex}`);
                }
            }
        }
    }
    // set the status
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: 'done.'
    };
    // console.log(returnArray);
    return returnArray;
}
/**
 * convert all the ascii strings to hex numbers
 * @param code code to go through
 */
function convertAscii(code) {
    // set the status
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: '\nconverting ascii to hex...'
    };
    // array to push the new stuff in
    let returnArray = code;
    // go through the code
    for (let i = 0; i < returnArray.length; i++) {
        let match = returnArray[i].match(regexList.ascii);
        if (match != null) {
            let text = returnArray[i].match(regexList.ascii)[0];
            // remove first and last part of string
            // should be the "" or ''
            let textWo = text;
            textWo = textWo.substring(1);
            textWo = textWo.slice(0, -1);
            const hex = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* asciiToHex */ "b"])(textWo);
            returnArray[i] = returnArray[i].replace(text, `$${hex}`);
        }
    }
    // set the status
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: 'done.'
    };
    return returnArray;
}
/**
 * handels the labels
 * @param code line of code that has the label in it
 * @param address address of where the label came from
 */
function handleLabel(code, address) {
    // get the label from the code
    const label = code.match(regexList.label);
    // if a label wasn't found, stop function
    if (label === null) {
        return;
    }
    // split the address into two 1byte segements
    const hexAddress = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(address + origin, 4);
    // push the label and the address to the 
    labelToAddress.push({
        label: label[0].replace(':', '').trim(),
        lowByte: Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(hexAddress.substring(2, 4)),
        highByte: Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(hexAddress.substring(0, 2))
    });
}
/**
 * handel the dot words (.org, .word)
 * @param code code to use
 */
function handleDotWords(code) {
    // get the index of the dot word
    const indexMatch = code.indexOf(code.match(regexList.dotWords)[0]);
    // trim the code down
    const trimmedCode = code.substring(indexMatch);
    // split the code into an array
    const codeArray = trimmedCode.trim().split(' ');
    // get the command
    const command = codeArray.shift().toUpperCase();
    // join the rest back together and use it as the value
    const value = codeArray.join(' ');
    // console.log(command, value);
    // origin 
    if (command === '.ORG') {
        // check if it is a correct value
        if (!value.match(regexList.hex)) {
            return {
                error: true,
                errorType: errorType.SYNTAX,
                text: `"${value}" not a valid value`
            };
        }
        // convert the new origin
        let newOrigin = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(value.replace('$', ''));
        // check if the origin is going to be set to something that is lower than the previous origin
        if (newOrigin < origin) {
            return {
                error: true,
                errorType: errorType.LOGIC,
                text: `origin "${value}" can not be lower than previous set origin "$${Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(origin)}"`
            };
        }
        // check if the origin is greater than the 16 bit address
        if (newOrigin > 0xffff) {
            return {
                error: true,
                errorType: errorType.LOGIC,
                text: `origin "${value}" exeeds the max address of $ffff`
            };
        }
        // calculate the new pointer
        let newOpArrayPointer = newOrigin - origin;
        // set the new opArrayPointer
        if (opArrayPointer === 0) {
            newOpArrayPointer = 0;
        }
        // check if origin would write into already written parts
        if (newOpArrayPointer < opArrayPointer) {
            return {
                error: true,
                errorType: errorType.LOGIC,
                text: `origin "${value}" would overwrite previous code`
            };
        }
        // set the new origin 
        if (!originSet) {
            origin = newOrigin;
            originSet = true;
        }
        // set the new op Array pointer
        opArrayPointer = newOpArrayPointer;
    } else if (command === '.BYTE') {
        // add one byte worth of stuff there
        // check if it is a correct value
        if (!value.match(regexList.hex)) {
            return {
                error: true,
                errorType: errorType.SYNTAX,
                text: `"${value}" not a valid value`
            };
        }
        // check if the value is too high for just one byte
        if (value.length > 3) {
            return {
                error: true,
                errorType: errorType.SYNTAX,
                text: `"${value}" is greater than one byte.\nConsider using ".word" or ".asciiz".`
            };
        }
        // put the value into the place
        opArray[opArrayPointer] = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(value.replace('$', ''));
        opArrayPointer++;
    } else if (command === '.WORD') {
        // add one byte worth of stuff there
        // check if it is a correct value
        if (!value.match(regexList.hex)) {
            return {
                error: true,
                errorType: errorType.SYNTAX,
                text: `"${value}" not a valid value`
            };
        }
        // check if the value is too high for just one byte
        if (value.length > 5) {
            return {
                error: true,
                errorType: errorType.SYNTAX,
                text: `"${value}" is greater than two bytes.\nConsider using ".asciiz".`
            };
        }
        // remove the $
        let valueWoDoller = value.replace('$', '');
        // add missing chars
        for (let q = valueWoDoller.length; q > 4; q++) {
            valueWoDoller = `0${valueWoDoller}`;
        }
        // put the value into the place
        opArray[opArrayPointer] = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(valueWoDoller.substring(2, 4));
        opArrayPointer++;
        opArray[opArrayPointer] = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(valueWoDoller.substring(0, 2));
        opArrayPointer++;
    } else if (command === '.ASCIIZ') {
        // check if it is a correct value
        if (!value.match(regexList.hex)) {
            return {
                error: true,
                errorType: errorType.SYNTAX,
                text: `"${value}" not a valid value`
            };
        }
        // remove the $
        let valueWoDoller = value.replace('$', '');
        // put the value into the opArray
        // go by two, becuase each byte is 2 chars
        for (let q = 0; q < valueWoDoller.length; q += 2) {
            let char = valueWoDoller[q] + valueWoDoller[q + 1];
            opArray[opArrayPointer] = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(char);
            opArrayPointer++;
        }
        // add the zero
        opArray[opArrayPointer] = 0;
        opArrayPointer++;
    } else {
        return {
            error: true,
            errorType: errorType.SYNTAX,
            text: `"${command}" is not a valid command.`
        };
    }
    return {
        error: false,
        errorType: errorType.NONE,
        text: ''
    };
}
/**
 * handel the addressing and the value
 * @param code code to decode
 */
function handleAddressingMode(code, func = '') {
    let returnObject = {
        mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Implied,
        value: ['00'],
        error: true
    };
    if (code.match(regexList.am_Immediate)) {
        let newString = code.replace(/[#\$]/g, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Immediate,
            value: [newString],
            error: false
        };
    } else if (code.match(regexList.am_Absolute)) {
        let newString = code.replace(/[\$]/g, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Absolute,
            value: [newString.substring(2, 4), newString.substring(0, 2)],
            error: false
        };
        // list of all the branches. Since branches work differently
        const branchesArray = ['BCC', 'BCS', 'BEQ', 'BMI', 'BNE', 'BPL', 'BVC', 'BVS'];
        for (let y = 0; y < branchesArray.length; y++) {
            if (branchesArray[y] === func.toUpperCase()) {
                returnObject = {
                    mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Relative,
                    error: false,
                    value: ['00']
                };
                // push the address into the array
                addressToLabel.push({
                    label: code,
                    lowByte: opArrayPointer + 2,
                    highByte: opArrayPointer + 1,
                    branch: true
                });
                // push the label and the address to the 
                labelToAddress.push({
                    label: code,
                    lowByte: Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(newString.substring(2, 4)),
                    highByte: Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(newString.substring(0, 2))
                });
            }
        }
    } else if (code.match(regexList.am_Zero_Page)) {
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Zero_Page,
            value: [code.replace('$', '')],
            error: false
        };
        // list of all the branches. Since branches work differently
        const branchesArray = ['BCC', 'BCS', 'BEQ', 'BMI', 'BNE', 'BPL', 'BVC', 'BVS'];
        for (let y = 0; y < branchesArray.length; y++) {
            if (branchesArray[y] === func.toUpperCase()) {
                returnObject = {
                    mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Relative,
                    error: false,
                    value: [code.replace('$', '')]
                };
            }
        }
    } else if (code.match(regexList.am_Indirect_Absolute)) {
        // remove the brakets
        let newString = code.replace(/[\(\)\$]/g, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Indirect_Absolute,
            value: [newString.substring(2, 4), newString.substring(0, 2)],
            error: false
        };
    } else if (code.match(regexList.am_Absolute_Indexed_X)) {
        // remove the brakets
        let newString = code.replace(/(X$| X$|,X$|, X$|\$)/ig, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Absolute_Indexed_X,
            value: [newString.substring(2, 4), newString.substring(0, 2)],
            error: false
        };
    } else if (code.match(regexList.am_Absolute_Indexed_Y)) {
        // remove the brakets
        let newString = code.replace(/(Y$| Y$|,Y$|, Y$|\$)/ig, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Absolute_Indexed_Y,
            value: [newString.substring(2, 4), newString.substring(0, 2)],
            error: false
        };
    } else if (code.match(regexList.am_Zero_Page_Indexed_X)) {
        // remove the brakets
        let newString = code.replace(/(X$| X$|,X$|, X$|\$)/ig, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Zero_Page_Indexed_X,
            value: [newString],
            error: false
        };
    } else if (code.match(regexList.am_Zero_Page_Indexed_Y)) {
        // remove the brakets
        let newString = code.replace(/(y$| y$|,Y$|, Y$|\$)/ig, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Zero_Page_Indexed_Y,
            value: [newString],
            error: false
        };
    } else if (code.match(regexList.am_Indexed_Indirect)) {
        // remove the brakets
        let newString = code.replace(/(X\)$| X\)$|,X\)$|, X\)$|\$|\()/ig, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Indexed_Indirect,
            value: [newString],
            error: false
        };
    } else if (code.match(regexList.am_Indirect_Indexed)) {
        // remove the brakets
        let newString = code.replace(/(Y$| Y$|,Y$|, Y$|\(|\)|\$)/ig, '');
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Indirect_Indexed,
            value: [newString],
            error: false
        };
    } else if (code.match(regexList.am_Accumulator)) {
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Accumulator,
            value: [],
            error: false
        };
    } else if (code.match(regexList.am_Implide)) {
        returnObject = {
            mode: _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Implied,
            value: [],
            error: false
        };
    }
    // handel labels
    else if (code.match(regexList.valueLabels)) {
            // list of all the branches. Since branches work differently with labels
            const branchesArray = ['BCC', 'BCS', 'BEQ', 'BMI', 'BNE', 'BPL', 'BVC', 'BVS'];
            let mode = _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Absolute;
            let value = ['00', '00'];
            let branch = false;
            const label = code.match(regexList.valueLabels)[0].replace(/(x$| x|,x|, x|y$| y|,y|, y|\$)/gi, '');
            // for some reason branchesArray.includes() decided to stop working
            // if(branchesArray.includes(func.toUpperCase())){
            //     mode = AddressingMode.Relative;
            //     branch = true;
            //     value = ['00'];
            // }
            for (let y = 0; y < branchesArray.length; y++) {
                if (branchesArray[y] === func.toUpperCase()) {
                    mode = _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Relative;
                    branch = true;
                    value = ['00'];
                    break;
                }
            }
            // push the address into the array
            addressToLabel.push({
                label: label,
                lowByte: opArrayPointer + 2,
                highByte: opArrayPointer + 1,
                branch: branch
            });
            // check if mode needs to be an absolute x
            if (code.match(/[, ]{1}x\b/gi)) {
                mode = _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Absolute_Indexed_X;
            } else if (code.match(/[, ]{1}y\b/gi)) {
                mode = _instructionset__WEBPACK_IMPORTED_MODULE_1__[/* AddressingMode */ "d"].Absolute_Indexed_Y;
            }
            returnObject = {
                mode: mode,
                value: value,
                error: false
            };
        }
    return returnObject;
}
/**
 * converts the assembly into the opcodes
 * @param code code to handle
 */
function handleOpCode(code) {
    // get the actual function
    const func = code.match(regexList.op);
    if (func === null) {
        return {
            error: true,
            errorType: errorType.INTERNAL,
            text: 'handleOpCode: regex not found in code',
            value: []
        };
    }
    // split the code into an array
    const codeArray = code.trim().split(' ');
    // get the first element of the array as the assembly function
    const assFunc = codeArray.shift();
    // join the rest back together and use it as the value
    const value = codeArray.join(' ');
    // get the addressing mode
    const addressMode = handleAddressingMode(value, assFunc);
    // check if the addressing mode has an error or not
    if (addressMode.error) {
        return {
            error: true,
            errorType: errorType.SYNTAX,
            text: `Invalid value "${value}".`,
            value: []
        };
    }
    // if function exists
    if (funcToOp[assFunc.toUpperCase()] == undefined) {
        return {
            error: true,
            errorType: errorType.SYNTAX,
            text: `Function "${assFunc}" not found.`,
            value: []
        };
    }
    // check if addressing mode is correct
    if (funcToOp[assFunc.toUpperCase()][addressMode.mode] == undefined) {
        return {
            error: true,
            errorType: errorType.SYNTAX,
            text: `"${value}" is an invalid addressing mode for "${assFunc}".`,
            value: []
        };
    }
    // get the opcode
    const opCode = funcToOp[assFunc.toUpperCase()][addressMode.mode];
    let returnArray = [];
    // push the op code into the returnArray
    returnArray.push(opCode);
    // push the value into the returnArray
    for (let i = 0; i < addressMode.value.length; i++) {
        returnArray.push(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(addressMode.value[i]));
    }
    return {
        error: false,
        errorType: errorType.NONE,
        text: '',
        value: returnArray
    };
}
/**
 * function that takes the two arrays and changes the addresses in the opArray accordingly
 */
function replaceLabels(label, address) {
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: '\nReplacing Label Addresses...'
    };
    // go through the arrays and change the addresses
    for (let i = 0; i < address.length; i++) {
        let found = false;
        for (let q = 0; q < label.length; q++) {
            if (address[i].label === label[q].label) {
                found = true;
                if (!address[i].branch) {
                    opArray[address[i].lowByte] = label[q].highByte;
                    opArray[address[i].highByte] = label[q].lowByte;
                } else {
                    // get the position of the label
                    let posLabel = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* hexToDec */ "k"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(label[q].highByte) + Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* decToHex */ "j"])(label[q].lowByte)) - origin;
                    // get the position of where the branch was
                    let posBranch = address[i].highByte;
                    // calculate the differance
                    let posDiff = posLabel - posBranch;
                    // can't be too far away
                    if (posDiff > 127) {
                        return {
                            error: true,
                            errorType: errorType.LOGIC,
                            text: `"${address[i].label}" more than +127 positions away from branch`
                        };
                    }
                    if (posDiff < -128) {
                        return {
                            error: true,
                            errorType: errorType.LOGIC,
                            text: `"${address[i].label}" more than -128 positions away from branch`
                        };
                    }
                    // set it to that place
                    opArray[address[i].highByte] = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* wrapAround */ "w"])(posDiff);
                }
            }
        }
        if (!found) {
            return {
                error: true,
                errorType: errorType.SYNTAX,
                text: `"${address[i].label}" not defined.`
            };
        }
    }
    STATUS.value = {
        line: 0,
        error: false,
        errorType: errorType.NONE,
        text: 'done.'
    };
    return {
        error: false,
        errorType: errorType.NONE,
        text: ''
    };
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BIT_SIZE", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADDR_SIZE", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZERO_PAGE_START_ADDR", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["p"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZERO_PAGE_SIZE", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["o"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STACK_START_ADDR", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STACK_SIZE", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RAM_START_ADDR", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RAM_SIZE", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ROM_START_ADDR", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ROM_SIZE", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LCDA_ADDR", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LCDB_ADDR", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryPlace", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MEMORY_MAP", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COMPILER", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["q"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["l"]; });

/* harmony import */ var _memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StateClass", function() { return _memory__WEBPACK_IMPORTED_MODULE_1__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExternalClass", function() { return _memory__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InternalClass", function() { return _memory__WEBPACK_IMPORTED_MODULE_1__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATE", function() { return _memory__WEBPACK_IMPORTED_MODULE_1__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EXTERNAL", function() { return _memory__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INTERNAL", function() { return _memory__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initZeroPageRam", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["p"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initStack", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["o"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initRam", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initRom", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initMemory", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bcdToDec", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decToBcd", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "overFlow", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["t"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrapAround", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["w"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrapAroundBCD", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["x"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decToBinary", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "binaryToDec", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "binaryToHex", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexToDec", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decToHex", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "octToHex", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["s"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "octToDec", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["r"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asciiToHex", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decToAscii", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addressToMemory", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "statusToByte", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["v"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "byteToStatus", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "printMemory", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["u"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadRom", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["q"]; });

/* harmony import */ var _cpu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pushToStack", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pullFromStack", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "readFromAddress", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "writeToAddress", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetCpu", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stopCpu", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "startCpu", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleIrq", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleNmi", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "runProgram", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "programStep", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "instructionDecode", function() { return _cpu__WEBPACK_IMPORTED_MODULE_3__["c"]; });

/* harmony import */ var _instructionset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddressingMode", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_Implied", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["lb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_Accumulator", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["jb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_Relative", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["pb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_IndirectAbsolute", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["nb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_Immediate", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["kb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_ZeroPage", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["qb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_ZeroPageIndexedX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["rb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_ZeroPageIndexedY", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["sb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_Absolute", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["gb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_AbsoluteIndexedX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["hb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_AbsoluteIndexedY", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["ib"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_IndexedIndirect", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["mb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "am_IndirectIndexed", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["ob"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OP_CODE", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["J"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADC", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AND", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ASL", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BCC", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BCS", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BEQ", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BIT", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BNE", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BMI", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BPL", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BRK", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BVS", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BVC", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLC", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["o"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLD", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["p"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLI", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["q"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLV", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["r"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CMP", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["s"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CPX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["t"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CPY", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["u"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEC", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["v"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["w"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEY", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["x"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EOR", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["y"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INC", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["z"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["A"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INY", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["B"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JMP", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["C"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JSR", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["D"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LDA", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["E"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LDX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["F"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LDY", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["G"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LSR", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["H"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NOP", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["I"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ORA", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["K"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PHA", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["L"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PHP", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["M"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLA", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["N"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLP", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["O"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ROL", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["P"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ROR", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["Q"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RTI", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["R"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RTS", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["S"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SBC", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["T"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEC", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["U"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SED", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["V"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEI", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["W"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STA", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["X"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["Y"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STY", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["Z"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TAX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["ab"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TAY", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["bb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TSX", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["cb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TXA", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["db"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TXS", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["eb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TYA", function() { return _instructionset__WEBPACK_IMPORTED_MODULE_4__["fb"]; });

/* harmony import */ var _compiler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "errorType", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "funcToOp", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "labelToAddress", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addressToLabel", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapAsmToCode", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "opArray", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["o"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "opArrayPointer", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["p"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "origin", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["q"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "originSet", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["r"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetCompiler", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["v"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initOpArray", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "compile", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeComments", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["s"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceVariables", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["u"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertNumbers", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertAscii", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleLabel", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleDotWords", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleAddressingMode", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleOpCode", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceLabels", function() { return _compiler__WEBPACK_IMPORTED_MODULE_5__["t"]; });








/***/ })
/******/ ]);
});