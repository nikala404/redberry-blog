import { styled } from "styled-components";
import heroImg from "../assets/b37701afb64104a602375882163c0a6e.png";
const Hero = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  img {
    width: 60%;
    height: auto;
  }
`;
export default function HeroComponent() {
  return (
    <Hero>
      <h1>ბლოგი</h1>
      <img src={heroImg} alt="hero" />
    </Hero>
  );
}
