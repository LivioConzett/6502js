
const SUBROUTINE_TEXT =
`
<div class="infoTitle">Subroutines</div>
<div class="infoText">
    Subroutines can be looked at as the equivelent of a function in a highlevel language.<br>
    They are routines that can be jumped to from anywhere in the code and that will, after execution, return back to the place 
    it was called from (if programmed correctly).<br>
    There are two instructions for this:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr>
                <td>JSR</td>
                <td><u>J</u>ump to <u>S</u>ub<u>r</u>outine</td>
            </tr>
            <tr>
                <td>RTS</td>
                <td><u>R</u>e<u>t</u>urn from <u>S</u>ubroutine</td>
            </tr>
        </table>
    </div>
</div>
<div class="infoTitle1">JSR</div>
<div class="infoText">
    When JSR is executed it will push the current program counter (the position in memory that is currently being executed) onto the Stack,
    then it will jump to an absolute address and start executing code there.
</div>
<div class="infoTitle1">RTS</div>
<div class="infoText">
    When RTS is executed it pulls from the Stack then increments that value by one and loads it into the program counter. This effectively jumps 
    to the address after the one that was pushed onto the Stack. 
</div>
<div style="height: 30px;"></div>
<div class="infoText">
    Used together the JSR and RTS can reduce the amount of code needed to be written by placeing repeditive code into a subroutine. The following code 
    loads and 'H' into the Accumulator, then calls a subroutine that stores that 'H' into memory where a LCD Screen is and toggles the "print" bit 
    in the LCD so that the 'H' will be displayed on the LCD Screen.
    <div class="infoCode">
        <div>   LDA #'H'       ;LOAD THE ASCII CHAR H INTO A</div>
        <div>   JSR PRINTCHAR  ;JUMP TO THE PRINT SURBROUTINE</div>
        <div>    .</div>
        <div>    .</div>
        <div>    .</div>
        <div>PRINTCHAR: </div>
        <div>   STA $6001       ;STORE THE ACCUMULATOR IN MEMORY</div>
        <div>   LDA #%00000010  ;SET BIT 1 OF THE ACCUMULATOR HIGH</div>
        <div>   STA $6000       ;STORE THE ACCUMULATOR IN MEMORY</div>
        <div>   LDA #0          ;LOAD 0 INTO THE ACCUMULATOR</div>
        <div>   STA $6000       ;STORE ACCUMULATOR IN MEMORY</div>
        <div>   RTS             ;RETURN FROM SUBROUTINE</div>
    </div>
</div>
`