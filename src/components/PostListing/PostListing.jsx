import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { Flex, Box } from "@rebass/grid";
import { FaClock, FaRegCalendarAlt } from "react-icons/fa";
import debounce from "lodash.debounce";
import Observer from "@researchgate/react-intersection-observer";
import StyledBox from "../Styled/StyledBox";
import Paragraph from "../Styled/Paragraph";
import MaxWidthBox from "../Styled/MaxWidthBox";
import Info from "./PostInfoText";
import PostTags from "../PostTags/PostTags";

// https://github.com/gatsbyjs/gatsby/issues/309
try {
  // eslint-disable-next-line
  require("intersection-observer");
} catch (e) {
  /* only throws if run server-side */
}

const ListingHeader = styled(Link)`
  color: ${props => props.theme.colors.black};
  text-transform: uppercase;
  text-decoration: none;
  font-size: 2.4rem;
  font-weight: 800;
  display: inline-block;

  position: relative;
  overflow: hidden;

  &::after {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transition: all 0.4s ease-in-out;
    content: "";
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: ${props => `linear-gradient(
          45deg,
          ${props.theme.colors.primary},
          ${props.theme.colors.orange}
        )`};
    transform: translateX(-200%);
  }

  &:hover {
    &::after {
      transform: translateX(30%);
    }
  }
`;

class PostListing extends React.Component {
  static defaultProps = {
    pageSize: 3,
    isInfinite: true
  };

  constructor(props) {
    super(props);
    this.state = {
      shown: props.shown || props.pageSize
    };
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  getPostList() {
    const { postEdges } = this.props;
    return postEdges.map(postEdge => ({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead
    }));
  }

  handleIntersection(event) {
    const { shown } = this.state;
    const { pageSize, isInfinite } = this.props;
    if (isInfinite && event.isIntersecting) {
      this.setState({ shown: shown + pageSize });
    }
  }

  render() {
    const postList = this.getPostList();
    const { shown } = this.state;
    return (
      <MaxWidthBox maxWidth="70rem" m="auto">
        {/* Your post list here. */
        postList.slice(0, shown).map(post => (
          <StyledBox
            hoverable
            mb="4rem"
            p="3rem"
            key={post.path}
            css="min-height: 24rem;"
          >
            <article>
              <Flex>
                <Box width={2 / 3} pr="2rem">
                  <ListingHeader to={post.path} key={post.title}>
                    {post.title}
                  </ListingHeader>
                  <Paragraph small>{post.excerpt}</Paragraph>
                  <PostTags tags={post.tags} />
                  <Flex justifyContent="flex-end">
                    <Info>
                      <FaClock /> {post.timeToRead} min read
                    </Info>
                    <Info>
                      <FaRegCalendarAlt />{" "}
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </Info>
                  </Flex>
                </Box>
                <Box width={1 / 3}>
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%"
                    }}
                    src={post.cover}
                    alt={post.title}
                  />
                </Box>
              </Flex>
            </article>
          </StyledBox>
        ))}
        <Observer onChange={debounce(this.handleIntersection, 250)}>
          <div style={{ width: "10px", height: "10px" }} />
        </Observer>
      </MaxWidthBox>
    );
  }
}

export default PostListing;
