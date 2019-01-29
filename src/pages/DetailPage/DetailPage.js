import React, { PureComponent } from "react";
import { RemoteDataProvider } from "remote-data-provider";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { isBrowser } from "utils";

import css from "./detailPage.scss";
import classNames from "classnames";

import BrandHeroBanner from "kalashnikov-framework/lib/components/BrandHeroBanner";
import BrandLinkLayout from "kalashnikov-framework/lib/components/BrandLink/BrandLinkLayout";
import ActivitiesCardsList from "kalashnikov-framework/lib/components/ActiivitiesCardsList";
import FormSubscribe from "containers/FormSubscribe/FormSubscribe";
import News from "containers/News/News";
import MainAsideSection from "kalashnikov-framework/lib/components/MainAsideSection";
import PhotoSlider from "kalashnikov-framework/lib/components/PhotoSlider";
import InzhiniringContent from "containers/InzhiniringContent/InzhiniringContent";
import DetailVideo from "containers/DetailVideo/DetailVideo";
import DocumentationLinkLayout from "kalashnikov-framework/lib/components/DocumentationLinkLayout";
import TrainingCardLayout from "kalashnikov-framework/lib/components/TrainingCardLayout";
// import ExamplesProductsList from 'kalashnikov-framework/lib/components/ExamplesProductsList'
// import Information from 'containers/Information/Information'

@withRouter
class DetailPage extends PureComponent {
  render() {
    const {
      isMobile,
      match: {
        params: { code }
      }
    } = this.props;
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: "/activity/detail.php",
            params: {
              code
            }
          },
          reducerKey: "DetailPage"
        }}
      >
        {({
          response: {
            banner,
            banner: { isBrand } = {},
            items,
            breadcrumbs,
            brand,
            moments,
            examples,
            list,
            training,
            documentation,
            slider
          } = {}
        }) => {
          return (
            <div
              {...{
                className: classNames(
                  css.wrapper,
                  isMobile ? css.mobile : css.desktop
                )
              }}
            >
              <BrandHeroBanner
                {...{
                  className: isMobile ? css.banner_mobile : css.banner_desktop,
                  showScrollIcon: true,
                  breadcrumbs,
                  isBrowser,
                  isMobile,
                  titleSize: isMobile ? "m" : "l",
                  parallax: !isMobile,
                  blockPaddingBottom: isMobile ? "s" : "none",
                  ...banner
                }}
              />
              <div {...{ className: css.container }}>
                {brand && (
                  <div {...{ className: css.brand_link_wrapper }}>
                    <BrandLinkLayout
                      {...{
                        isMobile,
                        brand: brand,
                        className: css.brand_link_container
                      }}
                    />
                  </div>
                )}
                {documentation && (
                  <DocumentationLinkLayout
                    {...{
                      data: documentation,
                      className: css.documentation,
                      isMobile
                    }}
                  />
                )}
                {training && (
                  <MainAsideSection
                    {...{
                      isMobile,
                      separator: true,
                      reverse: true,
                      asideWidth: 3,
                      title: training.title,
                      description: training.description,
                      className: css.training,
                      asideChildren: ""
                    }}
                  >
                    <TrainingCardLayout
                      {...{ isMobile, training: training.items }}
                    />
                  </MainAsideSection>
                )}
                {isBrand && items && (
                  <InzhiniringContent {...{ items, isMobile }} />
                )}
                {moments && (
                  <MainAsideSection
                    {...{
                      isMobile,
                      separator: true,
                      column: true,
                      title: moments.title,
                      description: moments.description,
                      className: css.hunting_wrapper
                    }}
                  >
                    {moments.items && (
                      <PhotoSlider
                        {...{
                          isMobile,
                          className: css.slider,
                          items: moments.items
                        }}
                      />
                    )}
                  </MainAsideSection>
                )}
              </div>
              <div {...{ className: css.video_wrapper }}>
                <DetailVideo {...{ isMobile }} />
              </div>
              {/* {examples && (
                <MainAsideSection
                  {...{
                    isMobile,
                    separator: true,
                    reverse: true,
                    theme: 'black',
                    title: examples.title,
                    description: examples.description,
                    className: css.examples_container
                  }}
                >
                  {examples.items && (
                    <ExamplesProductsList
                      {...{
                        isMobile,
                        examples: examples
                      }}
                    />
                  )}
                </MainAsideSection>
              )} */}
              <div {...{ className: css.container }}>
                {slider && (
                  <PhotoSlider
                    {...{
                      arrow: "left",
                      isMobile,
                      className: css.slider_one,
                      items: slider.items,
                      textPosition: false
                    }}
                  />
                )}
              </div>
              <News {...{ isMobile, className: css.news_container }} />
              <FormSubscribe {...{ isMobile, className: css.subscribe }} />
              {/* <Information {...{ isMobile, className: css.information }} /> */}
              <ActivitiesCardsList
                {...{
                  isMobile,
                  list,
                  masonry: false,
                  withSeparator: true
                }}
              />
            </div>
          );
        }}
      </RemoteDataProvider>
    );
  }
}

DetailPage.propTypes = {
  response: PropTypes.object,
  match: PropTypes.object,
  isMobile: PropTypes.bool
};

export default DetailPage;
