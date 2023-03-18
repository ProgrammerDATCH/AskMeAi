import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element)
{
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent +='.';

    if(element.textContent === '....') 
    {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text)
{
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length)
    {
      element.innerHTML += text.charAt(index);
      index++;
    }
    else
    {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId()
{
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId)
{
  return(
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}" />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => 
{
  e.preventDefault();

  const data = new FormData(form);

  //user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  
  form.reset();

  const msgFromUser = data.get('prompt').toLowerCase();
  let checkProblemResult = checkProblem(msgFromUser);
  if(checkProblemResult)
  {
    return;
  }

  //bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
  //fetch data from server -> bot's response
    const response = await fetch('https://askme-ai.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok)
  {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  }
  else
  {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong!";
  }
    // alert(err);
  }

  function checkProblem(msgFromUserVar)
  {
    if (msgFromUserVar.includes('datch')) {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "Am sorry, Programmer DATCH (my Boss) told me not to expose his information anymore. \nBut here are some general information you can get on Him: \n\n DATCH is a Rwandan young guy who code everything. \nHe is the one who made me! \n Whatsapp him on +(250) 735177666 to chat with Him.");
        form.reset();
      }, 2000);

      return true;
    }
    if (msgFromUserVar.trim() === "hy" || msgFromUserVar.trim() === "hi") {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "Hi there! How can I help you?");
        form.reset();
      }, 2000);
      
      return true;
    }
    if (msgFromUserVar.trim() === "ok" || msgFromUserVar.trim() === "ok.") {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "Okay Thank you!, am here anytime you need me.");
        form.reset();
      }, 2000);
      
      return true;
    }
    if (msgFromUserVar.trim() === "why" || msgFromUserVar.trim() === "why?") {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "Give me more information on your question. Even those from previous chat for me to give you appropriate answer!");
        form.reset();
      }, 2000);
      
      return true;
    }
    if (msgFromUserVar.trim() === " " || msgFromUserVar.trim() === "") {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "Write Something!");
        form.reset();
      }, 2000);
      
      return true;
    }
    if (msgFromUserVar.trim() === "." || msgFromUserVar.trim() === "?" || msgFromUserVar.trim() === "!") {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "Try to give me more information than single symbol.");
        form.reset();
      }, 2000);
      
      return true;
    }
    if (msgFromUserVar.includes("who made you") || msgFromUserVar.trim() === "who made you?" || msgFromUserVar.includes("who created you")) {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "I was made by Programmer DATCH.\n He lives in Rwanda\n Chat with him on Whatsapp 0735177666");
        form.reset();
      }, 2000);
      
      return true;
    }
    if (msgFromUserVar.includes("ntakomisiyo") || msgFromUserVar.includes("ntakomisiyo.com")) {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "ntakomisiyo.com \n is the website developed by (my Boss) Programmer DATCH that connect people who wants to buy and those wants to sell without commission,\n especially those dealing with second hand product. \n With Slogan (Gura nta Komisiyo kuko usobanutse)\n ");
        form.reset();
      }, 2000);
      
      return true;
    }
    if (msgFromUserVar.includes("fuck")) {
      // Give a response
      const uniqueId1 = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, "", uniqueId1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const messageDiv1 = document.getElementById(uniqueId1);
      loader(messageDiv1);
      setTimeout(function() {
        clearInterval(loadInterval);
        messageDiv1.innerHTML = "";
        typeText(messageDiv1, "My Boss Programmer DATCH, hate abusive speech(gutukana).\n Make sure you be nice in my chat with you!");
        form.reset();
      }, 2000);
      
      return true;
    }
    return false;
  }

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13)
  {
    handleSubmit(e);
  }
})