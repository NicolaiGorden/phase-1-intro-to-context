const createEmployeeRecord = function(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = function(arrays){
    let records = []
    arrays.map(e => records.push(createEmployeeRecord(e)))
    return records
}

const createTimeInEvent = function(record,date){
    let timeArr = date.split(' ')
    record.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(timeArr[1]),
        date: timeArr[0],
    })
    return record
}

const createTimeOutEvent = function(record,date){
    let timeArr = date.split(' ')
    record.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(timeArr[1]),
        date: timeArr[0],
    })
    return record
}

const hoursWorkedOnDate = function(record,date){
    const timeIn = record.timeInEvents.find(o => o.date === date).hour
    const timeOut = record.timeOutEvents.find(o => o.date === date).hour
    return (timeOut - timeIn)/100
}

const wagesEarnedOnDate = function(record,date){
    return hoursWorkedOnDate(record,date)*record.payPerHour
}

const allWagesFor = function(record){
    let datesWorked = []
    //array of dates worked
    let wagesEarned = []
    //iterate over all dates worked and run wagesEarnedOnDate for them, push all results into wagesEarned, reduce.
    record.timeInEvents.map(e => datesWorked.push(e.date))
    datesWorked.map(e => wagesEarned.push(wagesEarnedOnDate(record, e)))
    return wagesEarned.reduce((a,c)=>a+c)
}

const calculatePayroll = function(array){
    let allWagesEarned = []
    array.map(e => allWagesEarned.push(allWagesFor(e)))
    return allWagesEarned.reduce((a,c)=>a+c)
}