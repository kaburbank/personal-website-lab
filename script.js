// Define button constants on calculator from html using query selector
const numberButtons = document.querySelectorAll('[number]')
const operationButtons = document.querySelectorAll('[operation]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[all-clear]')
const previousOperandInput = document.querySelector('[previous-operand]')
const currentOperandInput = document.querySelector('[current-operand]')

// Add event listeners to all buttons so that they update the display when clicked
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})


// Define a class for Calculator as an object to store output of calculations
class Calculator {
  constructor(previousOperandInput, currentOperandInput) {
    this.previousOperandInput = previousOperandInput
    this.currentOperandInput = currentOperandInput
    this.clear()
  }

// Create calculator function for AC
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

// Create calculator function for DEL using .slice()
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

// Create calculator function for decimal by creating a string that links both numbers with the decimal
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

// Create function for inputting the operation
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

// Create function to execute calculation by converting opperand strings to numbers and then executing the switch function
  compute() {
    let calculation
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        calculation = previous + current
        break
      case '-':
        calculation = previous - current
        break
      case '*':
        calculation = previous * current
        break
      case '÷':
        calculation = previous / current
        break
      default:
        return
    }
    this.currentOperand = calculation
    this.operation = undefined
    this.previousOperand = ''
  }

// Create function to display numbers as as string and handle decimals
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

// Create function to update dispaly during calculation
  updateDisplay() {
    this.currentOperandInput.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandInput.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandInput.innerText = ''
    }
  }
}

// Create a new calculator constant that passes inputs through the constructor so that they operatate on the Calculator object
const calculator = new Calculator(previousOperandInput, currentOperandInput)

