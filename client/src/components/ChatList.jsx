import EachChat from "./EachChat";
import GroupChat from "./GroupChat";

const contactList= [
  {
      name: "John Doe",
      lastMessage: "Hello there!",
      lastTime: "2023-09-20 ",
      userImage: "https://randomuser.me/api/portraits/thumb/men/76.jpg" // Provide the file path or URL to the user's image
    },
    {
      name: "Alice Smith",
      lastMessage: "Sure, I'll be there!",
      lastTime: "2023-09-19 ",
      userImage: "https://randomuser.me/api/portraits/thumb/men/70.jpg"
    },
    {
      name: "Bob Johnson",
      lastMessage: "What's up?",
      lastTime: "2023-09-18",
      userImage: "https://randomuser.me/api/portraits/thumb/men/71.jpg"
    },
    {
      name: "Eva Davis",
      lastMessage: "See you tomorrow!",
      lastTime: "2023-09-17 ",
      userImage: "https://randomuser.me/api/portraits/thumb/men/72.jpg"
    },
    {
      name: "Sarah Wilson",
      lastMessage: "Thanks for the help!",
      lastTime: "2023-09-16 ",
      userImage: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
    },
  {
    name: "John Doe",
    lastMessage: "Hello there!",
    lastTime: "2023-09-20 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/76.jpg" // Provide the file path or URL to the user's image
  },
  {
    name: "Alice Smith",
    lastMessage: "Sure, I'll be there!",
    lastTime: "2023-09-19 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/70.jpg"
  },
  {
    name: "Bob Johnson",
    lastMessage: "What's up?",
    lastTime: "2023-09-18",
    userImage: "https://randomuser.me/api/portraits/thumb/men/71.jpg"
  },
  {
    name: "Eva Davis",
    lastMessage: "See you tomorrow!",
    lastTime: "2023-09-17 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/72.jpg"
  },
  {
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    lastTime: "2023-09-16 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
  },
  {
    name: "Eva Davis",
    lastMessage: "See you tomorrow!",
    lastTime: "2023-09-17 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/72.jpg"
  },
  {
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    lastTime: "2023-09-16 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
  },
  {
    name: "Eva Davis",
    lastMessage: "See you tomorrow!",
    lastTime: "2023-09-17 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/72.jpg"
  },
  {
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    lastTime: "2023-09-16 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
  },
  {
    name: "Eva Davis",
    lastMessage: "See you tomorrow!",
    lastTime: "2023-09-17 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/72.jpg"
  },
  {
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    lastTime: "2023-09-16 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
  },
  {
    name: "Eva Davis",
    lastMessage: "See you tomorrow!",
    lastTime: "2023-09-17 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/72.jpg"
  },
  {
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    lastTime: "2023-09-16 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
  },
  {
    name: "Eva Davis",
    lastMessage: "See you tomorrow!",
    lastTime: "2023-09-17 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/72.jpg"
  },
  {
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    lastTime: "2023-09-16 ",
    userImage: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
  }
];

function ChatList() {
  return (
      <div className="">
        <GroupChat
          Groupname="Backchods"
          name= "Aman"
          lastMessage= "Khane Chal"
          lastTime="023-09-16"
          userImage= "https://randomuser.me/api/portraits/thumb/men/73.jpg"
        ></GroupChat>
        {contactList.map((contact, index) => (
          <EachChat
            key={index} name={contact.name} 
            lastMessage={contact.lastMessage}  
            lastTime={contact.lastTime} userImage={contact.userImage}
          />
        ))}
      </div>
    );
}
  
  export default ChatList;