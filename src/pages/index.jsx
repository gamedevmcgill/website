import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { Flex, Box } from "@rebass/grid";
import MaxWidthBox from "../components/Styled/MaxWidthBox";
import AbsoluteImage from "../components/Styled/AbsoluteImage";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Hero from "../../static/assets/hero.svg";
import H1 from "../components/Styled/H1";
import H2 from "../components/Styled/H2";
import Em from "../components/Styled/Em";
import StyledBox from "../components/Styled/StyledBox";
import Paragraph from "../components/Styled/Paragraph";

class Index extends React.Component {
  render() {
    const { data } = this.props;
    const postEdges = data.allMarkdownRemark.edges;
    return (
      <Layout>
        <Helmet title={config.siteTitle} />
        <SEO />
        <AbsoluteImage
          src={Hero}
          top={0}
          left={0}
          imgWidth="100%"
          minWidth="120rem"
        />
        <Flex
          flexDirection="column"
          justifyContent="center"
          css={{ height: "60rem" }}
        >
          <MaxWidthBox maxWidth="50rem" ml="10rem">
            <H1>
              {/* eslint-disable-next-line */}
              {/* prettier-ignore */}A really <Em>catchy</Em> placeholder to get
              your attention.
            </H1>
          </MaxWidthBox>
        </Flex>
        <MaxWidthBox maxWidth="100rem" m="0 auto">
          <H2>About</H2>
          <Flex flexWrap="wrap" alignItems="center">
            <StyledBox p="2rem" width={[1, 1 / 2]}>
              <img
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%"
                }}
                src="https://source.unsplash.com/random/800x600"
                alt="Random"
              />
            </StyledBox>
            <Box p="2rem" width={[1, 1 / 2]}>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Paragraph>
            </Box>
          </Flex>
          <div className="index-container">
            <PostListing postEdges={postEdges} />
          </div>
        </MaxWidthBox>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
