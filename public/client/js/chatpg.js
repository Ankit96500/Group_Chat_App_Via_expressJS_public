document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:4000"
    const chatWindow = document.getElementById("chat-window");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const logoutbtn = document.getElementById("logout");
    const username = document.getElementById('username');
    const groupname = document.getElementById('groupname');
    const groupNameInput = document.getElementById("group-name");
    const createGroupButton = document.getElementById("create-group-button");
    const groupsList = document.getElementById("groups-list");



let Global_Group_id;
let groupnm_argu;
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
    const group_id = localStorage.getItem('group_id')
    if (messageText.length === 0 || group_id === null) {
        alert('please select a group or type something..')
        return;
    }
    try {
        const group_id = localStorage.getItem('group_id')
        const data={messageText,group_id}
        const response = await axios.post(`${API_URL}/chat/create-chat`,data,{headers:{'Authorization':token}})
        // console.log('reposen ccraet chat',response);
        
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
    localStorage.removeItem('group_id')
    window.location.href = "../account/login.html"
});



// Event listener for the "Create Group" button
createGroupButton.addEventListener("click", async () => {
    const token = localStorage.getItem('token');
    const groupName = groupNameInput.value.trim();
    
    if (groupName === "") {
        alert("Group name cannot be empty!");
        return;
    }
    const data = {groupName}
    try {
        const response = await axios.post(`${API_URL}/chat/create-group`,data,{headers:{'Authorization':token}})

        // it will return me list of all groups
        if (Array.isArray(response.data.data)) {
            const groups = response.data.data;
            // console.log('groups', groups);
            groupdisplay(groups)
        }

    } catch (error) {
        displayError(error);  // Example error message
        function displayError (error) {
            let err = document.getElementById('custom-alert');
            err.innerHTML = error.response;  // Insert error message
            err.style.display = 'block';  // Show the alert
            console.log("--group name", error.response);  // Log error response
        
            // Optionally hide the alert after a few seconds
            setTimeout(function () {
                err.style.display = 'none';  // Hide alert after 5 seconds
            }, 5000);
        }
        
    }
});


// display group :
function groupdisplay (groups){
    groups.forEach(group => {
        const listItem = document.createElement("li");
        listItem.textContent = group.gpName; // Replace 'group.name' with the actual key for the group name in your data
        groupnm_argu = group;

        // Add click event to call a specific function when the group is clicked
        listItem.addEventListener("click", () => {
            onGroupClick(group); // Replace with your specific function
        });

        // Add a remove button to the group item
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", async (event) => {
            event.stopPropagation(); // Prevent triggering the group click function
            // console.log('inside he event',event); 
            // code to delete group
            try {
                const groupid =localStorage.getItem('group_id');

                const token = localStorage.getItem('token');
                await axios.get(`${API_URL}/chat/del-group?groupid=${groupid}`,{headers:{'Authorization':token}});


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
            groupsList.removeChild(listItem);
        });

        listItem.appendChild(removeButton);
        groupsList.appendChild(listItem);
    });

}


// Add new group functionality
const addGroup = (groupName) => {
    const listItem = document.createElement("li");
    listItem.textContent = groupName;
    
    // Add click event to call a specific function when the group is clicked
    listItem.addEventListener("click", () => {
        onGroupClick({ name: groupName }); // Replace with your specific function
          // it wiil call
    
    });

    // Add a remove button to the group item
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", async (event) => {
        event.stopPropagation(); // Prevent triggering the group click function        
        groupsList.removeChild(listItem);
    });

    listItem.appendChild(removeButton);
    groupsList.appendChild(listItem);
    
    // Clear the input field
    groupNameInput.value = "";

  

};

// Example function that gets called when a group is clicked
const onGroupClick = async (group) => {
    // console.log("Group clicked:", group);
    // Add your specific logic here
    const token = localStorage.getItem('token');
    groupname.innerHTML = group.gpName;
    try {
        const response = await axios.get(`${API_URL}/chat/get-chat?groupid=${group.id}`,{headers:{'Authorization':token}})
        // console.log('reposen come from backend',response);
        
        // here i delete astore agroup nae,
        localStorage.setItem('group_id',group.id)


        if (Array.isArray(response.data.data)) {
            const userChats = response.data.data
            // console.log('yeh array hei');
            // Clear existing chats from the chat window
            chatWindow.innerHTML = '';
            
        // Render each chat message
            userChats.forEach(chat => {
                // console.log('inside the user caht',chat);
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

    
};

async function get_groups (){
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/chat/get-groups`,{headers:{'Authorization':token}});
        // console.log('respone--->',response);
        username.innerHTML = response.data.data.username 
        
        // it will return me list of all groups
        if (Array.isArray(response.data.data.group_found)) {
            
            const groups = response.data.data.group_found;
            // console.log('groups', groups);
            groupdisplay(groups)
        }
        
    } catch (error) {
        displayError(error);  // Example error message
        function displayError (error) {
            let err = document.getElementById('custom-alert');
            err.innerHTML = error.response;  // Insert error message
            err.style.display = 'block';  // Show the alert
            // console.log("-----", error.response);  // Log error response
        
            // Optionally hide the alert after a few seconds
            setTimeout(function () {
                err.style.display = 'none';  // Hide alert after 5 seconds
            }, 5000);
        }
    }
}



// // Assuming you have a button to add new groups and an input field for group names
// addGroupButton.addEventListener("click", () => {
//     const groupName = groupNameInput.value.trim();
//     if (groupName) {
//         addGroup(groupName);
//     }
// });

get_groups();

//    setInterval(() => {
//     console.log(groupnm_argu);
    
//     onGroupClick({ groupnm_argu});
//     }, 1000);

        
});
