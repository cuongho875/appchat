import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeChats,
  activeContacts,
  activeProfile,
  activeSettings,
} from "../../actions/menuActive";
import {
  MENU_CHATS,
  MENU_CONTACTS,
  MENU_PROFILE,
  MENU_SETTINGS,
} from "../../actionTypes";
import ButtonMenu from "../ButtonMenu";
import ProfileUser from "../ProfileUser";
export default function MenuContainer() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state)=> state.authen);
  const dispatch = useDispatch();
  return (
    <div className="h-full min-w-[75px] max-w-[75px] bg-[#2e2e2e] text-[#878a92] flex flex-wrap flex-col">
      <ButtonMenu
        icon="bx bx-user-circle"
        title="Profile"
        onClick={() => dispatch(activeProfile())}
        active={menu === MENU_PROFILE ? true : false}
      ></ButtonMenu>
      <ButtonMenu
        icon="bx bx-conversation"
        title="Chats"
        onClick={() => dispatch(activeChats())}
        active={menu === MENU_CHATS ? true : false}
      ></ButtonMenu>
      <ButtonMenu
        icon="bx bxs-user-detail"
        title="Contacts"
        onClick={() => dispatch(activeContacts())}
        active={menu === MENU_CONTACTS ? true : false}
      ></ButtonMenu>
      <ButtonMenu
        icon="bx bx-cog"
        title="Settings"
        onClick={() => dispatch(activeSettings())}
        active={menu === MENU_SETTINGS ? true : false}
      ></ButtonMenu>
      <ButtonMenu icon="bx bx-moon" title="Dark Mode"></ButtonMenu>
      {/* <ButtonMenu
        icon="bx bx-sun"
        title="Light Mode"
      ></ButtonMenu> */}
      <div className="mt-auto">
      <ProfileUser/>
      </div>
    </div>
  );
}
