

function viewNotes() {
    fetch('http://localhost:3000/viewnotes')
        .then((data) => data.json())
        .then((data) => {
            const output = data.map((info) => {
                const {studentName, subject, note} = info;
                let newul = document.createElement("ul");
                document.querySelector('#diplayNotes').appendChild(newul);
                let li1 = document.createElement('li');
                li1.innerHTML = `Name: ${studentName}`;
                newul.appendChild(li1);
                let li2 = document.createElement('li');
                li2.innerHTML = `Subject: ${subject}`;
                newul.appendChild(li2);
                let li3 = document.createElement('li');
                li3.innerHTML = `Note: ${note}`;
                newul.appendChild(li3);
            })
        })
}
