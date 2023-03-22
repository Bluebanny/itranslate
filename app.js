// Create a new instance of the SpeechRecognition API
const recognition = new webkitSpeechRecognition();

// Set the language of the recognition to English
recognition.lang = "en-US";

// Set continuous to true to keep listening even after the user stops speaking
recognition.continuous = true;

// Set the onClick property of the start button
document.querySelector("#start").ontouchstart= () => {
  // change record btn to recording
  console.log(recognition);


  // Start the Speech Recognition
  recognition.start();
};
// Set the onClick property of the stop button
document.querySelector("#start").ontouchend = () => {
  // change recording key back to record
  document.querySelector("#start").innerHTML = "Hold to record <i class="fa fa-microphone" aria-hidden="true"></i>";

  // Stop the Speech Recognition
  recognition.stop();
};

// Add an event listener to handle the recognition result
recognition.onresult = function (event) {
  // Get the transcript of the recognized speech
  let Ttranscript = event.results[0][0].transcript;

  // Log the transcript to the console
  document.querySelector("#final").innerHTML = Ttranscript;

  let apiKey = "2673256e-b958-30a9-86f9-c03ff6dd56e3:fx"; // Replace with your DeepL API key
  let sourceLang = "EN"; // Replace with your source language code
  let targetLang = "FR"; // Replace with your target language code
  let textToTranslate = Ttranscript; // Replace with the text you want to translate

  let url = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&source_lang=${sourceLang}&target_lang=${targetLang}&text=${encodeURIComponent(
    textToTranslate
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let translatedText = data.translations[0].text;

      document.querySelector("#interim").innerHTML = translatedText;

      //add speech code
      let speakButton = document.getElementById("speak");

      //  translatedText.lang = "fr-FR";

      let utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = "fr-FR";

      let synth = window.speechSynthesis;

      // Add event listener to the Speak button
      speakButton.ontouchend = () => {
        synth.speak(utterance);
      };
    })
    .catch((error) => console.error(error));
};

// Add an event listener to handle errors
recognition.onerror = function (event) {
  // Log the error to the console
  console.log(event.error);
};
