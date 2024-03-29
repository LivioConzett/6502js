
const BRANCH_TEXT =
`
<div class="infoTitle">Branch Instructions</div>
<div class="infoText">
    Branch instructions are like the JMP instuctions in that they jump to a different place in memory and execute code there.
    Unlike the JMP istruction that takes an absolute address, the branch instructions take a relative address (i.e., a displacement)
    that jumps a certain amount of positions forward or backward in memory. They are also conditional, unlike the JMP.
    Each branch instruction tests a certain flags of the processor status, and decided to jump depending on the status of that flag.
    Here are the Branch instructions with the flags they test:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th><th>Branch If</th></tr>
            <tr>
                <td>BEQ</td>
                <td style="text-align: left;">Branch on Result Equal to Zero</td>
                <td>Zero (Z) = 1</td>
            </tr>
            <tr>
                <td>BNE</td>
                <td style="text-align: left;">Branch on Result Not Equal to Zero</td>
                <td>Zero (Z) = 0</td>
            </tr>
            <tr>
                <td>BCC</td>
                <td style="text-align: left;">Branch on Carry Clear</td>
                <td>Carry (C) = 0</td>
            </tr>
            <tr>
                <td>BCS</td>
                <td style="text-align: left;">Branch on Carry Set</td>
                <td>Carry (C) = 1</td>
            </tr>
            <tr>
                <td>BMI</td>
                <td style="text-align: left;">Branch on Result Minus</td>
                <td>Negative (N) = 1</td>
            </tr>
            <tr>
                <td>BPL</td>
                <td style="text-align: left;">Branch on Result Plus</td>
                <td>Negative (N) = 0</td>
            </tr>
            <tr>
                <td>BVS</td>
                <td style="text-align: left;">Branch on Overflow Set</td>
                <td>Overflow (V) = 1</td>
            </tr>
            <tr>
                <td>BVC</td>
                <td style="text-align: left;">Branch on Overflow Clear</td>
                <td>Overflow (V) = 0</td>
            </tr>
        </table>
    </div>
</div>
<div class="infoText">
    Since the Branch instructions uses the <i>relative addressing</i> mode (a displacement, not an actual address). This means that a branch 
    can only jump a maximum of +127<sub>10</sub> bytes forward or -128<sub>10</sub> bytes backwards in memory. If the need arises to branch 
    further then that, combine a branch with a JMP.
    <div class="infoCode">
        <div>        BEQ  ISZERO  ;GO TO ISZERO ON ZERO = 1</div>
        <div>        JMP  $9000   ;JMP TO $9000 ON ZERO = 0</div>
        <div>ISZERO:</div>
        <div>        JMP $7000</div>
    </div>
</div>
<div class="infoText">
    In the simulator on this site you do not have to calculate the distance yourself. Simply enter the 16-bit absolute address (or label) and 
    the compiler will handle the rest. If the address/label is not within the range (+127 to -128), the compiler <i>should</i> throw an 
    error.
</div>
<div class="infoText">
    If you are useing a complier that does not accept an absolute address, you have to enter the operand as a 8-bit value. For example:
    <div class="infoCode">
        BCC $B8
    </div>
    The operand is a signed number, so remember:
    <div class="infoMiddle">
        $00 to $7F = 0 to +127<br>
        $80 to $ff = -128 to -1.
    </div>
</div>
<!-- 
<div class="infoText">
    If we assume that a given condition is met 5% of the time, then the 6502 processor will average 2.5 cycles to test a single status 
    flag. The coding of two branch instructions to test a combination of two flags will be executed on the average in 3.75 cycles.
</div>
<div class="infoText">
    The following are a few examples of branch instructions:
    <ol class=infoList>
        <li>
            The sequence
            <div class="infoCode">
                <div>ADC $24</div>
                <div>BCS TOOBIG</div>
            </div>
            branches to label TOOBIG if the add operation produces a carry.
        </li>
        <li>
            The sequence
            <div class="infoCode">
                <div>SBC $24</div>
                <div>BCS TOOSML</div>
            </div>
            branches to label TOOSML if the subtract operation produces a borrow.
        </li>
        <li>
            The sequence
            <div class="infoCode">
                <div>ADC $24</div>
                <div>BEQ DONE</div>
            </div>
            branches to label DONE if the add operation produces a zero result in the accumulator.
        </li>
        <li>
            The sequence
            <div class="infoCode">
                <div>LOOP:</div>
                <div>       .</div>
                <div>       .</div>
                <div>       .</div>
                <div>      DEX</div>
                <div>      BNE LOOP</div>
            </div>
            will loop (to LOOP) until the X register has been decremented to zero. You will see this sort of sequence in many 
            programs that use the X or Y register as a counter.
        </li>
        <li>
            The sequence
            <div class="infoCode">
                <div>SBC $24</div>
                <div>BMI MINUS</div>
            </div>
            branches to label MINUS if the subtract operation produces a negative result in the accumulator.
        </li>
    </ol>
</div>
<div class="infoText">
    Notice that except for Example 4, each of the preceding examples employes a bit of inverted logic in which the more expected 
    circumstance is executed if the branch <i>fails</i>, rather than <i>succeeds</i>. That is, the instructions that immediatly follow 
    the branch instruction represent the usual flow of the program, and the instruction at the branch target are executed as an exception.
    In fact, this approach should be used whenever possible, because a branch test that fails takes one less cycle to execute than a branch 
    test that succeeds.
</div> -->
`