
// Images
import cLogo from "../../assets/logo_coolshop_72_blue.png"
// Style
import Style from './Header.module.css';
const Header = () => {
  return (
    <div className={Style.headerWrapper}>
      <img src={cLogo} alt="" className={Style.logo}/>
      <div className={Style.myName}>
          Ahmed Sami Hamid
      </div>
    </div>
  )
}

export default Header