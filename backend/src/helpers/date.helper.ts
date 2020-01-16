import { zonedTimeToUtc } from 'date-fns-tz'
import { pt } from 'date-fns/locale'
import { format, compareAsc } from 'date-fns'

export default class DateHelper {
  static setTimezone (date: Date) {
    return zonedTimeToUtc(date, 'America/Sao_Paulo')
  }

  static setFormatDate (date: Data) {
    return format(
      zonedTimeToUtc(date, 'America/Sao_Paulo'),
      "dd 'de' MMMM', às 'HH:mm'h'", {
        locale: pt
      }
    )
  }

  static compareDateIsGreater (dateA, dateB) {
    const result = compareAsc(dateA, dateB)

    return result !== -1
  }
}
