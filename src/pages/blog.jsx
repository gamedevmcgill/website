import React, { Component } from "react";
import { graphql } from "gatsby";
import { Box } from "@rebass/grid";
import Helmet from "react-helmet";
import Header from "../components/Header/Header";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import config from "../../config/SiteConfig";

class BlogPage extends Component {
  render() {
    const { data } = this.props;
    const postEdges = data.allMarkdownRemark.edges;
    return (
      <Layout>
        <Helmet title={`Blog | ${config.siteTitle}`} />
        <Header title="Blog Posts" />
        <Box m="10rem 0">
          <PostListing postEdges={postEdges} />
        </Box>
      </Layout>
    );
  }
}

export default BlogPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPage {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/posts/" } }
    ) {
      totalCount
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
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 300
                  duotone: { highlight: "#00ff99", shadow: "#000066" }
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date
          }
        }
      }
    }
  }
`;
