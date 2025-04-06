function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const typing = document.getElementById("typingIndicator");

  if (!input.value.trim()) return;

  // Add user message
  chatBox.innerHTML += `<div class="chat-message user">${input.value}</div>`;
  input.value = "";

  // Show typing indicator
  typing.classList.remove("hidden");
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate bot response after delay
  setTimeout(() => {
    typing.classList.add("hidden");
    chatBox.innerHTML += `<div class="chat-message bot">Dette er et eksempel på svar fra Velfie 🤖</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1200);
}
