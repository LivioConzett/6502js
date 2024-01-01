
const INTERUPTS_TEXT =
`
<div class="infoTitle">Interrupts</div>
<div class="infoText">
    The 6502 processor has two types of external interrupts.
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td><o>IRQ</o></td>
                <td><u>I</u>nterrupt <u>R</u>e<u>q</u>uest</td>
            </tr>
            <tr>
                <td><o>NMI</o></td>
                <td><u>N</u>on-<u>M</u>askable <u>I</u>nterrupt</td>
            </tr>
        </table>
    </div>
    When either of these pins get pulled to ground, the processors finishes the current instruction then goes to a corresponding 
    location in memory where they get an address. The program counter then gets set to that address and the processor starts to 
    execute the code there. This is simular to the reset up vector where the proccessor goes to get the first memory location 
    where to start executing code from. Infact theses three vectors are right next to eachother.
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <th>Location</th><th>Description</th>
            </tr>
            <tr>
                <td>$FFFA - $FFFB</td>
                <td>vector for NMI</td>
            </tr>
            <tr>
                <td>$FFFC - $FFFD</td>
                <td>vector for starup / reset</td>
            </tr>
            <tr>
                <td>$FFFE - $FFFF</td>
                <td>vector for IRQ</td>
            </tr>
        </table>
    </div>
    For example if address $FFFA holds the value $10 and address $FFFB holds the value $90 then, when the NMI pin gets pulled to ground, the
    processor would start executing code at memory loaction $9010.
</div>
<div class="infoTitle1">IRQ</div>
<div class="infoText">
    The IRQ is a maskable interrupt, meaning that it can be enabled and disabled. If the IRQ bit gets pulled to ground and the Interrupt Disable flag (I)
    in the processor status register is set to 0 then the interrput is accepted. If the Interrupt Disable flag is set to 1, the IRQ is ignored.<br>
    The I flag can be set and cleared using:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <th>Instruction</th><th>Description</th>
            </tr>
            <tr>
                <td>CLI</td>
                <td><u>Cl</u>ear <u>I</u>nterrupt Disable Bit</td>
            </tr>
            <tr>
                <td>SEI</td>
                <td><u>Se</u>t <u>I</u>nterrupt Disable Bit</td>
            </tr>
        </table>
    </div>
</div>
<div class="infoText">
    When an interrupt is called and accepted, a series of instructions are executed:
    <ol class="infoList">
        <li>
            The Interrupt Disable flag (I) is set to 1 to stop other interrupts from interrupting.
        </li>
        <li>
            The high and low bytes of the program counter are pushed onto the stack.
        </li>
        <li>
            The processor status register is pushed onto the stack.
        </li>
        <li>
            The contents of the dedicated interrupt vector ($FFFA - $FFFB or $FFFE - $FFFF) is loaded into the program counter.
        </li>
    </ol>
</div>
<div class="infoTitle1">Return from Interrupt (RTI)</div>
<div class="infoText">
    Once the routine called by the interrupt is finished one should use the RTI instruction to return from the interrupt subroutine
    to continue on where ever thr program was before the interrupt.
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr>
                <td>RTI</td>
                <td><u>R</u>e<u>t</u>urn from <u>I</u>nterrupt</td>
            </tr>
        </table>
    </div>
    When executed, the RTI will do the following:
    <ol class="infoList">
        <li>
            The processor status register is pulled from the stack.
        </li>
        <li>
            The low and high bytes of the old address are pulled from the stack and placed into the program counter.
        </li>
        <li>
            The Interrupt Disable flag (I) is reset, allowing interrupts to take place again.
        </li>
    </ol>
</div>
<div class="infoTitle1">NMI</div>
<div class="infoText">
    The NMI, in contrast to the IRQ, is a <i>nonmaskable</i> inturrupt. This means the interrupt is executed no matter if the Interrupt Disabled flag
    (I) is set or not. The NMI does basically the same as the IRQ apart from getting its vector from a different place.<br>
    The NMI has a higher priority than the IRQ. So, if both get triggered at the same time the NMI will execute first.
</div>
<div class="infoTitle1">Break Instruction (BRK)</div>
<div class="infoText">
    The BRK instruction is a software interrupt. It does basically the same thing as the IRQ only that it is triggere by the program and not 
    the hardware.<br>
    The BRK instruction will set the Break flag (B) in the processor status register to 1, then increment the program counter by one, then start 
    the IRQ sequence.<br>
    The B flag isn't accutally set in the status register, but only in the value pushed onto stack for the status register. That means, if you want 
    to check if the B flag has been set, you have to pull from the stack into the Accumulator and then check there for the B flag.
    <div class="infoCode">
        <div>PLA            ;PULL THE STATUS REGISTER FROM THE STACK</div>
        <div>PHA            ;PUSH IT BACK ONTO THE STACK</div>
        <div>               ;(SO THE RTI LATER ON PULLS THE CORECT DATA)</div>
        <div>AND #%00010000 ;MASK OUT THE B FLAG</div>
        <div>BNE DOBRKSTUFF ;IF B IS SET DO BREAK STUFF</div>
    </div>
</div>
`