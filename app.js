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

const messageReactions = {}; // { messageId: { emoji: Set(usernames) } }
const REACTION_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

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

    div.dataset.id = msg.id;

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

        <div class="reaction-badges"></div>

        <button class="reply-btn">
            ↩
        </button>

        <button class="react-btn">
            😀
        </button>

        ${msg.user === username ? `
        <button class="delete-btn">
            🗑
        </button>
        ` : ""}
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

    div.querySelector(".react-btn").onclick = (e) => {
        e.stopPropagation();
        openReactionPicker(div, msg.id);
    };

    const deleteBtn = div.querySelector(".delete-btn");
    if (deleteBtn) {
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            if (confirm("Delete this message?")) {
                socket.emit("delete-message", { messageId: msg.id });
            }
        };
    }

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
function openReactionPicker(messageDiv, messageId) {

    const existing = document.querySelector(".emoji-picker");
    if (existing) existing.remove();

    const picker = document.createElement("div");
    picker.classList.add("emoji-picker");

    REACTION_EMOJIS.forEach((emoji) => {
        const btn = document.createElement("button");
        btn.textContent = emoji;
        btn.onclick = (e) => {
            e.stopPropagation();
            sendReaction(messageId, emoji);
            picker.remove();
        };
        picker.appendChild(btn);
    });

    messageDiv.appendChild(picker);

    setTimeout(() => {
        document.addEventListener("click", function closePicker() {
            picker.remove();
            document.removeEventListener("click", closePicker);
        });
    }, 0);
}

function sendReaction(messageId, emoji) {
    socket.emit("reaction", {
        messageId: messageId,
        emoji: emoji,
        user: username
    });
}

function renderReactions(messageId) {

    const div = document.querySelector(`.message[data-id="${messageId}"]`);
    if (!div) return;

    const container = div.querySelector(".reaction-badges");
    container.innerHTML = "";

    const data = messageReactions[messageId];
    if (!data) return;

    Object.keys(data).forEach((emoji) => {
        const users = data[emoji];
        if (users.size === 0) return;

        const badge = document.createElement("span");
        badge.classList.add("reaction-badge");
        if (users.has(username)) badge.classList.add("mine");

        badge.textContent = `${emoji} ${users.size}`;

        badge.onclick = (e) => {
            e.stopPropagation();
            sendReaction(messageId, emoji);
        };

        container.appendChild(badge);
    });
}

socket.on("reaction", (data) => {

    const { messageId, emoji, user } = data;

    if (!messageReactions[messageId]) {
        messageReactions[messageId] = {};
    }

    if (!messageReactions[messageId][emoji]) {
        messageReactions[messageId][emoji] = new Set();
    }

    const users = messageReactions[messageId][emoji];

    if (users.has(user)) {
        users.delete(user); // clicking again removes your reaction
    } else {
        users.add(user);
    }

    renderReactions(messageId);
});
socket.on("delete-message", (data) => {

    const { messageId } = data;

    const div = document.querySelector(`.message[data-id="${messageId}"]`);
    if (div) div.remove();

    delete messageReactions[messageId];
});
