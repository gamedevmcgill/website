import styled from "styled-components";
import { rgba } from "polished";

const Button = styled.button.attrs({ type: "button" })`
  padding: 1.2rem 2rem;
  min-width: 12rem;
  border-radius: 6rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.white};
  transition: all 0.2s ease-in-out;
  background: ${props =>
    props.secondary
      ? `linear-gradient(
          45deg,
          ${props.theme.colors.blue},
          ${props.theme.colors.green}
        )`
      : `linear-gradient(
          45deg,
          ${props.theme.colors.primary},
          ${props.theme.colors.orange}
        )`};
  &:hover {
    transform: translate(0.05rem, -0.1rem);
    box-shadow: -0.05rem 0.4rem 0.4rem
      ${props =>
        rgba(
          props.secondary
            ? props.theme.colors.blue
            : props.theme.colors.primary,
          0.25
        )};
  }
`;

export default Button;