import DateHelper from '../helpers/date.helper'
import { VacancyStatus } from '../enum/vacancy'
import { User } from '../enum/user'
const Vacancy = require('../models/vacancy')
const UserModel = require('../models/User.ts')

const self = module.exports = {
  async requestVacancy (req, res) {
    const { valor, idEstablishment, checkIn, checkOut } = req.body
    const { userId } = req

    if (!checkIn && !checkOut) {
      return res.status(400).send({
        message: 'O horário de check-in e checkout precisam ser informados',
        type: 'error'
      })
    }

    if (!DateHelper.compareDateIsGreater(checkIn, checkOut)) {
      UserModel.findOne({ _id: userId }, function (err: any = null, user: any) {
        Vacancy.create({
          status: VacancyStatus.Scheduled,
          valor: valor,
          establishment: idEstablishment,
          client: user
        }).then(response => {
          return res.status(200).send({
            message: `Sua vaga foi agendada para o dia ${DateHelper.setFormatDate(response.checkIn)}`,
            type: 'success'
          })
        }, error => {
          return res.status(400).send({
            message: 'Ocorreu um erro ao agendar sua vaga!',
            type: 'error'
          })
        })
      })
    } else {
      return res.status(400).send({
        message: 'Sua data de checkout precisa ser depois do check-in',
        type: 'error'
      })
    }
  },

  async getCountersVacancy (req, res) {
    const { userId } = req

    const user = await UserModel.findOne({ _id: userId, perfil: User.Establishment })
    const vacancysInEstablishment = await Vacancy.find({
      establishment: userId,
      status: VacancyStatus.Scheduled
    })

    const totalVancacysByEstablishment = user.vagas
    const totalBusys = vacancysInEstablishment.length

    return res.status(200).send({
      vacanciesAvailables: totalVancacysByEstablishment - totalBusys,
      vacanciesBusy: totalBusys
    })
  },

  async getVacanciesBusy (req, res) {
    const { userId } = req

    const vacancysInEstablishment = await Vacancy.find({
      establishment: userId,
      status: VacancyStatus.Scheduled
    })

    return res.status(200).send({
      data: vacancysInEstablishment,
      success: true
    })
  },

  async canceledVacancy (req, res) {
    const { observacao, id } = req.body
    const query = { _id: id }

    const dataSend = {
      observacao: observacao,
      status: VacancyStatus.Canceled,
      checkOut: Date.now()
    }

    await Vacancy.findOneAndUpdate(query, dataSend, { upsert: false }, function (err, doc) {
      if (err) return res.send(500, { error: err })
      return res.send({
        message: `A vaga foi cancelada e o motivo foi sinalizado para ${doc.client.nome}`,
        success: true
      })
    })
  }

}
