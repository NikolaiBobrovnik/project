import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './homeCareer.scss'

import BrandCareerBox from 'kalashnikov-framework/lib/components/BrandCareerBox'
import Button from 'kalashnikov-framework/lib/components/Button'
import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

const HomeCareer = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: '/home/career.php'
        }
      }}
    >
      {({ response: { data: { title, description, link, items } } }) => {
        return (
          <MainAsideSection
            {...{
              isMobile,
              separator: true,
              title,
              reverse: true,
              description: description,
              className,
              asideChildren: !isMobile && <Button
                {...{
                  className: css.structurebutton,
                  title: 'Подробнее',
                  link: link,
                  icon: <MdKeyboardArrowRight />
                }}
              />
            }}
          >
            <BrandCareerBox
              {...{
                className: isMobile ? css.container_brand : '',
                items: items,
                isMobile
              }}
            />
          </MainAsideSection>
        )
      }}
    </RemoteDataProvider>
  )
}

HomeCareer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default HomeCareer
