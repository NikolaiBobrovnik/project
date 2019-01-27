import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import css from './loyaltyProgram.scss'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

export default class LoyaltyProgram extends PureComponent {
  render () {
    const {
      props: {
        isMobile,
        program,
        pdf
      }
    } = this
    return (
      <section
        {...{
          className: classNames(css.wrapper, {
            [css.mobile]: isMobile,
            [css.desktop]: !isMobile
          })
        }}
      >
        <div {...{ className: css.container }}>
          {program.img &&
          <img {...{
            className: css.img,
            src: program.img,
            alt: ''
          }} />
          }
          {program.title &&
          <div {...{ className: css.title }}>{program.title}</div>
          }
          {program.linkText &&
          <a
            {...{
              href: program.link,
              className: css.button
            }}
          >
            {program.linkText}
            <MdKeyboardArrowRight {...{ className: css.arrow }} />
          </a>
          }
        </div>
        {pdf.link &&
        <a {...{ className: css.pdf, href: pdf.link, target: '_blank' }}>
          <div {...{ className: css.pdf_left }}>
            <img {...{
              className: css.imgPdf,
              src: '/images/icons/away_icon.svg',
              alt: ''
            }} />
          </div>
          <div {...{ className: css.pdf_right }}>
            {pdf.title &&
            <div {...{ className: css.pdfTitle }}>{pdf.title}</div>
            }
            {pdf.size &&
            <div {...{ className: css.pdfSize }}>{pdf.size}</div>
            }
          </div>
        </a>
        }
      </section>
    )
  }
}

LoyaltyProgram.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  program: PropTypes.object,
  pdf: PropTypes.object
}
