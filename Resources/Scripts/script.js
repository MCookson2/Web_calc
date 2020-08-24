class Calculator {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue
        this.currentValue = currentValue
        this.clear()
        this.computed = false  // Add computed variable so that Calculator can save state after compute is called.  This fixes issue with appending numbers to result instead of starting again.
    }

    clear() {
        this.currentVal = ''
        this.previousVal = ''
        this.operation = undefined
    }

    delete() {
        this.currentVal = this.currentVal.slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentVal.includes('.')) return  // Logic to stop multiple '.' being added to the calculator.
        this.currentVal = this.currentVal.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
          }
      
        this.operation = operation
        this.previousVal = this.currentVal
        this.currentVal = ''
    }

   compute() {
        let result;
        const prev = parseFloat(this.previousVal);
        const current = parseFloat(this.currentVal);

        switch(this.operation) {
            case '+':
                result = prev + current
                break;
            case '-':
                result = prev - current
                break;
            case '*':
                result = prev * current
                break;
            case '/':
                result = prev / current
                break;
            default:
                return
        }
        this.currentVal = result.toFixed(2)
        this.computed = true;  // computed being set to true.
        this.operation = undefined;
        this.previousVal = "";
   }

   updateDisplay() {
    this.currentValue.innerText = this.currentVal
    if (this.operation != null) {
        this.previousValue.innerText = `${(this.previousVal)} ${this.operation}`
    } else {
        this.previousValue.innerText = ''
    }
   }
   
 }


const numbers = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all-clear]')
const previousValue = document.querySelector('[data-previous-operand]')
const currentValue = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousValue, currentValue)

//console.log(numbers)
//Convert for loop below to forEach on array object line 95.
/*for(let i = 0; i < numbers.length; i++) {
    //console.log(numbers[i].innerText)
    numbers[i].addEventListener('click', function(){
        calculator.appendNumber(numbers[i].innerText)
        calculator.updateDisplay()
    })
}*/

numbers.forEach(button => {
    button.addEventListener('click', function() {

        if(calculator.previousVal === "" && calculator.currentVal !== "" && calculator.computed) {
            calculator.currentVal = "";
            calculator.computed = false;
        }

        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operations.forEach(button => {
    button.addEventListener('click', function() {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay() 
    })
})

equalsButton.addEventListener('click', function(){
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', function() {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', function() {
    calculator.delete()
    calculator.updateDisplay()
})