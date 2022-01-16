import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import LogoIcon from "../assets/logo.png";
import LogoutIcon from "../assets/logout.png";

import { Menu, X } from "react-feather";

const cookies = new Cookies();
/**
 *!  Sidebar'da bulunan logolar ve logout butonunun çalışması
 */
const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={LogoIcon} alt="Logo" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);
/**
 *!  Uygulamamızın isminin gözükmesi
 */
const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Ellam Chat APP</p>
  </div>
);
/**
 *!  Kanlları takıma göre ayırmak.
 */
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};
/**
 *!  Mesajları takıma göre ayırmak.
 */
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};
/**
 *!  Çıkış yapan kişinin kanalları düzenleyip mesaj yazamamsını sağlamak. Sadece giriş yapmış kullanıcıların bu işlemi yapabilmesini sağlamak.
 */
const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};
/**
 *!  Kanalların göründüğü bölümün responsivelik ayarı.
 */
const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <button
        className="toggle-button"
        onClick={() =>
          setToggleContainer((prevToggleContainer) => !prevToggleContainer)
        }
      >
        {toggleContainer ? (
          <X style={{ color: "white" }} />
        ) : (
          <Menu style={{ color: "white" }} />
        )}
      </button>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div className="channel-list__container-toggle"></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
