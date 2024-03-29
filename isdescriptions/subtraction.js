
const SUBTRACTION_TEXT =
`
<div class="infoTitle">Subtraction</div>
<div class="infoText">
    <!-- The 6502 processor has only one subtract instruction. This is the <u>S</u>u<u>b</u>tract from Accumulator with 
    Borrow instruction, in which "Borrow" is contributed by the <u>C</u>arry flag (SBC). With borrow always included in 
    the subtraction, you must observe the following rule:
    <div class="infoRule">
        Preceding a subtraction operation, the Carry flag (C) must be set to 1 or accounted for in the subtraction. The 
        instruction that sets the Carry flag is Set Carry flag (SEC).
    </div>
    Why set the Carry to 1 if it is to be included in the subtraction? The answer is given in the implementation of the 
    instruction, in which the <i>complement</i> of the Carry, rather then its true value, is included in the subtraction.
    It is given here, in a symbolic representation of the operation of the SBC instruction:
     -->
    The SBC instruction will subtract a value and the inverse of the Carry flag from the Accumulator. 
    <div class="infoMiddle">
        A = A - M - <o>C</o>
    </div>
    In this case the Carry flag works like a borrow.<br>
    Where as at the beginning of an ADD routine the Carry flag should be cleared, at the beginning of a SBC routine the Carry flag should 
    be set, so that the SBC has something to borrow from.

    A single-byte subtraction should look lik this:
    <div class="infoCode">
        <div>SEC</div>
        <div>SBC $03</div>
    </div>
</div>
<div class="infoText">
    These four flags are affected by the SBC command:
    <ul class="infoList">
        <li>
            The Carry flag (C) is set if the result is positive or zero, and is reset if the result is negative (indicating a borrow).
        </li>
        <li>
            The Zero flag (Z) is set if the result is zero; otherwise, it is reset. Note that if Carry and Zero are both set, the result is 
            zero. If Carry is set and Zero is reset, the result is positive.
        </li>
        <li>
            The Negative flag (N) is set if Bit 7 of the result is a logic 1; otherwise it is reset. If signed numbers are being subtracted,
            the N flag is set if the result is negative and reset if it is positive.
        </li>
        <li>
            The Overflow flag (V) is set if two unlike-signed numbers (one number posive, the other number negative) are subtracted, and the 
            result exceeds +127<sub>10</sub> or -128<sub>10</sub>. This causes Bit 7 of the accumulator to be changed.
        </li>
    </ul>
</div>
<div class="infoText">
    To subtract multiple-byte numbers, simply set the Carry flag at the beginning, then start subtracting the lowest two bytes and continue
    upwards without setting the Carry flag in between.
    <div class="infoCode">
        <div>;THIS ROUTINE SUBTRACTS TWO 16-BIT NUMBER IN LOCATIONS</div>
        <div>;$01 AND $02 AND $03 AND 04.</div>
        <div>;THE RESULT IS STORED IN $01 AND $02</div>
        <div> </div>
        <div>DPSUB:  SEC        ;CARRY = 1</div>
        <div>        LDA $01    ;SUBTRACT LOW-ORDER BYTES</div>
        <div>        SBC $03</div>
        <div>        STA $01</div>
        <div>        LDA $02    ;SUBTRACT HIGH-ORDER BYTES</div>
        <div>        SBC $04</div>
        <div>        STA $02</div>
    </div>
</div>
`