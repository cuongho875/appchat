import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";
import ButtonAddContact from "../ButtonAddContact";
import ContactItem from "../ContactItem";

export default function TabContacts() {
  const [data, setData] = useState([]);
  const [dataInitial, setDataInitial] = useState([]);
  const refSearch = useRef();
  const user = useSelector((state) => state.authen);
  const friend = useSelector((state) => state.friend);

  useEffect(() => {
    api.get(`/user/getListFriend/${user.userId}`).then((res) => {
      setData(res.data);
      setDataInitial(res.data);
    });
  }, [friend]);
  const handleSearch = () => {
    setData(
      dataInitial.filter((item) => {
        let fullName = `${item.firstName} ${item.lastName}`;
        if (fullName.match(refSearch.current.value)) {
          return item;
        }
      })
    );
  };
  return (
    <div className="w-full h-full bg-fuchsia-50	dark:bg-[#262626]">
      <div className="pt-4 h-[130px]">
        <div className="px-6 flex justify-between items-center">
          <div className="text-2xl font-medium	">Contacts</div>
          <ButtonAddContact />
        </div>
        <div className="w-full flex mt-8 justify-center">
          <input
            ref={refSearch}
            type="text"
            className="w-64 px-6 py-2 text-sm focus:outline-none rounded-md"
            onChange={handleSearch}
            placeholder="Search here..."
          />
        </div>{" "}
      </div>
      <div className="w-full h-[calc(100vh - 130px)]">
        <div className="w-full h-full overflow-y-scroll">
          {data.map((item, index) => {
            return <ContactItem key={index} user={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
