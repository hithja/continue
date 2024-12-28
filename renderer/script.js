const HF_API_TOKEN = "";

async function analyzeText(text) {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-2-2b-it", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: text }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.statusText}`);
        }

        const result = await response.json();
        const generatedText = result[0]?.generated_text || "Текст не сгенерирован.";
        return generatedText;
    } catch (error) {
        return `Ошибка: ${error.message}`;
    }
}

var promptForm = document.getElementById('promptForm');
var result = document.getElementById('result');

promptForm.onsubmit = async function(event) {
    event.preventDefault();
    var prompt = document.getElementById('prompt').value;
    console.log(prompt);
    const generatedText = await analyzeText(prompt);
    result.innerHTML = generatedText;
};
