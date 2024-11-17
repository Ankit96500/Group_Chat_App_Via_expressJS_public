document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:3000"
    const chatWindow = document.getElementById("chat-window");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const logoutbtn = document.getElementById("logout");


    async function get_chat(){
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${API_URL}/chat/get-chat`,{headers:{'Authorization':token}})
            console.log('reposen come from backend',response);

            if (Array.isArray(response.data.data)) {
                const userChats = response.data.data
                console.log('yeh array hei');
                // Clear existing chats from the chat window
                chatWindow.innerHTML = '';
                
            // Render each chat message
                userChats.forEach(chat => {
                    console.log('inside the user caht',chat);
                    const formattedMessage = `${chat.username}: ${chat.usChat}`;
                    addMessage(formattedMessage,"sender")                
                });            
            } 
       
        } catch (error) {
            displayError(error);  // Example error message
            function displayError (error) {
                let err = document.getElementById('custom-alert');
                err.innerHTML = error.response;  // Insert error message
                err.style.display = 'block';  // Show the alert
                console.log("-----", error.response);  // Log error response
            
                // Optionally hide the alert after a few seconds
                setTimeout(function () {
                    err.style.display = 'none';  // Hide alert after 5 seconds
                }, 5000);
            }
        }
    }


    const addMessage = (text, type) => {
        const message = document.createElement("div");
        message.className = `message ${type}`;
        message.textContent = text;
        chatWindow.appendChild(message);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    sendButton.addEventListener("click", async() => {
        const token = localStorage.getItem('token')
        const messageText = messageInput.value.trim();
        if (messageText.length === 0) {
            return;
        }
        const data={messageText}
        try {
            const response = await axios.post(`${API_URL}/chat/create-chat`,data,{headers:{'Authorization':token}})
            console.log('reposen come from backend',response);
            
        } catch (error) {
            displayError(error);  // Example error message
            function displayError (error) {
                let err = document.getElementById('custom-alert');
                err.innerHTML = error.response.data.error;  // Insert error message
                err.style.display = 'block';  // Show the alert
                console.log("-----", error.response);  // Log error response
            
                // Optionally hide the alert after a few seconds
                setTimeout(function () {
                    err.style.display = 'none';  // Hide alert after 5 seconds
                }, 5000);
            }
        }


        if (messageText !== "") {
            addMessage(messageText, "sent");
            messageInput.value = "";
        }
    });

    messageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });

    logoutbtn.addEventListener("click",()=>{
        localStorage.removeItem('token');
        window.location.href = "../account/login.html"
    })



    // get all chats:
    setInterval(() => {
        get_chat();
    }, 1000);
    
});
