function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

    if(Client.checkForURL(formText)){
        console.log("::: Form Submitted :::")
        console.log({ url: formText })
        fetch('http://localhost:8081/analyze', 
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ url: formText })
        })
        .then(res => res.json())
        .then(function(res) {
            // document.getElementById('results').innerHTML = res.message
            switch(res.score_tag){
                case 'P+':
                    document.getElementById('polarity').innerHTML = "Polarity = " + "Strong Positive";
                    break;
                case 'P':
                    document.getElementById('polarity').innerHTML = "Polarity = " + "Positive";
                    break;
                case 'NEW':
                    document.getElementById('polarity').innerHTML = "Polarity = " + "Neutral";
                    break;
                case 'N':
                    document.getElementById('polarity').innerHTML = "Polarity = " + "Negative";
                    break;
                case 'N+':
                    document.getElementById('polarity').innerHTML = "Polarity = " + "Strong Negative";
                    break;
                case 'NONE':
                    document.getElementById('polarity').innerHTML = "Polarity = " + "No Sentiment";
            }
            document.getElementById('agreement').innerHTML = "Agreement = " + res.agreement;
            document.getElementById('subjectivity').innerHTML = "Subjectivity = " + res.subjectivity;
            document.getElementById('confidence').innerHTML = "Confidence = " + res.confidence;
            document.getElementById('irony').innerHTML = "Irony = " + res.irony;
        })
    } else {
        alert("Invalid URL! Please enter a valid article URL.")
    }
}

export { handleSubmit }
