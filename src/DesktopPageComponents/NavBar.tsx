import redBerryLogo from "../assets/LOGO-02 3.png";

type NavBarProp = {
  onImageClick: React.MouseEventHandler<HTMLImageElement>;
};
export default function NavBar({ onImageClick }: NavBarProp) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <img src={redBerryLogo} alt="redberry_logo" onClick={onImageClick} />
      <button>შესვლა</button>
    </div>
  );
}
