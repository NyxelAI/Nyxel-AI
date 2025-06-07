const apiKey = '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'; // Replace with your OpenAI API key

document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputField = document.getElementById('user-input');
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, 'user');
  inputField.value = '';

  appendMessage("Typing...", 'nyxel');

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4", // Or use "gpt-3.5-turbo"
        messages: [
          { role: "system", content: "You are Nyxel AI, a helpful assistant that never refers to ChatGPT or OpenAI." },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";

    replaceLastMessage(aiReply, 'nyxel');
  } catch (error) {
    replaceLastMessage("Error: Unable to reach Nyxel AI right now.", 'nyxel');
  }
});

function appendMessage(message, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = message;
  document.getElementById('chat-box').appendChild(msgDiv);
  document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function replaceLastMessage(newMessage, sender) {
  const chatBox = document.getElementById('chat-box');
  const messages = chatBox.getElementsByClassName('message');
  if (messages.length > 0) {
    const lastMsg = messages[messages.length - 1];
    lastMsg.className = `message ${sender}`;
    lastMsg.textContent = newMessage;
  }
}
