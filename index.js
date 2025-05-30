document.querySelector(".js-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = this

    const formData = {
        day : this.querySelector(".js-day").value.trim(),
        month : this.querySelector(".js-month").value.trim(),
        year : this.querySelector(".js-year").value.trim()
    }
    const emptyInputs = emptyBirthDate(formData)
    if (emptyInputs !== false){
        const inValidDate = isValidDate (formData)
        if (inValidDate) {
        calculateAge(formData)
    }
    } else {
        document.querySelector(".js-years").innerHTML = `--`
        document.querySelector(".js-months").innerHTML = `--`
        document.querySelector(".js-days").innerHTML = `--`   
    }
})
function isValidDate(datai) {
    const day = Number(datai.day)
    const month = Number(datai.month)
    const year = Number(datai.year)
    
    let hasError = false
    
    const date = dayjs(`${year}-${month}-${day}`, 'YYYY-M-D', true)
    if (date.isAfter(dayjs(), 'day')) {
        invaildDMY(false, "day")
        invaildDMY(false, "month")
        invaildDMY(false, "year")
        return false
    }

    if (!Number.isInteger(day) || day < 1 || day > 31) {
        invaildDMY(false, "day")
        hasError = true
    } else {
        invaildDMY(true, "day")
    }

    if (!Number.isInteger(month) || month < 1 || month > 12) {
        invaildDMY(false, "month")
        hasError = true
    } else {
        invaildDMY(true, "month")
    }

    if (!Number.isInteger(year) || year < 1900 || year > 2025) {
        invaildDMY(false, "year")
        hasError = true
    } else {
        invaildDMY(true, "year")
    }

    if (hasError) return false

    if (!date.isValid()) {
        if (date.date() !== day) invaildDMY(false, "day")
        if (date.month() + 1 !== month) invaildDMY(false, "month")
        if (date.year() !== year) invaildDMY(false, "year")
        return false
    }

    if ( month === 4 || month === 6 || month === 9 || month === 11) {
        if ( day === 31) {
            invaildDMY(false, "day")
            return false
        }
    }

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                invaildDMY(false, "day")
                return false
            }
        } else {
            if (day > 28) {
                invaildDMY(false, "day")
                return false
            }
        }
    }

    // الكل سليم ✅
    return true
}
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}
function invaildDMY (element , type) {
    if (!element) {
        document.querySelector(`.must-${type}`).classList.add("show")
        document.querySelector(`.js-${type}`).classList.add("must-input")
        document.querySelector(`.js-label-${type}`).classList.add("must-label")
    } else {
        document.querySelector(`.must-${type}`).classList.remove("show")
        document.querySelector(`.js-${type}`).classList.remove("must-input")
        document.querySelector(`.js-label-${type}`).classList.remove("must-label")
    }
}
function emptyBirthDate ( datai ) {
    const validDay = emptyInput(datai.day, "day")
    const validMonth = emptyInput(datai.month, "month")
    const validYear = emptyInput(datai.year, "year")
    return ( validDay && validMonth && validYear)
}
function emptyInput (element , type) {
    if (!element) {
        document.querySelector(`.warn-${type}`).classList.add("show")
        document.querySelector(`.js-${type}`).classList.add("warn-input")
        document.querySelector(`.js-label-${type}`).classList.add("warn-label")
        return false
    } else {
        document.querySelector(`.warn-${type}`).classList.remove("show")
        document.querySelector(`.js-${type}`).classList.remove("warn-input")
        document.querySelector(`.js-label-${type}`).classList.remove("warn-label")
        return true
    }
}
function calculateAge (formData) {
    const birthDate = dayjs(`${formData.year}-${formData.month}-${formData.day}`, 'YYYY-MM-DD')
    const now = dayjs()
    const years = now.diff(birthDate, 'year')
    document.querySelector(".js-years").innerHTML = `${years}`
    const months = now.subtract(years, 'years').diff(birthDate, 'month')
    document.querySelector(".js-months").innerHTML = `${months}`
    const days = now.subtract(years, 'years').subtract(months, 'months').diff(birthDate, 'day')
    document.querySelector(".js-days").innerHTML = `${days}`   
}