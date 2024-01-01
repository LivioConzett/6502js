const compileButton = document.querySelector('.compileButton');
const clearTerminalButton = document.querySelector('.clearTerminalButton');
const stepButton = document.querySelector('.stepButton');
const sResetButton = document.querySelector('.sResetButton');
const hResetButton = document.querySelector('.hResetButton');
const runButton = document.querySelector('.runButton');
const stopButton = document.querySelector('.stopButton');
const settingsButton = document.querySelector('.settingsButton');
const settingCancelButton = document.querySelector('.settingCancelButton');
const settingSaveButton = document.querySelector('.settingSaveButton');
const settingInfoButton = document.querySelector('.settingInfoButton');
const settingHelpButton = document.querySelector('.settingHelpButton');
const helpOkButton = document.querySelector('.helpOkButton');
const helpInfoButton = document.querySelector('.helpInfoButton');

const cpuSpeedInput = document.querySelector('.cpuSpeedInput');

const codeArea = document.querySelector('.codeArea');
const codeHolder = document.querySelector('.codeHolder');
const lineNumberArea = document.querySelector('.lineNumbersHolder');
const settingsHolder = document.querySelector('.settingsHolder');
const settingsWindow = document.querySelector('.settingsWindow');
const helpHolder = document.querySelector('.helpHolder');


const romHolder = document.querySelector('.romHolder');
const ramHolder = document.querySelector('.ramHolder');
const zPRamHolder = document.querySelector('.zPRamHolder');
const terminal = document.querySelector('.terminal');

const lcdScreen = document.querySelector('.lcdScreen');
const lcdLine1 = document.querySelector('.lcdLine1');
const lcdLine2 = document.querySelector('.lcdLine2');

const stackArea = document.querySelector('.stackArea');

const aRegister = document.querySelector('.aRegister');
const xRegister = document.querySelector('.xRegister');
const yRegister = document.querySelector('.yRegister');

const nStatus = document.querySelector('.nStatus');
const vStatus = document.querySelector('.vStatus');
const bStatus = document.querySelector('.bStatus');
const dStatus = document.querySelector('.dStatus');
const iStatus = document.querySelector('.iStatus');
const zStatus = document.querySelector('.zStatus');
const cStatus = document.querySelector('.cStatus');

const pCounter = document.querySelector('.pCounter');
const sCounter = document.querySelector('.sCounter');

const disclaimerHolder = document.querySelector('.disclaimerHolder');
const disclaimerText = document.querySelector('.disclaimerText');
const disclaimerButton = document.querySelector('.disclaimerButton');

// ------------------------------------------------------------------------------------------------------
// global vars
// ------------------------------------------------------------------------------------------------------
// needed for linenumbers
let previousLine = '';
let momentaryLine = '';

// code to put into the code area in the begining
const beginningCode = 
`;;; small program that will print 'Hello, World!'
;;; to the LCD screen in the top right corner
;;; press compile to compile, then reset to
;;; reset the CPU
;;; then you can step through the program or
;;; run it
;;; the check boxes next to the line numbers
;;; are break points that can be set
;;;
;;; ! FOR BEST COMPILER RESULTS USE HEX FOR ADDRESSES !

lcdPortA = $6000
lcdPortB = $6001
RS = %00000010
E = %00000100
  
  .org $8000        ; set the origin of ROM to 0x8000

  ldx #$ff          ; load 0xff into x Register
  txs               ; transfer the x register to the 
                    ; stack pointer
  ldx #0            ; load 0 into x register

loop:
  lda msg1, x       ; load char from location msg1
                    ; with offset x into accumulator
  beq nextLine      ; branch to end if Accumulator is 0
  jsr print         ; jump to subroutine print
  inx               ; increment x register
  jmp loop          ; jump to loop

nextLine:
  ldx #0            ; reset the x register
  jsr newLine       ; change the line on the LCD
loop2:
  lda msg2, x       ; start loading the second msg
  beq end
  jsr print
  inx
  jmp loop2

end:
  jmp end           ; end program by continuously
                    ; getting stuck here

print:
  sta lcdPortB      ; store accumulator in memory pos
  lda #RS | E       ; load RS and E in Accumulator
  sta lcdPortA      ; store Accumulator in memory
  lda #0            ; load 0 into Accumulator
  sta lcdPortA      ; store accumulator a memory
  rts               ; return from subroutine

newLine:
  lda #2
  sta lcdPortB
  lda #E 
  sta lcdPortA
  lda #0 
  sta lcdPortA
  rts

msg1: .asciiz 'Hello, You!'
msg2: .asciiz 'And Welcome!'

  .org $fffc
  .word $8000`;

// which lcd line to use
let lcdLine = lcdLine1;


// ------------------------------------------------------------------------------------------------------
// set up the js6502 functions
// ------------------------------------------------------------------------------------------------------

// set up the compiler status text handler
js6502.STATUS.registerListener((value) => {

    let newValue = value.text;
    
    if(value.error){
        newValue = `\n${value.errorType}\nline: ${value.line}\n${value.text}`;
    }
    
    writeToTerminal(newValue);

});

// set up the program counter handler
js6502.STATE.PROGRAM_COUNTER.registerListener((value) => {
    updateScreen();
});

// lcd stuff
js6502.STATE.LCDA.registerListener( (value) => {
    const E  = 0b00000100;
    const RS = 0b00000010;
    const RW = 0b00000001;

    // console.log(value, js6502.STATE.LCDB.value);

    // check if enable bit is set
    if((value & E) === E){

        // check if I have to write to screen
        if((value & RS) === RS){
            lcdLine.value += String.fromCharCode(js6502.STATE.LCDB.value);
        }
        else if(value === E && js6502.STATE.LCDB.value === 1){
            lcdLine1.value = '';
            lcdLine2.value = '';
        }
        else if(value === E && js6502.STATE.LCDB.value === 2){
            if(lcdLine === lcdLine1){
                lcdLine = lcdLine2;
            }
            else{
                lcdLine = lcdLine1;
            }
        }
    }

});

// lcd stuff
js6502.STATE.LCDB.registerListener( (value) => {
    // console.log(value);
});


// ------------------------------------------------------------------------------------------------------
// set up the buttons
// ------------------------------------------------------------------------------------------------------
disclaimerButton.addEventListener('click', () => {

    disclaimerHolder.style.visibility = 'hidden';

    // focus on the text area
    codeArea.focus();

});

compileButton.addEventListener('click', () => {

  compile();

});

clearTerminalButton.addEventListener('click', () => {

    // clear the terminal
    terminal.innerHTML = '';

});

stepButton.addEventListener('click', () => {

    // step one step through the program
    js6502.programStep();

});

sResetButton.addEventListener('click', () => {

    js6502.resetCpu();

    writeToTerminal('\nCPU reset');

});

hResetButton.addEventListener('click', () => {

    js6502.initZeroPageRam();
    js6502.initStack();
    js6502.initRam();
    js6502.resetCpu();
    updateScreen();
    lcdLine1.value = '';
    lcdLine2.value = '';
    lcdLine = lcdLine1;
    //updateRomView();

    writeToTerminal('\nMemory cleared.\nCPU reset');

});

runButton.addEventListener('click', () => {

    if(runButton.style.backgroundColor === ''){
        runButton.style.backgroundColor = '#8c9440';
        writeToTerminal('\nstarting CPU');
        // run the program
        js6502.startCpu();
    }

});

stopButton.addEventListener('click', () => {

    // stop the cpu
    stopProgram();
    writeToTerminal('\nCPU manually stopped');

});

settingsButton.addEventListener('click', () => {
    loadSettings();
    settingsHolder.style.visibility = 'visible';

});

settingCancelButton.addEventListener('click', () => {
    settingsHolder.style.visibility = 'hidden';
});

settingSaveButton.addEventListener('click', () => {

    // make sure cpu speed is within the range it should be
    if(cpuSpeedInput.value > 2000){
        cpuSpeedInput.value = 2000;
    }
    else if(cpuSpeedInput.value < 10){
        cpuSpeedInput.value = 10;
    }


    // save the things
    js6502.SETTINGS.RUN_TIMEOUT = cpuSpeedInput.value;

    settingsHolder.style.visibility = 'hidden';
});

settingInfoButton.addEventListener('click', () => {

    window.open('/instructionset/','_blank');
});

settingHelpButton.addEventListener('click', () => {
    helpHolder.style.visibility = 'visible';
});

helpOkButton.addEventListener('click', () => {
    helpHolder.style.visibility = 'hidden';
});

helpInfoButton.addEventListener('click', () =>{
    window.open('/instructionset/','_blank');
});

// ------------------------------------------------------------------------------------------------------
// set up other stuff
// ------------------------------------------------------------------------------------------------------
codeArea.addEventListener('keyup', (e) => {

    // console.log(e);

    switch(e.code){
        case 'Enter':
            addLineNumber();
            break;
        case 'ControlLeft':
        case 'ControlRight':
            addLineNumber();
            removeLineNumbers();
        case 'Backspace':
        case 'Delete':
                removeLineNumbers();
            break;
        default:
    }
});

codeArea.addEventListener('keydown', (e) => {

    //console.log(e);

    switch(e.code){
        case 'KeyS':
            if(e.ctrlKey){
                e.preventDefault();
                compile();
            }
            break;
        case 'Tab':
            e.preventDefault();
            break;
        case 'KeyV':
            if(e.ctrlKey){
                addLineNumber();
            }
            break;
        default:
    }
});

codeHolder.addEventListener('click', () => {

    codeArea.focus();

});


// initialize the site
function initSite(){

    disclaimerText.innerHTML = DISCLAIMER;

    js6502.initMemory();
    updateRamView();
    updateRomView();
    updateZeroPageRamView();
    updateScreen();

    codeArea.value = beginningCode;
    addLineNumber();
    
    disclaimerButton.focus();

}



// update the rom view
function updateRomView(){
    romHolder.value = js6502.printMemory(js6502.STATE.ROM, js6502.ROM_START_ADDR ,true);
}

// update the ram view
function updateRamView(){
    ramHolder.value = js6502.printMemory(js6502.STATE.RAM, js6502.RAM_START_ADDR, true);
}

// update the zero page ram view
function updateZeroPageRamView(){
    zPRamHolder.value = js6502.printMemory(js6502.STATE.ZERO_PAGE_RAM, js6502.ZERO_PAGE_START_ADDR, true);
}

// fucntion to show stack
function buildStack(){
    const stackArray = js6502.STATE.STACK;
    // clear the stack area
    stackArea.innerHTML = '';
    // go through stack backwards
    for(let i = stackArray.length-1; i >= 0; i--){

        let div = document.createElement('div');
        div.id = 'si'+i;
        div.innerHTML = `${js6502.decToHex(i)}  ${js6502.decToHex(stackArray[i])}`;
        stackArea.append(div);
    }
}

// color the address red where the stack pointer is pointing to
function updateStackPointer(){
    const Id = `si${js6502.STATE.STACK_POINTER}`;
    // set the color red
    const element = document.getElementById(Id);
    element.style.backgroundColor = '#a54242';
    //element.scrollIntoView();
}

// compile the code
function compile(){
    const code = codeArea.value;

    const compiledArray = js6502.compile(code);

    if(compiledArray != null){
        js6502.loadRom(compiledArray);
    }

    updateRomView();
}

// add the line numbers
function addLineNumber(){

    // resize the text area
    codeArea.style.height = "1px";
    codeArea.style.height = (25+codeArea.scrollHeight)+"px";
    
    const text = codeArea.value;
    const amount = text.split('\n').length;
    const lineNumbers = lineNumberArea.children.length;

    // add the line numbers
    for(let i = lineNumbers; i < amount; i ++){
        let D = document.createElement('div');
        let P = document.createElement('p');
        let C = document.createElement('input');
        P.innerHTML = i+1;
        P.id = 'ln'+(i+1);
        P.style.marginLeft = '5px';
        C.type = 'checkbox';
        C.id = 'cb'+(i+1);
        D.classList.add('lineNumberElement');
        D.id = 'dn'+(i+1);
        D.append(C);
        D.append(P);
        lineNumberArea.append(D);
    }

    // set the hight of the linenumber div
    lineNumberArea.style.height = codeArea.style.height;

}

// update the linenumbers
function removeLineNumbers(){

    // resize the text area
    codeArea.style.height = "1px";
    codeArea.style.height = (25+codeArea.scrollHeight)+"px";
     
    const text = codeArea.value;
    const amount = text.split('\n').length;
    const lineNumbers = lineNumberArea.children.length;

    for(let i = lineNumbers; i > amount; i --){
        lineNumberArea.removeChild(lineNumberArea.lastChild);
    }

    // set the hight of the linenumber div
    lineNumberArea.style.height = codeArea.style.height;
}

// set the correct line number to red
function setLineNumber(){

    //console.log(js6502.mapAsmToCode);

    const array = js6502.mapAsmToCode;
    const pc = js6502.STATE.PROGRAM_COUNTER.value;
    const place = pc - js6502.ROM_START_ADDR;

    for(let i = 0; i < array.length; i++){

        if(array[i].code.includes(place)){
            previousLine = momentaryLine;
            momentaryLine = `dn${array[i].assembly+1}`
            // check if break
            if(document.getElementById(`cb${array[i].assembly+1}`).checked){
                stopProgram();
                writeToTerminal(`\nbreak line ${array[i].assembly+1} reached`);
            }
        }

    }
    
    if(document.getElementById(previousLine)){
        document.getElementById(previousLine).style.backgroundColor = '';
    }
    if(document.getElementById(momentaryLine)){
        document.getElementById(momentaryLine).style.backgroundColor = '#a54242';
    }

}

// function to update all the stuff on the screen
function updateScreen(){

    // update the program counter
    pCounter.innerHTML = js6502.decToHex(js6502.STATE.PROGRAM_COUNTER.value, 4);
    // update the stack pointer
    sCounter.innerHTML = js6502.decToHex(js6502.STATE.STACK_POINTER);

    // update the registers
    aRegister.innerHTML = js6502.decToHex(js6502.STATE.A);
    xRegister.innerHTML = js6502.decToHex(js6502.STATE.X);
    yRegister.innerHTML = js6502.decToHex(js6502.STATE.Y);

    // update the status flags
    nStatus.innerHTML = + js6502.STATE.STATUS_REGISTER.NEGATIVE;
    vStatus.innerHTML = + js6502.STATE.STATUS_REGISTER.OVERFLOW;
    bStatus.innerHTML = + js6502.STATE.STATUS_REGISTER.BRK_COMMAND;
    dStatus.innerHTML = + js6502.STATE.STATUS_REGISTER.DECIMAL_MODE;
    iStatus.innerHTML = + js6502.STATE.STATUS_REGISTER.IRQ_DISABLE;
    zStatus.innerHTML = + js6502.STATE.STATUS_REGISTER.ZERO;
    cStatus.innerHTML = + js6502.STATE.STATUS_REGISTER.CARRY;


    // update RAM
    updateZeroPageRamView();
    updateRamView();

    // build the stack
    buildStack();

    updateStackPointer();

    setLineNumber();

}

// stop the program
function stopProgram(){
    js6502.stopCpu();
    // console.log('cpu stopped')
    runButton.style.backgroundColor = '';
}

// load the settings
function loadSettings(){
    cpuSpeedInput.value = js6502.SETTINGS.RUN_TIMEOUT;
}

// write to terminal
function writeToTerminal(text){
    // add the value to the terminal
    terminal.innerHTML = terminal.value + text;
    // scroll to the bottom
    terminal.scrollTop = terminal.scrollHeight;
}

initSite();