// ✅ Backend API URL (update if needed)
let backendURL = "https://figma-production.up.railway.app/";

// ✅ Store session ID
let session_id = null;

// ✅ Show specific screen
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// ✅ Start a new session
async function startSession() {
  try {
    const response = await fetch(`${backendURL}/start`);
    const data = await response.json();
    session_id = data.session_id;

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<div class="chat-message bot">${data.message}</div>`;
  } catch (error) {
    console.error("⚠️ Feil ved oppstart:", error);
  }
}

// ✅ Send message to backend
async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const message = input.value.trim();

  if (!message) return;

  chatBox.innerHTML += `<div class="chat-message user">${message}</div>`;
  input.value = "";

  showTypingIndicator(true);

  try {
    const response = await fetch(`${backendURL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: session_id,
        response: message
      })
    });

    const data = await response.json();
    showTypingIndicator(false);

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", "bot");
    messageDiv.innerHTML = data.message;

    // ✅ Resize YouTube iframes
    const iframes = messageDiv.getElementsByTagName("iframe");
    for (let iframe of iframes) {
      iframe.classList.add("youtube-video");
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    showTypingIndicator(false);
    console.error("⚠️ Serverfeil:", error);
    chatBox.innerHTML += `<div class="chat-message bot">Beklager, det oppstod en feil.</div>`;
  }
}

// ✅ Typing indicator toggle
function showTypingIndicator(show) {
  const typingIndicator = document.getElementById("typingIndicator");
  typingIndicator.style.display = show ? "flex" : "none";
}

// ✅ Handle Enter key
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// ✅ Load session on chat screen load
window.onload = () => {
  showScreen("home");
  startSession();
};
