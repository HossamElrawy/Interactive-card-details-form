renderPage ()


function renderPage () {
    document.querySelector(".js-form").innerHTML = `
    <div class="vertiacal-div">
      <label for="">
        Cardholder Name
      </label>
      <input type="text" class="js-holder" placeholder="e.g. Jane Appleseed">
      <p class="warn-message js-warn-holder">
        Can't be blank
      </p>
      <p class="warn-message js-holder-warn">
        Wrong format, letters only
      </p>
    </div>
    <div class="vertiacal-div">
      <label for="">
        Card Number
      </label>
      <input type="text" class="js-number" placeholder="e.g. 1234 5678 9123 0000" maxlength="19">
      <p class="warn-message js-warn-number">
        Can't be blank
      </p>
      <p class="warn-message js-number-warn">
        Wrong format, numbers only
      </p>
      <p class="warn-message js-number-min">
        Minimum 16 digits
      </p>
    </div>    
    <div class="horizontal-div">
      <div class="vertiacal-div">
        <label for="">
          Exp. Date (MM/YY)
        </label>
        <div class="smalling">
          <div class="some-div">
            <input type="text" class="js-mm" placeholder="MM" maxlength="2">
            <p class="warn-message js-invalid-month">
              Invalid Month
            </p>
          </div>
          <div class="some-div">
            <input type="text" class="js-yy" placeholder="YY" maxlength="2">
            <p class="warn-message js-invalid-year">
              Invalid Year
            </p>
          </div>
        </div>
        <p class="warn-message js-warn-mm js-warn-yy">
          Can't be blank
        </p>
        <p class="warn-message js-mm-warn js-yy-warn">
          Wrong format, numbers only
        </p>
        <p class="warn-message js-mm-min js-yy-min">
          Minimum 2 digits
        </p>
      </div>
      <div class="vertiacal-div">
        <label for="">
          CVC
        </label>
        <input type="text" class="js-cvc" placeholder="e.g. 123" maxlength="3">
        <p class="warn-message js-warn-cvc">
          Can't be blank
        </p>
        <p class="warn-message js-cvc-warn">
          Wrong format, numbers only
        </p>
        <p class="warn-message js-cvc-min">
          Minimum 3 digits
        </p>
      </div>
    </div>  
    <button>
      Confirm
    </button>
    `
    attachInputListner()
}
document.querySelector(".js-form").addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = {
        cardHolder : this.querySelector(".js-holder").value.trim(),
        cardNumber : this.querySelector(".js-number").value.trim(),
        cardMM : this.querySelector(".js-mm").value.trim(),
        cardYY : this.querySelector(".js-yy").value.trim(),
        cardCVC : this.querySelector(".js-cvc").value.trim()
    }
    const isEmptyInput = isEmpty (formData)
    if (isEmptyInput !== false) {
        const isValidInput = isValid( formData )
        if (isValidInput !== false) {
            const isMinimumInput = isMinimum ( formData )
            if (isMinimumInput  !== false) {
                const isValidDate = validateDate(formData)
                if (isValidDate !== false) {
                    document.querySelector(".js-cardnumber").innerHTML=`${formData.cardNumber}`
                    document.querySelector(".js-cardholder").innerHTML=`${formData.cardHolder}`
                    document.querySelector(".js-expdate").innerHTML=`${formData.cardMM}`+"/"+`${formData.cardYY}`
                    document.querySelector(".js-c-v-c").innerHTML=`${formData.cardCVC}`
                    this.innerHTML =    `<div class="thank-div">
                                            <img src="images/icon-complete.svg" alt="">
                                            <p class="thank-word">
                                                Thank you!
                                            </p>
                                            <p class="added-para">
                                                We've added your card details
                                            </p>
                                            <button class="Continue-button js-continue-button">
                                                Continue
                                            </button>
                                        </div>`
                                        attachCotinueListner ()
                }
            }
        }
    }
})
function attachCotinueListner () {
    document.querySelector(".js-continue-button").addEventListener("click", () => {
        renderPage();
        document.querySelector(".js-cardnumber").innerHTML=`0000 0000 0000 0000`
        document.querySelector(".js-cardholder").innerHTML=`Jane Appleseed`
        document.querySelector(".js-expdate").innerHTML=`00`+"/"+`00`
        document.querySelector(".js-c-v-c").innerHTML=`000`
    })
}
function attachInputListner () {
    document.querySelector('.js-number').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    e.target.value = value;
    });
}
function validateDate (data) {
    const month = Number(data.cardMM)
    const year = Number(data.cardYY)
    const currentYear = new Date().getFullYear();
    const lastTwoDigits = currentYear % 100;
    const warnMonth = document.querySelector(`.js-invalid-month`);
    const inputMonth = document.querySelector(`.js-mm`);
    const warnYear = document.querySelector(`.js-invalid-year`);
    const inputYear = document.querySelector(`.js-yy`);
    let inValidM = false
    let inValidY = false

    if (month > 12 || month < 1) {
        warnMonth.classList.add("show");
        inputMonth.classList.add("warn-input");
        inValidM = false
    } else {
        warnMonth.classList.remove("show");
        inputMonth.classList.remove("warn-input");
        inValidM = true
    }

    if (year <= lastTwoDigits) {
        warnYear.classList.add("show");
        inputYear.classList.add("warn-input");
        inValidY = false
    } else {
        warnYear.classList.remove("show");
        inputYear.classList.remove("warn-input");
        inValidY = true
    }

    return (inValidM && inValidY)
}
function isMinimum(data) {
    const cardNumberValid = isInputMin(data.cardNumber, "number", 19);
    const cardMMValid = isInputMin(data.cardMM, "mm", 2);
    const cardYYValid = isInputMin(data.cardYY, "yy", 2);
    const cardCVCValid = isInputMin(data.cardCVC, "cvc", 3);
    
    return cardNumberValid && cardMMValid && cardYYValid && cardCVCValid;
}

function isInputMin(element, type, min) {
    const warnElement = document.querySelector(`.js-${type}-min`);
    const inputElement = document.querySelector(`.js-${type}`);
    
    // Check if element meets minimum length requirement
    const isValid = element.length >= min;
    
    // For MM/YY fields that share a warning
    if (type === "mm" || type === "yy") {
        const otherElement = type === "mm" 
            ? document.querySelector(".js-yy").value 
            : document.querySelector(".js-mm").value;
        
        // For MM/YY, only remove warning if BOTH are valid
        if (isValid && otherElement.length >= min) {
            warnElement.classList.remove("show");
            inputElement.classList.remove("warn-input");
            return true;
        } else {
            warnElement.classList.add("show");
            inputElement.classList.add("warn-input");
            return false;
        }
    }
    
    // For all other fields
    if (isValid) {
        warnElement.classList.remove("show");
        inputElement.classList.remove("warn-input");
        return true;
    } else {
        warnElement.classList.add("show");
        inputElement.classList.add("warn-input");
        return false;
    }
}
function isValid (data) {
    const cardHolderValid =  isInputValid(data.cardHolder, "holder")
    const cardNumberValid = isInputValid(data.cardNumber, "number")
    const cardMMValid = isInputValid(data.cardMM, "mm");
    const cardYYValid = isInputValid(data.cardYY, "yy");
    const cardCVCValid = isInputValid(data.cardCVC, "cvc")
    const isAnyInvalid =  cardHolderValid && cardNumberValid && cardMMValid && cardYYValid && cardCVCValid
    return isAnyInvalid
}
function isInputValid(element, type) {
    const warnElement = document.querySelector(`.js-${type}-warn`);
    const inputElement = document.querySelector(`.js-${type}`);
    
    let isValid = true;
    
    if (type === "holder") {
        if (/\d/.test(element)) {
            isValid = false;
        }
    } 
    else {
        if (/[a-zA-Z]/.test(element)) {
            isValid = false;
        }
    }
    
    // Handle MM/YY special case
    if (type === "mm" || type === "yy") {
        const otherElement = type === "mm" 
            ? document.querySelector(".js-yy").value 
            : document.querySelector(".js-mm").value;
            
        if (!isValid) {
            warnElement.classList.add("show");
            inputElement.classList.add("warn-input");
            return false;
        } else {
            inputElement.classList.remove("warn-input");
            // Only remove warning if BOTH are valid
            if (otherElement && !/[a-zA-Z]/.test(otherElement)) {
                warnElement.classList.remove("show");
            }
            return true;
        }
    }
    
    // Normal field handling
    if (!isValid) {
        warnElement.classList.add("show");
        inputElement.classList.add("warn-input");
        return false;
    } else {
        inputElement.classList.remove("warn-input");
        warnElement.classList.remove("show");
        return true;
    }
}
function isEmpty (data) {
    const cardHolderEmpty =  isInputEmpty(data.cardHolder, "holder")
    const cardNumberEmpty = isInputEmpty(data.cardNumber, "number")
    const cardMMEmpty = isInputEmpty(data.cardMM, "mm", data.cardYY); // Pass YY value
    const cardYYEmpty = isInputEmpty(data.cardYY, "yy", data.cardMM); // Pass MM value
    const cardCVCEmpty = isInputEmpty(data.cardCVC, "cvc")
    const isAnyEmpty =  cardHolderEmpty && cardNumberEmpty && cardMMEmpty && cardYYEmpty && cardCVCEmpty
    return isAnyEmpty
}

function isInputEmpty(element, type, relatedElement = null) {
    const warnElement = document.querySelector(`.js-warn-${type}`);
    const inputElement = document.querySelector(`.js-${type}`);

    if (!element) {
        warnElement.classList.add("show");
        inputElement.classList.add("warn-input");
        return false;
    } else {
        inputElement.classList.remove("warn-input");

        if (type === "mm" || type === "yy") {
            if (relatedElement) {
                warnElement.classList.remove("show");
            }
        } else {
            warnElement.classList.remove("show");
        }
        return true;
    }
}