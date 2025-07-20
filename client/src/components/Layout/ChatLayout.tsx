import { ChatSidebar } from '../test/ChatSideBar';
import { MainChatArea } from '../test/MainChatArea';

export const ChatLayout = ({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) => (
  <>
    <ChatSidebar open={sidebarOpen} onToggle={toggleSidebar} />
    <MainChatArea />
  </>
);
