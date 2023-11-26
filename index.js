// Your code here
function createEmployeeRecord(testEmployee){
    return{
        firstName:testEmployee[0],
        familyName:testEmployee[1],
        title:testEmployee[2],
        payPerHour:testEmployee[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}


function createEmployeeRecords(testEmployees){
    return testEmployees.map(createEmployeeRecord)
}

function createDSObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(object, dateStamp){
    object.timeInEvents.push(createDSObj("TimeIn", dateStamp))
    return object
}


function createTimeOutEvent(object, dateStamp){
    object.timeOutEvents.push(createDSObj("TimeOut", dateStamp))
    return object
}

function hoursWorkedOnDate(object, dateYMD){
    const timeIn = object.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = object.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(object, dateYMD){

    const wage = object.payPerHour
    const hoursWorked = hoursWorkedOnDate(object, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(object){
    const allWages = object.timeInEvents.map((day) => {return wagesEarnedOnDate(object, day.date)})
    return allWages.reduce((a, b) => a + b)
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((a, b) => a + b)
}