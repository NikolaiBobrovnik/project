import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './profiVacancy.scss'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import Button from 'kalashnikov-framework/lib/components/Button'
import LinkCardList from 'kalashnikov-framework/lib/components/LinkCardList'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

const ProfiVacancy = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'career/profi.php'
        }
      }}
    >
      {({
        response: {
          data: {
            vacancies: { items, title, description, link, job, tel, email }
          }
        }
      }) => {
        return (
          <MainAsideSection
            {...{
              asideWidth: 3,
              reverse: true,
              separator: true,
              title,
              description: description,
              className,
              isMobile,
              asideChildren: (
                <div>
                  {job && <h5 {...{ className: css.job }}>{job}</h5>}
                  {tel && <p {...{ className: css.tel }}>{tel}</p>}
                  {email && (
                    <a {...{ className: css.email, href: 'mailto:' + email }}>
                      {email}
                    </a>
                  )}
                  {!isMobile &&
                  <Button
                    {...{
                      isMobile,
                      title: 'Подробнее',
                      link: link,
                      icon: <MdKeyboardArrowRight />
                    }}
                  />
                  }
                </div>
              )
            }}
          >
            <LinkCardList
              {...{
                isMobile,
                className: css.container_vacanciesLink,
                list: items
              }}
            />
          </MainAsideSection>
        )
      }}
      {/* {({ */}
      {/* response: { */}
      {/* data: { */}
      {/* vacancies: { items, title, description, link, job, tel, email } */}
      {/* } */}
      {/* } */}
      {/* }) => { */}
      {/* return ( */}
      {/* <MainAsideSection */}
      {/* {...{ */}
      {/* asideWidth: 3, */}
      {/* reverse: true, */}
      {/* separator: true, */}
      {/* title, */}
      {/* description: description, */}
      {/* className, */}
      {/* asideChildren: ( */}
      {/* <div> */}
      {/* {job && <h5 {...{ className: css.job }}>{job}</h5>} */}
      {/* {tel && <p {...{ className: css.tel }}>{tel}</p>} */}
      {/* {email && ( */}
      {/* <a {...{ className: css.email, href: 'mailto:' + email }}> */}
      {/* {email} */}
      {/* </a> */}
      {/* )} */}
      {/* <Button */}
      {/* {...{ */}
      {/* title: 'Подробнее', */}
      {/* link: link, */}
      {/* icon: <MdKeyboardArrowRight /> */}
      {/* }} */}
      {/* /> */}
      {/* </div> */}
      {/* ) */}
      {/* }} */}
      {/* > */}
      {/* <LinkCardList */}
      {/* {...{ */}
      {/* className: css.container_vacanciesLink, */}
      {/* list: items */}
      {/* }} */}
      {/* /> */}
      {/* </MainAsideSection> */}
      {/* ) */}
      {/* }}} */}
    </RemoteDataProvider>
  )
}

ProfiVacancy.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default ProfiVacancy
