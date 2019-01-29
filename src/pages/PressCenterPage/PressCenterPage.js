import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { connect } from "react-redux";
import toJS from "HOC/toJS";

import css from "./pressCenterPage.scss";

import FormSubscribe from "containers/FormSubscribe/FormSubscribe";
import PressCenterNews from "containers/PressCenterNews/PressCenterNews";
import FormContacts from "containers/FormContacts/FormContacts";
import HeroBanner from "containers/HeroBanner/HeroBanner";
import NavBar from "containers/NavBar/NavBar";
// import Information from 'containers/Information/Information'

function mapStateToProps(state) {
  return {
    navBar: state.getIn([
      "remoteData",
      "PressCenterBanner",
      "response",
      "navBar"
    ])
  };
}

@withRouter
@connect(mapStateToProps)
@toJS
class PressCenterPage extends PureComponent {
  componentWillMount() {
    // если открываем страницу, а params пустой, то открываем первый таб
    if (!this.props.match.params.iCode) {
      this.props.history.push("/press-center/news/");
    }
  }

  componentWillReceiveProps(nextProps) {
    // если изменяется страница, а params пустой, то открываем первый таб
    if (!nextProps.match.params.iCode) {
      this.props.history.push("/press-center/news/");
    }
  }

  render() {
    const {
      isMobile,
      match: {
        params: { iCode }
      },
      navBar
    } = this.props;

    return (
      <div
        {...{
          className: classNames(
            css.wrapper,
            isMobile ? css.mobile : css.desktop
          )
        }}
      >
        <HeroBanner
          {...{
            isMobile,
            url: "/press-center/tabs.php",
            reducerKey: "PressCenterBanner",
            className: isMobile ? css.banner_mobile : css.banner_desktop,
            bannerProps: {
              parallaxHeight: "70rem",
              blockPaddingBottom: isMobile ? "m" : "l"
            },
            breadcrumbsFromTabs: [
              { link: "/press-center/", title: "Пресс-центр" }
            ],
            code: iCode
          }}
        />
        <NavBar
          {...{
            isMobile,
            code: iCode,
            navBar
          }}
        />
        {(!iCode || iCode === "news") && (
          <PressCenterNews {...{ isMobile, className: css.news }} />
        )}
        {iCode === "contacts" && (
          <FormContacts
            {...{
              className: css.contacts,
              requestUrl: "/press-center/contacts.php",
              reducerKey: "pressCenterContacts",
              form: "pressCenterContacts",
              isMobile,
              withForm: false,
              reCaptchaAction: "group_mail_press-center"
            }}
          />
        )}
        <FormSubscribe {...{ isMobile, className: css.subscribe }} />
        {/* <Information {...{ isMobile }} /> */}
      </div>
    );
  }
}

PressCenterPage.defaultProps = {
  isMobile: false
};

PressCenterPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  isMobile: PropTypes.bool,
  navBar: PropTypes.object
};

export default PressCenterPage;
