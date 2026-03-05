async function scanJob() {
    const text = document.getElementById('jobText').value;
    const resultDiv = document.getElementById('result');
    
    if (!text.trim()) {
        alert("Please paste some text first.");
        return;
    }

    resultDiv.style.display = 'block';
    resultDiv.innerText = "Scanning document...";

    try {
        const response = await fetch('http://127.0.0.1:8000/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });
        
        const data = await response.json();
        resultDiv.innerText = data.result;
    } catch (error) {
        resultDiv.innerText = "Error connecting to the backend. Make sure Python is running!";
    }
}