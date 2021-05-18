// DATE-FNS
import format from 'date-fns/format'

const subtractedCurrentDay = (currentDay) => {
  const startDay = currentDay - 6
  const newStartDay = startDay <= 10 ? `0${startDay}` : startDay

  return { newStartDay }
}
const subtractedCurrentMonth = (currentDay, currentMonth, currentYear) => {
  const day = currentDay - 6
  const newMonth = currentMonth - 1
  const daysCurrentMonth = new Date(currentYear, newMonth, 0).getDate();
  const newDay = daysCurrentMonth + day
  
  return { newDay, newMonth}
}

const subtractedCurrentYear = (currentMonth, currentYear) => {
  const newStartMonth = String(Number(currentMonth) + 11)
  const newStartYear = currentYear - 1
  
  return { newStartMonth, newStartYear}
}

const handleDate = () => {
  const currentDay = format(new Date(), 'dd')
  const currentMonth = format(new Date(), 'MM')
  const currentYear = format(new Date(), 'yyyy')

  if(currentDay) {
    const { newStartDay } = subtractedCurrentDay(currentDay)
    const { newDay, newMonth } = subtractedCurrentMonth(currentDay, currentMonth, currentYear)
    const { newStartMonth, newStartYear } = subtractedCurrentYear(currentMonth, currentYear)

    let startDate = `${currentYear}-${currentMonth}-${newStartDay}`
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`

    if(currentDay - 6 >= 1) {
      startDate = `${currentYear}-${currentMonth}-${newStartDay}`
    }
    if(currentDay - 6 < 1) {
      startDate = `${currentYear}-${newMonth}-${newDay}`
    }
    if(currentMonth - 1 < 1) {
      startDate = `${newStartYear}-${newStartMonth}-${newDay}`
    }

    return {
      startDate,
      endDate,
    }
  }
}

export {
  handleDate
}