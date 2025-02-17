import {  useChatStore } from "../../lib/chatStore";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css"

const Detail = () => {
    const { chatId, 
        user, 
        isCurrentUserBlocked, 
        isReceiverBlocked, 
        changeBlock} = 
        useChatStore;

    const { currentUser } = useUserStore;

    const handleBlock = () => {

    }

    return ( 
        <div className="detail">
            <div className="user">
                <img src={ user?.avatr} alt="" />
                <h2>{user?.username}</h2>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                </p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img className="ugh" src="https://images.pexels.com/photos/40799/paper-colorful-color-loose-40799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                                <span>colorswave.png</span>
                            </div>
                         <img src="./download.png" className="icon" alt="" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img className="ugh" src="https://images.pexels.com/photos/40799/paper-colorful-color-loose-40799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                                <span>colorswave.png</span>
                            </div>
                         <img src="./download.png" className="icon" alt="" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>Block User</button>
                <button className="logout" onClick={() => auth.signOut()}>Logout</button>
            </div>
        </div>
     );
}
 
export default Detail;