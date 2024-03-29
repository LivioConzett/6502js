
const JUMP_TEXT =
`
<div class="infoTitle">Jump</div>
<div class="infoText">
    The JMP instruction will jump to a given place in memory and continue executing the program there. It is <i>unconditional</i> and 
    will happen everytime the processor gets to the JMP instruction. It can be used to jump both forward and backward to anywhere in the 
    possible address space.
</div>
<div class="infoText">
    Most of the times the JMP instruction is used with a label, but it can also just be an absolute address.
    <div class="infoCode">
        <div>        .</div>
        <div>        .</div>
        <div>        .</div>
        <div>       LDA $03</div>
        <div>       BEQ HERE</div>
        <div>       JMP THERE</div>
        <div>HERE: </div>
        <div>       STA $24</div>
        <div>        .</div>
        <div>        .</div>
        <div>        .</div>
        <div>THERE:</div>
        <div>       SEC</div>
        <div>       SBC $22</div>
        <div>        .</div>
        <div>        .</div>
        <div>        .</div>
    </div>
    In the example the value from memory location $0003 is loaded into the Accumulator. If the value is zero the program will branch to HERE.
    If the value if not zero the program will jump to THERE.
</div>
`