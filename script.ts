document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('Resumeform') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
    const editButton = document.createElement('button');
    const downloadButton = document.createElement('button');
    const shareButton = document.createElement('button');
    const resumeURLInput = document.getElementById('username') as HTMLInputElement;

    // Add Edit, Download and Share Buttons
    editButton.textContent = 'Edit Resume';
    downloadButton.textContent = 'Download as PDF';
    shareButton.textContent = 'Share Resume';
    downloadButton.style.display = 'none'; // Hide download button initially
    shareButton.style.display = 'none'; // Hide share button initially
    resumeOutput?.appendChild(editButton);
    resumeOutput?.appendChild(downloadButton);
    resumeOutput?.appendChild(shareButton);

    function generateResume(profilePictureURL: string | ArrayBuffer | null, name: string, email: string, phone: string, education: string, skills: string, experience: string) {
        const resumeContent = `
            <h2>Generated Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" style="width: 150px; height: 150px; border-radius: 50%;">` : ''}
            <p><strong>Full Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
        `;
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeContent;
            resumeOutput.appendChild(editButton);
            resumeOutput.appendChild(downloadButton);
            resumeOutput.appendChild(shareButton);
            downloadButton.style.display = 'inline-block'; // Show download button after resume generation
            shareButton.style.display = 'inline-block'; // Show share button after resume generation
        }
    }

    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
        const nameElement = document.getElementById('name') as HTMLInputElement;
        const emailElement = document.getElementById('email') as HTMLInputElement;
        const phoneElement = document.getElementById('phone') as HTMLInputElement;
        const educationElement = document.getElementById('education') as HTMLTextAreaElement;
        const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
        const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;

        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const skills = skillsElement.value;
        const experience = experienceElement.value;

        const profilePictureFile = profilePictureInput.files?.[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const profilePictureURL = e.target?.result;

            generateResume(profilePictureURL, name, email, phone, education, skills, experience);
        };

        if (profilePictureFile) {
            reader.readAsDataURL(profilePictureFile);
        } else {
            generateResume(null, name, email, phone, education, skills, experience);
        }
    });

    editButton.addEventListener('click', () => {
        const nameElement = document.getElementById('name') as HTMLInputElement;
        const emailElement = document.getElementById('email') as HTMLInputElement;
        const phoneElement = document.getElementById('phone') as HTMLInputElement;
        const educationElement = document.getElementById('education') as HTMLTextAreaElement;
        const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
        const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;

        // Make form fields editable again
        nameElement.disabled = false;
        emailElement.disabled = false;
        phoneElement.disabled = false;
        educationElement.disabled = false;
        skillsElement.disabled = false;
        experienceElement.disabled = false;

        downloadButton.style.display = 'none'; // Hide download button during editing
        shareButton.style.display = 'none'; // Hide share button during editing
    });

    downloadButton.addEventListener('click', () => {
        const resumeContent = resumeOutput.innerHTML;
        const pdfWindow = window.open('', '', 'height=650,width=900');
        pdfWindow?.document.write('<html><head><title>Resume</title></head><body>');
        pdfWindow?.document.write(resumeContent);
        pdfWindow?.document.write('</body></html>');
        pdfWindow?.document.close();
        pdfWindow?.print(); // Note: The print dialog will be triggered
    });

    shareButton.addEventListener('click', () => {
        const resumeContent = resumeOutput.innerHTML;
        const blob = new Blob([resumeContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        resumeURLInput.value = url;
        alert('Resume URL has been copied to the input field. You can share this URL.');
    });
});
