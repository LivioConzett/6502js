
const ADDITION_TEXT =
`
<div class="infoTitle">Addition</div>
<!-- <div class="infoText">
    The 6502 has only one add instruction. This is the <u>Ad</u>d to Accumulator with <u>C</u>arry (ADC), in which "Carry" is the Carry 
    flag (C) in the processor status register.
</div>
<div class="infoText">
    Symbolically, the operation of the ADC instruction can be represented as:
    <div class="infoMiddle">
        A = A + M + C
    </div>
    where,
    <div class="infoText">A is the accumulator,</div>
    <div class="infoText">M is the memory (or an immediate value),</div>
    <div class="infoText">C is the Carry.</div>
    If Carry is set to a logic 1 when the ADC instruction is executed, the addition becomes
    <div class="infoMiddle">
        A = A + M + 1
    </div>
    If Carry is reset to a logic 0 when the ADC instruction is executed, the addition becomes
    <div class="infoMiddle">
        A = A + M + 0
    </div>
</div> -->
<div class="infoText">
    The ADD instruction will add a value to the Accumulator with Carry. The result is then saved in the Accumulator. If the value is greater than 
    255<sub>10</sub>, the result is wrapped around and the Carry flag (C) is set.
    When adding single-byte numbers, or the least-significant bytes of two multiple-byte numbers, the Carry flag must first be cleared using CLC.
    For example in this case, the contents of zero page memory location $0020 is added to the accumulator:
    <div class="infoCode">
        <div>CLC</div>
        <div>ADC $20</div>
    </div>
</div>
<!-- <div class="infoText">
    There is one situation in which you do not need to precede an ADC instruction with a CLC instruction. If an immediate value is being
    added to the accumulator (e.g., ADC #36), and the Carry flag has been set by some previous operation, the state of the Carry can be 
    accounted for by using an immediate operand that is one less than the value you want to add. For instance, to add 36 to the 
    accumulator and the Carry is set to one, code an ADC #35. The result will be identical to coding CLC followed by ADC #36.
</div> -->
<div class="infoText">
    The ADC instruction affects these four flags in the processor status register:
    <ul class="infoList">
        <li>
            The Carry flag (C) is set if the sum is greater than 255<sub>10</sub>, or if the sum of a BCD addition exceeds 99<sub>BCD</sub>; 
            otherwise, it is reset.
        </li>
        <li>
            The Zero flag (Z) is set if the sum is zero; otherwise, it is reset.
        </li>
        <li>
            The Negative flag (N) is set if Bit 7 of the result is a logic 1; otherwise it is reset.
        </li>
        <li>
            The Overflow flag (V) is set if two like-signed numbers (both positive or negative) are added and the result exceeds +127<sub>10</sub>
            or -128<sub>10</sub>; otherwise it is reset.
        </li>
    </ul>
</div>
<div class="infoText">
    To add multi-byte numbers, simply clear the Carry flag at the beginning, then start adding the lowest two bytes and continue uppward without 
    reseting the carry flag.
    <div class="infoCode">
        <div>;THIS ROUTINE ADDS TWO 16-BIT NUMBERS IN LOCATION $00 AND $01</div>
        <div>;AND $02 AND $03.</div>
        <div>;THE RESULT IS SAVED IN $00 AND $01</div>
        <div> </div>
        <div>        CLC        ;CARRY = 0</div>
        <div>        LDA $00    ;ADD LOW-ORDER BYTES</div>
        <div>        ADC $02</div>
        <div>        STA $00</div>
        <div>        LDA $01    ;ADD HIGH-ORDER BYTES</div>
        <div>        ADC $03</div>
        <div>        STA $01</div>
    </div>
</div>
`