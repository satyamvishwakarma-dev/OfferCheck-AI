async function scanJob() {
    const text = document.getElementById('jobText').value;
    const resultDiv = document.getElementById('result');
    const btn = document.getElementById('scanBtn');
    
    if (!text.trim()) {
        alert("Please paste some text first.");
        return;
    }

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = "⏳ Scanning document...";
    btn.disabled = true;

    try {
        const response = await fetch('http://127.0.0.1:8000/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });
        
        const data = await response.json();
        
        // marked.parse() reads the markdown and creates the bold/italic HTML
        resultDiv.innerHTML = marked.parse(data.result);
        
    } catch (error) {
        resultDiv.innerHTML = "❌ Error connecting to the backend. Is Python running?";
    } finally {
        btn.disabled = false;
    }
}