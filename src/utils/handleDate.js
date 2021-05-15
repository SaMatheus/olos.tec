// DATE-FNS
import format from 'date-fns/format'

const cutDate = (startDate, endDate) => {
  const newStartDay = startDate.length > 10 
    ? startDate.slice(9, 11) 
    : startDate.slice(8, 10)
  const newEndDay = endDate.length > 10
  ? endDate.slice(9, 11) 
  : endDate.slice(8, 10)

  return { newStartDay, newEndDay }
}

const handleDate = () => {
  const currentDay = format(new Date(), 'dd')
  const currentMonth = format(new Date(), 'MM')
  const currentYear = format(new Date(), 'yyyy')

  if(currentDay) {
    let startDate = `${currentYear}-${currentMonth}-0${currentDay - 6}`
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`

    return {
      startDate,
      endDate,
      currentDay,
      currentMonth,
      currentYear
    }
  }
}

export {
  cutDate,
  handleDate
}