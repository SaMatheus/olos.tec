// DATE-FNS
import format from 'date-fns/format'

const cutDate = (currentDay) => {
  const dayLength = currentDay - 6
  const newStartDay = dayLength <= 10 ? `0${dayLength}` : dayLength

  return { newStartDay }
}

const handleDate = () => {
  const currentDay = format(new Date(), 'dd')
  const currentMonth = format(new Date(), 'MM')
  const currentYear = format(new Date(), 'yyyy')

  if(currentDay) {
    const { newStartDay} = cutDate(currentDay)
    let startDate = `${currentYear}-${currentMonth}-${newStartDay}`
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`

    return {
      startDate,
      endDate,
    }
  }
}

export {
  handleDate
}