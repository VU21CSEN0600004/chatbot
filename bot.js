const userMessage = [
    ["hi", "hey", "hello"],
    ["yes", "no"],
    ["are you smart", "are you intelligent"],
    ["help me", "tell me a joke", "tell me a story"],
    ["how are you", "how are you doing"],
    ["what is the capital of France", "what is the square root of 25"],
    ["what courses does the college offer", "what is the admission process"],
    ["how old are you"],
    ["who created you", "who made you"],
    ["what is your purpose", "what can you do"],
    ["i love you"],
    ["good", "bad"],
    ["thanks", "thank you"],
    ["what should I major in", "what career options do I have"],
    ["what is the deadline for applications"],
    ["what clubs or organizations are available"],
    ["what sports teams are there"],
    ["what are the dormitory options"],
    ["what is the cost of tuition"],
    ["where is the college located"],
    ["when is the semester break"],
    ["can I study abroad"],
    ["what scholarships are available"],
    ["how do I apply for financial aid"],
    ["what is the academic calendar"],
    ["what is the student-faculty ratio"]
  ];
  
  const botReply = [
    ["Hello!", "Hi there!", "Hey!"],
    ["Okay", "I see"],
    ["Yes, I am!", "I like to think so"],
    ["Sure, here's a joke: Why don't scientists trust atoms? Because they make up everything!"],
    ["I'm just a bot, but I'm doing fine. How about you?"],
    ["The capital of France is Paris. The square root of 25 is 5."],
    ["The college offers a variety of courses. You can find more information on the college website."],
    ["I am just a bot, so I don't have an age."],
    ["I was created by [Creator's Name]"],
    ["My purpose is to assist users with college-related inquiries. I can provide information about courses, admissions, and more."],
    ["I appreciate the sentiment!"],
    ["Glad to hear that!", "Sorry to hear that"],
    ["You're welcome!", "Anytime"],
    ["It depends on your interests and career goals. You can explore different majors and see what aligns with your aspirations."],
    ["The deadline for applications varies. It's best to check the college website for specific dates."],
    ["There are various clubs and organizations catering to different interests. You can find more information on the college website."],
    ["The college has several sports teams competing in different leagues. You can check the college athletics department for more details."],
    ["The college offers different housing options, including dormitories. You can explore the housing section of the college website for more information."],
    ["Tuition costs vary depending on factors such as residency status and program of study. You can find detailed information on the college website."],
    ["The college is located in [Location]."],
    ["The semester break typically occurs during [Month]."],
    ["Yes, the college offers study abroad programs. You can inquire with the international programs office for more information."],
    ["There are various scholarships available for students. You can check the college website for scholarship opportunities and application details."],
    ["You can apply for financial aid through the college's financial aid office. They can guide you through the application process."],
    ["The academic calendar outlines important dates such as semester start and end dates, holidays, and exam periods. You can find the academic calendar on the college website."],
    ["The student-faculty ratio at the college is [Ratio]."]
  ];
  
  const alternative = [
    "Contact our adminstration",
    "Sorry,cant answer",
    "Ask something else...",
  ];
  
  const synth = window.speechSynthesis;
  
  function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
  }
  
  function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    input != "" && output(input);
    inputField.value = "";
  }
  document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
      if (e.code === "Enter") {
        let input = inputField.value.trim();
        input != "" && output(input);
        inputField.value = "";
      }
    });
  });
  
  function output(input) {
    let product;
  
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  
    text = text
      .replace(/[\W_]/g, " ")
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .trim();
  
    let comparedText = compare(userMessage, botReply, text);
  
    product = comparedText
      ? comparedText
      : alternative[Math.floor(Math.random() * alternative.length)];
    addChat(input, product);
  }
  
  function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
      for (let y = 0; y < replyArray.length; y++) {
        if (triggerArray[x][y] == string) {
          items = replyArray[x];
          item = items[Math.floor(Math.random() * items.length)];
        }
      }
    }
    //containMessageCheck(string);
    if (item) return item;
    else return containMessageCheck(string);
  }
  
  function containMessageCheck(string) {
    let expectedReply = [
      [
        "Good Bye, dude",
        "Bye, See you!",
        "Dude, Bye. Take care of your health in this situation."
      ],
      ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
      ["Have a pleasant evening!", "Good evening too", "Evening!"],
      ["Good morning, Have a great day!", "Morning, dude!"],
      ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
    ];
    let expectedMessage = [
      ["bye", "tc", "take care"],
      ["night", "good night"],
      ["evening", "good evening"],
      ["morning", "good morning"],
      ["noon"]
    ];
    let item;
    for (let x = 0; x < expectedMessage.length; x++) {
      if (expectedMessage[x].includes(string)) {
        items = expectedReply[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
    return item;
  }
  
  function addChat(input, product) {
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(product);
  }
  