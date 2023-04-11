import React from "react";
import { useSelector } from "react-redux";
import { MENU_CHATS, MENU_CONTACTS, MENU_PROFILE, MENU_SETTINGS } from "../../actionTypes";
import TabChats from "../TabChats";
import TabContacts from "../TabContacts";
import TabProfile from "../TabProfile";
import TabSettings from "../TabSettings";

export default function SideBar() {
  const menu = useSelector((state) => state.menu);
  return <div className="h-[100vh] max-w-[300px] min-w-[300px] z-10 shadow-[0_2px_4px_rgba(15,34,58,.12)]">
    {menu===MENU_PROFILE?<TabProfile/>:''}
    {menu===MENU_CHATS?<TabChats/>:''}
    {menu===MENU_CONTACTS?<TabContacts/>:''}
    {menu===MENU_SETTINGS?<TabSettings/>:''}
  </div>;
}
