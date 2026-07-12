const socket = io();

let username = "";

const joinScreen = document.getElementById("joinScreen");
const chatApp = document.getElementById("chatApp");
const joinBtn = document.getElementById("joinBtn");
const usernameInput = document.getElementById("usernameInput");

joinBtn.onclick = join;

usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") join();
});

function join() {

    const value = usernameInput.value.trim();

    if (!value) return;

    username = value;

    joinScreen.style.display = "none";
    chatApp.style.display = "flex";
}

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const button = document.getElementById("sendBtn");

const replyBox = document.getElementById("replyBox");
const replyUser = document.getElementById("replyUser");
const replyText = document.getElementById("replyText");
const cancelReply = document.getElementById("cancelReply");

let replyingTo = null;

cancelReply.onclick = () => {
    replyingTo = null;
    replyBox.style.display = "none";
};

button.onclick = sendMessage;

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    socket.emit("chat-message", {
        id: Date.now(),
        user: username,
        text: text,
        reply: replyingTo
    });

    input.value = "";

    replyingTo = null;
    replyBox.style.display = "none";
}

socket.on("chat-message", (msg) => {

    const div = document.createElement("div");

    div.classList.add("message");

    if (msg.user === username)
        div.classList.add("right");
    else
        div.classList.add("left");

    let html = "";

    if (msg.reply) {

        html += `
        <div class="reply-preview">
    <strong>↩ ${msg.reply.user}</strong>
    <span>${msg.reply.text}</span>
</div>
        `;
    }

    html += `
        <div class="name">${msg.user}</div>
        <div>${msg.text}</div>

        <button class="reply-btn">
            ↩
        </button>
    `;

    div.innerHTML = html;

    // Desktop reply
    div.querySelector(".reply-btn").onclick = () => {

        replyingTo = {
            user: msg.user,
            text: msg.text
        };

        replyUser.textContent =
            "Replying to " + msg.user;

        replyText.textContent =
            msg.text;

        replyBox.style.display = "flex";

        input.focus();
    };

    // Mobile long press (600ms)
    let timer;

    div.addEventListener("touchstart", () => {

        timer = setTimeout(() => {

            replyingTo = {
                user: msg.user,
                text: msg.text
            };

            replyUser.textContent =
                "Replying to " + msg.user;

            replyText.textContent =
                msg.text;

            replyBox.style.display = "flex";

        }, 600);

    });

    div.addEventListener("touchend", () => {

        clearTimeout(timer);

    });

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
});