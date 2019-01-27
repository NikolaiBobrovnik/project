import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import css from './serviceCentres.scss'

import Map from 'containers/Map/Map'

const items = [
  {
    name: 'АО «Концерн «Калашников»',
    addr:
      'г. Ижевск, ул. Дерябина 3Б (со стороны ул. Телегина), новая проходная',
    coordinates: ['56.837421', '53.166251'],
    phone: '+7 (3412) 50-47-47',
    site: 'www.lol.kek'
  },
  {
    name: 'АО «Ижевский механический завод»',
    addr:
      'г. Ижевск, ул. Промышленная, 8 (ост. "Механический завод") <br> +7 (3412) 57-38-38 доб. 30400 ',
    coordinates: ['56.834338', '53.240793']
  },
  {
    name: 'ОАО "Мытищинский Машиностроительный Завод"',
    addr: '+7 (495) 583 07 23',
    coordinates: ['55.902960', '37.751006']
  },
  {
    name: 'ССЗ «Вымпел», Верфь братьев «Нобель», Рыбинская верфь',
    addr:
      'Судостроительный кластер <br> г. Рыбинск, ул.Новая д.4 <br> +7 (4855) 20-25-72',
    coordinates: ['58.063515', '38.803545']
  },
  {
    name: 'ZALA AERO GROUP – Беспилотные системы',
    addr: '+7 (3412) 43-05-05',
    coordinates: ['56.845145', '53.282574']
  }
]

class ServiceCentres extends PureComponent {
  render () {
    const {
      props: {
        className,
        isMobile
      }
    } = this

    return (
      <div
        {...{
          className: classNames(
            className,
            css.wrapper,
            isMobile ? css.mobile : css.desktop
          )
        }}
      >
        <h3 {...{ className: css.title }}>Сервисные центры</h3>
        <Map {...{ items, isMobile }} />
      </div>
    )
  }
}

ServiceCentres.defaultProps = {
  isMobile: false,
  className: ''
}

ServiceCentres.propTypes = {
  isMobile: PropTypes.bool,
  className: PropTypes.string
}

export default ServiceCentres
