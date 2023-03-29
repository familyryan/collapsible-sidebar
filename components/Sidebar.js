import Image from "next/image";
import { useState } from "react";
import { AiOutlineAccountBook, AiOutlineHome } from "react-icons/ai";
import { BsBook,  BsBoxes, BsCaretDownFill, BsCaretUpFill, BsCarFront, BsJournalBookmark, BsShop, BsSlack } from "react-icons/bs";
import {  MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineAccountCircle, MdOutlineAssessment,  MdSupervisorAccount } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import { SidebarContext } from "@/context/SidebarContext";

const sidebarItems = [
    {
        name: "Dashboard",
        href: "/",
        icon:AiOutlineHome,
    },
    {
        name: "Jurnal",
        href: "/jurnal",
        icon: BsBook,
    },
    {
        name: "Laporan",
        href: "/laporan",
        icon: MdOutlineAssessment,
    },
    {
        name: "Simpan Pinjam",
        href: "/simpanpinjam",
        icon: BsJournalBookmark,
    },
    {
        name: "Daftar Akun",
        href: "/daftarakun",
        icon:AiOutlineAccountBook,
    },
    {
        name: "Daftar Kontak",
        href: "/daftarkontak",
        icon: MdOutlineAccountCircle,
    },
    {
        name: "Assets",
        href: "/assets",
        icon: BsBoxes,
    },
    {
        name: "Sub Bisnis",
        href: "/subbisnis",
        icon: MdSupervisorAccount,
        subMenus: [
            {
              name: "Kantin",
              href: "/kantin",
              icon: BsShop,
            },
            {
              name: "RentCar",
              href: "/rentcar",
              icon: BsCarFront,
            },
            {
              name: "Bimtek",
              href: "/bimtek",
              icon: BsSlack,
            },
          ],
    },

];

const Sidebar = () => {
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const handleSubMenuClick = () => {
        setSubMenuOpen(!subMenuOpen);
      };

    const router = useRouter();
    const {isCollapsed, toggleSidebarcollapse} = useContext(SidebarContext);
    return ( 
        <div className="sidebar__wrapper">
            <button className="btn" onClick={toggleSidebarcollapse}>
                {isCollapsed ? <MdKeyboardArrowRight/> : <MdKeyboardArrowLeft/>}
            </button>
            <aside className="sidebar" data-collapse={isCollapsed}>
                <div className="sidebar__top">
                    <Image
                    width={50}
                    height={50}
                    className="sidebar__logo"
                    src="/logo.jpg"
                    alt="logo"/>
                </div>


                <h1 className='sidebar__logo-name'>Koperasi Primadaya Migas</h1>

                <ul className="sidebar__list">
                    {sidebarItems.map(({name, href, icon: Icon, subMenus}) => {
                              if (name === "Sub Bisnis") {
                                return (
                                  <li className='sidebar__item' key={name}>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      className={`sidebar__link ${
                                        router.pathname === href ? "sidebar__link--active" : ""
                                      }`}
                                      onClick={handleSubMenuClick}
                                    >
                                      <span className='sidebar__icon'>
                                        <Icon />
                                      </span>
                                      <span className='sidebar__name'>{name}</span>
                                      <span className='arrow'>
                                        {subMenuOpen ? <BsCaretUpFill /> : <BsCaretDownFill />}
                                      </span>
                                    </div>
                                    {subMenuOpen && (
                                      <ul className='sidebar__submenu'>
                                        {subMenus.map(({ name, href, icon: Icon }) => (
                                          <li key={name}>
                                            <Link href={href}>
                                              <div className='sidebar__submenu-link'>
                                                <span className='sidebar__submenu-icon'>
                                                  <Icon />
                                                </span>
                                                <span className='sidebar__submenu-name'>
                                                  {name}
                                                </span>
                                              </div>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                );
                              }
                        return (
                            <li className="sidebar__item" key={name}>
                                <Link className={`sidebar__link ${
                                    router.pathname === href ? "sidebar__link--active": ""
                                }`} href={href}>
                                    <span className="sidebar__icon">
                                    <Icon />
                                    </span>
                                    <span className="sidebar__name">
                                        {name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </div>
     );
}

export default Sidebar;
