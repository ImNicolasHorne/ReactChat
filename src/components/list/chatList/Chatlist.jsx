import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);

    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();

    useEffect(() => {
        if (!currentUser?.id) { // Safeguard against currentUser being null/undefined
            return; // Exit early if currentUser.id is not available
        }
        const unSub = onSnapshot(
            doc(db, "userchats", currentUser.id),
            async (res) => {
                const data = res.data();
                if (data && data.chats) { 
                    const items = res.data().chats;

                    const promises = items.map(async (item) => {
                        try { 
                            const userDocRef = doc(db, "users", item.receiverId);
                            const userDocSnap = await getDoc(userDocRef);
                            const user = userDocSnap.data();
                            return { ...item, user };
                        } catch (error) {
                            console.error("Error fetching user data:", error);
                            return null; 
                        }
                    });

                    const chatData = await Promise.all(promises);

                    // Filter out any null results from failed user fetches
                    const validChatData = chatData.filter(chat => chat !== null);

                    setChats(validChatData.sort((a, b) => b.updatedAt - a.updatedAt)); // Corrected sorting
                } else {
                    setChats([]); // Set chats to empty array if no data or chats
                }
            },
            (error) => { // Handle any errors during the snapshot listener
                console.error("Error in snapshot listener:", error);
            }
        );

        return () => {
            unSub();
        };
    }, [currentUser?.id]); // Use optional chaining and include currentUser.id in dependency array

    const handleSelect = async (chat) => {

        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest
        });

        const chatIndex = userChats.findIndex(item => item.chaId === chat.chaId)

        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userchats", currentUser.id);

        try{

            await updateDoc(userChatsRef, {
                chats: userChats,
            })
            changeChat(chat.chatId, chat.user); 
        }catch(err){
            console.log(err)
        }

    };
    
    return ( 
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} 
                alt=""
                className="add" 
                onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {chats.map((chat) => (          
                <div 
                className="item" 
                key={chat.chaId} 
                onClick={() => handleSelect(chat)}
                style={{
                    backgroundColor: chat?.isSeen ? "transparent" : "##5183fe"
                }}
                >
                    <img src={chat.user.avatr || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
           
            {addMode && <AddUser />}
        </div>
     );
}
 
export default ChatList;